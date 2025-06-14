import React from 'react';

export function MainInputMoney({ label, value, onChange, placeholder }) {
  const handleInputChange = (e) => {
    if (!e?.target?.value) return;

    const rawValue = e.target.value.replace(/\D/g, '');
    const valorFloat = (Number(rawValue) / 100).toFixed(2);

    const partes = valorFloat.split('.');
    const parteInteira = partes[0];
    const parteDecimal = partes[1];

    const comSeparador = parteInteira.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    const valorFormatado = `R$ ${comSeparador},${parteDecimal}`;

    // Só chama onChange se for uma função
    if (typeof onChange === 'function') {
      onChange(valorFormatado);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full gap-2">
      <span className="w-[65%] h-[30%] text-[16px] typography-semibold text-[var(--color-blueDark)]">
        {label}
      </span>
      <input
        type="text"
        inputMode="numeric"
        placeholder={placeholder || "R$ 0,00"}
        onChange={handleInputChange}
        value={value}
        className="w-[65%] h-[50px] rounded-[10px] border-2 border-[var(--color-blueLight)] p-[15px] bg-[var(--color-light)] text-[16px]"
      />
    </div>
  );
}
