import { useGameStore } from "@/store/gameStore";
import Deck from "@/components/Deck";
import PlayerArea from "@/components/PlayerArea";
import ResultDisplay from "@/components/ResultDisplay";
import StatisticsPanel from "@/components/StatisticsPanel";
import DeckResetMessage from "@/components/DeckResetMessage";

export default function Home() {
  const {
    player1Card,
    player2Card,
    phase,
    result,
    player1Flipping,
    player2Flipping,
    deckResetMessage,
    drawPlayer1Card,
    drawPlayer2Card,
    startNewRound,
  } = useGameStore();

  const handleDeckClick = () => {
    if (player1Flipping || player2Flipping) return;

    if (phase === "player1_turn") {
      drawPlayer1Card();
    } else if (phase === "player2_turn") {
      drawPlayer2Card();
    }
  };

  const isDeckDisabled =
    phase === "result" || player1Flipping || player2Flipping;
  const player1IsWinner = result === "player1_win";
  const player2IsWinner = result === "player2_win";

  return (
    <div className="min-h-full w-full flex flex-col">
      {/* 洗牌提示 */}
      <DeckResetMessage visible={deckResetMessage} />

      {/* 顶部标题 */}
      <header className="pt-3 sm:pt-5 pb-2 sm:pb-3 text-center animate-slide-up flex-shrink-0">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold font-display text-gradient-gold tracking-wide">
          抽牌比大小
        </h1>
        <p className="text-white/60 text-xs sm:text-sm mt-1">
          {phase === "player1_turn" && "🎯 玩家 1 请点击牌堆抽牌"}
          {phase === "player2_turn" && "🎯 玩家 2 请点击牌堆抽牌"}
          {phase === "result" && "✨ 本轮结束，点击弹窗中的按钮开始新一局"}
        </p>
      </header>

      {/* 主游戏区域 */}
      <main className="flex-1 flex flex-col items-center justify-center px-3 py-2 gap-3 sm:gap-5 min-h-0">
        {/* 玩家区域 */}
        <div className="w-full max-w-5xl flex-shrink-0">
          {/* 桌面端布局：玩家1(左) - 牌堆(中) - 玩家2(右) */}
          <div className="hidden md:flex items-center justify-center gap-6 lg:gap-12 xl:gap-16">
            <PlayerArea
              playerName="玩家 1"
              card={player1Card}
              isActive={phase === "player1_turn"}
              isWinner={player1IsWinner}
              isFlipping={player1Flipping}
              position="left"
              flyDirection={player1Flipping ? "right" : null}
            />

            <Deck onClick={handleDeckClick} disabled={isDeckDisabled} />

            <PlayerArea
              playerName="玩家 2"
              card={player2Card}
              isActive={phase === "player2_turn"}
              isWinner={player2IsWinner}
              isFlipping={player2Flipping}
              position="right"
              flyDirection={player2Flipping ? "left" : null}
            />
          </div>

          {/* 移动端布局：玩家1(上) - 牌堆(中) - 玩家2(下) */}
          <div className="flex md:hidden flex-col items-center gap-3">
            <PlayerArea
              playerName="玩家 1"
              card={player1Card}
              isActive={phase === "player1_turn"}
              isWinner={player1IsWinner}
              isFlipping={player1Flipping}
              position="left"
              flyDirection={player1Flipping ? "bottom" : null}
            />

            <Deck onClick={handleDeckClick} disabled={isDeckDisabled} />

            <PlayerArea
              playerName="玩家 2"
              card={player2Card}
              isActive={phase === "player2_turn"}
              isWinner={player2IsWinner}
              isFlipping={player2Flipping}
              position="right"
              flyDirection={player2Flipping ? "top" : null}
            />
          </div>
        </div>
      </main>

      {/* 底部统计面板 */}
      <footer className="px-3 pb-3 sm:pb-5 pt-1 flex-shrink-0">
        <StatisticsPanel />
      </footer>

      {/* 结果展示 - 包含新一局按钮，居中固定定位 */}
      <ResultDisplay
        result={result}
        visible={phase === "result"}
        onNewRound={startNewRound}
      />
    </div>
  );
}
