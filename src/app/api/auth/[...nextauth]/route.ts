import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcrypt";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// 1. Export authOptions explicitly so other APIs can use it
export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/dashboard/auth",
    error: '/dashboard/auth',
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          return null;
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user) {
          return null;
        }

        const passwordMatch = await compare(credentials.password, user.password);

        if (!passwordMatch) {
          return null;
        }

        console.log("✅ 1. Authorize Found User:", user.email, "Role:", user.role);

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        };
      },
    }),
  ],
  callbacks: {
  // 1. When the user logs in, add their role to the token
  async jwt({ token, user }) {
    if (user) {
      token.id = user.id;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      token.role = (user as any).role; 
    }
    return token;
  },
  // 2. When the frontend asks for the session, pass the role from the token
  async session({ session, token }) {
    if (session.user) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (session.user as any).id = token.id;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (session.user as any).role = token.role; 
    }
    return session;
  },
},
};

// 2. Initialize the handler
const handler = NextAuth(authOptions);

// 3. ✅ FIX: Export GET and POST individually to avoid the TypeScript error
export { handler as GET, handler as POST };