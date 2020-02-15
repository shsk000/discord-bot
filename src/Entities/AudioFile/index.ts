import { statSync } from "fs";
import { join } from "path";

interface IAudioFile {
  isExistFile(): boolean;
}

interface IAudioFileConstructorParams {
  fileName: string;
}

const rootDataFilePath = join(__dirname, "../../../src/data");

export class AudioFile implements IAudioFile {
  private fileName: string;

  public constructor(params: IAudioFileConstructorParams) {
    this.fileName = params.fileName;
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
