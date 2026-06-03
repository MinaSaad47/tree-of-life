type FloatingResetButtonProps = {
  disabled: boolean;
  isFullscreen: boolean;
  onReset: () => void;
  onToggleFullscreen: () => void;
};

export function FloatingResetButton({ disabled, isFullscreen, onReset, onToggleFullscreen }: FloatingResetButtonProps) {
  return (
    <div className="floating-action-buttons" aria-label="أزرار اللعبة">
      <button className="floating-control-button" type="button" onClick={onToggleFullscreen}>
        {isFullscreen ? "اخرج من ملء الشاشة" : "ملء الشاشة"}
      </button>
      <button className="floating-control-button floating-control-button--reset" type="button" onClick={onReset} disabled={disabled}>
        ابدأ من جديد
      </button>
    </div>
  );
}
