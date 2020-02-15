import { VoiceChannel } from "discord.js";

import { AbstractOnController } from ".";
import { IPlayAudioFileUsecase } from "../Usecases/PlayAudio/File";
import container from "../lib/inversify.config";
import { allPrivateUsers } from "../Entities/PrivateUsers/UsersFactory";

export class OnVoiceStateUpdate extends AbstractOnController {
  public triggerEventListener(): void {
    const playAudioFileUsecase = container.get<IPlayAudioFileUsecase>(
      "IPlayAudioFileUsecase"
    );

    this.client.on("voiceStateUpdate", async (oldMember, newMember) => {
      if (oldMember.user.bot || newMember.user.bot) return;
      if (oldMember.mute || newMember.mute) return;

      const channelId = newMember.voiceChannelID;
      const channel = this.client.channels.get(channelId);

      if (!channel) return;
      if (!(channel instanceof VoiceChannel)) return;

      try {
        const privateUser = allPrivateUsers.get(oldMember.user.id);

        if (!privateUser) return;

        const audio = privateUser.getAudio();

        if (!audio) return;

        const connection = await channel.join();

        if (audio.joinedVoiceChannelAudioType === "file") {
          playAudioFileUsecase.play(connection, audio.audioFile);
        }
      } catch (e) {
        console.log(e);
      }
    });
  }
}
