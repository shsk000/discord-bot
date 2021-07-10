import "reflect-metadata";
import { Container } from "inversify";

// entity
import DiscordMessage, { IDiscordMessage } from "../Entities/DiscordMessage";
import {
  UserFactoryCreater,
  IUserFactoryCreater,
} from "../Entities/PrivateUsers/UserFactoryCreater";

// service
import CustomSearch, { ICustomSearch } from "../Services/CustomSearch";

// usecase
import {
  SearchImagesUsecase,
  ISearchImagesUsecase,
} from "../Usecases/SearchImages";
import {
  MessageParseUsecase,
  IMessageParseUsecase,
} from "../Usecases/MessageParse";
import {
  IPlayAudioFileUsecase,
  PlayAudioFileUsecase,
} from "../Usecases/PlayAudio/File";

// repository
import GoogleCustomSearch, {
  IGoogleCustomSearch,
} from "../Repositories/GoogleCustomSearch";

const myContainer = new Container();

// bind entity
myContainer.bind<IDiscordMessage>("IDiscordMessage").to(DiscordMessage);
myContainer
  .bind<IUserFactoryCreater>("IUserFactoryCreater")
  .to(UserFactoryCreater);

// bind service
myContainer.bind<ICustomSearch>("ICustomSearch").to(CustomSearch);

// bind usecase
myContainer
  .bind<ISearchImagesUsecase>("ISearchImagesUsecase")
  .to(SearchImagesUsecase);
myContainer
  .bind<IMessageParseUsecase>("IMessageParseUsecase")
  .to(MessageParseUsecase);
myContainer
  .bind<IPlayAudioFileUsecase>("IPlayAudioFileUsecase")
  .to(PlayAudioFileUsecase);

// bind repository
myContainer
  .bind<IGoogleCustomSearch>("IGoogleCustomSearch")
  .to(GoogleCustomSearch);

export default myContainer;
