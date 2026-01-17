import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import PocketBase from "pocketbase";

const pb = new PocketBase(process.env.NEXT_PUBLIC_POCKETBASE_URL);

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "email@example.com" },
        password: { label: "Mot de passe", type: "password" },
        role: { label: "Rôle", type: "text", placeholder: "student|teacher" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password || !credentials?.role) return null;
        try {
          // Authentifier via PocketBase (collection students ou teachers)
          const collection = credentials.role === "teacher" ? "teachers" : "students";
          const user = await pb.collection(collection).authWithPassword(
            credentials.email,
            credentials.password
          );
          if (user) {
            return {
              id: user.record.id,
              email: user.record.email,
              name: user.record.name,
              role: user.record.role, // récupère le vrai champ role
            };
          }
        } catch (e) {
          return null;
        }
        return null;
      },
    }),
  ],
  session: {
    strategy: "jwt" as const,
  },
  callbacks: {
    async jwt({ token, user }: { token: any; user?: any }) {
      if (user) {
        token.role = user.role;
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }: { session: any; token: any }) {
      if (token) {
        session.user.id = token.id;
        session.user.role = token.role;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
