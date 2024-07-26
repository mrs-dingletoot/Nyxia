import prismaClient from "@nyxia/database";
import { Logger } from "@nyxia/util/functions/util";
import { ObjectId } from "mongodb";

export async function GuildCreate({ guild }) {
 try {
  await prismaClient.guild.upsert({
   where: {ID: new ObjectId().toString(),
    guildId: guild.id,
   },
   update: {},
   create: {
    ID: new ObjectId().toString(),
    guildId: guild.id,
   },
  });
 } catch (error) {
  Logger.error("Failed to create guild:", error);
 }
}
