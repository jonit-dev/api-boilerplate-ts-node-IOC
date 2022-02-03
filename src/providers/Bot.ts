import { provide } from "inversify-binding-decorators";

@provide(Bot)
export class Bot {
  public sayHello(): void {
    console.log("hello!");
  }
}
