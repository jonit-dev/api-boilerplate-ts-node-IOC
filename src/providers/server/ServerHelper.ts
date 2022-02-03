import { provide } from "inversify-binding-decorators";
import { ConsoleHelper } from "./ConsoleHelper";

@provide(ServerHelper)
export class ServerHelper {
  constructor(private consoleHelper: ConsoleHelper) {}

  public showBootstrapMessage(config: { env: string; port: number }): void {
    const { port, env } = config;

    this.consoleHelper.coloredLog(`⚙️  Server running on ${env} mode, listening on port ${port}`, "YELLOW");
  }

  public async sleep(ms): Promise<void> {
    return await new Promise((resolve) => setTimeout(resolve, ms));
  }
}
