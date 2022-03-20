export interface Player {
    playerID: number;
    nickName: string;
    groupId: number;
}

export interface HoleScore {
    holdId: number;
    score: number;
}

export interface playerHoleScores {
    [playerId: number]: HoleScore[];
}

export interface ScoreboardWrapper {
    status: string;
    message: string;
    groupId: string;
    state: string;
    players: Player[];
    scoreboard: playerHoleScores;
}
