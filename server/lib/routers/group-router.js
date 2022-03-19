/*
* This router is used to setup group play
*/

"use strict";
var express = require('express');
var router = express.Router();
var groupService = require('../service/group-service');

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
        groupService.createGroup(req.body["nickname"], function(err, groupId, groupCode, playerId) {
            if (err) {
                response = templates.makeInternalServerErrorMsg;
                console.error(err);
                res.status(500);
            } else {
                response = templates.makeSuccessMsg("Group created successfully");
                response["groupId"] = groupId;
                response["playerId"] = playerId;
                response["nickname"] = req.body["nickname"];
                response["groupCode"] = groupCode
            }
            res.json(response);
        });
    } else {
        response = templates.makeFailureMsg("Please provide a nickname");
        res.json(response);
    }
});

router.get('/group-id/', function(req, res) {
    res.json(templates.makeFailureMsg("Please provide a group id in the URL"));
});

// router.get('/group-id/:groupId', function(req, res) {
//     console.log("hitting the route!");
//     var groupId = req.params.groupId;
//     console.log("building the response!!");
//     let response = templates.makeSuccessMsg("Retrieved group infomation");
//     response["groupId"] = groupId;
//     response["state"] = "unfinished";
//     response["players"] = [
//         {
//             "playerId": "123456",
//             "nickname": "Sassy Blast",
//             "score": -1
//         },{
//             "playerId": "123457",
//             "nickname": "Nice Icicle",
//             "score": 0
//         }
//     ];
//     response["scores"] = [
//         {"123456": [
//             {
//                 "holeId": 1,
//                 "score": 6
//             },{
//                 "holeId": 2,
//                 "score": 7
//             }
//         ]},
//         {"123457": [
//             {
//                 "holeId": 1,
//                 "score": 5
//             },{
//                 "holeId": 2,
//                 "score": 9
//             }
//         ]}
//     ]
//     res.json(response);
// });

router.get('/group-id/:groupId', function(req, res) {
    var groupId = req.params.groupId;
    groupService.getGroup(groupId, function(err, group, scoreboard, players) {
        if (err) {
            res.json(templates.makeFailureMsg(err.message));
        } else {
            if (group == null) {
                res.json(templates.makeFailureMsg("Group does not exist"));
            } else {
                var result = templates.makeSuccessMsg("Successfully retrieved group")
                result["group"] = group;
                result["scoreboard"] = scoreboard;
                result["players"] = players
                res.json(result);
            }
        }
    });
});

router.post('/join-group', function(req, res) {
    if (req.body["group-code"] && req.body["nickname"]) {
        var response;
        groupService.createGroupPlayer(req.body["nickname"], req.body["group-code"], function(err, groupId, groupCode, playerId) {
            if (err) {
                response = templates.makeFailureMsg("Error joining group: " + err.message);
            } else {
                response = templates.makeSuccessMsg("Successfully joined group");
                response["group-code"] = groupCode;
                response["group-id"] = groupId;
                response["player-id"] = playerId;
                response["nickname"] = req.body["nickname"];
            }
            res.json(response);
        });
    } else {
        res.json(templates.makeFailureMsg("Please provide a group code and a nickname"));
    }
});

router.post('/post-score', function(req, res) {
    if (req.body["holeId"] && req.body["score"] && req.body["playerId"]) {
        groupService.postScore(req.body["playerId"], req.body["holeId"], req.body["score"], function(err) {
            if (err) {
                res.json(templates.makeFailureMsg(err.message));
            } else {
                res.json(templates.makeSuccessMsg("Scored " + req.body["score"] + " at hole " + req.body["holeId"]));
            }
        });
    } else {
        res.json(templates.makeFailureMsg("Please provide a hole ID and a score and a player ID"));
    }
});

module.exports = router;