const Key = require("../config/secretKey");
const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  // const { authorization } = req.headers;
  const cookie = req.headers.cookie;

  console.log(cookie)

  if (cookie) {
    return res.status(401).send({
      errorMessage: "이미 로그인 되어 있습니다.",
    });
  } 
  next();
};
