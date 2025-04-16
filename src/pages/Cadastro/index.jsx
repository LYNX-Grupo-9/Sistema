import { InputDuplo } from "../../InputDuplo";
import { Inputs } from "../../Inputs";
import { PossuiConta } from '../../PossuiConta';
import { Button } from '../../Button';
import { useEffect, useState } from "react";



export function Cadastro() {
    const [nome, setNome] = useState("");
    const [placeholderNome , setPlaceholderNome] = useState();


    async function cadastrar () {
        const inputNome = document.getElementById("nome");

        
        
        
        if (nome.trim() === "") {
            inputNome.classList.add("border-red-500");
            setPlaceholderNome("Campo obrigatório");
            inputNome.placeholder = "Campo obrigatório";
        } else {

            const dados = {
                nome: document.getElementById("nome").value,
                cpf: document.getElementById("cpf").value,
                registroOab: document.getElementById("registroOab").value,
                email: document.getElementById("email").value,
                senha: document.getElementById("senha").value
            }

            try {
                const response = await fetch('http://localhost:8080/api/advogados', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify(dados)
                });
        
                if (response.ok) {
                  alert('Advogado cadastrado com sucesso!');
                } else {
                  const erro = await response.json();
                  alert('Erro ao cadastrar: ' + (erro.message || 'verifique os dados.'));
                }
              } catch (error) {
                alert('Erro na conexão com o servidor.');
              }
            };
        }
    
        return (
        
            <>  
            
            <div className="flex justify-center items-center h-screen w-full p-[15px]">
    
                <div className="w-[46%] h-[95%] bg-[url('assets/imgLogin.svg')] bg-cover bg-center rounded-[25px]"></div>
                
                <div className="w-1/2 h-[95%] flex justify-center items-center flex-col mr-[2%]">
                    <h1 className="text-[35px] font-[650] text-[#013451] mb-5">CADASTRO</h1>
                    <Inputs value={nome} onChange={(e) => setNome(e.target.value)} id="nome" label="Nome" type="text" placeholder="Informe seu nome" />
                    <InputDuplo id="cpf" label="CPF" type="text" placeholder="Informe seu CPF" id2="registroOab" label2="OAB" type2="text" placeholder2="Informe seu OAB"/>
                    <Inputs id="email" label="Email" type="email" placeholder="Informe seu email" />
                    <Inputs id="senha" label="Senha" type="password" placeholder="Insira sua senha" />
                    <Inputs label="Confirmar senha" type="password" placeholder="Digite sua senha novamente" />
                    <Button id="btnCadastrar" buttonlabel="Próximo" onClick={cadastrar} />
                    <PossuiConta label="Já possui uma conta? Faça seu" link="/login" linkLabel="Login!" />
                </div>
            </div>
            
            </>
        );

    }

    

