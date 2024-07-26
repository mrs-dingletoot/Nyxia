import { EmbedBuilder, time, ButtonBuilder, ActionRowBuilder, ApplicationCommandType, ButtonStyle } from "discord.js";
import prismaClient from "@nyxia/database";
import { ObjectId } from "mongodb";

export default {
 name: "uptime",
 description: "⌛ View Nyxia's bot uptime and past status",
 type: ApplicationCommandType.ChatInput,
 cooldown: 3000,
 dm_permission: true,
 usage: "/uptime",
 run: async (client, interaction, guildSettings) => {
  try {
    const commandsRan = await prismaClient.botData.findFirst({
      where: {
        tag: "tag", ID: new ObjectId().toString()
      },
      select: {
        cmdsran: true
      }
    })
   const embed = new EmbedBuilder()
    .setTitle("📈 Nyxia uptime")
    .setDescription(
     `**🚀 Released**: <t:1720301186:D>
     **⏱️ Started:** ${time(client.readyAt, "R")}
     
     **✨ Did you know?** From the time Nyxia was released it served \`${commandsRan}\` commands!
     `
    )
    .setTimestamp()
    .setColor(guildSettings?.embedColor || client.config.defaultColor)
    .setFooter({
     text: `Requested by ${interaction.member.user.globalName || interaction.member.user.username}`,
     iconURL: interaction.member.user.displayAvatarURL({
      size: 256,
     }),
    });

   if (client.config.url) {
    const action = new ActionRowBuilder().addComponents(
     new ButtonBuilder() // prettier
      .setLabel("Status page")
      .setStyle(ButtonStyle.Link)
      .setURL(`${client.config.url}/status`)
    );
    return interaction.followUp({ ephemeral: false, embeds: [embed], components: [action] });
   } else {
    return interaction.followUp({ ephemeral: false, embeds: [embed] });
   }
  } catch (err) {
   client.errorMessages.internalError(interaction, err);
  }
 },
};
