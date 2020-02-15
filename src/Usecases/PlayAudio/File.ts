import path from "path";
import { createReadStream } from "fs";
import { VoiceConnection } from "discord.js";
import { injectable } from "inversify";

export interface IPlayAudioFileUsecase {
  play: (connection: VoiceConnection, filePath: string) => void;
}

@injectable()
export class PlayAudioFileUsecase implements IPlayAudioFileUsecase {
  public play(connection: VoiceConnection, filePath: string) {
    const filepath = path.join(__dirname, filePath);
    const stream = createReadStream(filepath, {
      autoClose: true
    });

    const dispatcher = connection.playStream(stream);

    dispatcher.on("end", () => {
      stream.destroy();
      connection.disconnect();
    });
  }
}
