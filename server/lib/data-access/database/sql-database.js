"use strict";

var debug = require('debug')('server:sql-database');
var fs = require('fs');

var database = null; //must call init to set database type before database can be used
const SAFE_CREATE_TABLE_STATEMENTS = "lib/data-access/sql-statements/safe-create-tables.sql";

// when we require this module, we must pass in the database type which we wish to use.
var setDatabase = function (db) {
    console.log("Initializing database...");
    database = db;
    init(function(err) {
        if (err) {
            console.log("An error ocurred initializing the database.");
            console.log(err.message);
            process.exit(1);
        }
        console.log("Database initialized");
    });
};

var init = function(next) {
    fs.readFile(SAFE_CREATE_TABLE_STATEMENTS, function (err, data) {
        if (err) return next(err);
        if (!data) return next(new Error("Error reading the create sql statements!"));
        let stmtAry = splitSqlStmt(data.toString());
        multipleSqlUpdate(stmtAry, next);
    });
}

/*
Separates concatenated SQL statements, and returns an array where each
element in the array is a string representation of a single SQL stmt.
Empty SQL statements are removed. (i.e. the string ";;;;" would return
an empty array.)
*/
var splitSqlStmt = function (stmt) {
    var stmtAry = [];
    stmtAry = stmt.split(";");
    for (let i = 0; i < stmtAry.length; i++) {
        stmtAry[i] = stmtAry[i] + ";";
        let stmt = stmtAry[i];
        if (stmtAry[i][0] == '\n') {
            stmtAry[i] = stmtAry[i].slice(1);
        }
    }
    for (let i = stmtAry.length; i > 0; i--) {
        if (stmtAry[i - 1] == ";") {
            stmtAry.splice(i - 1, 1);
        }
    }
    return stmtAry;
}


/*
Executes multiples SQL update statements, and does not call next until the last
statement has finished execution.
Takes in array of SQL statements.
*/
var multipleSqlUpdate = function (stmtAry, next) {
    var count = 0;
    var nextIfLast = function (err) {
        if (err) {
            console.error("Error running multiple sql statements", err);
            return next(err);
        }
        count++;
        if (count == stmtAry.length) {
            return next();
        }
    }
    for (let i = 0; i < stmtAry.length; i++) {
        sqlUpdate(stmtAry[i], nextIfLast);
    }
}


/*
Executes an SQL update statement, writing to the database,
and calling next once writing has completed.
*/
var sqlUpdate = function (sql, next) {
    debug("SQL UPDATE:\n", sql);
    database.sqlUpdate(sql, next);
}


/*
Executes an SQL query statement. Once the query has executed,
next is called, with the results of the query being passed to next
as its first parameter.
*/
var sqlQuery = function (sql, next) {
    debug("SQL QUERY:\n", sql);
    database.sqlQuery(sql, next);
}

exports.setDatabase = setDatabase;
exports.sqlUpdate = sqlUpdate;
exports.sqlQuery = sqlQuery;
