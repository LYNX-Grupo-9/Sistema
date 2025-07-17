import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';

export function Form() {
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [email, setEmail] = useState("");
  const [assunto, setAssunto] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [modal, setModal] = useState({ open: false, text: '', type: '' });
  const formRef = useRef();

  const showModal = (text, type = 'success') => {
    setModal({ open: true, text, type });
    setTimeout(() => setModal({ open: false, text: '', type: '' }), 3000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!nome || !telefone || !email || !assunto || !mensagem) {
      showModal('Por favor, preencha todos os campos antes de enviar.', 'error');
      return;
    }

    try {
      await emailjs.sendForm(
        'service_2qh5flb',
        'template_iha2pip',
        formRef.current,
        'BK1LR4npXZmiC_qlm'
      );
      showModal('Mensagem enviada com sucesso!', 'success');
      setNome("");
      setTelefone("");
      setEmail("");
      setAssunto("");
      setMensagem("");
    } catch (error) {
      showModal('Erro ao enviar mensagem. Tente novamente.', 'error');
    }
  };

  return (
    <>
      {modal.open && (
        <div
          style={{
            position: 'fixed',
            top: '20px',
            left: '50%',
            transform: 'translateX(-50%)',
            background: modal.type === 'success' ? '#4caf50' : '#f44336',
            color: '#fff',
            padding: '16px 32px',
            borderRadius: '8px',
            zIndex: 9999,
            boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
            fontSize: '18px',
            transition: 'opacity 0.3s'
          }}
        >
          {modal.text}
        </div>
      )}
      <form ref={formRef} onSubmit={handleSubmit} className="containerInput">
        <div className="input">
          <p>Nome</p>
          <input
            id="nome"
            name="nome"
            placeholder="Digite seu nome"
            value={nome}
            onChange={e => setNome(e.target.value)}
          />
        </div>
        <div className="input">
          <p>Telefone</p>
          <input
            id="telefone"
            name="telefone"
            placeholder="+55 (11) 97885-2543"
            value={telefone}
            onChange={e => setTelefone(e.target.value)}
          />
        </div>
        <div className="input">
          <p>Email</p>
          <input
            id="email"
            name="email"
            placeholder="email@example.com"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </div>
        <div className="input">
          <p>Assunto</p>
          <input
            id="assunto"
            name="assunto"
            placeholder="Ex: Aposentadoria"
            value={assunto}
            onChange={e => setAssunto(e.target.value)}
          />
        </div>
        <div className="containerMensagem">
          <p>Mensagem</p>
          <input
            className="inputMensagem"
            id="mensagem"
            name="mensagem"
            placeholder="Motivo do contato"
            value={mensagem}
            onChange={e => setMensagem(e.target.value)}
          />
        </div>
        <button type="submit">
          Enviar Mensagem
        </button>
      </form>
    </>
  );
}