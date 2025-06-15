export function Form() {

    return (
        <div className="containerInput">
            <div className="input">
                <p>
                    Nome
                </p>
                <input id="nome" placeholder="Digite seu nome"/>    
            </div>
            <div className="input">
                <p>
                    Telefone
                </p>
                <input id="telefone" placeholder="Digite seu telefone"/>
            </div>
            <div className="input">
                <p>
                    Email
                </p>
                <input id="email" placeholder="Digite seu email"/>
            </div>
            <div className="input">
                <p>
                    Assunto    
                </p>
                <input id="assunto" placeholder="Digite o assunto"/>
            </div>
            <div className="containerMensagem">
                <p>
                    Mensagem
                </p>
                <input className="inputMensagem" id="mensagem" placeholder="Digite sua mensagem"/>
            </div>
            <button>
                Enviar Mensagem
            </button>
        </div>
    )

}