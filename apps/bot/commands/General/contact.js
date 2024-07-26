import { ApplicationCommandType, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } from "discord.js";

export default {
 name: "contact",
 description: "📝 Contact the dev team",
 type: ApplicationCommandType.ChatInput,
 cooldown: 3000,
 dm_permission: true,
 usage: "/contact",
 run: async (client, interaction, guildSettings) => {
  try {
   const action = new ActionRowBuilder() // prettier
    .addComponents(
     new ButtonBuilder() // prettier
      .setLabel("Contact")
      .setStyle(ButtonStyle.Link)
      .setURL(`${client.config.url}/contact`),
     new ButtonBuilder() // prettier
      .setLabel("Commands")
      .setStyle(ButtonStyle.Link)
      .setURL(`${client.config.url}/commands`),
     new ButtonBuilder() // prettier
      .setLabel("Support")
      .setStyle(ButtonStyle.Link)
      .setURL(`${client.config.url}/support`)
    );

   const embed = new EmbedBuilder()
    .setDescription(`Click the button below or [click here](${client.config.url}/contact) to contact the dev team.\n\n>>> **Useful links:**\n- [View all commands](${client.config.url}/commands)\n- [Support server](${client.config.url}/support)`)
    .setFooter({
     text: `Requested by ${interaction.member.user.globalName || interaction.member.user.username}`,
     iconURL: interaction.member.user.displayAvatarURL({
      size: 256,
     }),
    })
    .setColor(guildSettings?.embedColor || client.config.defaultColor)
    .setTimestamp()
    .setTitle("📝 Contact");

   return interaction.followUp({ ephemeral: false, embeds: [embed], components: [action] });
  } catch (err) {
   client.errorMessages.internalError(interaction, err);
  }
 },
};
