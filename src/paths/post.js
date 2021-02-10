const List = require("../database/models/ListModel.js");
const { Item } = require("../database/models/itemModel.js");

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
    let itemName = req.body.newitem;
    let listName = req.body.list;
    console.log(listName.split(",")[0]);
    let listIdentifier = listName.split(",")[0];
    const newItem = new Item({
        name: itemName,
    });

    if (days.includes(listIdentifier)) {
        newItem.save();
        res.redirect("/");
    } else {
        List.findOne(
            {
                name: listName,
            },
            function (err, foundList) {
                if (!err) {
                    foundList.lists.push(newItem);
                    foundList.save();
                    res.redirect("/" + listName);
                }
            }
        );
    }
};
