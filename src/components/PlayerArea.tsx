import PlayingCard from "./PlayingCard";
import type { Card } from "@/types/game";

interface PlayerAreaProps {
  playerName: string;
  card: Card | null;
  isActive: boolean;
  isWinner: boolean;
  isFlipping: boolean;
  position: "left" | "right";
  flyDirection?: "left" | "right" | "top" | "bottom" | null;
}

export default function PlayerArea({
  playerName,
  card,
  isActive,
  isWinner,
  isFlipping,
  position,
  flyDirection = null,
}: PlayerAreaProps) {
  return (
    <div
      className={`flex flex-col items-center gap-4 transition-all duration-500 ${
        position === "left" ? "animate-slide-up" : "animate-slide-up"
      }`}
      style={{
        animationDelay: position === "left" ? "0ms" : "200ms",
      }}
    >
      {/* 玩家名称标签 */}
      <div
        className={`px-5 py-2 rounded-full font-bold text-sm sm:text-base transition-all duration-300 ${
          isActive
            ? "bg-poker-gold text-poker-green-dark shadow-lg shadow-poker-gold/30 scale-110"
            : isWinner
              ? "bg-poker-gold text-poker-green-dark shadow-lg shadow-poker-gold/30"
              : "glass-button text-white/80"
        }`}
      >
        {isWinner && <span className="mr-1">👑</span>}
        {playerName}
      </div>

      {/* 扑克牌容器 - 加高亮效果 */}
      <div className={`relative ${isActive ? "player-active-glow p-1" : ""}`}>
        <PlayingCard
          card={card}
          isFlipping={isFlipping}
          isWinner={isWinner}
          size="large"
          flyDirection={flyDirection}
        />

        {/* 胜利光环效果 */}
        {isWinner && (
          <div className="absolute inset-0 -m-4 rounded-3xl border-2 border-poker-gold/50 animate-pulse pointer-events-none" />
        )}

        {/* 当前玩家指示箭头 */}
        {isActive && (
          <div className="absolute -top-8 left-1/2 -translate-x-1/2 animate-bounce">
            <div className="text-poker-gold text-2xl">▼</div>
          </div>
        )}
      </div>
    </div>
  );
}
