// here after commenting i also have included one more page of /work so the comments are not updated if you want a better hold of how EJS worked check to-do-list-understanding-module in this folder //

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

//here we are requiring our date module remember that this date varible does not contain a single funtion or value it's an object which can contain as many as function so we can use them later 

const date = require(__dirname + '/date.js');
// console.log(date);
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

// here we telling the server that this public folder will serve as the home of all the static files 
app.use(express.static("public"));


mongoose.connect("mongodb+srv://<username>:<password>@cluster0.kti3adf.mongodb.net/todoListDB");
const itemSchema = {
    name: String
};
const Item = mongoose.model("Item", itemSchema);
const WorkItem = mongoose.model("WorkItem" , itemSchema);

const item1 = new Item({
    name:"Welcome to To-Do List"
});
const item2 = new Item({
    name:"Hit '+' plus to add a new Item"
});
const item3 = new Item({
    name:"<-- Check this to delete a item"
});
const defaultItem = [item1 , item2 , item3];
async function defaultdataInserter(coll)
{
    try{
       await coll.insertMany(defaultItem);
       console.log("Default Item inserted");
    }
    catch(err)
    {
      console.log(err);
    }

}
async function dataInserter(newItem )
{
    try{
       const itemnew = new Item({
        name :newItem
       })
       await itemnew.save();
       console.log("New Item inserted");
    }
    catch(err)
    {
      console.log(err);
    }

}
async function dataDeleter(itemid)
{
    try{
      await Item.findByIdAndDelete(itemid);
      console.log("data deleted succesfully");
    }
    catch(err){
    console.log(err);
    }
}
async function dataDeleter2(itemid)
{
    try{
      let product = await WorkItem.exists({_id: itemid}); 
    //   console.log(product);
      await WorkItem.findByIdAndDelete(itemid);
      console.log("data deleted succesfully");
      return product;
    }
    catch(err){
    console.log(err);
    }
}
async function dataFinder(route  , res , day , coll){
    try{
       const dataitems = await coll.find();
       if(dataitems.length==0)
       {
        defaultdataInserter(coll);
        res.redirect(route);
       }
    //    console.log(data);
       res.render("list", { ListTittle: day, ListItems: dataitems });
    }
    catch(err)
    {
        console.log(err);
    }
}
app.get("/", function (req, res) {
    var day = date.getDate();  
    dataFinder("/" , res , day , Item);
});
app.get("/work", function (req, res) {
    var day = "Work List";
    dataFinder("/work" , res , day , WorkItem);
})
app.get("/about", function (req, res) {
    res.render("about");
})
app.post("/delete" , function(req , res){
    // console.log(req.body); 
    const deleteItem = req.body.checkbox;
    runi();
    async function runi()
    {
    let product =  await dataDeleter2(deleteItem);
    if(product != null)
    {
      res.redirect("/work");
    }
    else
    {
        dataDeleter(deleteItem);
        res.redirect("/");
    }
    }
})
app.post("/", function (req, res) {
    newItemInTheList = req.body.newItem;
    //here we are just checking from which list post req is coming--- all the requset come to "/" home page but we have dynammicaly given the button it's value so by value we are deciding in which array we have to add new item and which page to render 
    if (req.body.list === "gotowork") {
        res.redirect("/work");
    }
    else if (req.body.list === "gotohome") {
        res.redirect("/");

    }
    else if (req.body.list === "Work") {
        runnN();
        async function runnN(){
        try{
            const itt = new WorkItem({
             name :newItemInTheList
            })
            await itt.save();
            console.log("New Item inserted");
         }
         catch(err)
         {
           console.log(err);
         }
        }
        res.redirect("/work");
    }
    else {
        dataInserter(newItemInTheList )
        // items.push(newItemInTheList);
        res.redirect("/");
    }
});
app.listen(3000, function () {
    console.log("Our App is listning at port 3000");
})
