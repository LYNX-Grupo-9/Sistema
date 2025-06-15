import React from 'react';

export function MainInputMoney({ label, value, onChange, placeholder }) {

  return (
    <div className="flex flex-col items-center justify-center w-full gap-2">
      <span className="w-[65%] h-[30%] text-[16px] typography-semibold text-[var(--color-blueDark)]">
        {label}
      </span>
      <input
        type="text"
        inputMode="numeric"
        placeholder={placeholder || "R$ 0,00"}
        onChange={(e) => onChange(e.target.value)}
        value={value}
        className="w-[65%] h-[50px] rounded-[10px] border-2 border-[var(--color-blueLight)] p-[15px] bg-[var(--color-light)] text-[16px]"
      />
    </div>
  );
}
