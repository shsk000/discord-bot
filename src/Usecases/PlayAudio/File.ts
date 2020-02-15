import { createReadStream } from "fs";
import { VoiceConnection } from "discord.js";
import { injectable } from "inversify";
import { AudioFile } from "../../Entities/AudioFile";

export interface IPlayAudioFileUsecase {
  play: (connection: VoiceConnection, audio: AudioFile) => void;
}

@injectable()
export class PlayAudioFileUsecase implements IPlayAudioFileUsecase {
  public play(connection: VoiceConnection, audio: AudioFile) {
    if (!audio.isExistFile()) return;

    const stream = createReadStream(audio.getFileFullPath(), {
      autoClose: true
    });

    const dispatcher = connection.playStream(stream, {
      volume: audio.getVolume()
    });

    dispatcher.on("end", () => {
      stream.destroy();
      connection.disconnect();
    });
  }
}
