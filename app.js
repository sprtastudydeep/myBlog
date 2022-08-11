const express = require('express');
const cors = require('cors');
const app = express();
const port = 8080;

app.use(express.json());
app.use(cors());
//https://test-cors.org


// http://localhost:8080/
app.get('/', (req, res) => {
  res.send('Hello World!');
});

const indexRouter = require("./routes");
app.use("/api", [indexRouter]);

app.listen(port, () => {
  console.log(port, '/api로 진행해주세요');
});   