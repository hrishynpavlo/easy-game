import { Injectable } from '@nestjs/common';
import { SpinRequestDto, SpinResultDto } from './spin.dto';

const SYMBOLS = ['🍒', '🍋', '🍊', '🍇', '⭐'];

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  spin(request: SpinRequestDto): SpinResultDto {
    const grid = this.generateGrid();
    const middleRow = grid[1];
    const win = this.isWin(middleRow);
    const payout = win ? Number(request.bet) * 2 : 0;

    return { win, grid, payout };
  }

  private generateGrid(): string[][] {
    return Array.from({ length: 3 }, () =>
      Array.from({ length: 3 }, () =>
        SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)]
      )
    );
  }

  private isWin(row: string[]): boolean {
    return row[0] === row[1] && row[1] === row[2];
  }
}
