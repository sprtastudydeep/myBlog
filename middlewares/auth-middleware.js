// middlewares/auth-middleware.js

const jwt = require("jsonwebtoken");
const { User } = require("../models");

module.exports = (req, res, next) => {
  // const { authorization } = req.headers;
  const authorization = req.headers.cookie;
  const [authType, authToken] = (authorization || "").split("=");

  if (!authToken || authType !== "Bearer") {
    return res.status(401).send({
      errorMessage: "로그인 후 이용 가능한 기능입니다.",
    });
  }

  try {
    const { userId } = jwt.verify(authToken, "boardkey");
    User.findByPk(userId).then((user) => {
      res.locals.user = user.dataValues;
      next();
    });
  } catch (err) {
    res.status(401).send({
      errorMessage: "NONE_LOGIN",
    });
  }
};