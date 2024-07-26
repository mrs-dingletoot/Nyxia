import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { globalConfig, botConfig, debuggerConfig, dashboardConfig, globalPermissions } from "@nyxia/config";
import { createErrorEmbed } from "@nyxia/util/embeds";
import { Logger, chalk } from "@nyxia/util/functions/util";
import { Client, GatewayIntentBits } from "discord.js";
import giveaway from "./util/giveaway/core.js";
import loadCommands from "./util/loaders/loadCommands.js";
import loadEmojis from "./util/loaders/loadEmojis.js";
import loadEvents from "./util/loaders/loadEvents.js";
import loadFonts from "./util/loaders/loadFonts.js";
import loadModals from "./util/loaders/loadModals.js";
import syncCommands from "./util/loaders/syncCommands.js";

const cwd = dirname(fileURLToPath(import.meta.url));
Logger("info", `Current working directory: ${cwd}`);
process.chdir(cwd);

Logger("info", "Starting Nyxia");

const client = new Client({
 intents: [
  // Prettier
  GatewayIntentBits.Guilds,
  GatewayIntentBits.GuildModeration,
  GatewayIntentBits.GuildMembers,
  GatewayIntentBits.GuildMessages,
  GatewayIntentBits.GuildEmojisAndStickers,
  GatewayIntentBits.GuildMessageReactions,
 ],
});

client.config = {
 ...botConfig,
 ...globalPermissions,
 ...globalConfig,
 ...debuggerConfig,
 ...dashboardConfig,
};


client.giveawaysManager = giveaway(client);

client.errorMessages = {
 internalError: (interaction, error) => {
  Logger("error", error?.toString() ?? "Unknown error occured");
  const embed = createErrorEmbed("An error occured while executing this command. Please try again later.", "Unknown error occured");
  return interaction.followUp({ embeds: [embed], ephemeral: true });
 },
 createSlashError: (interaction, description, title) => {
  const embed = createErrorEmbed(description, title);
  embed.setFooter({
   text: `Requested by ${interaction.member.user.globalName || interaction.member.user.username}`,
   iconURL: interaction.member.user.displayAvatarURL({ dynamic: true }),
  });

  return interaction.followUp({ embeds: [embed], ephemeral: true });
 },
};

client.debugger = Logger;

client.performance = (time) => {
 const run = Math.floor(performance.now() - time);
 return run > 500 ? chalk.underline.red(`${run}ms`) : chalk.underline(`${run}ms`);
};


try {
    await loadCommands(client);
} catch (error) {
    console.error("Error loading commands:", error);
    process.exit(1)
}

try {
    await loadModals(client);
} catch (error) {
    console.error("Error loading modals:", error);
}

try {
    await loadFonts(client);
} catch (error) {
    console.error("Error loading fonts:", error);
}

try {
    await loadEvents(client);
} catch (error) {
    console.error("Error loading events:", error);

}

try {
    await loadEmojis(client);
} catch (error) {
    console.error("Error loading emojis:", error);
}

try {
    syncCommands();
} catch (error) {
    console.error("Error synchronizing commands:", error);
}

Logger("info", "Logging in...");

process.on("unhandledRejection", (reason) => {
 Logger("error", reason);
});

process.on("uncaughtException", (error) => {
 Logger("error", error);
});

process.on("warning", (warning) => {
 Logger("warn", warning);
});

await client.login(process.env.TOKEN);

export default client;
