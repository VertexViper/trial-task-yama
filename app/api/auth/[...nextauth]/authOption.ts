import { prisma } from "@/prisma"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { AuthOptions } from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { comparedPassword } from "@/utils/hashPassword"
export const authOptions: AuthOptions = {
    providers: [
        Credentials({
            name: "Credentials",
            credentials: {
                email: { label: "email", type: "text" },
                password: { label: "password", type: "password" },
            },
            async authorize(credentials, req) {
                if (!credentials) return null;
                const { email, password } = credentials;

                const user = await prisma.user.findUnique({
                    where: { email },
                });
                if (user && await comparedPassword(password, user.password)) {
                    return {
                        id: Number(user?.id) as unknown as string,
                        email: user?.email,
                        wallet: user?.wallet
                    }
                }
                return null
            },
        }),
    ],
    adapter: PrismaAdapter(prisma),
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXT_AUTH_SECRET,
    callbacks: {
        async jwt({ token, user, trigger, session }) {
            if (user) {
                token.id = user.id as string
                token.email = user.email
                token.wallet = (user as any).wallet
            }
            if (trigger === "update") token.wallet = session.user.wallet
            return token
        },
        async session({ session, token}) {
            session.user = {
                ...session.user,
                id: token?.id as number,
                email: token?.email as string,
                wallet: token?.wallet as string
            }
            return session
        },
    },
};