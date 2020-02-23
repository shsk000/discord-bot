import { VoiceChannel } from "discord.js";

import { AbstractOnController } from ".";
import { IPlayAudioFileUsecase } from "../Usecases/PlayAudio/File";
import container from "../lib/inversify.config";

export class OnVoiceStateUpdate extends AbstractOnController {
  public triggerEventListener(): void {
    const playAudioFileUsecase = container.get<IPlayAudioFileUsecase>(
      "IPlayAudioFileUsecase"
    );

    this.client.on("voiceStateUpdate", async (oldMember, newMember) => {
      if (oldMember.user.bot || newMember.user.bot) return;
      if (!!oldMember.voiceChannel && !!newMember.voiceChannel) return;

      const channelId = newMember.voiceChannelID;
      const channel = this.client.channels.get(channelId);

      if (!channel) return;
      if (!(channel instanceof VoiceChannel)) return;

      try {
        playAudioFileUsecase.play(channel, oldMember.user.id);
      } catch (e) {
        console.log(e);
      }
    });
  }
}
