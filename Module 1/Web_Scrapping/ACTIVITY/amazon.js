const cheerio = require("cheerio");
const request = require("request");
const fs = require("fs");

let amazonlink = "https://www.amazon.in/";

request ( amazonlink , function ( error , response , data){
    getbestdeals(data);
})

function getbestdeals(data){
    // console.log(data);
    mydocuments = cheerio.load(data);
    AllTags = mydocuments("#nav-xshop");
    // console.log(ATags.length);
    AllAtags = mydocuments(AllTags).find("a");
    DealTag = mydocuments(AllAtags[5]);


    let dealLINK = "https://www.amazon.in/" + DealTag.attr("href");
    getdata(dealLINK);
}

function getdata(dealLINK){
    var options = {
        url : dealLINK ,
        timeout: 10000 
    }
request ( options , function ( error , response , data){
mydocument = cheerio.load(data);
let allitems = mydocument(".DealCard-module__truncate_3E_98PYsAQzbYk0BLscdkC");
console.log(allitems.length);
// fs.writeFileSync("new.html",data);



})  
}
