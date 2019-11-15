/* eslint-disable no-undef */
const gifs = require("../controllers/gifs");

describe("Gifs controller files", () => {
  it("should return true for the functions: createGif", () => {
    expect(gifs.postGif).toBeTruthy();
  });

  it("should return true for the functions: getGifById", () => {
    expect(gifs.getGifById).toBeTruthy();
  });

  it("should return true for the functions: updateGif", () => {
    expect(gifs.updateGif).toBeTruthy();
  });

  it("should return true for the functions: deleteGif", () => {
    expect(gifs.deleteGif).toBeTruthy();
  });
});
