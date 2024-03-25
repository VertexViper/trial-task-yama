import { prisma } from "@/prisma"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import NextAuth, { AuthOptions } from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { comparedPassword } from "@/utils/hashPassword"

async function authorizeCredentials(
    credentials: Record<"email" | "password", string> | undefined
) {
    if (!credentials) return null;
    console.log(credentials)
    const { email, password } = credentials;

    const user = await prisma.user.findUnique({
        where: { email },
    });
    if (user && await comparedPassword(password, user.password)) {
        return {
            id: Number(user?.id) as unknown as string,
            email: user?.email,
        }
    }

    return null
}

const authOptions: AuthOptions = {
    providers: [
        Credentials({
            name: "Credentials",
            credentials: {
                email: { label: "email", type: "text" },
                password: { label: "password", type: "password" },
            },
            authorize: authorizeCredentials,
        }),
    ],
    adapter: PrismaAdapter(prisma),
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXT_AUTH_SECRET,
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id as string
                token.email = user.email
            }
            return token
        },
        async session({ session, token }) {
            session.user = {
                ...session.user,
                id: token.id as number,
                email: token.email as string,
            }
            return session
        },
    },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST }