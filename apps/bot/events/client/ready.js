import { PresenceUpdateStatus, ActivityType } from "discord.js";
import prismaClient from "@nyxia/database";
import { ObjectId } from "mongodb";

export async function ready(client) {
 const registerTime = performance.now();
 client.debugger("info", "Registering slash commands...");
 client.application.commands
  .set(client.slashCommands)
  .catch((err) => {
   client.debugger("error", err);
  })
  .then((commands) => {
   const percentage = Math.round((commands.size / client.slashCommands.size) * 100);
   client.debugger("ready", `Successfully registered ${commands.size + client.additionalSlashCommands} (${percentage}%) slash commands (with ${client.additionalSlashCommands} subcommands) in ${client.performance(registerTime)}`);
  });

 client.debugger("ready", `Logged in as ${client.user.tag}, ID: ${client.user.id}`);

 if (process.env.TOPGG_API_KEY) {
  const servers = await client.guilds.cache.size;
  const shard = client.ws.shards.first();
  const shardCount = client.ws.shards.size;
  client.debugger("info", `Posting stats to top.gg (${servers} servers, shard ${shard.id + 1}/${shardCount})`);

  const req = await fetch(`https://top.gg/api/bots/${client.user.id}/stats`, {
   method: "POST",
   headers: {
    Authorization: process.env.TOPGG_API_KEY,
    "Content-Type": "application/json",
   },
   body: JSON.stringify({
    server_count: servers,
    shard_id: shard.id,
    shard_count: shardCount,
   }),
  });

  if (req.status === 200) {
   client.debugger("info", "Successfully posted stats to top.gg!");
  } else {
   client.debugger("error", "Failed to post stats to top.gg!");
  }
 }

 client.user.setActivity(client.config.presence.activity.type === ActivityType.Custom ? client.config.presence.activity.state : client.config.presence.activity.name, {
  type: client.config.presence.activity.type,
 });

 client.user.setStatus(client.config.presence.status ?? PresenceUpdateStatus.Online);



 async function countUsers() {
    try {
        const guilds = await client.guilds.fetch();
        let users = 0;
        
        if (guilds) {
            for (const guild of guilds.values()) {
                // Fetch full guild details and await the promise
                const fullGuild = await guild.fetch();
                const memberCount = fullGuild.memberCount;

                // Ensure memberCount is a number before adding
                if (typeof memberCount === 'number') {
                    users += memberCount;
                } else {
                    users += parseInt(memberCount)
                }
            }
            return users;
        } else {
            console.log("Guilds was undefined");
            return null;
        }

    } catch (e) {
       console.error('error', e);
       return null;
    }
}


    const userCount = await countUsers()

    await prismaClient.botData.upsert({
        where: {
            tag: "tag", ID: new ObjectId().toString(),
            ID: new ObjectId().toString()
        },
        update: {
            users: userCount
        },
        create: {
            ID: new ObjectId().toString(),
            users: userCount
        }
    });

}
