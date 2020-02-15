import "reflect-metadata";
import { Container } from "inversify";

// entity
import DiscordMessage, { IDiscordMessage } from "../Entities/DiscordMessage";

// service
import CustomSearch, { ICustomSearch } from "../Services/CustomSearch";

// usecase
import { SearchImages, ISearchImages } from "../Usecases/SearchImages";
import { MessageParse, IMessageParse } from "../Usecases/MessageParse";
import { IPlayAudioFile, PlayAudioFile } from "../Usecases/PlayAudio/file";

// repository
import GoogleCustomSearch, {
  IGoogleCustomSearch
} from "../Repositories/GoogleCustomSearch";

const myContainer = new Container();

// bind entity
myContainer.bind<IDiscordMessage>("IDiscordMessage").to(DiscordMessage);

// bind service
myContainer.bind<ICustomSearch>("ICustomSearch").to(CustomSearch);

// bind usecase
myContainer.bind<ISearchImages>("ISearchImages").to(SearchImages);
myContainer.bind<IMessageParse>("IMessageParse").to(MessageParse);
myContainer.bind<IPlayAudioFile>("IPlayAudioFile").to(PlayAudioFile);

// bind repository
myContainer
  .bind<IGoogleCustomSearch>("IGoogleCustomSearch")
  .to(GoogleCustomSearch);

export default myContainer;
