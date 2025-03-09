import NextAuth from "next-auth"
import Discord from "next-auth/providers/discord"
import { signIn } from "next-auth/react"

export const authOptions = {
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
  
}

export default NextAuth(authOptions)