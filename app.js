const express = require('express');
const cors = require('cors');
const app = express();
const port = 8080;

app.use(express.json());
app.use(cors());
//https://test-cors.org

const indexRouter = require("./routes");
app.use("/api", [indexRouter]);

app.listen(port, () => {
  console.log(port, '/api로 진행해주세요');
});   
