import { UserFactory } from "./UsersFactory";
import { User } from "./User";
// import { AdminUser } from "./AdminUser";
import { AudioFile } from "../AudioFile";
import { injectable } from "inversify";

type PrivateUsers = {
  "272883674842660864": User;
  "351362773407498241": User;
  // debugUser
  // "351377450007003136": User;
};

type PrivateUserId = keyof PrivateUsers;

export interface IUserFactoryCreater {
  create: () => UserFactory<PrivateUsers, PrivateUserId>;
}

@injectable()
export class UserFactoryCreater implements IUserFactoryCreater {
  public create(): UserFactory<PrivateUsers, PrivateUserId> {
    const factory = new UserFactory<PrivateUsers, PrivateUserId>();

    factory.setUser(
      "272883674842660864",
      new User({
        userId: "272883674842660864",
        audio: {
          joinedVoiceChannelAudioType: "file",
          audioFile: new AudioFile({
            fileName: "ksk.mp3",
          }),
        },
      })
    );

    factory.setUser(
      "351362773407498241",
      new User({
        userId: "351362773407498241",
        audio: {
          joinedVoiceChannelAudioType: "file",
          audioFile: new AudioFile({
            fileName: "gmks.mp3",
            volume: 0.5,
          }),
        },
      })
    );

    // factory.setUser(
    //   "351377450007003136",
    //   new User({
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

    return factory;
  }
}
