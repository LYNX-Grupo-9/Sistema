export function GenderRadioInput({ label, value, onChange }) {
    const options = [
      { id: "masculino", label: "Masculino" },
      { id: "feminino", label: "Feminino" },
      { id: "outro", label: "Outro" },
    ];
  
    return (
      <div className="flex flex-col items-center justify-center w-full gap-2">
        <span className="w-[65%] text-[16px] typography-semibold text-[var(--color-blueDark)]">
          {label}
        </span>
        <div className="w-[65%] flex justify-between">
          {options.map((option) => (
            <label
              key={option.id}
              className="flex items-center gap-2 text-[16px] text-[var(--color-blueDark)]"
            >
              <input
                type="radio"
                name="gender"
                value={option.id}
                checked={value === option.id}
                onChange={(e) => onChange(e.target.value)}
                className="accent-[var(--color-blueLight)]"
              />
              {option.label}
            </label>
          ))}
        </div>
      </div>
    );
  }
  