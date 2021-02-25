const { Item } = require("../database/models/itemModel.js");
const date = require("../../date.js");
const item1 = new Item({
  name:"Welcome to your to do list"
});
const item2 = new Item({
  name:"Hit + to add items"
});
const item3 = new Item({
  name:"<--- Hit here to delete the item"
});
const defaultItems =[item1,item2,item3];
module.exports = (res) => {
  Item.find({}, function (err, items) {
    if(err)console.log(err);
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
