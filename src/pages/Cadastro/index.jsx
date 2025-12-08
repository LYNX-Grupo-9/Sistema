import { InputDuplo } from "../../components/InputDuplo";
import { InputForm } from "../../components/InputForm";
import { PossuiConta } from '../../components/PossuiConta';
import { BtnForm } from '../../components/BtnForm';
import { useState } from "react";
import { Bounce, toast, ToastContainer } from "react-toastify";
import { useNavigate } from 'react-router-dom';
import { API_URL } from "../../config/config";

export function Cadastro() {
    const navigate = useNavigate();
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
        
    if (nome.trim() === "" || !/^[A-Za-zÀ-ÿ\s]{3,}$/.test(nome.trim())) {
        document.getElementById("nome").classList.add("border-red-500");
        hasError = true;
        toast.error(
            nome.trim() === ""
                ? 'Nome não pode estar em branco'
                : 'Nome deve ter pelo menos 3 letras e conter apenas letras.',
            {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                transition: Bounce,
            }
        );
    } else {
        document.getElementById("nome").classList.remove("border-red-500");
    }

    if (cpf.trim() === "" || !/^\d{3}\.\d{3}\.\d{3}\-\d{2}$/.test(cpf.trim())) {
        document.getElementById("cpf").classList.add("border-red-500");
        hasError = true;
        toast.error(
            cpf.trim() === ""
                ? 'CPF não pode estar em branco'
                : 'CPF inválido. Exemplo: 123.456.789-00',
            {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                transition: Bounce,
            }
        );
    } else {
        document.getElementById("cpf").classList.remove("border-red-500");
    }
  
    if (registroOab.trim() === "") {
        document.getElementById("registroOab").classList.add("border-red-500");
        hasError = true;
        toast.error(
            registroOab.trim() === ""
                ? 'OAB não pode estar em branco'
                : 'OAB inválido. Exemplo: SP123456',
            {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                transition: Bounce,
            }
        );
    } else {
        document.getElementById("registroOab").classList.remove("border-red-500");
    }
    
   
    if (email.trim() === "" || !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email.trim())) {
        document.getElementById("email").classList.add("border-red-500");
        hasError = true;
        toast.error(
            email.trim() === ""
                ? 'Email não pode estar em branco'
                : 'Email inválido.',
            {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                transition: Bounce,
            }
        );
    } else {
        document.getElementById("email").classList.remove("border-red-500");
    }
    
    if (
        senha.trim() === "" ||
        !/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(senha.trim())
    ) {
        document.getElementById("senha").classList.add("border-red-500");
        hasError = true;
        toast.error(
            senha.trim() === ""
                ? 'Senha não pode estar em branco'
                : 'Senha deve ter pelo menos 8 caracteres, incluindo letra, número e caractere especial.',
            {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                transition: Bounce,
            }
        );
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
        oab: registroOab,
        email,
        senha,
    };

    try {
        const response = await fetch(`${API_URL}advogados/cadastrar`, {
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
                setTimeout(() => {
                    navigate("/login");
                }, 500);
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





