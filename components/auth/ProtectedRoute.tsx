'use client';

import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredLevel?: 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';
}

export function ProtectedRoute({ children, requiredLevel }: ProtectedRouteProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { user, isAuthenticated, isLoading } = useAuth();
  const [isClient, setIsClient] = useState(false);

  // ÉTAPE 1: Attendre d'être côté client
  useEffect(() => {
    setIsClient(true);
  }, []);

  // ÉTAPE 2: Une fois côté client, vérifier l'auth
  useEffect(() => {
    if (!isClient || isLoading) return;
    
    if (!isAuthenticated) {
      const redirectPath = pathname ?? '/';
      router.push(`/login?redirect=${encodeURIComponent(redirectPath)}`);
    }
  }, [isClient, isAuthenticated, isLoading, router, pathname]);

  // Pendant le SSR ou avant le montage client : afficher un loader
  if (!isClient || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-accent mx-auto" />
          <p className="mt-4 text-muted-foreground">Chargement...</p>
        </div>
      </div>
    );
  }

  // Côté client mais pas encore authentifié
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-accent mx-auto" />
          <p className="mt-4 text-muted-foreground">Redirection...</p>
        </div>
      </div>
    );
  }

  // Authentifié : afficher le contenu
  return <>{children}</>
}

// Composant pour les routes réservées aux non-connectés
interface GuestRouteProps {
  children: React.ReactNode;
  redirectTo?: string;
}

export function GuestRoute({ children, redirectTo = '/dashboard' }: GuestRouteProps) {
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAuth();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient || isLoading) return;
    
    if (isAuthenticated) {
      router.push(redirectTo);
    }
  }, [isClient, isAuthenticated, isLoading, router, redirectTo]);

  if (!isClient || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-accent mx-auto" />
          <p className="mt-4 text-muted-foreground">Chargement...</p>
        </div>
      </div>
    );
  }

  if (isAuthenticated) {
    return null;
  }

  return <>{children}</>;
}
