import { appEnv } from "@constants/appEnv";
import axios from "axios";
import { postsMock } from "./PostControllerMocks";

describe("PostController", () => {
  it("fetch available users", async () => {
    const response = await axios.get(`${appEnv.general.apiURL}/posts`);

    const posts = response.data;

    expect(posts).toStrictEqual(postsMock);
  });
});
