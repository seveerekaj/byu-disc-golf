"use strict";

const makeMsg = function(status, msg) {
    if (!status) {
        status = "failure"
    }
    if (!msg) {
        msg = "";
    }
    return {
        "status": status,
        "message": msg
    };
}

const makeSuccessMsg = function(msg) {
    return makeMsg("success", msg);
}

const makeFailureMsg = function(msg) {
    return makeMsg("failure", msg);
}

const makeInternalServerErrorMsg = function() {
    return makeMsg("failure", "Internal server error. Please try again.");
}

module.exports = {

    makeSuccessMsg,
    makeFailureMsg,
    makeInternalServerErrorMsg

};