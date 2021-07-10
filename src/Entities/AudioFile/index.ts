import { statSync } from "fs";
import { join } from "path";

interface IAudioFile {
  isExistFile(): boolean;
  getFileFullPath(): string;
  getVolume(): number;
}

interface IAudioFileConstructorParams {
  fileName: string;
  volume?: number;
}

const rootDataFilePath = join(__dirname, "../../../src/data");

export class AudioFile implements IAudioFile {
  private fileName: string;
  private volume = 1;

  public constructor(params: IAudioFileConstructorParams) {
    this.fileName = params.fileName;

    if (params.volume) {
      this.volume = params.volume;
    }
  }

  public getVolume(): number {
    return this.volume;
  }

  public getFileFullPath(): string {
    return rootDataFilePath + "/" + this.fileName;
  }

  public isExistFile(): boolean {
    try {
      statSync(this.getFileFullPath());
      return true;
    } catch (e) {
      if (e.code === "ENOENT") return false;
    }

    return false;
  }
}
