/*
* This module gets hole information
*/

"use strict";
const { NONAME } = require('dns');
const fs = require('fs');

var holes;

var loadHolesFile = function() {
    fs.readFile('public/json/byu_course_data.json', 'utf8', function(err, data) {
        if (err) {
            console.error(err);
            return;
        }
        holes = JSON.parse(data);
        console.log("The BYU disk golf course information has been loaded into memory!");
    });
}

var getHole = function(holeNumber, next) {
    console.log("In the get hole funciton");
    for (let i = 0; i < holes.length; i++) {
        console.log("Checking hole " + i);
        console.log(holes[i]);
        if (holes[i]["holeId"] == holeNumber) {
            next(holes[i]);
            return;
        }
    }
    next();
    return;
}

loadHolesFile();

module.exports = {
    getHole
}