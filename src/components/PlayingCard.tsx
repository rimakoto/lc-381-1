import { useEffect, useState } from "react";
import type { Card } from "@/types/game";
import { SUIT_SYMBOLS, SUIT_COLORS } from "@/types/game";

interface PlayingCardProps {
  card: Card | null;
  isFlipping?: boolean;
  isWinner?: boolean;
  size?: "small" | "medium" | "large";
  flyDirection?: "left" | "right" | "top" | "bottom" | null;
}

export default function PlayingCard({
  card,
  isFlipping = false,
  isWinner = false,
  size = "large",
  flyDirection = null,
}: PlayingCardProps) {
  const [showFront, setShowFront] = useState(false);
  const [prevCardId, setPrevCardId] = useState<string | null>(null);

  useEffect(() => {
    if (card && isFlipping) {
      setShowFront(false);
      const timer = setTimeout(() => {
        setShowFront(true);
      }, 350);
      setPrevCardId(card.id);
      return () => clearTimeout(timer);
    } else if (card) {
      if (card.id !== prevCardId) {
        setShowFront(true);
      }
      setPrevCardId(card.id);
    } else {
      setShowFront(false);
      setPrevCardId(null);
    }
  }, [card, isFlipping, prevCardId]);

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

  const flyInClass = isFlipping && flyDirection
    ? {
        left: "fly-in-left",
        right: "fly-in-right",
        top: "fly-in-top",
        bottom: "fly-in-bottom",
      }[flyDirection]
    : "";

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

  const shouldUsePreserve3d = isFlipping && flyDirection;

  return (
    <div
      className={`perspective-1000 ${sizeClasses[size]} ${
        isWinner ? "animate-glow-gold" : ""
      } ${flyInClass}`}
    >
      <div
        className={`relative w-full h-full ${shouldUsePreserve3d ? "" : "preserve-3d"} ${
          isFlipping && !flyDirection ? "transition-transform duration-700" : ""
        } ${
          !isFlipping && showFront ? "rotate-y-180" : ""
        } ${flyDirection ? "" : showFront ? "rotate-y-180" : ""}`}
      >
        {/* 背面 */}
        <div
          className={`absolute inset-0 rounded-xl card-back-pattern bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 border-4 border-white/80 card-shadow backface-hidden flex items-center justify-center ${
            flyInClass && !showFront ? "opacity-100" : ""
          }`}
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
