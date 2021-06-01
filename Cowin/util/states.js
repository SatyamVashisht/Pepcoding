const axios = require('axios');
const Table = require('tty-table');
const { config, options } = require("./config");
module.exports = function () {
    axios.get('https://cdn-api.co-vin.in/api/v2/admin/location/states', config)
        .then(function (response) {
            // console.table(response.data.states);
            let header = [{
                value: "state_id",
                headerColor: "cyan",
                color: "white",
                align: "left",
                alias: "STATE ID",
                width: 20
            },
            {
                value: "state_name",
                alias: "STATE NAME",
                color: "red",
                width: 40,
            }]
            const out = Table(header, response.data.states, options).render()
            console.log(out); //prints output
        })
        .catch(function (error) {
            console.log(error.response);
        });
};