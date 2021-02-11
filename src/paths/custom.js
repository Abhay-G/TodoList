const _ = require("lodash");
const {Item} = require("../database/models/itemModel.js");
const List = require("../database/models/ListModel.js");
const item1 = new Item({
    name: "Welcome to your to do list",
});
const item2 = new Item({
    name: "Hit + to add items",
});
const item3 = new Item({
    name: "<--- Hit here to delete the item",
});
const defaultItems = [item1, item2, item3];
module.exports = (req, res) => {
    const customListName = _.capitalize(req.params.newlist);

    List.findOne(
        {
            name: customListName,
        },
        function (err, foundList) {
            if (!err) {
                if (!foundList) {
                    const list = new List({
                        name: customListName,
                        lists: defaultItems,
                    });
                    list.save();
                    res.redirect("/" + customListName);
                } else {
                    res.render("lists", {
                        listTitle: foundList.name,
                        addItems: foundList.lists,
                    });
                }
            }
        }
    );
};
