import { MainInput } from "../inputs/MainInput"
import { PhoneNumberInput } from "../inputs/PhoneNumberInput"

export function CustomerStep2({user,setUser}) {

    return (
        <div className="h-full flex flex-col gap-6 pt-10">
            <MainInput label="Email" placeholder="Insira o email do cliente" value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })}/>
            <PhoneNumberInput label="Telefone" value={user.telefone} onChange={(e) => setUser({ ...user, telefone: e.target.value })}/>
            <MainInput label="Endereço" placeholder="Insira o endereço do cliente" value={user.endereco} onChange={(e) => setUser({ ...user, endereco: e.target.value })}/>
            <MainInput label="Profissão" placeholder="Insira a profissão do cliente" value={user.profissao} onChange={(e) => setUser({ ...user, profissao: e.target.value })}/>
            
        </div>

    )
}