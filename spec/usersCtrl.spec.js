/* eslint-disable no-undef */
const users = require(".././controllers/users");

describe("user controller", () => {
  it("should return true for all the functions: create-user, delete user, get user by id", () => {
    expect(users.createUser).toBeTruthy();
    expect(users.getUser).toBeTruthy();
    expect(users.deleteUser).toBeTruthy();
  });
});
