import { appEnv } from "@constants/appEnv";
import axios from "axios";
import { createPostMock, readAllPostsMock } from "./PostControllerMocks";

describe("PostController", () => {
  it("fetch available users", async () => {
    const response = await axios.get(`${appEnv.general.apiURL}/posts`);

    const posts = response.data;

    expect(posts).toStrictEqual(readAllPostsMock);
  });

  it("should properly create a new user", async () => {
    const response = await axios.post(`${appEnv.general.apiURL}/posts`, createPostMock);

    const newPost = response.data;

    expect(newPost).toStrictEqual(createPostMock);
  });
});
