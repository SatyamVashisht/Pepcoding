const cheerio = require("cheerio");
const request = require("request");
const fs = require("fs");
let link = "https://github.com/topics";

request(link, function (error, response, data) {
    getdetails(data);
})

function getdetails(data) {
    let mydocument = cheerio.load(data);
    let aTag = mydocument(".no-underline.d-flex.flex-column.flex-justify-center");

    // console.log(data);



    // console.log(aTag.attr("href"));
    for (i = 0; i < aTag.length; i++) {
        let ALink = "https://github.com" + mydocument(aTag[i]).attr("href");
        let AName = mydocument(aTag[i]).find(".f3").text().trim();
        console.log(AName + ":" + ALink);
        fs.mkdirSync(`./Topics/${AName}`);
        getdetail(ALink, AName);
    }
    // console.log(aTag.length);

}

function getdetail(ALink, AName) {
    request(ALink, function (error, response, data) {

        let mydocument = cheerio.load(data);
        // console.log(data);
        let AllTopics = mydocument(".f3.color-text-secondary");
        // console.log(AllTopics.length);
        let topicFolderPath = `./Topics/${AName}`;
        let projectsfile = [];
        for (let i = 0; i < 10; i++) {
            let projecth1tag = AllTopics[i];
            let bothATags = mydocument(AllTopics).find("a");
            let projecttag = mydocument(bothATags[1]);
            let projectname = projecttag.text().split("\n")[1].trim();
            let projectLink = "https://wwww.github.com" + projecttag.attr("href");
            projectsfile.push({projectname,projectLink})

        }
        fs.writeFileSync(`${topicFolderPath}/projects.json`, JSON.stringify(projectsfile));



    
    }
    )}
