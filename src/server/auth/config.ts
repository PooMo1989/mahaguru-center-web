import { type DefaultSession, type NextAuthConfig } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import DiscordProvider from "next-auth/providers/discord";

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      role?: string;
      // ...other properties
    } & DefaultSession["user"];
  }

  interface User {
    role?: string;
    // ...other properties
  }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authConfig = {
  /**
   * Allow NextAuth to trust the incoming request host header. This ensures that
   * preview/staging deployments with dynamic Vercel URLs generate correct
   * callback URLs without relying on a statically configured NEXTAUTH_URL.
   */
  trustHost: true,
  providers: [
    CredentialsProvider({
      name: "Admin Login",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "admin" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        console.log("Authorize called with:", credentials);

        // Simple admin credentials for development
        if (
          (credentials?.username === "admin" &&
            credentials?.password === "admin123") ||
          (credentials?.username === "severus" &&
            credentials?.password === "severus")
        ) {
          const user = {
            id:
              credentials.username === "severus"
                ? "severus-admin"
                : "admin-user",
            name:
              credentials.username === "severus"
                ? "Severus Admin"
                : "Admin User",
            email:
              credentials.username === "severus"
                ? "severus@mahaguru.com"
                : "admin@mahaguru.com",
            role: "admin",
          };
          console.log("Returning user:", user);
          return user;
        }
        console.log("Authorization failed - invalid credentials");
        return null;
      },
    }),
    // Keep Discord provider for when it's properly configured
    ...(process.env.AUTH_DISCORD_ID && process.env.AUTH_DISCORD_SECRET
      ? [DiscordProvider]
      : []),
  ],
  // Use JWT strategy for credentials provider (no database needed)
  session: {
    strategy: "jwt" as const,
    maxAge: 24 * 60 * 60, // 24 hours
  },
  pages: {
    signIn: "/auth/signin",
    signOut: "/", // Redirect to home page after sign out
  },
  callbacks: {
    async redirect({ url }) {
      // Simply return the url - don't try to parse or validate it
      // If it's relative (/admin), that's fine
      // If it's absolute with the wrong domain, NextAuth will handle it
      return url;
    },
    async jwt({ token, user }) {
      // Persist user data in JWT token
      if (user) {
        token.id = user.id;
        token.role = (user as { role?: string }).role;
      }
      return token;
    },
    async session({ session, token }) {
      // Send properties to client
      if (token) {
        session.user.id = token.id as string;
        (session.user as { role?: string }).role = token.role as string;
      }
      return session;
    },
  },
  // Add some security options
  secret: process.env.AUTH_SECRET,
  debug: process.env.NODE_ENV === "development",
} satisfies NextAuthConfig;
