const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname +"/date.js");

const app = express();
app.set("view engine","ejs");

app.use(bodyParser.urlencoded({extended:true}));

const items = [];
const workItems = [];

app.use(express.static("public"));
app.get("/", function (req,res)
{
  const day = date.getDate();
   res.render('lists',{
     listTitle:day,
     addItems:items
   });
})

app.get("/work",function(req,res)
{
  res.render('lists',{
    listTitle:"Work List",
    addItems:workItems
  })
})

app.post("/", function (req,res)
{

  console.log(req.body);
  if(req.body.chkindex)
  {
    let pos = Number(req.body.chkindex);
    console.log(pos +" --> "+items);
    items.splice(pos, 1);
    res.redirect("/");
  }
  else{
  let newItem = req.body.newitem;
  if(req.body.listButton==="Work")
  {
    workItems.push(newItem);
    res.redirect("/work");
  }
  else{
  items.push(newItem);
  res.redirect("/");
}
}
})
app.listen(process.env.PORT||3000,function(req,res)
{
  console.log("Server is running on port 3000");
})
