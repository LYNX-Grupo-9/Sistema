import { InputDuplo } from "../../InputDuplo";
import { Inputs } from "../../Inputs";
import { PossuiConta } from '../../PossuiConta';
import { Button } from '../../Button';

export function Cadastro() {
    return (
        
        <>
        
        <div className="flex justify-center items-center h-screen w-full p-[15px]">

            <div className="w-[46%] h-[95%] bg-[url('assets/imgLogin.svg')] bg-cover bg-center rounded-[25px]"></div>
            
            <div className="w-1/2 h-[95%] flex justify-center items-center flex-col mr-[2%]">
                <h1 className="text-[35px] font-[650] text-[#013451] mb-5">CADASTRO</h1>
                <Inputs label="Nome" type="text" placeholder="Informe seu nome" />
                <InputDuplo label="CPF" type="text" placeholder="Informe seu CPF" label2="OAB" type2="text" placeholder2="Informe seu OAB"/>
                <Inputs label="Email" type="email" placeholder="Informe seu email" />
                <Inputs label="Senha" type="password" placeholder="Insira sua senha" />
                <Inputs label="Confirmar senha" type="password" placeholder="Digite sua senha novamente" />
                <Button buttonLabel="Próximo" />
                <PossuiConta label="Já possui uma conta? Faça seu" link="/login" linkLabel="Login!" />
            </div>
        </div>
        
        </>
    );
}   