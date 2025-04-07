import { InputDuplo } from "../../InputDuplo";
import { Inputs } from "../../Inputs";
import { PossuiConta } from '../../PossuiConta';
import { Button } from '../../Button';

export function Cadastro() {
    return (
        
        <>
        
        <div className="login">
            <div className="imgLogin"></div>
            <div className="containerLogin">
                <h1>CADASTRO</h1>
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