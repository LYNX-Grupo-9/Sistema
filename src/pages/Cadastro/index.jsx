import { InputDuplo } from "../../InputDuplo";
import { Inputs } from "../../Inputs";
import { PossuiConta } from '../../PossuiConta';
import { Button } from '../../Button';
import { useEffect, useState } from "react";


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
        setPlaceholders((prev) => ({ ...prev, nome: "Campo obrigatório" }));
        hasError = true;
    } else {
        document.getElementById("nome").classList.remove("border-red-500"); // Remove a classe de erro
    }

    if (cpf.trim() === "") {
        document.getElementById("cpf").classList.add("border-red-500");
        setPlaceholders((prev) => ({ ...prev, cpf: "Campo obrigatório" }));
        hasError = true;
    } else {
        document.getElementById("cpf").classList.remove("border-red-500"); // Remove a classe de erro
    }
  
    if (registroOab.trim() === "") {
        document.getElementById("registroOab").classList.add("border-red-500");
        setPlaceholders((prev) => ({ ...prev, registroOab: "Campo obrigatório" }));
        hasError = true;
    } else {
        document.getElementById("registroOab").classList.remove("border-red-500"); // Remove a classe de erro
    }
   
    if (email.trim() === "") {
        document.getElementById("email").classList.add("border-red-500");
        setPlaceholders((prev) => ({ ...prev, email: "Campo obrigatório" }));
        hasError = true;
    } else {
        document.getElementById("email").classList.remove("border-red-500"); // Remove a classe de erro
    }
    
    if (senha.trim() === "") {
        document.getElementById("senha").classList.add("border-red-500");
        setPlaceholders((prev) => ({ ...prev, senha: "Campo obrigatório" }));
        hasError = true;
    } else {
        document.getElementById("senha").classList.remove("border-red-500"); // Remove a classe de erro
    }

    if (confirmarSenha.trim() === "") {
        document.getElementById("confirmarSenha").classList.add("border-red-500");
        setPlaceholders((prev) => ({ ...prev, confirmarSenha: "Campo obrigatório" }));
        hasError = true;
    } else if (senha !== confirmarSenha) {
        document.getElementById("confirmarSenha").classList.add("border-red-500");
        setPlaceholders((prev) => ({ ...prev, confirmarSenha: "As senhas não coincidem" }));
        hasError = true;
    } else {
        document.getElementById("confirmarSenha").classList.remove("border-red-500"); // Remove a classe de erro
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
        const response = await fetch("http://localhost:8080/api/advogados", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(dados),
        });

        if (response.ok) {
            alert("Advogado cadastrado com sucesso!");
        } else {
            const erro = await response.json();
            alert("Erro ao cadastrar: " + (erro.message || "verifique os dados."));
        }
    } catch (error) {
        alert("Erro na conexão com o servidor.");
    }
}

        return (
        
            <>  
            
            <div className="flex justify-center items-center h-screen w-full p-[15px]">
                <div className="w-[46%] h-[95%] bg-[url('assets/imgLogin.svg')] bg-cover bg-center rounded-[25px]"></div>
                <div className="w-1/2 h-[95%] flex justify-center items-center flex-col mr-[2%]">
                    <h1 className="text-[35px] font-[650] text-[#013451] mb-5">CADASTRO</h1>
                    <Inputs
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
                    <Inputs
                        id="email"
                        label="Email"
                        type="email"
                        placeholder={placeholders.email}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <Inputs
                        id="senha"
                        label="Senha"
                        type="password"
                        placeholder={placeholders.senha}
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
                    />
                    <Inputs
                        id="confirmarSenha"
                        label="Confirmar senha"
                        type="password"
                        placeholder={placeholders.confirmarSenha}
                        value={confirmarSenha}
                        onChange={(e) => setConfirmarSenha(e.target.value)}
                    />
                    <Button id="btnCadastrar" buttonlabel="Próximo" onClick={cadastrar} />
                    <PossuiConta label="Já possui uma conta? Faça seu" link="/login" linkLabel="Login!" />
                </div>
            </div>
            
            </>
        );       
    }  
        

    
   

