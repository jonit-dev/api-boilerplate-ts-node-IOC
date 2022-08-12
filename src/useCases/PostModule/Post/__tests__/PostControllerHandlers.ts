import { appEnv } from "@constants/appEnv";
import { rest } from "msw";
import { postsMock } from "./PostControllerMocks";

const getAllPosts = rest.get(`${appEnv.general.apiURL}/posts`, (req, res, ctx) => res(ctx.json(postsMock)));

export const postControllerHandlers = [getAllPosts];
