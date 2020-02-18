import { VoiceChannel } from "discord.js";

import { AbstractOnController } from ".";
import { IPlayAudioFileUsecase } from "../Usecases/PlayAudio/File";
import container from "../lib/inversify.config";
import { IUserFactoryCreater } from "../Entities/PrivateUsers/UserFactoryCreater";

export class OnVoiceStateUpdate extends AbstractOnController {
  public triggerEventListener(): void {
    const playAudioFileUsecase = container.get<IPlayAudioFileUsecase>(
      "IPlayAudioFileUsecase"
    );

    const UserFactoryCreater = container.get<IUserFactoryCreater>(
      "IUserFactoryCreater"
    );
    const factory = UserFactoryCreater.create();

    this.client.on("voiceStateUpdate", async (oldMember, newMember) => {
      if (oldMember.user.bot || newMember.user.bot) return;
      if (oldMember.mute || newMember.mute) return;

      const channelId = newMember.voiceChannelID;
      const channel = this.client.channels.get(channelId);

      if (!channel) return;
      if (!(channel instanceof VoiceChannel)) return;

      try {
        const privateUser = factory.getUser(oldMember.user.id);

        if (!privateUser) return;

        const audio = privateUser.audio;

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
