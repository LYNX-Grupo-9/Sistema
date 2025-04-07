import imgLogin from '../../assets/imgLogin.svg';
import { Button } from '../../Button';
import { Inputs } from '../../Inputs';
import { PossuiConta } from '../../PossuiConta';


export function Login() {
    return (

    <>

        <div className="login">

            <div className="containerLogin">
                <h1>LOGIN</h1>
                <Inputs label="Email" type="email" placeholder="Informe seu email" />
                <Inputs label="Senha" type="password" placeholder="Insira sua senha" />
                <Button buttonLabel="Entrar" />
                <PossuiConta label="Não possui uma conta?" link="/cadastro" linkLabel="Cadastre-se!" />
            </div>

            <div className="imgLogin">
            </div>

        </div>

    </>

    );
}