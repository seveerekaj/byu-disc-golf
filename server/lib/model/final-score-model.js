"use strict";
module.exports = class FinalScore {
    constructor(finalScoreID, finalScore, initials, creationDateTime) {
        this.finalScoreID = finalScoreID;
        this.finalScore = finalScore;
        this.initials = initials;
        this.creationDateTime = creationDateTime;
    }
}