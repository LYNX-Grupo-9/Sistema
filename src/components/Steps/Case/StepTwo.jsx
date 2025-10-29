import { MainInput } from "../../inputs/MainInput"
import { MainInputMoney } from "../../inputs/MainInputMoney"

export function StepTwo({ caseData, setCaseData }) {
    return (
        <div className="h-full flex flex-col gap-6 pt-10">
            <MainInput label="Assunto" placeholder="Insira o assunto do processo" value={caseData.assunto} onChange={(e) => setCaseData({ ...caseData, assunto: e.target.value })} />
            <MainInput label="Tribunal/Comarca" placeholder="Insira o Tribunal/Comarca do processo" value={caseData.tribunal} onChange={(e) => setCaseData({ ...caseData, tribunal: e.target.value })} />
            <MainInputMoney
                label="Valor da ação (opcional)"
                placeholder="Insira o valor da ação"
                value={caseData.valor}
                onChange={(valor) => setCaseData({ ...caseData, valor })}
            />

        </div>

    )
}