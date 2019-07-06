import "reflect-metadata";
import { Container } from "inversify";

// entity
import DiscordMessage, { IDiscordMessage } from "../Entities/Message";

// service
import GoogleCustomSearch, {
  IGoogleCustomSearch
} from "../Services/GoogleCustomSearch";

// usecase
import SearchImages, { ISearchImages } from "../Usecases/SearchImages";
import MessageParse, { IMessageParse } from "../Usecases/MessageParse";

const myContainer = new Container();

// bind entity
myContainer.bind<IDiscordMessage>("IDiscordMessage").to(DiscordMessage);

// bind service
myContainer
  .bind<IGoogleCustomSearch>("IGoogleCustomSearch")
  .to(GoogleCustomSearch);

// bind usecase
myContainer.bind<ISearchImages>("ISearchImages").to(SearchImages);
myContainer.bind<IMessageParse>("IMessageParse").to(MessageParse);

export default myContainer;
