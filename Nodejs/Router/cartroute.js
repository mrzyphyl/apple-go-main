const express = require("express");
const Cart = require("../Model/cartmodel");
const bodyParser = require("body-parser");
const { body, validationResult } = require("express-validator");
const CartRouter = express.Router();
CartRouter.use(bodyParser.json());
CartRouter.route("/");

CartRouter.post(
  "/addcart",
  body("username").isLength({ min: 5 }),
  body("cartItemPrice"),
  body(" cartItemName"),
 async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(errors);
      return res.status(400).json({ errors: errors.array() });
    }
    const { username, cartItemPrice,cartItemName } = req.body;
    const cart =await Cart.findOne({ username,cartItemPrice,cartItemName });
    if (!cart) {

      Cart.create({
        username: req.body.username,
        cartItemPrice: req.body.cartItemPrice,
        cartItemName :req.body.cartItemName

      });
      console.log("added successfuly!");
    }
    else{
        console.log("already added");
    }

    


    
    return res.json({ status: "successful" });
  }
);


CartRouter.get('/getCartData',(req,res)=>{
 
  Cart.find({}).then(function (cart) {
    res.send(cart);
   });
});
module.exports = CartRouter;
