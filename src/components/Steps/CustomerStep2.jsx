import { MainInput } from "../inputs/MainInput"
import { PhoneNumberInput } from "../inputs/PhoneNumberInput"

export function CustomerStep2() {

    return (
        <div className="h-full flex flex-col gap-6 pt-10">
            <MainInput label="Email" placeholder="Insira o email do cliente" />
            <PhoneNumberInput label="Telefone" />
            <MainInput label="Endereço" placeholder="Insira o endereço do cliente" />
            
        </div>

    )
}