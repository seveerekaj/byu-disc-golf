/*
* This router gets information for the various holes in the course.
*/

"use strict";
var express = require('express');
var router = express.Router();

var templates = require('./response-templates');
var courseService = require('../service/course-service');

/* GET home page. */
router.get('/', function (req, res) {
    var response;
    courseService.getCourse(function(err, course) {
        if (err) {
            response = templates.makeFailureMsg("An error occurred getting the course");
        } else {
            response = templates.makeSuccessMsg("Here is the course!");
            response["course"] = course;
        }
        res.json(response);
    });
});

router.get('/hole/', function (req, res) {
    res.json(templates.makeSuccessMsg("Please provide a hole number in the URL."));
});

router.get('/hole/:holeNumber', function (req, res) {
    var holeNumber = req.params.holeNumber;
    var response;
    courseService.getHole(holeNumber, function (err, hole) {
        if (hole) {
            response = templates.makeSuccessMsg("Information for hole " + holeNumber);
            response["hole"] = hole;
        } else {
            response = templates.makeFailureMsg(holeNumber + ": invalid hole number. Please provide a valid hole number and try agian.");
        }
        res.json(response);
    });
});

module.exports = router;