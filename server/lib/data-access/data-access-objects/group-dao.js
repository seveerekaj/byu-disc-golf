"use strict";

var database = require('../database/database');
var groupModel = require('../../model/group-model');
var debug = require('debug')('server:group-dao');

var addGroup = function(group, next) {
    debug("Adding group to DB");
    let query = `INSERT INTO PlayerGroup (GroupCode, CreationDateTime)\n`;
    query += `VALUES ('${group.groupCode}', '${group.creationDateTime}');`;
    database.update(query, function(err) {
        if (err) {
            console.error(err);
            next(new Error("Couldn't add a group to the database"));
        } else {
            next();
        }
    });
}

var getGroupById = function(groupId, next) {
    let query = `SELECT PlayerGroupID, GroupCode, CreationDateTime\n`;
    query += `FROM PlayerGroup\n`;
    query += `WHERE PlayerGroupID = '${groupId}';`
    database.query(query, function(err, data) {
        if (err) {
            console.error(err);
            next(new Error("Couldn't query the database for a group by id"));
        } else {
            resToGroup(data, next);
        }
    });
}

var getGroupByCode = function(code, next) {
    let query = `SELECT PlayerGroupID, GroupCode, CreationDateTime\n`;
    query += `FROM PlayerGroup\n`;
    query += `WHERE GroupCode = '${code}';`;
    database.query(query, function(err, data) {
        if (err) {
            console.error(err);
            next(new Error("Couldn't query the database for a group by id"));
        } else {
            resToGroup(data, next);
        }
    });
}

var resToGroup = function(data, next) {
    if (data.length == 0) {
        next(null, null);
    } else {
        data = data[0];
        let group = new groupModel(data.PlayerGroupID, data.GroupCode, data.CreationDateTime);
        next(null, group);
    };
}

exports.addGroup = addGroup;
exports.getGroupById = getGroupById;
exports.getGroupByCode = getGroupByCode;