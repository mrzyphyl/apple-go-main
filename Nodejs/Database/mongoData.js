const mongoose = require("mongoose");

const url = "mongodb+srv://walexlim123:Nbv8KnD8dstLAzm5@cluster0.0jfnequ.mongodb.net/?retryWrites=true&w=majority";
const connection = mongoose.connect(url);
connection.then((db)=>{
  console.log("database is connected successfully");
})
.catch((e)=>{
    console.log(e.getmessage());
});
module.exports = {connection};