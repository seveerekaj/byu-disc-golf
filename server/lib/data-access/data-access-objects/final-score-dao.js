"use strict";

var database = require('../database/database');
var finalScoreModel = require('../../model/final-score-model');
var debug = require('debug')('serverfinal-:score-dao');

var addScore = function(finalScore, next) {
    debug("Adding final score to DB");
    let query = `INSERT INTO FinalScore (FinalScore, Initials, CreationDateTime)\n`;
    query += `VALUES ('${finalScore.finalScore}', '${finalScore.initials}', '${finalScore.creationDateTime}');`;
    database.update(query, function(err) {
        if (err) {
            console.error(err);
            next(new Error("Couldn't add a final-score to the database"));
        } else {
            next();
        }
    });
}

var getScoreboard = function(next) {
    debug("Grabbing entire scoreboard");
    let query = `SELECT FinalScoreID, FinalScore, Initials, CreationDateTime\n`;
    query += `FROM FinalScore\n`;
    database.query(query, function(err, data) {
        if (err) {
            console.error(err);
            next(new Error("Couldn't query the database the score board"));
        } else {
            resToFinalScores(data, next);
        }
    });
}

var deleteScoreByID = function(scoreID, next) {
    debug("Deleting a final score");
    let query = `DELETE FROM FinalScore\n`;
    query += `WHERE FinalScoreID = '${scoreID}';`;
    database.query(query, function(err) {
        if (err) {
            console.error(err);
            next(new Error("Couldn't delete a score from the database"));
        } else {
            next(null);
        }
    });
}

var resToFinalScores = function(data, next) {
    if (data.length == 0) {
        next(null, null);
    } else {
        var scores = [];
        for (let i = 0; i < data.length; i++) {
            let res = data[i];
            let score = new finalScoreModel(res.FinalScoreID, res.FinalScore, res.Initials, res.CreationDateTime);
            scores.push(score);
        }
        next(null, scores);
    };
}

exports.addScore = addScore;
exports.getScoreboard = getScoreboard;
exports.deleteScoreByID = deleteScoreByID;