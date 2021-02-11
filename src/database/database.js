const mongoose = require("mongoose");
module.exports = function(){ mongoose.connect("mongodb+srv://admin-abhay:Test123@cluster0.qdrkn.mongodb.net/todolistDB", {
   
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useFindAndModify: false
});
}