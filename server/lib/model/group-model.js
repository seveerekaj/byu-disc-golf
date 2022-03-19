"use strict";
module.exports = class Group {
    constructor(groupID, groupCode, creationDateTime) {
        this.groupID = groupID;
        this.groupCode = groupCode;
        this.creationDateTime = creationDateTime;
    }
}