import { AudioFile } from "../AudioFile";

interface IAudioInformation {
  joinedVoiceChannelAudioType: audioType;
  audioFile: AudioFile;
}

interface IUserConstructorParams {
  userId: string;
  audio?: IAudioInformation;
}

interface IUser {
  readonly userId: string;
  readonly audio?: IAudioInformation;
}

type audioType = "file" | "youtube";

export class User implements IUser {
  public readonly userId: string;
  public readonly audio?: IAudioInformation;

  constructor(params: IUserConstructorParams) {
    this.userId = params.userId;
    this.audio = params.audio;
  }
}
