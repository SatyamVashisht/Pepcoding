let matchlink = "https://www.espncricinfo.com/series/ipl-2021-1249214/punjab-kings-vs-delhi-capitals-29th-match-1254086/full-scorecard";
const fs = require("fs");
const request = require("request");
const cheerio = require("cheerio");


request(matchlink, cb);
function cb(error, response, data) {
    gethighestwickettaker(data);
    //console.log(data);
}

function gethighestwickettaker(data) {
    let mydocument = cheerio.load(data);
    bothbowlingtable = mydocument(".table.bowler");
    //    console.log(bothbowlingtable);


    let resultbowler;
    let resultwicket;
    let resulteconomy;

    for (i = 0; i < bothbowlingtable.length; i++) {
        let currenttable = mydocument(bothbowlingtable[i]);
        let currentrow = currenttable.find("tbody tr");

        for (j = 0; j < currentrow.length; j++) {
            let alltd = mydocument(currentrow[j]).find("td");
            if (i == 0 && j == 0) {
                resultbowler = mydocument(alltd[0]).find("a").text();
                resulteconomy = mydocument(alltd[5]).text();
                resultwicket = mydocument(alltd[4]).text();
            } else {
                let currentwicket = mydocument(alltd[4]).text();
                let currenteconomy = mydocument(alltd[5]).text();
                if (resultwicket < currentwicket || (resultwicket == currentwicket && currenteconomy < resulteconomy)) {
                    resultbowler = mydocument(alltd[0]).find("a").text();
                    resulteconomy = mydocument(alltd[5]).text();
                    resultwicket = mydocument(alltd[4]).text();


                }



            }







        }


    }

    console.log("NAME : " + resultbowler);
    console.log("WICKETS : " + resultwicket);
    console.log("ECONOMY : " + resulteconomy);












}