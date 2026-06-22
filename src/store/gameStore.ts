import { create } from "zustand";
import type { Card, GamePhase, GameResult, Statistics } from "@/types/game";
import {
  createDeck,
  drawCard,
  compareCards,
  loadStatistics,
  saveStatistics,
} from "@/utils/game";

interface GameStore {
  deck: Card[];
  player1Card: Card | null;
  player2Card: Card | null;
  phase: GamePhase;
  result: GameResult;
  player1Flipping: boolean;
  player2Flipping: boolean;
  deckResetMessage: boolean;
  statistics: Statistics;
  drawPlayer1Card: () => void;
  drawPlayer2Card: () => void;
  startNewRound: () => void;
  resetStatistics: () => void;
}

const initialStats = loadStatistics();

export const useGameStore = create<GameStore>((set, get) => ({
  deck: createDeck(),
  player1Card: null,
  player2Card: null,
  phase: "player1_turn",
  result: null,
  player1Flipping: false,
  player2Flipping: false,
  deckResetMessage: false,
  statistics: initialStats,

  drawPlayer1Card: () => {
    const { deck } = get();

    let currentDeck = deck;
    let resetShown = false;

    if (deck.length === 0) {
      currentDeck = createDeck();
      resetShown = true;
    }

    const { card, newDeck } = drawCard(currentDeck);

    set({
      player1Flipping: true,
    });

    setTimeout(() => {
      set((state) => ({
        deck: newDeck,
        player1Card: card,
        phase: "player2_turn",
        player1Flipping: false,
        deckResetMessage: resetShown,
      }));

      if (resetShown) {
        setTimeout(() => {
          set({ deckResetMessage: false });
        }, 2000);
      }
    }, 700);
  },

  drawPlayer2Card: () => {
    const { deck, player1Card } = get();

    if (!player1Card) return;

    let currentDeck = deck;
    let resetShown = false;

    if (deck.length === 0) {
      currentDeck = createDeck();
      resetShown = true;
    }

    const { card, newDeck } = drawCard(currentDeck);

    set({
      player2Flipping: true,
    });

    setTimeout(() => {
      const result = compareCards(player1Card, card);

      set((state) => {
        const newStats = {
          ...state.statistics,
          totalGames: state.statistics.totalGames + 1,
        };

        if (result === "player1_win") {
          newStats.player1Wins += 1;
        } else if (result === "player2_win") {
          newStats.player2Wins += 1;
        } else {
          newStats.draws += 1;
        }

        saveStatistics(newStats);

        return {
          deck: newDeck,
          player2Card: card,
          phase: "result",
          result,
          player2Flipping: false,
          deckResetMessage: resetShown,
          statistics: newStats,
        };
      });

      if (resetShown) {
        setTimeout(() => {
          set({ deckResetMessage: false });
        }, 2000);
      }
    }, 700);
  },

  startNewRound: () => {
    const { deck } = get();

    let currentDeck = deck;
    let resetShown = false;

    if (deck.length < 2) {
      currentDeck = createDeck();
      resetShown = true;
    }

    set({
      player1Card: null,
      player2Card: null,
      phase: "player1_turn",
      result: null,
      deck: currentDeck,
      deckResetMessage: resetShown,
      player1Flipping: false,
      player2Flipping: false,
    });

    if (resetShown) {
      setTimeout(() => {
        set({ deckResetMessage: false });
      }, 2000);
    }
  },

  resetStatistics: () => {
    const newStats = {
      player1Wins: 0,
      player2Wins: 0,
      draws: 0,
      totalGames: 0,
    };
    saveStatistics(newStats);
    set({ statistics: newStats });
  },
}));
