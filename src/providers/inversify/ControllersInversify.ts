import { interfaces } from "inversify";
import { ContainerModule } from "inversify/lib/container/container_module";
import { ServerController } from "../../useCases/SystemModule/server/ServerController";

export const serverControllerContainer = new ContainerModule((bind: interfaces.Bind, unbind: interfaces.Unbind) => {
  bind<ServerController>(ServerController).toSelf();
});
