"use strict";
var sqlite = require('sqlite3').verbose();
var db = new sqlite.Database('./sqlite-database.db', sqlite.OPEN_READWRITE | sqlite.OPEN_CREATE);

/*
Executes an SQL update statement, writing to the database,
and calling next once writing has completed.
*/
var sqlUpdate = function (sql, next) {
    db.run(sql, next);
}

/*
Executes an SQL query statement. Once the query has executed,
next is called, with the results of the query being passed to next
as its first parameter.
*/
var sqlQuery = function (sql, next) {
    db.all(sql, next);
}

exports.sqlUpdate = sqlUpdate;
exports.sqlQuery = sqlQuery;