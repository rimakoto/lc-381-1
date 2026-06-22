import { useEffect, useState } from "react";
import type { GameResult } from "@/types/game";
import { RefreshCw } from "lucide-react";

interface ResultDisplayProps {
  result: GameResult;
  visible: boolean;
  onNewRound: () => void;
}

export default function ResultDisplay({
  result,
  visible,
  onNewRound,
}: ResultDisplayProps) {
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

      {/* 结果弹窗 - 居中固定定位，带新一局按钮 */}
      <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
        <div
          className={`animate-bounce-in text-center px-8 py-6 sm:px-12 sm:py-8 rounded-3xl pointer-events-auto max-w-[90vw] ${
            result === "draw"
              ? "bg-white/10 backdrop-blur-xl border-2 border-white/30"
              : "bg-gradient-to-br from-poker-gold/20 to-poker-gold-light/10 backdrop-blur-xl border-2 border-poker-gold/40 animate-glow-gold"
          }`}
        >
          <div className="text-5xl sm:text-7xl mb-2 sm:mb-3">
            {content.icon}
          </div>
          <h2
            className={`text-2xl sm:text-4xl font-bold font-display mb-1 sm:mb-2 ${
              result === "draw" ? "text-white" : "text-gradient-gold"
            }`}
          >
            {content.text}
          </h2>
          <p
            className={`text-sm sm:text-lg mb-5 sm:mb-6 ${
              result === "draw" ? "text-white/70" : "text-white/80"
            }`}
          >
            {content.subtext}
          </p>

          {/* 新一局按钮 - 直接在结果弹窗内，确保可见可点击 */}
          <button
            onClick={onNewRound}
            className="glass-button px-8 py-3 rounded-full text-white font-bold flex items-center gap-2 mx-auto hover:scale-105 active:scale-95 transition-transform duration-200 shadow-lg shadow-black/30"
            style={{ pointerEvents: "auto" }}
          >
            <RefreshCw size={18} />
            新一局
          </button>
        </div>
      </div>
    </>
  );
}
