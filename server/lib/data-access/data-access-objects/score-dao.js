"use strict";

var database = require('../database/database');
var scoreModel = require('../../model/score-model');
var debug = require('debug')('server:score-dao');

var addScore = function(score, next) {
    debug("Adding score to DB");
    let query = `INSERT INTO Score (Score, Hole, PlayerID, CreationDateTime)\n`;
    query += `VALUES ('${score.score}', '${score.hole}', '${score.playerID}', '${score.creationDateTime}');`;
    database.update(query, function(err) {
        if (err) {
            console.error(err);
            next(new Error("Couldn't add a score to the database"));
        } else {
            next();
        }
    });
}

var updateScore = function(score, playerId, hole, next) {
    debug("Adding score to DB");
    let query = `UPDATE Score\n`;
    query +=  `SET Score = '${score}'\n`
    query += `WHERE PlayerID = '${playerId}' AND Hole = '${hole}';`;
    database.update(query, function(err) {
        if (err) {
            console.error(err);
            next(new Error("Couldn't update an existing score in the database"));
        } else {
            next();
        }
    });
}

var getScoresByPlayerId = function(playerId, next) {
    debug("Finding scores by player ID");
    let query = `SELECT ScoreID, Score, Hole, PlayerID, CreationDateTime\n`;
    query += `FROM Score\n`;
    query += `WHERE PlayerID = '${playerId}';`
    database.query(query, function(err, data) {
        if (err) {
            console.error(err);
            next(new Error("Couldn't query the database for scores from player"));
        } else {
            resToScores(data, next);
        }
    });
}

var getScoreByPlayerIdAndHole = function(playerId, hole, next) {
    debug("Finding score by player ID and hole number");
    let query = `SELECT ScoreID, Score, Hole, PlayerID, CreationDateTime\n`;
    query += `FROM Score\n`;
    query += `WHERE PlayerID = '${playerId}' AND Hole = '${hole}';`
    database.query(query, function(err, data) {
        if (err) {
            console.error(err);
            next(new Error("Couldn't query the database for score from player and hole number"));
        } else {
            resToScore(data, next);
        }
    });
}

var resToScore = function(data, next) {
    if (data.length == 0) {
        next(null, null);
    } else {
        data = data[0];
        let score = new scoreModel(data.ScoreID, data.Score, data.Hole, data.PlayerID, data.CreationDateTime);
        next(null, score);
    };
}

var resToScores = function(data, next) {
    if (data.length == 0) {
        next(null, null);
    } else {
        var scores = [];
        for (let i = 0; i < data.length; i++) {
            let res = data[i];
            let score = new scoreModel(res.ScoreID, res.Score, res.Hole, res.PlayerID, res.CreationDateTime);
            scores.push(score);
        }
        next(null, scores);
    };
}

exports.addScore = addScore;
exports.updateScore = updateScore;
exports.getScoresByPlayerId = getScoresByPlayerId;
exports.getScoreByPlayerIdAndHole = getScoreByPlayerIdAndHole;