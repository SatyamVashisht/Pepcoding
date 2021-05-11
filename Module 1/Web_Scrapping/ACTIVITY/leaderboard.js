const fs = require("fs");
const cheerio = require("cheerio");
const request = require("request");

// let leaderboard = [];
let count = 0;

let link = "https://www.espncricinfo.com/series/ipl-2020-21-1210595";

request(link, function (error, response, data) {
    getallmatcheslink(data);
})


function getallmatcheslink(data) {

    let mydocumnet = cheerio.load(data);
    let Atag = mydocumnet(".widget-items.cta-link a");
    let allmatcheslink = "https://www.espncricinfo.com" + Atag["0"].attribs.href;
    // console.log(allmatcheslink);
    getmatcheslink(allmatcheslink);

}


function getmatcheslink(html) {

    request(html, function (error, response, data) {

        mydocument = cheerio.load(data);
        let allATags = mydocument('a[data-hover="Scorecard"]');
        // console.log(allATags.length);
        for (let i = 0; i < allATags.length; i++) {

            let matchlink = "https://www.espncricinfo.com" + mydocument(allATags[i]).attr("href");
            // console.log(matchlink);
            matchdetails(matchlink);
        }

    })

}


function matchdetails(link) {
    count++;
    request(link, function (error, response, data) {
        // console.log(data);
        let mydocument = cheerio.load(data);
        let bothInnings = mydocument(".card.content-block.match-scorecard-table .Collapsible");
        // console.log(bothInnings.length);
        for (i = 0; i < bothInnings.length; i++) {
            let oneinnings = mydocument(bothInnings[i]);
            // console.log(oneinnings.length);
            let teamname = oneinnings.find("h5").text()
            teamname = teamname.split("INNINGS")[0].trim();
            // console.log("hi");
            // console.log(teamname)   ;
            // ##############################################
            let batsmanTable = oneinnings.find(".table.batsman");

            let allTrs = batsmanTable.find("tbody tr");
        
            for (let j = 0; j < allTrs.length - 1; j++) {
              let allTds = mydocument(allTrs[j]).find("td");
              if (allTds.length > 1) {
                // valid tds
                
                let batsmanName = mydocument(allTds["0"]).text().trim();
                let runs = mydocument(allTds["2"]).text().trim();
                let balls = mydocument(allTds["3"]).text().trim();
                let fours = mydocument(allTds["5"]).text().trim();
                let sixes = mydocument(allTds["6"]).text().trim();
                // console.log(`Name : ${batsmanName} Runs : ${runs} Balls : ${balls} Fours : ${fours} Sixes : ${sixes} StrikeRate : ${strikeRate}`)
                 processLeaderboard(teamname, batsmanName, runs, balls, fours, sixes) 

              
            }
            // console.log("##########################################");
          }
          console.table(leaderboard);
        }
        count--;
        if(count == 0){
            
        }


        
    })



 
}



function processLeaderboard(teamName, batsmanName, runs, balls, fours, sixes) {
    
    runs = Number(runs);
    balls = Number(balls);
    fours = Number(fours);
    sixes = Number(sixes);

    
    if (leaderboard.length) {
        
        for (let i = 0; i < leaderboard.length; i++) {
            let obj = leaderboard[i];
            if (obj.Team == teamName && obj.Batsman == batsmanName) {
                obj.Runs += runs;
                obj.Balls += balls;
                obj.Fours += fours;
                obj.Sixes += sixes;
                fs.writeFileSync("./leaderboard.json", JSON.stringify(leaderboard));
                return;
            }
        }
    }
    
    let obj = {
        Team: teamName,
        Batsman: batsmanName,
        Runs: runs,
        Balls: balls,
        Fours: fours,
        Sixes: sixes
    };
    leaderboard.push(obj);
    fs.writeFileSync("./leaderboard.json", JSON.stringify(leaderboard));
}

