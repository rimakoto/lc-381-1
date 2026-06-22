import { useEffect, useState } from "react";
import type { Card } from "@/types/game";
import { SUIT_SYMBOLS, SUIT_COLORS } from "@/types/game";

interface PlayingCardProps {
  card: Card | null;
  isFlipping?: boolean;
  isWinner?: boolean;
  size?: "small" | "medium" | "large";
}

export default function PlayingCard({
  card,
  isFlipping = false,
  isWinner = false,
  size = "large",
}: PlayingCardProps) {
  const [showFront, setShowFront] = useState(false);

  useEffect(() => {
    if (card && isFlipping) {
      const timer = setTimeout(() => {
        setShowFront(true);
      }, 300);
      return () => clearTimeout(timer);
    } else if (card) {
      setShowFront(true);
    } else {
      setShowFront(false);
    }
  }, [card, isFlipping]);

  const sizeClasses = {
    small: "w-20 h-28 sm:w-24 sm:h-32",
    medium: "w-28 h-40 sm:w-32 sm:h-44",
    large: "w-32 h-44 sm:w-40 sm:h-56",
  };

  const fontSizeClasses = {
    small: { value: "text-lg", suit: "text-xl", center: "text-2xl" },
    medium: { value: "text-xl", suit: "text-2xl", center: "text-4xl" },
    large: { value: "text-2xl", suit: "text-3xl", center: "text-6xl" },
  };

  if (!card) {
    return (
      <div
        className={`${sizeClasses[size]} rounded-xl border-2 border-dashed border-white/20 flex items-center justify-center`}
      >
        <span className="text-white/30 text-sm">等待抽牌</span>
      </div>
    );
  }

  const suitSymbol = SUIT_SYMBOLS[card.suit];
  const suitColor = SUIT_COLORS[card.suit];

  return (
    <div
      className={`perspective-1000 ${sizeClasses[size]} ${
        isWinner ? "animate-glow-gold" : ""
      } ${isFlipping ? "animate-bounce-in" : ""}`}
    >
      <div
        className={`relative w-full h-full preserve-3d transition-transform duration-600 ${
          showFront ? "rotate-y-180" : ""
        }`}
      >
        {/* 背面 */}
        <div
          className={`absolute inset-0 rounded-xl card-back-pattern bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 border-4 border-white/80 card-shadow backface-hidden flex items-center justify-center`}
        >
          <div className="absolute inset-2 rounded-lg border-2 border-white/20" />
          <div className="text-white/40 text-4xl font-bold font-display select-none">
            ♠♥
          </div>
          <div className="absolute bottom-3 text-white/40 text-4xl font-bold font-display select-none rotate-180">
            ♣♦
          </div>
        </div>

        {/* 正面 */}
        <div
          className={`absolute inset-0 rounded-xl bg-white card-shadow backface-hidden rotate-y-180 flex flex-col overflow-hidden`}
        >
          {/* 左上角 */}
          <div
            className={`flex flex-col items-start p-2 sm:p-3 leading-none ${suitColor}`}
          >
            <span
              className={`font-display font-bold ${fontSizeClasses[size].value}`}
            >
              {card.displayValue}
            </span>
            <span
              className={`font-suit ${fontSizeClasses[size].suit} -mt-1`}
            >
              {suitSymbol}
            </span>
          </div>

          {/* 中央 */}
          <div className="flex-1 flex items-center justify-center">
            <span
              className={`font-suit ${suitColor} ${fontSizeClasses[size].center} select-none`}
            >
              {suitSymbol}
            </span>
          </div>

          {/* 右下角 */}
          <div
            className={`flex flex-col items-end p-2 sm:p-3 leading-none rotate-180 ${suitColor}`}
          >
            <span
              className={`font-display font-bold ${fontSizeClasses[size].value}`}
            >
              {card.displayValue}
            </span>
            <span
              className={`font-suit ${fontSizeClasses[size].suit} -mt-1`}
            >
              {suitSymbol}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
