"use strict";

var database = require('../database/database');
var playerModel = require('../../model/player-model');
var debug = require('debug')('server:player-dao');

var addGroupPlayer = function(player, next) {
    debug("Adding group player to DB");
    let query = `INSERT INTO Player (NickName, CreationDateTime, GroupID)\n`;
    query += `VALUES ('${player.nickName}', '${player.creationDateTime}', '${player.groupID}');`;
    database.update(query, function(err) {
        if (err) {
            console.error(err);
            next(new Error("Couldn't add a group player to the database"));
        } else {
            next();
        }
    });
}

var addSinglePlayer = function(player, next) {
    debug("Adding group player to DB");
    let query = `INSERT INTO Player (NickName, CreationDateTime)\n`;
    query += `VALUES ('${player.nickName}', '${player.creationDateTime}');`;
    database.update(query, function(err) {
        if (err) {
            console.error(err);
            next(new Error("Couldn't add a single player to the database"));
        } else {
            next();
        }
    });
}

var getPlayerById = function(playerId, next) {
    debug("Finding player by ID");
    let query = `SELECT PlayerID, NickName, CreationDateTime, GroupID\n`;
    query += `FROM Player\n`;
    query += `WHERE PlayerID = '${playerId}';`
    database.query(query, function(err, data) {
        if (err) {
            console.error(err);
            next(new Error("Couldn't query the database for a player by id"));
        } else {
            resToPlayer(data, next);
        }
    });
}

var getPlayerByGroupIdAndNickName = function(groupId, nickName, next) {
    debug("Finding player by groupId and nickName");
    let query = `SELECT PlayerID, NickName, CreationDateTime, GroupID\n`;
    query += `FROM Player\n`;
    query += `WHERE GroupID = '${groupId}' AND NickName = '${nickName}';`
    database.query(query, function(err, data) {
        if (err) {
            console.error(err);
            next(new Error("Couldn't query the database for a player by nickname and group id"));
        } else {
            resToPlayer(data, next);
        }
    });
}

var getPlayersByGroupId = function(groupId, next) {
    debug("Finding player by ID");
    let query = `SELECT PlayerID, NickName, CreationDateTime, GroupID\n`;
    query += `FROM Player\n`;
    query += `WHERE GroupID = '${groupId}';`
    database.query(query, function(err, data) {
        if (err) {
            console.error(err);
            next(new Error("Couldn't query the database for players by group id"));
        } else {
            resToPlayers(data, next);
        }
    });
}

var resToPlayer = function(data, next) {
    if (data.length == 0) {
        next(null, null);
    } else {
        data = data[0];
        let player = new playerModel(data.PlayerID, data.NickName, data.CreationDateTime, data.GroupID);
        next(null, player);
    };
}

var resToPlayers = function(data, next) {
    if (data.length == 0) {
        next(null, null);
    } else {
        var players = [];
        for (let i = 0; i < data.length; i++) {
            let res = data[i];
            let player = new playerModel(res.PlayerID, res.NickName, res.CreationDateTime, res.GroupID);
            players.push(player);
        }
        next(null, players);
    };
}

exports.addGroupPlayer = addGroupPlayer;
exports.addSinglePlayer = addSinglePlayer;
exports.getPlayerById = getPlayerById;
exports.getPlayersByGroupId = getPlayersByGroupId;
exports.getPlayerByGroupIdAndNickName = getPlayerByGroupIdAndNickName;