import { createReadStream } from "fs";
import { VoiceChannel } from "discord.js";
import { injectable, inject } from "inversify";
import { IUserFactoryCreater } from "../../Entities/PrivateUsers/UserFactoryCreater";

export interface IPlayAudioFileUsecase {
  play: (channel: VoiceChannel, id: string) => Promise<void>;
}

@injectable()
export class PlayAudioFileUsecase implements IPlayAudioFileUsecase {
  private userFactoryCreater: IUserFactoryCreater;

  constructor(
    @inject("IUserFactoryCreater") UserFactoryCreater: IUserFactoryCreater
  ) {
    this.userFactoryCreater = UserFactoryCreater;
  }

  public async play(channel: VoiceChannel, id: string): Promise<void> {
    const factory = this.userFactoryCreater.create();

    const privateUser = factory.getUser(id);

    if (!privateUser) return;

    const audio = privateUser.audio;

    if (!audio || !audio.audioFile.isExistFile()) return;

    const connection = await channel.join();

    const stream = createReadStream(audio.audioFile.getFileFullPath(), {
      autoClose: true,
    });

    const dispatcher = connection.playStream(stream, {
      volume: audio.audioFile.getVolume(),
    });

    dispatcher.on("end", () => {
      stream.destroy();
      connection.disconnect();
    });
  }
}
