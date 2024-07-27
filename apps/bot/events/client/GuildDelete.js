import prismaClient from "@nyxia/database";
import { Logger } from "@nyxia/util/functions/util";

export async function GuildDelete({ guild }) {
 try {
  const guildExists = await prismaClient.guilds.findFirst({
   where: {tag: "tag",
    guildId: guild.id,
   },
  });

  if (guildExists) {
   await prismaClient.guilds.delete({
    where: {tag: "tag",
     guildId: guild.id,
    },
   });
  }
 } catch (error) {
  Logger.error("Failed to create guild:", error);
 }
}
