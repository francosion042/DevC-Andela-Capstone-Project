/* eslint-disable no-undef */
const gifs = require("../controllers/gifs");

describe("Gifs controller files", () => {
  it("should return true for all the functions: createGif, updateGif, deleteGif, getGifById", () => {
    expect(gifs.postGif).toBeTruthy();

    expect(gifs.getGifById).toBeTruthy();

    expect(gifs.updateGif).toBeTruthy();

    expect(gifs.deleteGif).toBeTruthy();
  });
});
