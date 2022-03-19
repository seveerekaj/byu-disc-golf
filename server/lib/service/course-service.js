/*
* This module gets hole information
*/

"use strict";
const { NONAME } = require('dns');
const fs = require('fs');

var holes;

const loadHolesFile = function() {
    fs.readFile('public/json/byu_course_data.json', 'utf8', function(err, data) {
        if (err) {
            console.error(err);
            return;
        }
        holes = JSON.parse(data);
        console.log("The BYU disk golf course information has been loaded into memory!");
    });
}

const getHole = function(holeNumber, next) {
    for (let i = 0; i < holes.length; i++) {
        if (holes[i]["holeId"] == holeNumber) {
            next(null, holes[i]);
            return;
        }
    }
    next(null);
    return;
}

const getCourse = function(next) {
    next(null, holes);
}



loadHolesFile();

module.exports = {
    getHole,
    getCourse
}