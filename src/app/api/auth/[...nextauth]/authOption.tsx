import { DefaultSession, NextAuthOptions, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import Github from "next-auth/providers/github";
import Google from "next-auth/providers/google";

declare module "next-auth" {
  interface Session {
    accessToken: string | unknown;
    user: {
      id: string;
      role: string;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: string;
    accessToken?: string;
  }
}

export const authoption: NextAuthOptions = {
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
  pages: {
    signIn: "/landing",
    signOut: "/landing",
    error: "/auth/login",
  },
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
        role: { label: "Role", type: "text" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Missing credentials");
        }

        try {
          const requestedRole = credentials.role?.toString().trim().toLowerCase();
          let roleId = credentials.role;

          // Allow the login form to pass a role name and resolve it via the public roles endpoint.
          if (requestedRole && !/^[a-f\d]{24}$/i.test(requestedRole)) {
            const rolesResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/roles`, {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
              cache: "no-store",
            });

            const rolesData = await rolesResponse.json();
            if (!rolesResponse.ok) {
              throw new Error(rolesData?.message || "Failed to load role information");
            }

            const matchedRole = rolesData?.data?.find((role: { _id: string; name: string }) => role.name?.toLowerCase() === requestedRole);
            if (!matchedRole?._id) {
              throw new Error("Selected role is not available");
            }

            roleId = matchedRole._id;
          }

          const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              identifier: credentials.email,
              password: credentials.password,
              role_id: roleId,
            }),
          });

          const data = await res.json();

          if (!res.ok) {
            throw new Error(data?.message || "Invalid credentials");
          }

          if (!data.user || !data.token) {
            console.error("Invalid response structure");
            return null;
          }

          return {
            id: data.user.id,
            name: data.user.name,
            email: data.user.email,
            role: data.user.role,
            accessToken: data.token,
          };
        } catch (error) {
          console.error("Authorization error:", error);
          throw new Error(`${error}`);
        }
      },
    }),
    Github({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.role = (user as User & { role: string }).role;
        token.accessToken = (user as User & { accessToken: string }).accessToken;
      }
      return token;
    },

    async session({ session, token }) {
      if (session?.user) {
        session.user.id = token.id as string;
        session.user.name = token.name as string;
        session.user.email = token.email as string;
        session.user.role = token.role as string;
        session.accessToken = token.accessToken;
      }
      return session;
    },

    async redirect({ url, baseUrl }) {
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      if (new URL(url).origin === baseUrl) return url;
      return `${baseUrl}/dashboard`;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === "development",
};
