import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import AzureADProvider from "next-auth/providers/azure-ad";

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
        AzureADProvider({
            clientId: process.env.MICROSOFT_CLIENT_ID!,
            clientSecret: process.env.MICROSOFT_CLIENT_SECRET!,
            tenantId: process.env.MICROSOFT_TENANT_ID || "common",
        }),
    ],
    session: { strategy: "jwt" },
    callbacks: {
        async jwt({ token, account, profile }) {
            if (account && profile) {
                const p = profile as any;

                // Google typically: p.picture
                // Azure AD / Microsoft may vary: p.picture, p.avatar_url, p.photo, p.photos[0].value
                const image =
                    p.picture ||
                    p.avatar_url ||
                    p.photo ||
                    (Array.isArray(p.photos) ? p.photos?.[0]?.value : undefined) ||
                    token.picture;

                token.picture = image;

                // Also store name/email when available (harmless + helps consistency)
                token.name = token.name ?? p.name ?? p.displayName;
                token.email = token.email ?? p.email ?? p.preferred_username;
            }

            return token;
        },

        async session({ session, token }) {
            if (session.user) {
                session.user.image = (token as any).picture as string | undefined;
                session.user.name = session.user.name ?? (token.name as string | undefined);
                session.user.email = session.user.email ?? (token.email as string | undefined);
            }
            return session;
        },
    },


});

export { handler as GET, handler as POST };
