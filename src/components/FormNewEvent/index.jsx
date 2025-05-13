import { useState } from "react";
import { FormNEInput } from "./FormNEInput.jsx";
import { Calendar, ChevronDown, Clock10, MoveRight, UsersRound, X } from "lucide-react";

const hourlyOptions = Array.from({ length: 24 }, (_, i) => {
    const hour = i.toString().padStart(2, '0');
    return {
        label: `${hour}:00`,
        value: `${hour}:00`,
    };
});

export function FormNewEvent({ onClose }) {

    const [dataSelecionada, setDataSelecionada] = useState(null);

    return (
        <>
            <div className="px-12 pt-11 pb-8 bg-white border-2 border-gray-300 rounded-xl flex flex-col gap-3.5 min-w-96">
                <h1 className="font-semibold text-xl text-[var(--color-blueDark)] whitespace-nowrap">Adicionar evento</h1>
                <div className="w-full h-0.5 bg-gray-300"></div>
                <FormNEInput placeholder="Nome do evento" />
                <FormNEInput
                    type="date"
                    icon={<Calendar color='#013451' size={20} />}
                    value={dataSelecionada}
                    onChange={(date) => setDataSelecionada(date)}
                />
                <div className="flex gap-4 items-center">
                    <FormNEInput
                        optionLabel="De..."
                        type="select"
                        icon={<Clock10 color='#013451' />}
                        options={hourlyOptions}
                        onChange={(e) => console.log(e.target.value)}
                    />
                    <MoveRight color='#013451' size={25} className="w-1/3" />
                    <FormNEInput
                        optionLabel="Até..."
                        type="select"
                        icon={<Clock10 color='#013451' />}
                        options={hourlyOptions}
                        onChange={(e) => console.log(e.target.value)}
                    />
                </div>
                <FormNEInput optionLabel="Adicionar Convidado" type="select" icon={<UsersRound color='#013451' />} />
                <FormNEInput optionLabel="Selecionar Categoria" type="select" icon={<ChevronDown color='#013451' />} />
                <FormNEInput optionLabel="Processo " type="select" icon={<ChevronDown color='#013451' />} />
                <FormNEInput placeholder="Descrição" />
                <div className="self-end flex gap-4">
                    <button onClick={onClose} className="cursor-pointer px-8 py-2 text-[var(--color-blueLight)] border-2 border-[var(--color-blueLight)] rounded-[10px]">Cancelar</button>
                    <button className="cursor-pointer px-8 py-2 bg-[color:var(--color-blueLight)] text-white rounded-[10px]">Salvar</button>
                </div>
            </div>
        </>
    )
}