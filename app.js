const express = require('express');
const cors = require('cors');
const { Op } = require("sequelize");
const { User } = require("./models");
const { Comment } = require("./models");
const { Post } = require("./models");
const { Like } = require("./models");
const app = express();
const port = 8080;

app.use(cors());
//https://test-cors.org

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(port, '/posts로 진행해주세요');
});   

app.use(express.json());


const postsRouter = require("./routes/posts");
const commentRouter = require("./routes/comment");

app.use("/posts", [postsRouter,commentRouter]);