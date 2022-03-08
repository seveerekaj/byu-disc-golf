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

module.exports = {

    makeSuccessMsg,
    makeFailureMsg

};