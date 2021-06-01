const axios = require('axios');
const chalk = require('chalk');
const Table = require('tty-table');
const { config, options } = require("./config");
var inquirer = require("inquirer");
module.exports = function (districtid) {
    var date = new Date();
    var todaysDate = `${date.getDate()}-${String(date.getMonth() + 1).padStart(2, "0")}-${date.getFullYear()}`;
    inquirer
        .prompt([{
            type: "list",
            name: "choice",
            message: "PLEASE CHOOSE AGE GROUP",
            choices: [
                {
                    name: "ALL AGES",
                    value: "",
                }, {
                    name: "45+",
                    value: "45",
                }, {
                    name: "18-45",
                    value: "18",
                },
            ],
        },
        ])
        .then((answers) => {
            axios.get(`https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByDistrict?district_id=${districtid}&date=${todaysDate}`, config)
                .then(function (response) {
                    // console.log(response);
                    // console.table(response.data.states);
                    let header = [{
                        value: "date",
                        headerColor: "cyan",
                        color: "yellow",
                        align: "left",
                        alias: "DATE",
                        width: 20
                    }, {
                        value: "center",
                        headerColor: "cyan",
                        color: "yellow",
                        align: "left",
                        alias: "CENTER NAME",
                        width: 40
                    },
                    {
                        value: "address",
                        headerColor: "cyan",
                        color: "yellow",
                        align: "left",
                        alias: "ADDRESS",
                        width: 60
                    },
                    {
                        value: "age",
                        headerColor: "cyan",
                        color: "yellow",
                        align: "left",
                        alias: "AGE",
                        width: 20
                    },
                    {
                        value: "available",
                        headerColor: "cyan",
                        color: "yellow",
                        align: "left",
                        alias: "SLOTS",
                        width: 15
                    }
                    ]
                    var finaldata = [];
                    var statename;
                    var dis;
                    response.data.centers.forEach((item) => {
                        statename = item.state_name;
                        dis = item.district_name;
                        item.sessions.forEach((session) => {
                            if (answers.choice == "") {
                                let data = {
                                    center: item.name,
                                    address: item.address,
                                    available: session.available_capacity,
                                    age: session.min_age_limit,
                                    date: session.date
                                };
                                finaldata.push(data);
                            }
                            else if (answers.choice == session.min_age_limit) {
                                let data = {
                                    center: item.name,
                                    address: item.address,
                                    available: session.available_capacity,
                                    age: session.min_age_limit,
                                    date: session.date
                                };
                                finaldata.push(data);

                            }
                        })

                    });
                    // console.table(finaldata)
                    const out = Table(header, finaldata, options).render()
                    console.log(chalk.white.bgRed.bold(`DATE -->  ${todaysDate}`));
                    console.log(chalk.white.bgRed.bold(`STATE -->  ${statename}`));
                    console.log(chalk.white.bgRed.bold(`DISTRICT -->  ${dis}`));
                    console.log((chalk.white.bgRed.bold("BOOK YOUR SLOT NOW -->  "))+(chalk.blue.bgRed.bold("https://selfregistration.cowin.gov.in/")));
                    console.log(out);
                })
                .catch(function (error) {
                    console.log(error.response);
                });
        })
        .catch((error) => {
            if (error.isTtyError) {
                // Prompt couldn't be rendered in the current environment
            } else {
                // Something else went wrong
            }
        });





};