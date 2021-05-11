const request = require("request");
const cheerio = require("cheerio");
const getMAtchDetails = require("./match");


function getAllMatches(AllMatchesLink) {
    request(AllMatchesLink, function (err, res, data) {
        processdata(data);
    })
}
function processdata(html) {
    let mydocumnet = cheerio.load(html);
    allATags = mydocumnet('a[data-hover="Scorecard"]');
    console.log(allATags.length);
    //for(let i=0 ; i<allATags.length ; i++){
        let matchLink =  "https://www.espncricinfo.com" + mydocumnet(allATags[i]).attr("href");
        //console.log(matchLink);
        //getMAtchDetails(matchLink);
    }   
//}
module.exports = getAllMatches;
