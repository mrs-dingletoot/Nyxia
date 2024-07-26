import prismaClient from "@nyxia/database";
import { GiveawaysManager } from "discord-giveaways";
import { ObjectId } from "mongodb";

/**
 * Creates a new giveaway manager.
 *
 * @param {object} client - The Discord client.
 * @returns {GiveawaysManager} The giveaway manager.
 */

export default function giveaway(client) {
 const Giveaways = class extends GiveawaysManager {
  async getAllGiveaways() {
   return await prismaClient.giveaways.findMany();
  }

  async saveGiveaway(messageId, giveawayData) {
   return await prismaClient.giveaways.create({
    data: {
     ID: new ObjectId().toString(),
     messageId,
     data: giveawayData,
     guild: {
      connectOrCreate: {
       where: { ID: new ObjectId().toString(),guildId: giveawayData.guildId },
       create: { guildId: giveawayData.guildId },
      },
     },
    },
   });
  }

  async editGiveaway(messageId, giveawayData) {
   return await prismaClient.giveaways.update({
    where: { ID: new ObjectId().toString(),messageId },
    data: {
     data: giveawayData,
    },
   });
  }

  async deleteGiveaway(messageId) {
   return await prismaClient.giveaways.delete({
    where: { ID: new ObjectId().toString(),messageId },
   });
  }
 };

 const manager = new Giveaways(client, {
  updateCountdownEvery: 10000,
  hasGuildMembersIntent: true,
  embedColorEnd: "15859772",
  embedColor: "#ab4b52",
  default: {
   botsCanWin: false,
   // exemptPermissions: ["MANAGE_MESSAGES", "ADMINISTRATOR"],
   reaction: client.config.emojis.giveaway,
  },
 });
 return manager;
}
