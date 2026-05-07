export class SpinRequestDto {
    playerId: string;
    bet: number;
}

export class SpinResultDto {
    win: boolean;
    grid: string[][];
    payout: number;
}