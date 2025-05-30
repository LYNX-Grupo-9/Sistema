import { MainInput } from "../../inputs/MainInput"

export function StepThree({ caseData, setCaseData }) {

    return (
        <div className="h-full flex flex-col gap-6 pt-10">
            <MainInput label="Autor" placeholder="Insira o autor do processo" value={caseData.autor} onChange={(e) => setCaseData({ ...caseData, autor: e.target.value })}/>
            <MainInput label="Advogado Requerente" placeholder="Insira o Advogado Requerente" value={caseData.advRequerente} onChange={(e) => setCaseData({ ...caseData, advRequerente: e.target.value })}/>
            <MainInput label="Réu" placeholder="Insira o passaporte do cliente" value={caseData.reu} onChange={(e) => setCaseData({ ...caseData, reu: e.target.value })}/>
            <MainInput label="Advogado do Réu" placeholder="Insira o habilitação do cliente" value={caseData.advReu} onChange={(e) => setCaseData({ ...caseData, advReu: e.target.value })}/>
        </div>

    )
}