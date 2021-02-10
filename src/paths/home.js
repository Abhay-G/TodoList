const { Item } = require("../database/models/itemModel.js");
const date = require("../../date.js");
module.exports = (res) => {
  Item.find({}, function (err, items) {
    if (items.length == 0) {
      Item.insertMany(defaultItems, function (err) {
        if (err) console.log(err);
        console.log("Successfully Inserted defaultItems in the DB");
      });
      res.redirect("/");
    } else {
      const day = date.getDate();
      res.render("lists", {
        listTitle: day,
        addItems: items,
      });
    }
  });
};
