
//module.export dont send a single thing it' an object which can send as many function as we want 


//here we are sending the getDate function 


//remember we are not adding paranthisis after getDate because if we implies paranthisis here it means we want to run the function here but this is not the case we only want to export the function here and in our server (app.js ) when we want the function to be executed we will simply write date.getDate()
module.exports.getDate = getDate ;

function getDate(){
var options = {
    weekday : "long" , 
    day : "numeric" ,
    month : "long"
};
var today = new Date();
var day = today.toLocaleDateString("hi-IN" , options); 
return day ;
}


//here we are also sending our getDate function in our module.export  in case user want's it .
module.exports.getDay = getDay ;
function getDay(){
var options = {
    weekday : "long" , 
};
var today = new Date();
var day = today.toLocaleDateString("hi-IN" , options); 
return day;
}