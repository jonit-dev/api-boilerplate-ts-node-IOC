import { HttpStatus } from "@custom-types/whatever";
import { BotHelper } from "@providers/Bot";
import { apiCache } from "@providers/constants/cacheConstants";
import { Request, Response } from "express";
import { controller, httpGet, interfaces, request, response } from "inversify-express-utils";

@controller("/")
export class ServerController implements interfaces.Controller {
  constructor(private botHelper: BotHelper) {}

  @httpGet("hello")
  private index(@request() req: Request, @response() res: Response): Response<any> {
    return res.status(HttpStatus.OK).send({
      message: this.botHelper.sayHello(),
    });
  }

  @httpGet("cache", apiCache("1 hour"))
  private cachedRoute(@request() req: Request, @response() res: Response): Response<any> {
    return res.status(HttpStatus.OK).send({
      message: "This route is cached",
    });
  }
}
