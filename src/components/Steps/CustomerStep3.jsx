import { MainInput } from "../inputs/MainInput"

export function CustomerStep3() {

    return (
        <div className="h-full flex flex-col gap-6 pt-10">
            <MainInput label="Tipo de documento de identificação" placeholder="Insira o tipo de documento" />
            <MainInput label="Documento de identificação" placeholder="Insira o documento do cliente" />
            <MainInput label="Passaporte (opcional)" placeholder="Insira o passaporte do cliente" />
            <MainInput label="Habilitação de motorista" placeholder="Insira o habilitação do cliente" />
            
        </div>

    )
}