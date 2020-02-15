import { PrivateUser } from "./PrivateUser";
import { AudioFile } from "../AudioFile";

export const allPrivateUsers = new Map<string, PrivateUser>();

allPrivateUsers.set(
  "272883674842660864",
  new PrivateUser({
    userId: "272883674842660864",
    audio: {
      joinedVoiceChannelAudioType: "file",
      audioFile: new AudioFile({
        fileName: "ksk.mp3"
      })
    }
  })
);

allPrivateUsers.set(
  "351362773407498241",
  new PrivateUser({
    userId: "351362773407498241",
    audio: {
      joinedVoiceChannelAudioType: "file",
      audioFile: new AudioFile({
        fileName: "gmks.mp3",
        volume: 0.5
      })
    }
  })
);

// allPrivateUsers.set(
//   "351377450007003136",
//   new PrivateUser({
//     userId: "351362773407498241",
//     audio: {
//       joinedVoiceChannelAudioType: "file",
//       audioFile: new AudioFile({
//         fileName: "ksk.mp3",
//         volume: 0.5
//       })
//     }
//   })
// );
