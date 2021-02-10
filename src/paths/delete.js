const { Item } = require("../database/models/itemModel.js");
const List = require("../database/models/ListModel");
const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
module.exports = (req, res) => {
  let id = req.body.checkboxId;
  let listName = req.body.listName;
  let listIdentifier = listName.split(",")[0];
  if (days.includes(listIdentifier)) {
    Item.findByIdAndRemove(id, function (err) {
      if (!err) {
        console.log("Successfully deleted checked items");
      }
    });
    res.redirect("/");
  } else {
    List.findOneAndUpdate(
      { name: listName },
      { $pull: { lists: { _id: id } } },
      function (err, foundList) {
        if (!err) {
          res.redirect("/" + listName);
        }
      }
    );
  }
};
