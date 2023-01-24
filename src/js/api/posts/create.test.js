import { createPost } from "./create.js";

const TEST_TITLE = "Hello World";
const TEST_BODY = "This is just a test";
const TEST_MEDIA = "https://test.com/image.jpg";
const TEST_TAGS = ["weekend", "party", "test"];

const responseObject = {
  title: TEST_TITLE,
  body: TEST_BODY,
  tags: TEST_TAGS,
  media: TEST_MEDIA,
  reactions: [],
  comments: [],
  created: "2023-01-24T18:26:42.932Z",
  updated: "2023-01-24T18:26:42.932Z",
  id: 1,
};

const fetchSuccess = jest.fn(() =>
  Promise.resolve({
    json: () => responseObject,
    status: 200,
    statusText: "OK,",
    ok: true,
  })
);

const fetchFailure = jest.fn(() =>
  Promise.resolve({
    status: 400,
    statusText: "invalid request",
    ok: false,
  })
);

describe("createPost", () => {
  beforeEach(() => {
    fetchSuccess.mockClear();
  });

  it("returns a valid item with a valid input", async () => {
    global.fetch = fetchSuccess;
    const response = await createPost(
      TEST_TITLE,
      TEST_BODY,
      TEST_MEDIA,
      TEST_TAGS
    );
    expect(response).toEqual(responseObject);
  });

  it("fetches an API request once", async () => {
    global.fetch = fetchSuccess;
    await createPost(TEST_TITLE, TEST_BODY, TEST_MEDIA, TEST_TAGS);
    expect(global.fetch).toHaveBeenCalledTimes(1);
  });

  it("throws status text as an error", async () => {
    global.fetch = fetchFailure;
    await expect(createPost("invalid input")).rejects.toThrow(
      "invalid request"
    );
  });
});
