"use strict";

var finalScoreDAO = require('../data-access/data-access-objects/final-score-dao');
var finalScoreModel = require('../model/final-score-model');
var sharedService = require('./shared-service');
var debug = require('debug')('server:score-service');

const SCORE_BOARD_SIZE = 10;

var postScore = function(finalScore, initials, next) {
    debug("Posting score");
    finalScoreDAO.getScoreboard(function(err, scores) {
        console.log(scores);
        if (err) return next(err);
        if (shouldInsertScore(finalScore, initials, scores)) {
            debug("Inserting new score");
            var model = new finalScoreModel(null, finalScore, initials, sharedService.getTimeUTCString());
            finalScoreDAO.addScore(model, function(err) {
                if (err) return next(err);
                conditionalDeleteLowestScore(scores, next);
            });
        } else {
            debug("Should not insert score");
            next(null);
        }
    });
}

var conditionalDeleteLowestScore = function (scores, next) {
    if (scores == null) return next(null);
    if ((scores.length + 1) > SCORE_BOARD_SIZE) {
        var max = 0;
        var highestScoreID; // remember, lower scores are better
        for (let i = 0; i < scores.length; i++) {
            if (scores[i].finalScore > max) {
                max = scores[i].finalScore;
                highestScoreID = scores[i].finalScoreID;
            }
        }
        return finalScoreDAO.deleteScoreByID(highestScoreID, next);
    }
    return next(null);
}

var getScoreboard = function (next) {
    finalScoreDAO.getScoreboard(function(err, scores) {
        if (err) return next(err);
        return next(null, sortScores(scores));
    });
}

var sortScores = function(scores) {
    if (scores) {
        return scores.sort(function(a, b) {
            return a.finalScore - b.finalScore;
        });
    } else {
        return [];
    }
}

var scoreQualifies = function(finalScore, scores) {
    for (let i = 0; i < scores.length; i++) {
        debug(scores);
        if (scores[i].finalScore > finalScore) return true;
    }
    debug("Score does not qualify");
    return false;
}

var duplicateScore = function(finalScore, initials, scores) {
    debug("Checking for duplicate score");
    for (let i = 0; i < scores.length; i++) {
        if (scores[i].finalScore == finalScore && scores[i].initials == initials) {
            return true;
        }
    }
    return false;
}

var shouldInsertScore = function(finalScore, initials, scores) {
    if (scores == null) return true;
    if (duplicateScore(finalScore, initials, scores)) {
        debug("We will not add duplicate score");
        return false;
    }
    if (scores.length < SCORE_BOARD_SIZE) {
        return true;
    } else {
        return scoreQualifies(finalScore, scores);
    }
}

exports.postScore = postScore;
exports.getScoreboard = getScoreboard