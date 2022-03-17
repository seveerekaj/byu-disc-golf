export interface Player {
    playerId: number;
    nickname: string;
    score: number
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
    scores: playerHoleScores[]
}
