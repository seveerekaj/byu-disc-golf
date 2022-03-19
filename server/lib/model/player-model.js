"use strict";
module.exports = class Player {
    constructor(playerID, nickName, creationDateTime, groupID) {
        this.playerID = playerID;
        this.nickName = nickName;
        this.creationDateTime = creationDateTime;
        this.groupID = groupID;
    }
}