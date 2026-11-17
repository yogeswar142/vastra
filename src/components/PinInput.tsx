import React, { useRef, useEffect } from 'react';

interface PinInputProps {
  length?: number;
  value: string[];
  onChange: (value: string[]) => void;
  onComplete?: (pin: string) => void;
  hasError?: boolean;
  disabled?: boolean;
}

export const PinInput: React.FC<PinInputProps> = ({
  length = 6,
  value,
  onChange,
  onComplete,
  hasError = false,
  disabled = false,
}) => {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    // Focus the first empty field on initial load
    const firstEmptyIndex = value.findIndex((val) => val === '');
    const indexToFocus = firstEmptyIndex === -1 ? 0 : firstEmptyIndex;
    if (inputRefs.current[indexToFocus] && !disabled) {
      inputRefs.current[indexToFocus]?.focus();
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const rawVal = e.target.value;
    // Only accept numbers
    const char = rawVal.replace(/\D/g, '').slice(-1);

    const newPin = [...value];
    newPin[index] = char;
    onChange(newPin);

    // If character was entered, shift to next field
    if (char && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }

    // Check completion
    if (newPin.every((digit) => digit.length === 1)) {
      onComplete?.(newPin.join(''));
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Backspace') {
      if (!value[index] && index > 0) {
        // Move to previous and clear it
        const newPin = [...value];
        newPin[index - 1] = '';
        onChange(newPin);
        inputRefs.current[index - 1]?.focus();
        e.preventDefault();
      } else {
        const newPin = [...value];
        newPin[index] = '';
        onChange(newPin);
      }
    } else if (e.key === 'ArrowLeft' && index > 0) {
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === 'ArrowRight' && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, length);
    if (!pastedData) return;

    const newPin = [...value];
    for (let i = 0; i < length; i++) {
      newPin[i] = pastedData[i] || '';
    }
    onChange(newPin);

    // Focus on next available box or the last box
    const nextIndex = Math.min(pastedData.length, length - 1);
    inputRefs.current[nextIndex]?.focus();

    if (pastedData.length === length) {
      onComplete?.(pastedData);
    }
  };

  return (
    <div
      className={`pin-inputs-container ${hasError ? 'has-error' : ''}`}
      role="group"
      aria-label="Showroom 6-digit access PIN"
    >
      {Array.from({ length }).map((_, index) => (
        <div key={index} className="pin-box-wrapper">
          <input
            ref={(el) => {
              inputRefs.current[index] = el;
            }}
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            maxLength={1}
            value={value[index] || ''}
            onChange={(e) => handleChange(e, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            onPaste={handlePaste}
            onFocus={(e) => e.target.select()}
            disabled={disabled}
            className={`pin-input-box ${value[index] ? 'is-filled' : ''}`}
            aria-label={`Digit ${index + 1} of ${length}`}
            autoComplete="one-time-code"
          />
          <span className="pin-glow-line" />
        </div>
      ))}
    </div>
  );
};
