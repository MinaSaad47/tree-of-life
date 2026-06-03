type FloatingResetButtonProps = {
  disabled: boolean;
  onReset: () => void;
};

export function FloatingResetButton({ disabled, onReset }: FloatingResetButtonProps) {
  return (
    <button className="floating-reset-button" type="button" onClick={onReset} disabled={disabled}>
      ابدأ من جديد
    </button>
  );
}
