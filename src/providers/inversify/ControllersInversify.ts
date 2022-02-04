import { PostController } from "@useCases/PostModule/Post/PostController";
import { interfaces } from "inversify";
import { ContainerModule } from "inversify/lib/container/container_module";
import { ServerController } from "../../useCases/SystemModule/server/ServerController";

export const controllersContainer = new ContainerModule((bind: interfaces.Bind, unbind: interfaces.Unbind) => {
  bind<ServerController>(ServerController).toSelf();
  bind<PostController>(PostController).toSelf();
});
