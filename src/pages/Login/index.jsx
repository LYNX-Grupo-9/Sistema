import { useNavigate } from 'react-router-dom';
import { BtnForm } from '../../components/BtnForm';
import { InputForm } from '../../components/InputForm';
import { PossuiConta } from '../../components/PossuiConta';
import React, { useState, } from 'react';
import { Bounce, toast, ToastContainer } from "react-toastify";


export function Login() {
        const navigate = useNavigate();
        const [email, setEmail] = useState("");
        const [senha, setSenha] = useState("");
        
        const [placeholders, setPlaceholders] = useState({
            email: "Informe seu email",
            senha: "Insira sua senha",
        });

    async function loginAdvogados () {
        console.log(API_URL)
        let hasError = false;
        
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
        if (hasError) return;

        const dados = {
            email,
            senha,
        };

        try {
            const response = await fetch("http://localhost:8080/api/advogados/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(dados),
            });
    
            if (response.ok) {
                const data = await response.json();
                const lawyerId = data.idAdvogado;
                const lawyerName = data.nome;
                const token = data.token;
    
                localStorage.setItem("token", token);
                localStorage.setItem("idAdvogado", lawyerId);
                localStorage.setItem("nomeAdvogado", lawyerName);
    
                toast.success('Login realizado', {
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
                        navigate("/home");
                    }, 3000);
            
            } else if (response.status === 401) {
                toast.error('Email ou senha incorretos', {
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
                toast.error('Erro ao fazer o login tente novamente', {
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
            <ToastContainer/>
            <div className="flex justify-center items-center h-screen w-full p-[15px] ">
                <div className="w-1/2 h-[95%] flex justify-center items-center flex-col mr-[2%] ">
                    <h1 className='text-[35px] font-[650] text-[#013451] mb-5'>LOGIN</h1>
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
                    <BtnForm buttonlabel="Entrar" onClick={loginAdvogados} />
                    <PossuiConta label="Não possui uma conta?" link="/cadastro" linkLabel=" Cadastre-se!" />
                </div>
                <div className="w-[46%] h-[95%] bg-[url('assets/imgLogin.svg')] bg-cover bg-center rounded-[25px]">
                </div>
    
            </div>
    
        </>
    
        );

    }


