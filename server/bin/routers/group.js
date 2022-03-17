/*
* This router is used to setup group play
*/

"use strict";
var express = require('express');
var router = express.Router();

var templates = require('./response-templates');

router.get('/', function (req, res) {
    let msg = "Welcome to the groups router.";
    msg += " Here you can create groups, view groups";
    msg += " and get information for a specific group";
    msg += " (i.e. get the score of a specific group member)"
    res.json(templates.makeSuccessMsg(msg));
});

router.post('/new-group', function(req, res) {
    var response;
    if (req.body["nickname"]) {
        response = templates.makeSuccessMsg("Group created successfully");
        response["groupId"] = "ABC1";
        response["playerId"] = "123456";
        response["nickname"] = req.body["nickname"];
    } else {
        response = templates.makeFailureMsg("Please provide a nickname");
    }
    res.json(response);
});

router.get('/group-id/', function(req, res) {
    res.json(templates.makeFailureMsg("Please provide a group id in the URL"));
});

router.get('/group-id/:groupId', function(req, res) {
    console.log("hitting the route!");
    var groupId = req.params.groupId;
    console.log("building the response!!");
    let response = templates.makeSuccessMsg("Retrieved group infomation");
    response["groupId"] = groupId;
    response["state"] = "unfinished";
    response["players"] = [
        {
            "playerId": "123456",
<<<<<<< HEAD
            "nickname": "Sassy Blast"
        },{
            "playerId": "123457",
            "nickname": "Nice Icicle"
=======
            "nickname": "Sassy Blast",
            "score": -1
        },{
            "playerId": "123457",
            "nickname": "Nice Icicle",
            "score": 0
>>>>>>> 0e20e3159e3ecf280b0f4c59bb4be2aa8d6120e4
        }
    ];
    response["scores"] = [
        {"123456": [
            {
                "holeId": 1,
                "score": 6
            },{
                "holeId": 2,
                "score": 7
            }
        ]},
        {"123457": [
            {
                "holeId": 1,
                "score": 5
            },{
                "holeId": 2,
                "score": 9
            }
        ]}
    ]
    res.json(response);
});

router.post('/join-group', function(req, res) {
    if (req.body["group-id"] && req.body["nickname"]) {
        let response = templates.makeSuccessMsg("Successfully joined group");
        response["group-id"] = "ABC1";
        response["player-id"] = "123456";
        response["nickname"] = req.body["nickname"];
        res.json(response);
    } else {
        res.json(templates.makeFailureMsg("Please provide a group id and a nickname"));
    }
});

router.post('/post-score', function(req, res) {
    if (req.body["holeId"] && req.body["score"]) {
        res.json(templates.makeSuccessMsg("Scored " + req.body["score"] + " at hole " + req.body["holeId"]));
    } else {
        res.json(templates.makeFailureMsg("Please provide a hole ID and a score"));
    }
});

module.exports = router;