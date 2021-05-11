const request = require("request");
const cheerio = require("cheerio");
const fs = require("fs");

function getMatchDetail(allmatcheslink) {
    request(allmatcheslink, function (error, response, data) {
        processdata(data);

    })
}
function processdata(link) {
    //console.log(link);
    let mydocument = cheerio.load(link);
    let bothInnings = mydocument(".card.content-block.match-scorecard-table .Collapsible");
    for (i = 0; i < bothInnings.length; i++) {
        let oneinnings = mydocument(bothInnings[i]);
        let teamName = oneinnings.find("h5").text();
        teamName = teamName.split("INNINGS")[0].trim();
        //console.log(teamName);
        //console.log("#############################################");
        let alltrs = oneinnings.find(".table.batsman tbody tr");
        for (let j = 0; j < alltrs.length - 1; j++) {
            let alltds = mydocument(alltrs[j]).find("td");
            if (alltds.length > 1) {
                let batsmanName = mydocument(alltds[0]).text().trim();
                let runs = mydocument(alltds[2]).text().trim();
                let balls = mydocument(alltds[3]).text().trim();
                let fours = mydocument(alltds[5]).text().trim();
                let sixes = mydocument(alltds[6]).text().trim();
                let strikerate = mydocument(alltds[7]).text().trim();
                //  console.log(batsmanName);
                // console.log(runs);
                // console.log(balls);
                // console.log(fours);
                // console.log(sixes);
                // console.log(strikerate);
                // OR
                // console.log(`Batsmen = ${batsmanName} Runs = ${runs} Balls = ${balls} Fours = ${fours} Sixes = ${sixes} `);  

                // console.log(teamName);
                ProcessDetails(teamName, batsmanName, runs, balls, fours, sixes, strikerate);
            }
        }
    }
}
function checkteamfolder(teamName) {
    let path = `./IPL/${teamName}`;
    return fs.existsSync(path);
}
function checkbatsman(teamName, batsmanName) {
    let path = `./IPL/${teamName}/${batsmanName}.json`;
    return fs.existsSync(path);
}
function updatebatsman(teamName, batsmanName, runs, balls, fours, sixes, strikerate) {
    let path = `./IPL/${teamName}/${batsmanName}.json`;
    let file = JSON.parse(fs.readFileSync(path));
    let innings = {
        Runs: runs,
        Balls: balls,
        Fours: fours,
        Sixes: sixes,
        StrikeRate: strikerate
        
    }
    file.push(innings);
    fs.writeFileSync(path, JSON.stringify(file));
}
function createbatsman(teamName, batsmanName, runs, balls, fours, sixes, strikerate) {
    let path = `./IPL/${teamName}/${batsmanName}.json`;
    let file = [];
    let inning = {
        Runs: runs,
        Balls: balls,
        Fours: fours,
        Sixes: sixes,
        StrikeRate: strikerate
    }
    file.push(inning);
    fs.writeFileSync(path, JSON.stringify(file));
}

function createteam(teamName) {
    let path = `./IPL/${teamName}`;
    fs.mkdirSync(path);
}
function ProcessDetails(teamName, batsmanName, runs, balls, fours, sixes, strikerate) {
    // console.log(teamName);
    let isteamfolder = checkteamfolder(teamName);
    if (isteamfolder) {
        let isplayer = checkbatsman(teamName, batsmanName);
        if (isplayer) {
            updatebatsman(teamName, batsmanName, runs, balls, fours, sixes, strikerate);
        } else {
            createbatsman(teamName, batsmanName, runs, balls, fours, sixes, strikerate);
        }
    } else {
        createteam(teamName);
        createbatsman(teamName, batsmanName, runs, balls, fours, sixes, strikerate);
    }
}
module.exports = getMatchDetail;