import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale } from "react-datepicker";
import ptBR from "date-fns/locale/pt-BR";
import { Calendar } from "lucide-react";

registerLocale("pt-BR", ptBR);

export function FormNEInput({ icon, type = "text", options = [], optionLabel, value, onChange, disabled, ...props }) {
    const baseStyle = `w-full h-[50px] rounded-[10px] text-[14px] bg-[var(--color-light)]`;
    const borderStyle = disabled
        ? "border-2 border-gray-300 text-gray-400 cursor-not-allowed"
        : "border-2 border-[var(--color-blueLight)] text-gray-500";

    return (
        <div className="relative w-full flex items-center">
            {icon && type !== "date" && (
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none">
                    {icon}  
                </div>
            )}

            {type === "select" ? (
                <select
                    {...props}
                    disabled={disabled}
                    value={value}
                    onChange={onChange}
                    className={`${baseStyle} ${borderStyle} pr-4 ${icon ? 'pl-12' : 'px-[15px]'} appearance-none truncate`}
                >
                    {optionLabel && <option value="0">{optionLabel}</option>}
                    {options.map((opt, idx) => (
                        <option key={idx} value={opt.value}>
                            {opt.label}
                        </option>
                    ))}
                </select>
            ) : type === "date" ? (
                <div className={`${baseStyle} ${borderStyle} flex items-center gap-4 pl-[15px]`}>
                    <Calendar color={disabled ? '#9CA3AF' : '#013451'} />
                    <DatePicker
                        selected={value}
                        onChange={onChange}
                        locale="pt-BR"
                        dateFormat="dd/MM/yyyy"
                        placeholderText="Selecione uma data"
                        disabled={disabled}
                        className={`w-full h-[50px] bg-transparent focus:outline-none ${disabled ? 'text-gray-400 cursor-not-allowed' : 'text-gray-500'}`}
                        {...props}
                    />
                </div>
            ) : (
                <input
                    {...props}
                    type={type}
                    value={value}
                    onChange={onChange}
                    disabled={disabled}
                    className={`${baseStyle} ${borderStyle} p-[15px] ${icon ? 'pl-12' : ''}`}
                />
            )}
        </div>
    );
}
