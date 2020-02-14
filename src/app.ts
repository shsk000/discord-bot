import { createReadStream } from "fs";
import path from "path";
import Discord, { VoiceChannel } from "discord.js";
// import ytdl from "ytdl-core";

declare const process: {
  env: {
    NODE_ENV: string;
    DISCORD_TOKEN: string;
  };
};

import OnMessage from "./Controller/OnMessage";

const client = new Discord.Client();

client.on("ready", () => {
  // eslint-disable-next-line no-undef
  console.log("ready...");
});

const onMessage = new OnMessage(client);
onMessage.triggerEventListener();

client.on("voiceStateUpdate", async (oldMember, newMember) => {
  if (oldMember.user.bot || newMember.user.bot) return;

  // tyu
  // const targetUserId = "272883674842660864";
  // mo
  // const targetUserId2 = "351362773407498241";

  const channelId = newMember.voiceChannelID;
  // const joinedUserId = oldMember.user.username;
  // if (targetUserId !== joinedUserId) return;

  const channel = client.channels.get(channelId);

  if (!channel) return;
  if (!(channel instanceof VoiceChannel)) return;

  try {
    const connection = await channel.join();

    const filepath = path.join(__dirname, "../src/data/ksk.mp3");
    const stream = createReadStream(filepath, {
      autoClose: true
    });
    const dispatcher = connection.playStream(stream);

    dispatcher.on("end", () => {
      stream.destroy();
      channel.leave();
      connection.disconnect();
    });
  } catch (e) {
    console.log(e);
  }
});

client.login(process.env.DISCORD_TOKEN);
