const index = (req, res) => {
  res.status(200).json({
    Title:
      "Teamwork - A capstone project of the developer cycles training with andela",
    Routes: [
      {
        userRoutes: ["/api/vi/auth/create-user", "/api/v1/auth/users/:id"],
        articleRoutes: [
          "/api/v1/articles",
          "/api/v1/articles/:id",
          "/api/v1/articles/:id/comments"
        ],
        gifsRoutes: [
          "/api/v1/gifs",
          "/api/v1/gifs/:id",
          "/api/v1/gifs/:id/comments"
        ]
      }
    ]
  });
};

module.exports = index;
