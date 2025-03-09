import { db } from "@/db/db";
import { DefaultSession, NextAuthOptions } from "next-auth"
import Discord from "next-auth/providers/discord"

declare module "next-auth" {
    interface Session {
      user: {
        id: string;
        name: string;
        email: string;
        image: string;
      } & DefaultSession["user"];
    }
  
    interface User {
      id: string;
      name: string;
      email: string;
      image: string;
      password?: string;
    }
  }
  
  declare module "next-auth/jwt" {
    interface JWT {
      id: string;
      name: string;
      email: string;
      image: string;
    }
  }

export const authOptions:NextAuthOptions = {
  providers: [
    Discord({
      clientId: process.env.DISCORD_CLIENT_ID as string,
      clientSecret: process.env.DISCORD_CLIENT_SECRET as string,
      authorization: {
        params: {
          scope: "identify email guilds",
        },
      }
    })
    
  ],
  callbacks: {

    async signIn({ user }) {
        if (!user.email) return false;
        console.log(user)
        try {
            const existingUser = await db.user.findFirst({
                where:{
                    email:user.email
                }
            })
            console.log(existingUser)
            if(!existingUser){
                const res = await db.user.create({
                    data:{
                        email:user.email,
                        name:user.name,
                        image:user.image,
                    }
                })
                console.log(res)
            }
            return true;

        } catch (error) {
            console.error("Sign-in error:", error);
            return false;
        }
    },
    async jwt({ token, user }) {
        if (user) {
          token.id = user.id;
          token.name = user.name ?? '';
          token.email = user.email ?? '';
          token.image = user.image ?? '';
        }
        return token;
      },
      async session({ session, token }) {
        if (token) {
          session.user.id = token.id;
          session.user.name = token.name;
          session.user.email = token.email;
          session.user.image = token.image;
        }
        return session;
      },
    },
  pages: {
    signIn: "/auth/signin", 
  },
  secret: process.env.NEXTAUTH_SECRET as string,

}

export default authOptions