// here after commenting i also have included one more page of /work so the comments are not updated if you want a better hold of how EJS worked check to-do-list-understanding-module in this folder //


//requring all  the pacakges we need to make a server work
const express = require('express');
const bodyParser = require('body-parser');


//here we are requiring our date module remember that this date varible does not contain a single funtion or value it's an object which can contain as many as function so we can use them later 


const date = require(__dirname+'/date.js');
// console.log(date);
const app = express();
app.use(bodyParser.urlencoded({extended : true}));
app.set("view engine" , "ejs");

// here we telling the server that this public folder will serve as the home of all the static files 
app.use(express.static("public")); 
//here we have declared a global variable array of name items so we can send it in the get request of the we can send it in get request of the we browser
var items = [];
var WorkItems = [];

//we are responding to the get request coming from the browser
app.get("/" , function(req , res){
    //here we created the java script object for telling in what format we want the date 
    // var options = {
    //     weekday : "long" , 
    //     day : "numeric" ,
    //     month : "long"
    // };
    // var today = new Date();
      
    //now accesing Date (today) and telling it langauge and format 
    // var day = today.toLocaleDateString("hi-IN" , options); 





    //    here we have made a module ourself named date and in that module we have wrote a function name getDate and we requred that module ( see in top ) and used it's getDate function 

       var day = date.getDate();

    //rendering the things i want to send in the get request 
    //we are sending the empty array here name item because we cant send it again and again in after every post request the itmes array will update and the updated items array will be gone in the browser
    res.render("list"  , {ListTittle : day ,  ListItems : items});
    
});
app.get("/work" , function(req , res){
    res.render("list" , {ListTittle : "Work List" , ListItems : WorkItems});
})
app.get("/about" , function(req , res){
    res.render("about");
})

app.post("/" ,  function(req , res ){
    newItemInTheList = req.body.newItem;

    //here we are just checking from which list post req is coming--- all the requset come to / home page but we have dynammicaly given the button it's value so by value we are deciding in which array we have to add new item and which page to render 
    if(req.body.list === "gotowork")
    {
        res.redirect("/work");
    }
   else if(req.body.list === "gotohome")
    {
        res.redirect("/");
    }
   else if(req.body.list === "Work")
    {
        WorkItems.push(newItemInTheList);
        res.redirect("/work");
    }
    else{
        items.push(newItemInTheList);
        res.redirect("/");
    }   
});
app.listen( 3000 , function(){
    console.log("Our App is listning at port 3000");
})