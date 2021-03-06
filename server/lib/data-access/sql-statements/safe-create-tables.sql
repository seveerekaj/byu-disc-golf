CREATE TABLE IF NOT EXISTS PlayerGroup(
    PlayerGroupID INTEGER PRIMARY KEY,
    GroupCode TEXT NOT NULL UNIQUE,
    CreationDateTime TEXT NOT NULL
);
CREATE TABLE IF NOT EXISTS Player(
    PlayerID INTEGER PRIMARY KEY,
    NickName TEXT NOT NULL,
    CreationDateTime TEXT NOT NULL,
    GroupID INTEGER,
    FOREIGN KEY (GroupID) REFERENCES PlayerGroup(PlayerGroupID)
);
CREATE TABLE IF NOT EXISTS Score(
    ScoreID INTEGER PRIMARY KEY,
    Score INTEGER NOT NULL,
    Hole INTEGER NOT NULL,
    PlayerID INTEGER NOT NULL,
    CreationDateTime TEXT NOT NULL,
    FOREIGN KEY (PlayerID) REFERENCES Player(PlayerID)
);
CREATE TABLE IF NOT EXISTS FinalScore(
    FinalScoreID INTEGER PRIMARY KEY,
    FinalScore INTEGER NOT NULL,
    Initials TEXT NOT NULL,
    CreationDateTime TEXT NOT NULL
);