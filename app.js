const express = require("express");
const bodyParser = require("body-parser");
const date = require("./date.js");
const mongoose = require("mongoose");
const app = express();
const _ = require("lodash");
app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({
  extended: true
}));
//mongoose and mongodb code
mongoose.connect("mongodb://localhost:27017/todolistDB", {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useFindAndModify: false
});
const itemsSchema = mongoose.Schema({
  name: String
});


const Item = mongoose.model("Item", itemsSchema);

const listSchema = mongoose.Schema({
  name: String,
  lists: [itemsSchema]
});
const List = mongoose.model("List", listSchema);
const item1 = new Item({
  name: "Welcome to your to do list"
});
const item2 = new Item({
  name: "Hit the + button to add items"
});
const item3 = new Item({
  name: "<--- Hit this to delete an item"
});
const defaultItems = [item1, item2, item3];

app.use(express.static("public"));
app.get("/", function(req, res) {

  Item.find({}, function(err, items) {
    if (items.length == 0) {
      Item.insertMany(defaultItems, function(err) {
        if (err) console.log(err);
        console.log("Successfully Inserted defaultItems in the DB");
      });
      res.redirect("/");
    } else {
          const day = date.getDate();
          res.render('lists', {
            listTitle: day,
            addItems: items,
          });
        }

      });

    });



app.get("/:newlist", function(req, res) {
  const customListName = _.capitalize(req.params.newlist);

  List.findOne({
    name: customListName
  }, function(err, foundList) {
    if (!err) {
      if (!foundList) {
        const list = new List({
          name: customListName,
          lists: defaultItems
        });
        list.save();
        res.redirect("/" + customListName);
      } else {
        res.render('lists', {
          listTitle: foundList.name,
          addItems: foundList.lists,
        });
      }
    }
  });
});
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
app.post("/", function(req, res) {
  let itemName = req.body.newitem;
  let listName = req.body.list;
  console.log(listName.split(',')[0]);
  let listIdentifier = listName.split(',')[0];
  const newItem = new Item({
    name: itemName
  });

  if (days.includes(listIdentifier)) {
    newItem.save();
    res.redirect("/");
  } else {
    List.findOne({
      name: listName
    }, function(err, foundList) {
      if (!err) {
        foundList.lists.push(newItem);
        foundList.save();
        res.redirect("/" + listName);
      }
    });
  }

});

app.post("/delete", function(req, res) {
  let id = req.body.checkboxId;
  let listName = req.body.listName;
  let listIdentifier = listName.split(',')[0];
  if (days.includes(listIdentifier)) {
    Item.findByIdAndRemove(id, function(err) {
      if (!err) {
        console.log("Successfully deleted checked items");
      }
    });
    res.redirect("/");
  }
  else{
    List.findOneAndUpdate({name: listName},{$pull:{lists:{_id: id}}},function(err,foundList)
  {
    if(!err)
    {
      res.redirect("/" + listName);
    }
  });
  }

});
app.listen(process.env.PORT || 3000, function(req, res) {
  console.log("Server is running on port 3000");
})
