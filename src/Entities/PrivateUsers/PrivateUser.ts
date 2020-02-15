import { AudioFile } from "../AudioFile";

interface IAudioInformation {
  joinedVoiceChannelAudioType: audioType;
  audioFile: AudioFile;
}

interface IPrivateUserConstructorParams {
  userId: string;
  audio?: IAudioInformation;
}

interface IPrivateUser {
  getUserId: () => string;
  getAudio: () => IAudioInformation | undefined;
}

type audioType = "file" | "youtube";

export class PrivateUser implements IPrivateUser {
  private userId: string;
  private audio?: IAudioInformation;

  constructor(params: IPrivateUserConstructorParams) {
    this.userId = params.userId;
    this.audio = params.audio;
  }

  public getUserId(): string {
    return this.userId;
  }

  public getAudio(): IAudioInformation | undefined {
    return this.audio;
  }
}
