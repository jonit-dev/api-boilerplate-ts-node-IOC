import * as express from "express";
import { controller, httpGet, interfaces, request, response } from "inversify-express-utils";

@controller("/")
export class ServerController implements interfaces.Controller {
  constructor() {}

  @httpGet("/")
  private index(@request() req: express.Request, @response() res: express.Response) {
    return res.status(200).send({
      message: "Hello World!",
    });
  }
}
