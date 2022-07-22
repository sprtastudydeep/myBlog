const express = require('express');
const connect = require("./schemas");
connect();
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(port, '포트로 서버가 열렸어요!');
});

app.use(express.json());


const goodsRouter = require("./routes/goods");
const cartsRouter = require("./routes/carts");

app.use("/api", [goodsRouter, cartsRouter]);