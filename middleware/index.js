module.exports = {
  async auth(req, res, next) {
    const aux = req.headers.authorization;
    const [, token] = aux.split(" ");

    if (!token || token === "undefined") {
      res.status(401).json("Token not provided");
    } else {
      next();
    }
  },
};
