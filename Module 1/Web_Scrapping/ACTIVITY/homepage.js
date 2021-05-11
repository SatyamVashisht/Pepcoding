let matchlink = "https://www.espncricinfo.com/series/ipl-2020-21-1210595";


const cheerio = require("cheerio");
const fs = require("fs");
const request = require("request");

const getAllMatches = require("./allMatches");

request(matchlink, function (err, res, data) {
    processData(data);

})

function processData(html) {
    
    let mydocumnet = cheerio.load(html);
    
    let Atag = mydocumnet(".widget-items.cta-link a");
    let allmatcheslink = "https://www.espncricinfo.com" + Atag["0"].attribs.href;
    //console.log(allmatcheslink);
    getAllMatches(allmatcheslink);
}
