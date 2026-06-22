interface DeckResetMessageProps {
  visible: boolean;
}

export default function DeckResetMessage({ visible }: DeckResetMessageProps) {
  if (!visible) return null;

  return (
    <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 animate-bounce-in">
      <div className="px-6 py-3 rounded-full bg-gradient-to-r from-poker-gold/90 to-poker-gold-light/90 text-poker-green-dark font-bold shadow-lg shadow-poker-gold/30 flex items-center gap-2">
        <span>🃏</span>
        <span>牌堆已重新洗牌!</span>
      </div>
    </div>
  );
}
