import { Database } from "@providers/database/Database";
import { DTOValidatorMiddleware } from "@providers/middlewares/DTOValidatorMiddleware";
import { mongooseQueryParserMiddleware } from "@providers/middlewares/MongoseQueryParserMiddleware";
import { Request, Response } from "express";
import {
  controller,
  httpDelete,
  httpGet,
  httpPatch,
  httpPost,
  interfaces,
  request,
  requestBody,
  requestParam,
  response,
} from "inversify-express-utils";
import { IPost } from "types/PostTypes";
import { CreatePostDTO, UpdatePostDTO } from "./PostDTO";

@controller("/posts")
export class PostController implements interfaces.Controller {
  constructor(private database: Database) {}

  @httpPost("/", DTOValidatorMiddleware(CreatePostDTO))
  private async create(
    @request() req: Request,
    @response() res: Response,
    @requestBody() post: CreatePostDTO
  ): Promise<Response<IPost[]>> {
    const newPost = await this.database.create("posts", post);

    return res.status(201).send(newPost);
  }

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
    return await this.database.readOne("posts", { id: postId });
  }

  @httpPatch("/:id", DTOValidatorMiddleware(UpdatePostDTO))
  private async updateOne(
    @request() req: Request,
    @response() res: Response,
    @requestParam("id") postId,
    @requestBody() updatedPost: UpdatePostDTO
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
