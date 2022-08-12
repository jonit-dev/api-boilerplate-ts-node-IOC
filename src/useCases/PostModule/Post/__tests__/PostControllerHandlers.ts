import { appEnv } from "@constants/appEnv";
import { rest } from "msw";
import { createPostMock, readAllPostsMock } from "./PostControllerMocks";

const getAllPosts = rest.get(`${appEnv.general.apiURL}/posts`, (req, res, ctx) => res(ctx.json(readAllPostsMock)));

const createPost = rest.post(`${appEnv.general.apiURL}/posts`, (req, res, ctx) => res(ctx.json(createPostMock)));

export const postControllerHandlers = [getAllPosts, createPost];
