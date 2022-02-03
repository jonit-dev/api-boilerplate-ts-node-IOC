import { provide } from "inversify-binding-decorators";

@provide(BotHelper)
export class BotHelper {
  public sayHello(): string {
    return "hello";
  }
}
