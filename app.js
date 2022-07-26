const express = require('express');
const cors = require('cors');
const connect = require("./schemas");
connect();
const app = express();
const port = 3000;

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