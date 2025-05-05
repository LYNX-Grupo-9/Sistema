import { InputDuplo } from "../../components/InputDuplo";
import { InputForm } from "../../components/InputForm";
import { PossuiConta } from '../../components/PossuiConta';
import { BtnForm } from '../../components/BtnForm';
import { useEffect, useState } from "react";
import { Bounce, toast, ToastContainer } from "react-toastify";


export function Cadastro() {
    const [nome, setNome] = useState("");
    const [cpf, setCpf] = useState("");
    const [registroOab, setRegistroOab] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [confirmarSenha, setConfirmarSenha] = useState("");

    const [placeholders, setPlaceholders] = useState({
        nome: "Informe seu nome",
        cpf: "Informe seu CPF",
        registroOab: "Informe seu OAB",
        email: "Informe seu email",
        senha: "Insira sua senha",
        confirmarSenha: "Digite sua senha novamente",
    });

    async function cadastrar () {
        let hasError = false;
        
    if (nome.trim() === "") {
        document.getElementById("nome").classList.add("border-red-500");
        hasError = true;
        toast.error('Nome não pode estar em branco', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            transition: Bounce,
            });
    } else {
        document.getElementById("nome").classList.remove("border-red-500"); 
    }

    if (cpf.trim() === "") {
        document.getElementById("cpf").classList.add("border-red-500");
        hasError = true;
        toast.error('CPF não pode estar em branco', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            transition: Bounce,
            });
    } else {
        document.getElementById("cpf").classList.remove("border-red-500"); 
    }
  
    if (registroOab.trim() === "") {
        document.getElementById("registroOab").classList.add("border-red-500");
        hasError = true;
        toast.error('OAB não pode estar em branco', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            transition: Bounce,
            });
    } else {
        document.getElementById("registroOab").classList.remove("border-red-500"); 
    }
   
    if (email.trim() === "") {
        document.getElementById("email").classList.add("border-red-500");
        hasError = true;
        toast.error('Email não pode estar em branco', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            transition: Bounce,
            });
    } else {
        document.getElementById("email").classList.remove("border-red-500"); 
    }
    
    if (senha.trim() === "") {
        document.getElementById("senha").classList.add("border-red-500");
        hasError = true;
        toast.error('Senha não pode estar em branco', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            transition: Bounce,
            });
    } else {
        document.getElementById("senha").classList.remove("border-red-500"); 
    }

    if (confirmarSenha.trim() === "") {
        document.getElementById("confirmarSenha").classList.add("border-red-500");
        hasError = true;
        toast.error('Senha não pode estar em branco', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            transition: Bounce,
            });
    } else if (senha !== confirmarSenha) {
        document.getElementById("confirmarSenha").classList.add("border-red-500");
        hasError = true;
        toast.error('As senhas não são iguais', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            transition: Bounce,
            });
    } else {
        document.getElementById("confirmarSenha").classList.remove("border-red-500"); 
    }

    if (hasError) return;

    const dados = {
        nome,
        cpf,
        registroOab,
        email,
        senha,
    };

    try {
        const response = await fetch("http://localhost:8080/api/advogados/cadastrar", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(dados),
        });

        if (response.ok) {
            toast.success('Cadastro realizado', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                transition: Bounce,
                });
        } else {
            const erro = await response.json();
            toast.error('Erro ao cadastrar', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                transition: Bounce,
                });
        }
    } catch (error) {
        toast.error('Erro na conexão com o servidor', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            transition: Bounce,
            });
    }
}

        return (
        
            <>  
            <ToastContainer />
            <div className="flex justify-center items-center h-screen w-full p-[15px]">
                <div className="w-[46%] h-[95%] bg-[url('assets/imgLogin.svg')] bg-cover bg-center rounded-[25px]"></div>
                <div className="w-1/2 h-[95%] flex justify-center items-center flex-col mr-[2%]">
                    <h1 className="text-[35px] font-[650] text-[#013451] mb-5">CADASTRO</h1>
                    <InputForm
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                        id="nome"
                        label="Nome"
                        type="text"
                        placeholder={placeholders.nome}
                    />
                    <InputDuplo
                        id="cpf"
                        label="CPF"
                        type="text"
                        placeholder={placeholders.cpf}
                        id2="registroOab"
                        label2="OAB"
                        type2="text"
                        placeholder2={placeholders.registroOab}
                        onChange1={(e) => setCpf(e.target.value)}
                        onChange2={(e) => setRegistroOab(e.target.value)}
                    />
                    <InputForm
                        id="email"
                        label="Email"
                        type="email"
                        placeholder={placeholders.email}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <InputForm
                        id="senha"
                        label="Senha"
                        type="password"
                        placeholder={placeholders.senha}
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
                    />
                    <InputForm
                        id="confirmarSenha"
                        label="Confirmar senha"
                        type="password"
                        placeholder={placeholders.confirmarSenha}
                        value={confirmarSenha}
                        onChange={(e) => setConfirmarSenha(e.target.value)}
                    />
                    <BtnForm id="btnCadastrar" buttonlabel="Próximo" onClick={cadastrar} />
                    <PossuiConta label="Já possui uma conta? Faça seu" link="/login" linkLabel=" Login!" />
                </div>
            </div>
            
            </>
        );       
    }  
        

    
   

