"use strict";
module.exports = class Score {
    constructor(scoreID, score, hole, playerID, creationDateTime) {
        this.scoreID = scoreID;
        this.score = score;
        this.hole = hole;
        this.playerID = playerID;
        this.creationDateTime = creationDateTime;
    }
}