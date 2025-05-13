import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale } from "react-datepicker";
import ptBR from "date-fns/locale/pt-BR";
import { Calendar } from "lucide-react";

registerLocale("pt-BR", ptBR);

export function FormNEInput({ icon, type = "text", options = [], optionLabel, value, onChange, ...props }) {

    return (
        <div className="relative w-full flex items-center">
            {icon && type != "date" && (
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none">
                    {icon}
                </div>
            )}

            {type === "select" ? (
                <select
                    {...props}
                    value={value}
                    onChange={onChange}
                    className={`w-full h-[50px] rounded-[10px] border-2 border-[var(--color-blueLight)] 
                    bg-[var(--color-light)] text-[16px] pr-4 ${icon ? 'pl-12' : 'px-[15px]'}
                    appearance-none truncate text-gray-500`}
                >
                    {optionLabel && <option value="0">{optionLabel}</option>}
                    {options.map((opt, idx) => (
                        <option key={idx} value={opt.value}>
                            {opt.label}
                        </option>
                    ))}
                </select>
            ) : type === "date" ? (
                <div className="flex items-center gap-4 rounded-[10px] w-full border-2 border-[var(--color-blueLight)] bg-[var(--color-light)] pl-[15px]">
                    <Calendar color='#013451'/>
                    <DatePicker
                        selected={value}
                        onChange={onChange}
                        locale="pt-BR"
                        dateFormat="dd/MM/yyyy"
                        placeholderText="Selecione uma data"
                        className={`w-full h-[50px] text-[14px] bg-transparentp-[15px] focus:outline-none `}
                        {...props}
                    />
                </div>
            ) : (
                <input
                    {...props}
                    type={type}
                    value={value}
                    onChange={onChange}
                    className={`w-full h-[50px] rounded-[10px] border-2 border-[var(--color-blueLight)] 
                    bg-[var(--color-light)] text-[14px] p-[15px] ${icon ? 'pl-12' : ''}`}
                />
            )}
        </div>
    );
}
