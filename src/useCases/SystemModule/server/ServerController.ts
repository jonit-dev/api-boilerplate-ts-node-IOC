import * as express from "express";
import { controller, httpGet, interfaces, request, response } from "inversify-express-utils";
import { BotHelper } from "../../../providers/Bot";

@controller("/")
export class ServerController implements interfaces.Controller {
  constructor(private botHelper: BotHelper) {}

  @httpGet("/")
  private index(
    @request() req: express.Request,
    @response() res: express.Response
  ): express.Response<any, Record<string, any>> {
    return res.status(200).send({
      message: this.botHelper.sayHello(),
    });
  }
}
