import { useGameStore } from "@/store/gameStore";
import { calculateWinRate } from "@/utils/game";
import { RotateCcw } from "lucide-react";

export default function StatisticsPanel() {
  const { statistics, resetStatistics } = useGameStore();
  const { player1Wins, player2Wins, draws, totalGames } = statistics;

  const player1Rate = calculateWinRate(player1Wins, totalGames);
  const player2Rate = calculateWinRate(player2Wins, totalGames);
  const drawRate = calculateWinRate(draws, totalGames);

  return (
    <div className="w-full max-w-md mx-auto animate-slide-up" style={{ animationDelay: "400ms" }}>
      <div className="glass-button rounded-2xl p-4 sm:p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-white font-bold text-base sm:text-lg flex items-center gap-2">
            <span className="text-poker-gold">📊</span> 对战统计
          </h3>
          <button
            onClick={resetStatistics}
            className="p-2 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-all duration-200"
            title="重置统计"
          >
            <RotateCcw size={16} />
          </button>
        </div>

        {/* 总局数 */}
        <div className="text-center mb-4 pb-4 border-b border-white/10">
          <div className="text-white/60 text-xs sm:text-sm">总局数</div>
          <div className="text-2xl sm:text-3xl font-bold text-gradient-gold font-display">
            {totalGames}
          </div>
        </div>

        {/* 玩家统计 */}
        <div className="grid grid-cols-3 gap-3">
          {/* 玩家1 */}
          <div className="text-center">
            <div className="text-white/70 text-xs sm:text-sm mb-1">玩家1</div>
            <div className="text-xl sm:text-2xl font-bold text-white mb-1">
              {player1Wins}
            </div>
            <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blue-400 to-blue-500 rounded-full transition-all duration-500"
                style={{ width: `${player1Rate}%` }}
              />
            </div>
            <div className="text-xs text-white/50 mt-1">{player1Rate}%</div>
          </div>

          {/* 平局 */}
          <div className="text-center">
            <div className="text-white/70 text-xs sm:text-sm mb-1">平局</div>
            <div className="text-xl sm:text-2xl font-bold text-white mb-1">
              {draws}
            </div>
            <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-gray-400 to-gray-500 rounded-full transition-all duration-500"
                style={{ width: `${drawRate}%` }}
              />
            </div>
            <div className="text-xs text-white/50 mt-1">{drawRate}%</div>
          </div>

          {/* 玩家2 */}
          <div className="text-center">
            <div className="text-white/70 text-xs sm:text-sm mb-1">玩家2</div>
            <div className="text-xl sm:text-2xl font-bold text-white mb-1">
              {player2Wins}
            </div>
            <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-poker-gold to-poker-gold-light rounded-full transition-all duration-500"
                style={{ width: `${player2Rate}%` }}
              />
            </div>
            <div className="text-xs text-white/50 mt-1">{player2Rate}%</div>
          </div>
        </div>
      </div>
    </div>
  );
}
