"use strict";

var database = require('./sql-database');


var update = function(query, next) {
    database.sqlUpdate(query, next);
}

var query = function(query, next) {
    database.sqlQuery(query, next);
}

exports.update = update;
exports.query = query;