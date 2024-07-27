import prismaClient from "@nyxia/database";
import { ApplicationCommandType, EmbedBuilder, codeBlock, Status, ActionRowBuilder, ButtonBuilder, ButtonStyle } from "discord.js";

export default {
 name: "ping",
 description: "🏓 Check the ping",
 type: ApplicationCommandType.ChatInput,
 cooldown: 3000,
 usage: "/ping",
 dm_permission: true,
 run: async (client, interaction, guildSettings) => {
  try {
   const dbTime = performance.now();
   const waitEmbed = new EmbedBuilder().setColor(guildSettings?.embedColor || client.config.defaultColor).setDescription("> *Loading...*");
   const message = await interaction.followUp({ embeds: [waitEmbed] });
   await prismaClient.user.findUnique(
    { 
        where: { 
            discordId: interaction.user.id,
            tag: "tag"
        } 
    }
);
   const dbTiming = performance.now() - dbTime;

   const thisServerShard = client.ws.shards.get(interaction.guild.shardId);

   const pingMessage = new EmbedBuilder()
    .setColor(guildSettings?.embedColor || client.config.defaultColor)
    .setTimestamp()
    .setTitle("⏱️ Service Timings")
    .addFields([
     {
      name: "Host Latency",
      value: codeBlock("yaml", client.ws.ping > 0 ? `${Math.floor(client.ws.ping)}ms` : "Calculating..."),
      inline: true,
     },
     {
      name: "Client Latency",
      value: codeBlock("yaml", `${Math.floor(message.createdTimestamp - interaction.createdTimestamp)}ms`),
      inline: true,
     },
     {
      name: "Database Latency",
      value: codeBlock("yaml", `${Math.floor(dbTiming)}ms`),
      inline: true,
     },
     {
      name: "Websocket",
      value: codeBlock("yaml", `${Status[thisServerShard.status]}`),
      inline: true,
     },
     {
      name: "Shard",
      value: codeBlock("yaml", `${thisServerShard.id}/${client.ws.shards.size} (${thisServerShard.ping > 0 ? `${Math.floor(thisServerShard.ping)}ms` : "Calculating..."})`),
      inline: true,
     }
    ])
    .setFooter({
     text: `Requested by ${interaction.member.user.globalName || interaction.member.user.username}`,
     iconURL: interaction.member.user.displayAvatarURL({
      size: 256,
     }),
    });

    const row = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
                .setLabel("Status Page")
                .setStyle(ButtonStyle.Link)
                .setURL("https://status.tsukiyodevteam.xyz/")
        )
   await message.edit({ ephemeral: false, embeds: [pingMessage], components:[row] });
  } catch (err) {
   client.errorMessages.internalError(interaction, err);
  }
 },
};
