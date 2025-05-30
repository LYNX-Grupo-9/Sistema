import { MainInput } from "../../inputs/MainInput"
import { useState, useEffect } from "react";
import { SelectInput } from "../../inputs/SelectInput"

export function StepOne({ caseData, setCaseData }) {

    const [status, setStatus] = useState([]);
    const [selectedStatus, setSelectedStatus] = useState(null);


    function handleStatusChange(selectedOption) {
        setSelectedStatus(selectedOption);
        setCaseData({ ...caseData, status: selectedOption.label });
    }
   
    useEffect(() => {
    
        setStatus([
            { id: 1, label: "Protocolado" },
            { id: 2, label: "Sentenciado" },
            { id: 3, label: "Fase de recursão" },
            { id: 4, label: "Trânsito em julgado" },
            { id: 5, label: "Arquivado" }
        ])


    }, []);

    return (
        <div className="h-full flex flex-col gap-6 pt-10">
            <MainInput label="Titulo processo" placeholder="Insira o titulo do processo" value={caseData.titulo} onChange={(e) => setCaseData({ ...caseData, titulo: e.target.value })} />
            <MainInput label="Número do processo" placeholder="Insira o número do processo" value={caseData.numeroProcesso} onChange={(e) => setCaseData({ ...caseData, numeroProcesso: e.target.value })} />
            <SelectInput
                label="Status do processo"
                options={status}
                value={selectedStatus}
                onChange={handleStatusChange}
                placeholder="Digite para filtrar"
            />
            <MainInput label="Classe processual" placeholder="Insira a classe do processo" value={caseData.classeProcessual} onChange={(e) => setCaseData({ ...caseData, classeProcessual: e.target.value })} />
      
        </div>

    )
}