import { login } from "./login.js";

import storage from "../../../helpers/mockStorage.js";
global.localStorage = storage;

// Test User Credentials
const TEST_EMAIL = "email@noroff.no";
const TEST_PASSWORD = "12345678";
const TOKEN = "random string";
const TEST_PROFILE = {
  name: "user name",
  email: "email",
  banner: "",
  avatar: "",
};

// Mock Fetch responses
const fetchSuccess = jest.fn(() =>
  Promise.resolve({
    json: () =>
      Promise.resolve({
        ...TEST_PROFILE,
        accessToken: TOKEN,
      }),
    status: 200,
    statusText: "Awesome",
    ok: true,
  })
);

const fetchFailure = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.reject(),
    status: 401,
    statusText: "Unauthorized",
    ok: false,
  })
);

describe("login", () => {
  beforeEach(() => {
    localStorage.setItem.mockClear();
    localStorage.getItem.mockClear();
    localStorage.clear;
  });

  // // Unauthorized user, failed login

  it("throws status text as an error", async () => {
    expect(localStorage.getItem("token")).toBeFalsy();
    global.fetch = fetchFailure;
    await expect(login(TEST_EMAIL, TEST_PASSWORD)).rejects.toThrow(
      "Unauthorized"
    );
    expect(localStorage.setItem).not.toHaveBeenCalled();
    expect(localStorage.getItem("token")).toBeFalsy();
  });

  // // Authorized user - Successful Login
  it("saves items in local storage 2 times", async () => {
    global.fetch = fetchSuccess;
    await login(TEST_EMAIL, TEST_PASSWORD);
    expect(localStorage.setItem).toHaveBeenCalledTimes(2);
  });

  it("saves accessToken in localStorage", async () => {
    global.fetch = fetchSuccess;
    await login(TEST_EMAIL, TEST_PASSWORD);
    expect(localStorage.setItem).toHaveBeenNthCalledWith(
      1,
      "token",
      JSON.stringify(TOKEN)
    );
  });

  it("saves user profile in localStorage", async () => {
    global.fetch = fetchSuccess;
    await login(TEST_EMAIL, TEST_PASSWORD);
    expect(localStorage.setItem).toHaveBeenNthCalledWith(
      2,
      "profile",
      JSON.stringify(TEST_PROFILE)
    );
  });
  it("returns user profile", async () => {
    global.fetch = fetchSuccess;
    const profile = await login(TEST_EMAIL, TEST_PASSWORD);
    expect(profile).toEqual(TEST_PROFILE);
  });
});
