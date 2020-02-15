import { VoiceChannel } from "discord.js";

import { AbstractOnController } from ".";
import { IPlayAudioFile } from "../Usecases/PlayAudio/file";
import container from "../lib/inversify.config";

export class OnVoiceStateUpdate extends AbstractOnController {
  public triggerEventListener(): void {
    const playAudioFile = container.get<IPlayAudioFile>("IPlayAudioFile");

    this.client.on("voiceStateUpdate", async (oldMember, newMember) => {
      if (oldMember.user.bot || newMember.user.bot) return;
      if (oldMember.mute || newMember.mute) return;

      const channelId = newMember.voiceChannelID;
      const channel = this.client.channels.get(channelId);

      if (!channel) return;
      if (!(channel instanceof VoiceChannel)) return;

      try {
        const connection = await channel.join();
        const filePath = "../src/data/ksk.mp3";

        playAudioFile.play(connection, filePath);
      } catch (e) {
        console.log(e);
      }
    });
  }
}
