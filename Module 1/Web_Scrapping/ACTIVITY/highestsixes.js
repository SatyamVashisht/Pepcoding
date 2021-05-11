let link = "https://www.espncricinfo.com/series/ipl-2021-1249214/punjab-kings-vs-delhi-capitals-29th-match-1254086/full-scorecard";

const cheerio = require("cheerio");
const request = require("request");

request(link, cb);

function cb(error, response, data) {
    gethighestsixes(data);
}

let resultbatsmen;
let resultsixes;

function gethighestsixes(data) {
    let mydocument = cheerio.load(data);
    let bothtable = mydocument(".table.batsman");

    for (i = 0; i < bothtable.length; i++) {
        let onetable = mydocument(bothtable[i]);
        let tablerow = onetable.find("tbody tr");
        for (j = 0; j < tablerow.length; j++) {
            let tabledata = mydocument(tablerow[j]).find("td");
            if (tabledata.length > 1) {
                if (i == 0 && j == 0) {
                    resultbatsmen = mydocument(tabledata[0]).text();
                    resultsixes = mydocument(tabledata[5]).text();
                } else {
                    let currentsixes = mydocument(tabledata[5]).text();
                    if (resultsixes < currentsixes) {
                        resultbatsmen = mydocument(tabledata[0]).text();
                        resultsixes = currentsixes;
                    }
                }
            }
        }
    }

    console.log("NAME : " + resultbatsmen);
    console.log("SIXES : " + resultsixes);



}