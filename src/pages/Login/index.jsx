import { Button } from '../../Button';
import { Inputs } from '../../Inputs';
import { PossuiConta } from '../../PossuiConta';


export function Login() {
    return (

    <>

        <div className="flex justify-center items-center h-screen w-full p-[15px] ">
            <div className="w-1/2 h-[95%] flex justify-center items-center flex-col mr-[2%] ">
                <h1 className='text-[35px] font-[650] text-[#013451] mb-5'>LOGIN</h1>
                <Inputs 
                    label="Email" 
                    type="email" 
                    placeholder="Informe seu email" 
                />
                <Inputs 
                    label="Senha" 
                    type="password" 
                    placeholder="Insira sua senha" 
                />
                <Button buttonlabel="Entrar" />
                <PossuiConta label="Não possui uma conta?" link="/cadastro" linkLabel="Cadastre-se!" />
            </div>
            <div className="w-[46%] h-[95%] bg-[url('assets/imgLogin.svg')] bg-cover bg-center rounded-[25px]">
            </div>

        </div>

    </>

    );
}