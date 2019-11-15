/* eslint-disable no-undef */
const users = require(".././controllers/users");

describe("user controller", () => {
  it("should return true for the functions: create-user,", () => {
    expect(users.createUser).toBeTruthy();
  });

  it("Should return true for the functions: get user by id", () => {
    expect(users.getUser).toBeTruthy();
  });

  it("should return true for the functions: delete user", () => {
    expect(users.deleteUser).toBeTruthy();
  });
});
