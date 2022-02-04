import { Database } from "@providers/database/Database";
import { Request, Response } from "express";
import { controller, httpGet, interfaces, request, requestParam, response } from "inversify-express-utils";
import { IPost } from "types/PostTypes";

@controller("/posts")
export class PostController implements interfaces.Controller {
  constructor(private database: Database) {}

  @httpGet("/")
  private async readAll(@request() req: Request, @response() res: Response): Promise<IPost[]> {
    return await this.database.readAll("posts");
  }

  @httpGet("/:id")
  private async readOne(
    @request() req: Request,
    @response() res: Response,
    @requestParam("id") postId
  ): Promise<IPost[]> {
    return await this.database.readOne("posts", { id: Number(postId) });
  }
}
