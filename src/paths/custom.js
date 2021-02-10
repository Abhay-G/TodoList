const _ = require("lodash");
const List = require("../database/models/ListModel.js");
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
