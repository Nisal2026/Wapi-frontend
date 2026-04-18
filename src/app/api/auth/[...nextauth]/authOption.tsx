import { DefaultSession, NextAuthOptions, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import Github from "next-auth/providers/github";
import Google from "next-auth/providers/google";

const FALLBACK_BACKEND_API_URL = "https://api.chatpanelpro.com/api";
const LOCAL_BACKEND_API_URL = "http://127.0.0.1:5000/api";

type JsonFetchResult<T> = {
  response: Response;
  data: T;
  url: string;
};

const getBackendApiCandidates = () => {
  const candidates = [
    process.env.NEXT_PUBLIC_API_URL,
    process.env.NEXT_PUBLIC_BASE_URL ? `${process.env.NEXT_PUBLIC_BASE_URL}/api` : undefined,
    FALLBACK_BACKEND_API_URL,
    LOCAL_BACKEND_API_URL,
  ].filter((value): value is string => Boolean(value));

  return [...new Set(candidates)];
};

const fetchJsonWithFallback = async <T>(path: string, init?: RequestInit): Promise<JsonFetchResult<T>> => {
  const errors: string[] = [];

  for (const baseUrl of getBackendApiCandidates()) {
    const url = `${baseUrl}${path}`;

    try {
      const response = await fetch(url, {
        ...init,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          ...(init?.headers || {}),
        },
        cache: "no-store",
      });

      const text = await response.text();
      if (text.trim().startsWith("<")) {
        errors.push(`${url} returned HTML`);
        continue;
      }

      const data = JSON.parse(text) as T;
      return { response, data, url };
    } catch (error) {
      errors.push(`${url} failed: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  throw new Error(errors[0] || `Failed to fetch ${path}`);
};

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
            const { response: rolesResponse, data: rolesData, url: rolesUrl } = await fetchJsonWithFallback<{
              success?: boolean;
              message?: string;
              data?: Array<{ _id: string; name: string }>;
            }>("/auth/roles", {
              method: "GET",
            });

            if (!rolesResponse.ok) {
              throw new Error(rolesData?.message || `Failed to load role information from ${rolesUrl}`);
            }

            const matchedRole = rolesData?.data?.find((role: { _id: string; name: string }) => role.name?.toLowerCase() === requestedRole);
            if (!matchedRole?._id) {
              throw new Error("Selected role is not available");
            }

            roleId = matchedRole._id;
          }

          const { response: res, data, url: loginUrl } = await fetchJsonWithFallback<{
            message?: string;
            token?: string;
            user?: {
              id: string;
              name: string;
              email: string;
              role: string;
            };
          }>("/auth/login", {
            method: "POST",
            body: JSON.stringify({
              identifier: credentials.email,
              password: credentials.password,
              role_id: roleId,
            }),
          });

          if (!res.ok) {
            throw new Error(data?.message || `Invalid credentials from ${loginUrl}`);
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
