// routes/goods.js 라우트 생성
const express = require('express');
const router = express.Router();
const Goods = require("../schemas/goods");
const Cart = require("../schemas/cart");

router.get('/',(req,res)=>{
  return res.send('체크체크')
})

router.post("/goods", async (req, res) => {
	const { goodsId, name, thumbnailUrl, category, price } = req.body;

  const goods = await Goods.find({ goodsId });
  if (goods.length) {
    return res.status(400).json({ success: false, errorMessage: "이미 있는 데이터입니다." });
  }

  const createdGoods = await Goods.create({ goodsId, name, thumbnailUrl, category, price });

  res.json({ goods: createdGoods });
});

router.post("/goods/:goodsId/cart", async (req, res) => {
  const {goodsId} = req.params;
  const { quantity } = req.body;
  const existsCarts  = await Cart.find({ goodsId:Number(goodsId) });
  if (existsCarts.length) {
    return res.json({ success: false, errorMessage: "이미 장바구니에 존재하는 상품입니다." });
  }
  await Cart.create({ goodsId: Number(goodsId), quantity: quantity });

  res.json({ result: "success" });
});

router.put("/goods/:goodsId/cart", async (req, res) => {
  const {goodsId} = req.params;
  const { quantity } = req.body;
  const existsCarts  = await Cart.find({ goodsId });
  if (!existsCarts.length) {
    return res.json({ success: false, errorMessage: "장바구니에 존재하지 않는 상품입니다." });
  }
  await Cart.updateOne({ goodsId: Number(goodsId)}, { $set:{quantity} });
  console.log({quantity})
  res.json({ result: true });
});

router.delete("/goods/:goodsId/cart", async (req, res) => {
  const {goodsId} = req.params;
  const existsCarts  = await Cart.find({goodsId});
  if (!existsCarts.length) {
    return res.json({ success: false, errorMessage: "장바구니에 존재하지 않는 상품입니다." });
  }
  await Cart.deleteOne({ goodsId});
console.log(typeof goodsId)
  res.json({ result: "success" });
});

module.exports = router;