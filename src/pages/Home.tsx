import { useGameStore } from "@/store/gameStore";
import Deck from "@/components/Deck";
import PlayerArea from "@/components/PlayerArea";
import ResultDisplay from "@/components/ResultDisplay";
import StatisticsPanel from "@/components/StatisticsPanel";
import DeckResetMessage from "@/components/DeckResetMessage";
import { RefreshCw } from "lucide-react";

export default function Home() {
  const {
    player1Card,
    player2Card,
    phase,
    result,
    isFlipping,
    deckResetMessage,
    drawPlayer1Card,
    drawPlayer2Card,
    startNewRound,
  } = useGameStore();

  const handleDeckClick = () => {
    if (isFlipping) return;

    if (phase === "player1_turn") {
      drawPlayer1Card();
    } else if (phase === "player2_turn") {
      drawPlayer2Card();
    }
  };

  const isDeckDisabled = phase === "result" || isFlipping;
  const player1IsWinner = result === "player1_win";
  const player2IsWinner = result === "player2_win";

  return (
    <div className="min-h-screen w-full flex flex-col overflow-hidden">
      {/* 顶部标题 */}
      <header className="pt-4 sm:pt-6 pb-2 sm:pb-4 text-center animate-slide-up">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold font-display text-gradient-gold tracking-wide">
          抽牌比大小
        </h1>
        <p className="text-white/60 text-xs sm:text-sm mt-1">
          {phase === "player1_turn" && "🎯 玩家 1 请点击牌堆抽牌"}
          {phase === "player2_turn" && "🎯 玩家 2 请点击牌堆抽牌"}
          {phase === "result" && "✨ 本轮结束，点击下方按钮开始新一局"}
        </p>
      </header>

      {/* 洗牌提示 */}
      <DeckResetMessage visible={deckResetMessage} />

      {/* 主游戏区域 */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 pb-4 gap-4 sm:gap-6">
        {/* 玩家区域 - 桌面端左右布局，移动端上下布局 */}
        <div className="w-full max-w-4xl">
          {/* 桌面端布局 */}
          <div className="hidden md:flex items-center justify-center gap-8 lg:gap-16">
            <PlayerArea
              playerName="玩家 1"
              card={player1Card}
              isActive={phase === "player1_turn"}
              isWinner={player1IsWinner}
              isFlipping={isFlipping && phase === "player2_turn"}
              position="left"
            />

            <Deck onClick={handleDeckClick} disabled={isDeckDisabled} />

            <PlayerArea
              playerName="玩家 2"
              card={player2Card}
              isActive={phase === "player2_turn"}
              isWinner={player2IsWinner}
              isFlipping={isFlipping && phase === "result"}
              position="right"
            />
          </div>

          {/* 移动端布局 */}
          <div className="flex md:hidden flex-col items-center gap-4">
            <PlayerArea
              playerName="玩家 1"
              card={player1Card}
              isActive={phase === "player1_turn"}
              isWinner={player1IsWinner}
              isFlipping={isFlipping && phase === "player2_turn"}
              position="left"
            />

            <Deck onClick={handleDeckClick} disabled={isDeckDisabled} />

            <PlayerArea
              playerName="玩家 2"
              card={player2Card}
              isActive={phase === "player2_turn"}
              isWinner={player2IsWinner}
              isFlipping={isFlipping && phase === "result"}
              position="right"
            />
          </div>
        </div>

        {/* 新一局按钮 */}
        {phase === "result" && (
          <button
            onClick={startNewRound}
            className="animate-bounce-in glass-button px-8 py-3 rounded-full text-white font-bold flex items-center gap-2 hover:scale-105 active:scale-95 transition-transform duration-200"
          >
            <RefreshCw size={18} />
            新一局
          </button>
        )}
      </main>

      {/* 底部统计面板 */}
      <footer className="px-4 pb-4 sm:pb-6">
        <StatisticsPanel />
      </footer>

      {/* 结果展示 */}
      <ResultDisplay result={result} visible={phase === "result"} />
    </div>
  );
}
