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
    async redirect({ url, baseUrl }) {
      // CRITICAL: baseUrl comes from NEXTAUTH_URL which may be set to production
      // We MUST ignore baseUrl and only work with relative paths
      // This ensures we stay on whatever domain the user is currently on
      
      // If url is a relative path, return it as-is
      // Next.js will resolve it to the current domain automatically
      if (url.startsWith("/")) {
        return url;
      }
      
      // If url is an absolute URL, extract just the pathname
      // This prevents cross-domain redirects
      try {
        const urlObj = new URL(url);
        return urlObj.pathname;
      } catch {
        // If URL parsing fails, default to /admin
        return "/admin";
      }
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
