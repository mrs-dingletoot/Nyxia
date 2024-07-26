import prismaClient from "@nyxia/database";
import { Logger } from "@nyxia/util/functions/util";

export async function GuildDelete({ guild }) {
 try {
  const guildExists = await prismaClient.guilds.findFirst({
   where: {ID: new ObjectId().toString(),
    guildId: guild.id,
   },
  });

  if (guildExists) {
   await prismaClient.guilds.delete({
    where: {ID: new ObjectId().toString(),
     guildId: guild.id,
    },
   });
  }
 } catch (error) {
  Logger.error("Failed to create guild:", error);
 }
}
