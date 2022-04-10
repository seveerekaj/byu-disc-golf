/*
* This router is used get and update the scoreboard.
*/

"use strict";
var express = require('express');
var scoreService = require('../service/score-service');
var router = express.Router();

var templates = require('./response-templates');

router.get('/', function (req, res) {
    scoreService.getScoreboard(function(err, scores) {
        var response;
        if (err) {
            response = templates.makeFailureMsg(err.message);
        } else {
            response = templates.makeSuccessMsg("Scoreboard loaded successfully");
            response['scoreBoard'] = scores;
        }
        res.json(response);
    });
});

router.post('/post-score', function(req, res) {
    if (req.body["initials"] && req.body["finalScore"] != null) {
        scoreService.postScore(req.body["finalScore"], req.body["initials"], function(err) {
            if (err) return res.json(templates.makeFailureMsg(err.message));
            res.json(templates.makeSuccessMsg("successfully posted score of " + req.body["finalScore"]));
        });        
    } else {
        res.json(templates.makeFailureMsg("Please provide your initials and final score"));
    }
});

module.exports = router;