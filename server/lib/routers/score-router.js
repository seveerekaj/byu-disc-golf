/*
* This router is used get and update the scoreboard.
*/

"use strict";
var express = require('express');
var router = express.Router();

var templates = require('./response-templates');

router.get('/', function (req, res) {
    let response = templates.makeSuccessMsg("Here is the scoreboard");
    response["scoreBoard"] = [
        {
            "position": 1,
            "playerInitials": "CRB",
            "finalScore": 25
        },{
            "position": 2,
            "playerInitials": "MRT",
            "finalScore": 32
        }
    ]
    res.json(response);
});

router.post('/post-score', function(req, res) {
    var response;
    if (req.body["initials"] && req.body["finalScore"]) {
        response = templates.makeSuccessMsg("successfully posted score of " + req.body["finalScore"]);
        res.json(response);
    } else {
        res.json(templates.makeFailureMsg("Please provide your initials and final score"));
    }
});

module.exports = router;