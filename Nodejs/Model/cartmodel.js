const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const CartSchema = new Schema({
    username:{
        type:String,
        required:true
    },
    cartItemPrice:{
        type:String,
        required:true
    },
    cartItemName:{
        type:String,
        required:true
    }
},{timestamps:true});
const Cart = mongoose.model("Cart",CartSchema);
module.exports = Cart;