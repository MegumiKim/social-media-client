import { logout } from "./logout.js";
import storage from "../../../helpers/mockStorage.js";

global.localStorage = storage;

// Fake user data
const accessToken = "random string";
const profile = {
  name: "user name",
  email: "email",
  banner: "",
  avatar: "",
};

// Save fake user data in mock storage
localStorage.setItem("token", accessToken);
localStorage.setItem("profile", profile);

describe("logout", () => {
  it("removes the access token and profile data from local storage", () => {
    localStorage.getItem("token", accessToken);
    localStorage.getItem("profile", profile);

    logout();

    expect(localStorage.removeItem).toHaveBeenCalledTimes(2);
    expect(localStorage.getItem("token")).toBeFalsy();
    expect(localStorage.getItem("profile")).toBeFalsy();
  });
});
