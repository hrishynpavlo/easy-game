# Easy Game 🎰

A microservice-based online slot machine built with NestJS.

## Overview

A 3×3 slot machine where winning is determined by a matching middle row combination.
All spin logic and probability calculations happen server-side.

## Architecture

```
┌─────────────────┐     WebSocket (Socket.io)     ┌─────────────────┐
│  easy-game-     │ ─────────────────────────────▶ │  easy-game-     │
│  client         │ ◀───────────────────────────── │  engine         │
│  (UI, port 4000)│                                │  (port 3000)    │
└─────────────────┘                                └─────────────────┘
                                                   ┌─────────────────┐
                                                   │  easy-game-     │
                                                   │  state          │
                                                   │  (balances, DB) │
                                                   └─────────────────┘
                                                   ┌─────────────────┐
                                                   │  easy-game-     │
                                                   │  admin          │
                                                   │  (leaderboard)  │
                                                   └─────────────────┘
```

## Services

| Service | Description | Transport | Port |
|---|---|---|---|
| `easy-game-engine` | Spin logic, RNG, win calculation | WebSocket + HTTP | 3000 |
| `easy-game-client` | Browser UI, slot machine interface | HTTP (static) | 4000 |
| `easy-game-state` | Player balances, spin history | TCP + PostgreSQL | — |
| `easy-game-admin` | Leaderboard, statistics | HTTP | — |

## Game Rules

- **Grid**: 3×3 symbols
- **Symbols**: 🍒 🍋 🍊 🍇 ⭐
- **Win condition**: all 3 symbols in the middle row are identical
- **Payout**: `bet × 2` on win

## WebSocket API

**Event: `spin`**
```json
// Request
{ "playerId": "user1", "bet": 10 }

// Response → spin_result
{
  "win": true,
  "grid": [["🍒","🍋","🍊"],["🍒","🍒","🍒"],["🍇","⭐","🍋"]],
  "payout": 20
}
```

## Running Locally

```bash
# Engine
cd easy-game-engine
npm install
npm run start:dev

# Client UI
cd easy-game-client
npm install
npm start
```

Open **http://localhost:4000** in your browser.

## Roadmap

- [x] Spin Engine — RNG, 3×3 grid generation, middle row win check
- [x] WebSocket Gateway — real-time spin events via Socket.io
- [x] Client UI — animated slot machine in the browser
- [ ] Player balance — deduct bet before spin, credit payout on win
- [ ] Spin history — persist results to PostgreSQL
- [ ] `easy-game-state` microservice — manage balances and history via TCP
- [ ] `easy-game-admin` microservice — HTTP API with leaderboard and stats
- [ ] Authentication — player login / JWT
- [ ] Provably Fair — verifiable RNG using server + client seeds
