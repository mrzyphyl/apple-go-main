const express = require("express");
const BodyParser = require("body-parser");
const {connection} = require("./Database/mongoData");
const User = require("./Model/mongooseDb");
const cors = require("cors");
const ReactRouter = require("./Router/route");

const CartRouter = require("./Router/cartroute");
const Cart = require("./Model/cartmodel");
const app = express();
const port = 8000;
app.use(BodyParser.json());
app.use(cors());
app.use("/data",ReactRouter);
app.use("/cart",CartRouter);
app.get('/',(req,res)=>{
    res.send("Welcome to server");
});

app.listen(port,()=>{
    console.log(`Server is running successfully on ${port}`);
})
///CartRouter.get('/getCartData', async (req, res) => {
  ///const { username } = req.user; // Assuming user identity is available through authentication

 // try {
   // const cart = await Cart.find({ username });
  //  res.json(cart);
 // } catch (error) {
//console.error("Error fetching cart data:", error);
   // res.status(500).json({ error: "Internal server error" });
 // }
//});
