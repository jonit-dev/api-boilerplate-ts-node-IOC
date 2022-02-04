import { Database } from "@providers/database/Database";
import { mongooseQueryParserMiddleware } from "@providers/middlewares/MongoseQueryParserMiddleware";
import { Request, Response } from "express";
import {
  controller,
  httpDelete,
  httpGet,
  httpPatch,
  interfaces,
  request,
  requestBody,
  requestParam,
  response,
} from "inversify-express-utils";
import { IPost } from "types/PostTypes";

@controller("/posts")
export class PostController implements interfaces.Controller {
  constructor(private database: Database) {}

  @httpGet("/", mongooseQueryParserMiddleware)
  private async readAll(@request() req: Request, @response() res: Response): Promise<IPost[]> {
    console.log("all posts");

    return await this.database.readAll("posts", req.query);
  }

  @httpGet("/:id")
  private async readOne(
    @request() req: Request,
    @response() res: Response,
    @requestParam("id") postId
  ): Promise<IPost[]> {
    return await this.database.readOne("posts", { id: Number(postId) });
  }

  @httpPatch("/:id")
  private async updateOne(
    @request() req: Request,
    @response() res: Response,
    @requestParam("id") postId,
    @requestBody() updatedPost: IPost
  ): Promise<IPost[]> {
    return await this.database.updateOne("posts", postId, updatedPost);
  }

  @httpDelete("/:id")
  private async deleteOne(
    @request() req: Request,
    @response() res: Response,
    @requestParam("id") postId
  ): Promise<void> {
    return await this.database.deleteOne("posts", postId);
  }
}
