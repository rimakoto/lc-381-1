import { useGameStore } from "@/store/gameStore";

interface DeckProps {
  onClick: () => void;
  disabled?: boolean;
}

export default function Deck({ onClick, disabled = false }: DeckProps) {
  const remainingCards = useGameStore((state) => state.deck.length);

  const canClick = !disabled;

  return (
    <div className="flex flex-col items-center gap-3">
      <button
        onClick={canClick ? onClick : undefined}
        disabled={!canClick}
        className={`relative group transition-all duration-300 ${
          canClick
            ? "cursor-pointer hover:scale-105 active:scale-95"
            : "cursor-not-allowed opacity-50"
        }`}
      >
        {/* 牌堆堆叠效果 - 底层多张牌 */}
        <div className="relative w-32 h-44 sm:w-40 sm:h-56">
          {/* 最底层的牌 - 制造厚度感 */}
          <div
            className="absolute top-3 left-3 w-full h-full rounded-xl bg-gradient-to-br from-blue-950 to-blue-900 border-4 border-white/60 shadow-lg"
            style={{ transform: "translate(-2px, -2px)" }}
          />
          <div
            className="absolute top-2 left-2 w-full h-full rounded-xl bg-gradient-to-br from-blue-900 to-blue-800 border-4 border-white/70 shadow-lg"
            style={{ transform: "translate(-1px, -1px)" }}
          />

          {/* 最上面的牌 */}
          <div
            className={`relative w-full h-full rounded-xl card-back-pattern bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 border-4 border-white/80 card-shadow transition-all duration-300 ${
              canClick ? "animate-pulse-glow" : ""
            }`}
          >
            <div className="absolute inset-2 rounded-lg border-2 border-white/20" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-white/50 text-5xl sm:text-6xl font-bold font-display select-none flex gap-1">
                <span>♠</span>
                <span className="text-card-red">♥</span>
              </div>
            </div>
            <div className="absolute bottom-3 left-3 text-white/40 text-3xl sm:text-4xl font-bold font-display select-none rotate-180 flex gap-1">
              <span>♣</span>
              <span className="text-card-red">♦</span>
            </div>
          </div>
        </div>

        {/* 可点击时的悬浮提示 */}
        {canClick && (
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-3 h-3 bg-poker-gold rounded-full animate-bounce opacity-70" />
        )}
      </button>

      {/* 剩余牌数 */}
      <div className="flex flex-col items-center gap-1">
        <div className="text-white/70 text-sm font-medium">
          剩余 <span className="text-poker-gold font-bold">{remainingCards}</span>{" "}
          张
        </div>
        {canClick && (
          <div className="text-white/50 text-xs animate-pulse">点击抽牌</div>
        )}
      </div>
    </div>
  );
}
