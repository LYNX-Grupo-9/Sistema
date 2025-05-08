import { MainInput } from "../inputs/MainInput"

export function CustomerStep3({ user, setUser }) {

    return (
        <div className="h-full flex flex-col gap-6 pt-10">
            <MainInput label="Tipo de documento de identificação" placeholder="Insira o tipo de documento" value={user.tipoDocumento} onChange={(e) => setUser({ ...user, tipoDocumento: e.target.value })}/>
            <MainInput label="Documento de identificação" placeholder="Insira o documento do cliente" value={user.documento} onChange={(e) => setUser({ ...user, documento: e.target.value })}/>
            <MainInput label="Passaporte (opcional)" placeholder="Insira o passaporte do cliente" value={user.passaporte} onChange={(e) => setUser({ ...user, passaporte: e.target.value })}/>
            <MainInput label="Habilitação de motorista (opcional)" placeholder="Insira o habilitação do cliente" value={user.cnh} onChange={(e) => setUser({ ...user, cnh: e.target.value })}/>
            
        </div>

    )
}