"use strict";

var getTimeUTCString = function () {
    var now = new Date();
    return now.toUTCString();
}

exports.getTimeUTCString = getTimeUTCString;