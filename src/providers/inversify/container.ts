import { Container } from "inversify";
import { serverControllerContainer } from "./ControllersInversify";

const container = new Container();

container.load(serverControllerContainer);

export { container };
