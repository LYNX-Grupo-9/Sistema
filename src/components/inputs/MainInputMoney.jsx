import React from 'react';

export function MainInputMoney({ label, value, onChange, placeholder }) {
  const formatarParaReais = (valor) => {
    const numero = valor.replace(/\D/g, '');
    const valorFloat = (Number(numero) / 100).toFixed(2);
    return valorFloat
      .replace('.', ',')
      .replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  };

  const handleInputChange = (e) => {
    const entrada = e.target.value;
    const valorFormatado = 'R$ ' + formatarParaReais(entrada);
    onChange(valorFormatado);
  };

  return (
    <div className="flex flex-col items-center justify-center w-full gap-2">
      <span className="w-[65%] h-[30%] text-[16px] typography-semibold text-[var(--color-blueDark)]">
        {label}
      </span>
      <input
        type="text"
        placeholder={placeholder || "R$ 0,00"}
        onChange={handleInputChange}
        value={value}
        className="w-[65%] h-[50px] rounded-[10px] border-2 border-[var(--color-blueLight)] p-[15px] bg-[var(--color-light)] text-[16px]"
      />
    </div>
  );
}
