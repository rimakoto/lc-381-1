import { useEffect, useState } from "react";
import type { GameResult } from "@/types/game";

interface ResultDisplayProps {
  result: GameResult;
  visible: boolean;
}

export default function ResultDisplay({ result, visible }: ResultDisplayProps) {
  const [confetti, setConfetti] = useState<
    { id: number; left: number; delay: number; color: string; size: number }[]
  >([]);

  useEffect(() => {
    if (visible && result && result !== "draw") {
      const colors = ["#d4af37", "#f0d060", "#d63434", "#0d4f3c", "#ffffff"];
      const pieces = Array.from({ length: 50 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 0.5,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: 6 + Math.random() * 10,
      }));
      setConfetti(pieces);

      const timer = setTimeout(() => {
        setConfetti([]);
      }, 3500);

      return () => clearTimeout(timer);
    }
  }, [visible, result]);

  if (!visible || !result) return null;

  const getContent = () => {
    switch (result) {
      case "player1_win":
        return {
          icon: "🏆",
          text: "玩家 1 获胜!",
          subtext: "恭喜!",
        };
      case "player2_win":
        return {
          icon: "🏆",
          text: "玩家 2 获胜!",
          subtext: "恭喜!",
        };
      case "draw":
        return {
          icon: "🤝",
          text: "平局",
          subtext: "再来一局!",
        };
      default:
        return null;
    }
  };

  const content = getContent();
  if (!content) return null;

  return (
    <>
      {/* 彩带 */}
      {confetti.map((piece) => (
        <div
          key={piece.id}
          className="confetti rounded-sm"
          style={{
            left: `${piece.left}%`,
            width: `${piece.size}px`,
            height: `${piece.size}px`,
            backgroundColor: piece.color,
            animationDelay: `${piece.delay}s`,
          }}
        />
      ))}

      {/* 结果弹窗 */}
      <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-50">
        <div
          className={`animate-bounce-in text-center px-8 py-6 sm:px-12 sm:py-8 rounded-3xl ${
            result === "draw"
              ? "bg-white/10 backdrop-blur-xl border-2 border-white/30"
              : "bg-gradient-to-br from-poker-gold/20 to-poker-gold-light/10 backdrop-blur-xl border-2 border-poker-gold/40 animate-glow-gold"
          }`}
        >
          <div className="text-6xl sm:text-7xl mb-3">{content.icon}</div>
          <h2
            className={`text-3xl sm:text-4xl font-bold font-display mb-2 ${
              result === "draw" ? "text-white" : "text-gradient-gold"
            }`}
          >
            {content.text}
          </h2>
          <p
            className={`text-base sm:text-lg ${
              result === "draw" ? "text-white/70" : "text-white/80"
            }`}
          >
            {content.subtext}
          </p>
        </div>
      </div>
    </>
  );
}
