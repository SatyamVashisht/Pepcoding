#! /usr/bin/env node 
const states = require("../util/states");
const districts = require("../util/districts");
const slots = require("../util/slots");
const program = require("commander");

program
    .command('states')
    .description('LIST DOWN ALL THE STATES')
    .action(states);
program
    .command('districts <stateid>')
    .description('GET ALL DISTRICTS FOR STATE USING STATE ID')
    .action(districts);
program
    .command('slots <districtid>')
    .description('GET ALL SLOTS FOR THE DISTRICT')
    .action(slots);
program.parse();