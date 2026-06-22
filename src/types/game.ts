export type Suit = "spades" | "hearts" | "diamonds" | "clubs";

export interface Card {
  suit: Suit;
  value: number;
  displayValue: string;
  id: string;
}

export type GamePhase = "player1_turn" | "player2_turn" | "result";

export type GameResult = "player1_win" | "player2_win" | "draw" | null;

export interface GameState {
  deck: Card[];
  player1Card: Card | null;
  player2Card: Card | null;
  phase: GamePhase;
  result: GameResult;
  isFlipping: boolean;
  deckResetMessage: boolean;
}

export interface Statistics {
  player1Wins: number;
  player2Wins: number;
  draws: number;
  totalGames: number;
}

export const SUIT_SYMBOLS: Record<Suit, string> = {
  spades: "♠",
  hearts: "♥",
  diamonds: "♦",
  clubs: "♣",
};

export const SUIT_COLORS: Record<Suit, string> = {
  spades: "text-card-black",
  hearts: "text-card-red",
  diamonds: "text-card-red",
  clubs: "text-card-black",
};
