import type { Card, Suit, GameResult } from "@/types/game";

const SUITS: Suit[] = ["spades", "hearts", "diamonds", "clubs"];

const VALUE_MAP: Record<number, string> = {
  1: "A",
  2: "2",
  3: "3",
  4: "4",
  5: "5",
  6: "6",
  7: "7",
  8: "8",
  9: "9",
  10: "10",
  11: "J",
  12: "Q",
  13: "K",
};

export function createDeck(): Card[] {
  const deck: Card[] = [];

  for (const suit of SUITS) {
    for (let value = 1; value <= 13; value++) {
      deck.push({
        suit,
        value,
        displayValue: VALUE_MAP[value],
        id: `${suit}-${value}`,
      });
    }
  }

  return shuffleDeck(deck);
}

export function shuffleDeck(deck: Card[]): Card[] {
  const shuffled = [...deck];

  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  return shuffled;
}

export function drawCard(deck: Card[]): { card: Card; newDeck: Card[] } {
  if (deck.length === 0) {
    const newDeck = createDeck();
    return { card: newDeck[0], newDeck: newDeck.slice(1) };
  }

  return { card: deck[0], newDeck: deck.slice(1) };
}

export function compareCards(card1: Card, card2: Card): GameResult {
  if (card1.value > card2.value) {
    return "player1_win";
  } else if (card1.value < card2.value) {
    return "player2_win";
  } else {
    return "draw";
  }
}

export const STORAGE_KEY = "poker-game-statistics";

export function loadStatistics() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch {
    // ignore
  }
  return {
    player1Wins: 0,
    player2Wins: 0,
    draws: 0,
    totalGames: 0,
  };
}

export function saveStatistics(stats: {
  player1Wins: number;
  player2Wins: number;
  draws: number;
  totalGames: number;
}) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stats));
  } catch {
    // ignore
  }
}

export function calculateWinRate(wins: number, total: number): number {
  if (total === 0) return 0;
  return Math.round((wins / total) * 100);
}
