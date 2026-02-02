'use client';

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { createClient } from '@/lib/supabase/client';
import type { User as SupabaseUser } from '@supabase/supabase-js';
import type { Database } from '@/types/supabase';

// Type User basé sur le schéma Supabase profiles
export type User = Database['public']['Tables']['profiles']['Row'] & {
  niveau_actuel?: 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';
  langueMaternelle?: string;
};

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<User | void>;
  loginWithProvider: (provider: 'google' | 'github' | 'discord') => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
  updateUser: (user: User) => void;
}

export interface RegisterData {
  email: string;
  password: string;
  passwordConfirm: string;
  username: string;
  name: string;
  niveau?: User['niveau_actuel'];
  langueMaternelle?: string;
  role: 'student' | 'teacher' | 'admin';
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    const initAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (session?.user) {
          // Récupérer le profil depuis la table profiles
          const { data: profile } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', session.user.id)
            .single();

          if (profile) {
            setUser({
              ...profile, // Spread tous les champs de la table profiles
              niveau_actuel: (session.user.user_metadata?.niveau || 'A2') as User['niveau_actuel'],
              langueMaternelle: session.user.user_metadata?.langue_maternelle,
            });
          }
        }
      } catch (error) {
        console.error('Erreur initialisation authentification:', error);
      } finally {
        setIsLoading(false);
      }
    };

    initAuth();

    // Écouter les changements de session Supabase
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN' && session?.user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single();

        if (profile) {
          setUser({
            ...profile,
            niveau_actuel: (session.user.user_metadata?.niveau || 'A2') as User['niveau_actuel'],
            langueMaternelle: session.user.user_metadata?.langue_maternelle,
          });
        }
      } else if (event === 'SIGNED_OUT') {
        setUser(null);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
      if (!data.session) throw new Error('Aucune session créée');

      // Récupérer le profil
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', data.user.id)
        .single();

      if (profileError) throw profileError;
      if (!profile) throw new Error('Profil utilisateur introuvable');

      const loggedInUser: User = {
        ...profile,
        niveau_actuel: (data.user.user_metadata?.niveau || 'A2') as User['niveau_actuel'],
        langueMaternelle: data.user.user_metadata?.langue_maternelle,
      };

      setUser(loggedInUser);
      return loggedInUser;
    } catch (err) {
      console.error('Login error:', err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [supabase]);

  const loginWithProvider = useCallback(async (provider: 'google' | 'github' | 'discord') => {
    setIsLoading(true);
    try {
      // TODO: Configurer OAuth providers dans Supabase Dashboard
      const { error } = await supabase.auth.signInWithOAuth({
        provider: provider as 'google' | 'github',
        options: {
          redirectTo: `${window.location.origin}/dashboard`,
        },
      });
      
      if (error) throw error;
    } catch (err) {
      console.error('OAuth error:', err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [supabase]);

  const register = useCallback(async (data: RegisterData) => {
    setIsLoading(true);
    try {
      // Vérifier si un admin existe déjà (si role = admin)
      if (data.role === 'admin') {
        const { data: admins } = await supabase
          .from('profiles')
          .select('id')
          .eq('role', 'admin')
          .limit(1);
        
        if (admins && admins.length > 0) {
          throw new Error('Un compte administrateur existe déjà');
        }
      }

      // Créer le compte Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          data: {
            niveau: data.niveau || 'A2',
            langue_maternelle: data.langueMaternelle,
          },
        },
      });

      if (authError) throw authError;
      if (!authData.user) throw new Error('Échec création utilisateur');

      // Créer le profil dans la table profiles
      const { error: profileError } = await supabase
        .from('profiles')
        .insert({
          id: authData.user.id,
          email: data.email,
          username: data.username,
          name: data.name,
          role: data.role,
        });

      if (profileError) {
        // Si échec création profil, supprimer le user Supabase (idéalement via admin API)
        console.error('Échec création profil:', profileError);
        throw new Error('Échec création du profil utilisateur');
      }

      // Récupérer le profil créé avec tous les champs (created_at, updated_at, metadata, etc.)
      const { data: createdProfile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', authData.user.id)
        .single();

      if (!createdProfile) {
        throw new Error('Profil créé mais introuvable');
      }

      const newUser: User = {
        ...createdProfile,
        niveau_actuel: data.niveau || 'A2',
        langueMaternelle: data.langueMaternelle,
      };

      setUser(newUser);
    } catch (err) {
      console.error('Register error:', err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [supabase]);

  const logout = useCallback(async () => {
    await supabase.auth.signOut();
    setUser(null);
  }, [supabase]);

  const updateUser = useCallback((updatedUser: User) => {
    setUser(updatedUser);
  }, []);

  const value: AuthContextType = {
    user,
    isLoading,
    isAuthenticated: !!user,
    login,
    loginWithProvider,
    register,
    logout,
    updateUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth doit être utilisé à l\'intérieur d\'un AuthProvider');
  }
  return context;
}

export function useCanAccessLevel(requiredLevel: User['niveau_actuel']) {
  const { user } = useAuth();
  
  const levelOrder: User['niveau_actuel'][] = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
  
  if (!user) return false;
  
  const userLevelIndex = levelOrder.indexOf(user.niveau_actuel);
  const requiredLevelIndex = levelOrder.indexOf(requiredLevel);
  
  return userLevelIndex >= requiredLevelIndex;
}

export function useUserStats() {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    seancesTerminees: 0,
    seancesEnCours: 0,
    scoreTotal: 0,
    tempsTotalMinutes: 0,
    serieJours: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      if (!user) {
        setIsLoading(false);
        return;
      }

      try {
        const supabase = createClient();
        const { data: activities } = await supabase
          .from('activities')
          .select('*')
          .eq('user_id', user.id);

        if (!activities) {
          setIsLoading(false);
          return;
        }

        const seancesTerminees = activities.filter(a => a.completed).length;
        const seancesEnCours = activities.filter(a => !a.completed).length;
        const scoreTotal = activities.reduce((sum, a) => sum + (a.score_total || 0), 0);
        const tempsTotalMinutes = Math.round(
          activities.reduce((sum, a) => sum + (a.time_spent || 0), 0) / 60
        );

        const serieJours = seancesTerminees > 0 ? 1 : 0;

        setStats({
          seancesTerminees,
          seancesEnCours,
          scoreTotal,
          tempsTotalMinutes,
          serieJours,
        });
      } catch (error) {
        console.error('Erreur chargement statistiques:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, [user]);

  return { stats, isLoading };
}

export default AuthContext;
