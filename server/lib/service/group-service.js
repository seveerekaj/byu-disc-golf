/*
* This module set up groups and retrieves group information
*/

"use strict";

var groupDAO = require('../data-access/data-access-objects/group-dao');
var playerDAO = require('../data-access/data-access-objects/player-dao');
var scoreDAO = require('../data-access/data-access-objects/score-dao');
var groupModel = require('../model/group-model');
var playerModel = require('../model/player-model');
var scoreModel = require('../model/score-model');
var debug = require('debug')('server:group-service');

const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
const CODE_LENGTH = 4;

function generateString(length) {
  let result = '';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

var getTimeUTCString = function () {
  var now = new Date();
  return now.toUTCString();
}

var findGroup = function (groupCode, next) {
  if (groupCode == null) {
    next(new Error("No group code was provided"));
  } else {
    groupDAO.getGroupByCode(groupCode, function (err, group) {
      if (err) {
        next(err);
      } else {
        next(null, group);
      }
    });
  }
}

var getUnusedGroupCode = function (next) {
  debug("Finding unused group code");
  var groupCode = generateString(CODE_LENGTH);
  findGroup(groupCode, function (err, group) {
    if (err) {
      return next(err);
    } else if (group == null) {
      return next(null, groupCode);
    } else {
      return getUnusedGroupCode(next);
    }
  });
}

/*
This actually creates a group AND a player. This is because you can't have a group
with no players in it.
*/
var createGroup = function (nickName, next) {
  getUnusedGroupCode(function (err, code) {
    if (err) {
      next(new Error("Couldn't find a unique group code"));
    } else {
      var group = new groupModel(null, code, getTimeUTCString());
      groupDAO.addGroup(group, function (err) {
        if (err) {
          console.error(err);
          next(new Error("Error creating a group"));
        } else {
          createGroupPlayer(nickName, code, next);
        }
      });
    }
  });
}

var checkNickNameUsedInGroup = function (nickName, groupId, next) {
  playerDAO.getPlayersByGroupId(groupId, function (err, players) {
    if (players == null) {
      next(null, false);
    } else {
      var used = false;
      for (let i = 0; i < players.length; i++) {
        if (players[i].nickName == nickName) {
          used = true;
          break;
        }
      }
      next(null, used);
    }
  });
}

var createGroupPlayerHelper = function (nickName, groupId, groupCode, next) {
  var player = new playerModel(null, nickName, getTimeUTCString(), groupId);
  playerDAO.addGroupPlayer(player, function (err) {
    if (err) {
      console.error(err);
      next(new Error("Couldn't add group player"));
    } else {
      playerDAO.getPlayerByGroupIdAndNickName(groupId, nickName, function (err, player) {
        if (err) {
          console.error(err);
          next(new Error("Error getting new player's ID"));
        } else {
          next(null, groupId, groupCode, player.playerID);
        }
      });
    }
  });
}

var createGroupPlayer = function (nickName, groupCode, next) {
  findGroup(groupCode, function (err, group) {
    if (err) {
      console.error(err);
      next(new Error("Error creating group player"));
    } else if (group == null) {
      next(new Error("A group with code " + groupCode + " does not exist"));
    } else {
      checkNickNameUsedInGroup(nickName, group.groupID, function (err, used) {
        if (err) {
          console.error(err);
          next(new Error("Error creating group player"));
        } else if (used) {
          next(new Error("The nick name provided is already being used in this group"));
        } else {
          createGroupPlayerHelper(nickName, group.groupID, group.groupCode, next);
        }
      });
    }
  });
}

var postScore = function (playerId, hole, score, next) {
  playerDAO.getPlayerById(playerId, function (err, player) {
    if (err) {
      console.error(err);
      next(new Error("Error checking if that player exists"));
    } else if (player == null) {
      next(new Error("Player does not exist"));
    } else {
      scoreDAO.getScoreByPlayerIdAndHole(playerId, hole, function (err, existingScore) {
        if (err) {
          console.error(err);
          next(new Error("Couldn't check for existing score before posting or updaing score"));
        } else if (existingScore == null) {
          var newScore = new scoreModel(null, score, hole, playerId, getTimeUTCString());
          scoreDAO.addScore(newScore, function (err) {
            if (err) {
              console.err(err)
              next(new Error("Couldn't add a new score"));
            } else {
              next(null);
            }
          });
        } else {
          scoreDAO.updateScore(score, playerId, hole, function (err) {
            if (err) {
              console.err(err)
              next(new Error("Couldn't update existing score"));
            } else {
              next(null);
            }
          });
        }
      });
    }
  });
}

var buildScoresObject = function (scores) {
  var playerScores = [];
  if (scores == null) {
    return playerScores;
  }
  for (let i = 0; i < scores.length; i++) {
    var score = {}
    score["hole"] = scores[i].hole;
    score["score"] = scores[i].score;
    playerScores.push(score);
  }
  return playerScores;
}

var buildGroupScoreBoardHelper = function (players, scoreboard, next) {
  scoreDAO.getScoresByPlayerId(players[0].playerID, function (err, scores) {
    if (err) {
      console.error(err);
      next(new Error("Error building scoreboard"));
    } else {
      scores = buildScoresObject(scores);
      scoreboard[players[0].playerID] = scores;
      if (players.length == 1) {
        next(null, scoreboard);
      } else {
        buildGroupScoreBoardHelper(players.slice(1), scoreboard, next);
      }
    }
  });
}

var buildGroupScoreBoard = function (group, next) {
  playerDAO.getPlayersByGroupId(group.groupID, function (err, players) {
    if (err) {
      console.error(err);
      next(new Error("Couldn't get players list for group"));
    } else {
      buildGroupScoreBoardHelper(players, {}, function (err, scoreBoard) {
        if (err) {
          console.error(err);
          next(err);
        } else {
          next(null, group, scoreBoard, players);
        }
      });
    }
  });
}

var getGroup = function (groupId, next) {
  groupDAO.getGroupById(groupId, function (err, group) {
    if (err) {
      console.err(err);
      next(new Error("Couldn't get group by ID"));
    } else if (group == null) {
      next(null, null);
    } else {
      buildGroupScoreBoard(group, next);
    }
  });
}

exports.createGroup = createGroup;
exports.createGroupPlayer = createGroupPlayer;
exports.postScore = postScore;
exports.getGroup = getGroup;
