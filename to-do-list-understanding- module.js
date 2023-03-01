//requring all  the pacakges we need to make a server work
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.urlencoded({extended : true}));
app.set("view engine" , "ejs");

// here we telling the server that this public folder will serve as the home of all the static files 
app.use(express.static("public")); 
//here we have declared a global variable array of name items so we can send it in the get request of the we can send it in get request of the we browser
var items = [];


//we are responding to the get request coming from the browser
app.get("/" , function(req , res){
    //here we created the java script object for telling in what format we want the date 
    var options = {
        weekday : "long" , 
        day : "numeric" ,
        month : "long"
    };
    var today = new Date();

    //now accesing Date (today) and telling it langauge and format 
    var day = today.toLocaleDateString("hi-IN" , options); 


    //rendering the things i want to send in the get request 
    //we are sending the empty array here name item because we cant send it again and again in after every post request the itmes array will update and the updated items array will be gone in the browser
    res.render("list"  , {ListTittle : day ,  ListItems : items});
    
});



app.post("/" ,  function(req , res ){

    //the new item is coming in the post request 
    newItemInTheList = req.body.newItem;
    //we are updating the item in the items array 
    items.push(newItemInTheList);
    //and reloding the home page so the new array get's lodded 
    res.redirect("/");
});
app.listen( 3000 , function(){
    console.log("Our App is listning at port 3000");
})