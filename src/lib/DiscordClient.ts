import {REST as Discord} from "@discordjs/rest"

export const client = new Discord({version:"10"}).setToken(process.env.DISCORD_BOT_TOKEN as string)

