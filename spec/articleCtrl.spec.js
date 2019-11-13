/* eslint-disable no-undef */
const article = require(".././controllers/articles");

describe("article", () => {
  it("should contain routes that create article, update article, delete article, get a specific article", () => {
    expect(article.postArticle).toBeTruthy();

    expect(article.updateArticle).toBeTruthy();

    expect(article.deleteArticle).toBeTruthy();

    expect(article.getArticleById).toBeTruthy();
  });
});
