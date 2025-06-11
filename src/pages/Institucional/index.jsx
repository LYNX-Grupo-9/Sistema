import logo from '../../assets/temis-logo.png';
import menu from '../../assets/menu.svg';
import agenda from '../../assets/agenda.svg';
import Carrossel from '../../components/Carrossel';
import { Form } from '../../components/Form';
import { Redes } from '../../components/Redes';
import React, { useRef, useState } from 'react';
import { VLibras } from '../../components/Acessibilidade';

export function Institucional() {
    const [menuOpen, setMenuOpen] = useState(false);

    // Refs para desktop
    const sectionsRefDesktop = {
        inicio: useRef(null),
        sobre: useRef(null),
        contato: useRef(null),
        saibaMais: useRef(null),
    };

    // Refs para mobile
    const sectionsRefMobile = {
        inicio: useRef(null),
        sobre: useRef(null),
        contato: useRef(null),
        saibaMais: useRef(null),
    };

    const scrollToSectionDesktop = (section) => {
        if (sectionsRefDesktop[section].current) {
            sectionsRefDesktop[section].current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const scrollToSectionMobile = (section) => {
        if (sectionsRefMobile[section].current) {
            sectionsRefMobile[section].current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div>
            {/* DESKTOP */}
            <VLibras />
            <div className="desktop">
                <div className='header-desktop' ref={sectionsRefDesktop.inicio}>
                    <div className='containerLogo'>
                        <div className="logoDesktop"></div>
                        <p>TemisHub</p>
                    </div>
                    <div className='containerNav'>
                        <p className='hover:underline hover:cursor-pointer' onClick={() => scrollToSectionDesktop("inicio")}>INICIO</p>
                        <p className='hover:underline hover:cursor-pointer' onClick={() => scrollToSectionDesktop("sobre")}>SOBRE</p>
                        <p className='hover:underline hover:cursor-pointer' onClick={() => scrollToSectionDesktop("contato")}>CONTATO</p>
                    </div>
                    <div className='containerBtn'>
                        <button onClick={() => window.location.href = '/login'}>
                            Login
                        </button>
                    </div>
                </div>

                <div className='sobre-desktop'>
                    <div className="containerTxt">
                        <h1>
                            Eficiência, controle e inteligência para 
                            escritórios de advocacia modernos.
                        </h1>
                        <p>
                            Nosso sistema jurídico integra gestão de clientes e processos, agenda 
                            automatizada e um chat com inteligência artificial para oferecer agilidade, 
                            organização e suporte estratégico ao seu dia a dia jurídico.
                        </p>
                    </div>
                    <div className="containerBtnSobre">
                        <button onClick={() => scrollToSectionDesktop("saibaMais")}>
                            Saiba Mais
                        </button>
                    </div>
                </div>

                <div className="containerAgendaDesktop">
                    <div className="txtAgenda" ref={sectionsRefDesktop.sobre}>
                        <h1>
                            Organize sua agenda jurídica com clareza e 
                            precisão
                        </h1>
                        <p>
                            Gerencie compromissos processuais, reuniões e 
                            prazos com uma agenda pensada para a rotina de 
                            escritórios de advocacia e profissionais do Direito.
                        </p>
                    </div>
                    <div className="ImgAgendaDesktop">
                        <img src={agenda} alt="Agenda" />
                    </div>
                </div>

                <div className="txtCarrossel" ref={sectionsRefDesktop.saibaMais}>
                    <h1>
                        Organize seu escritório com eficiência e segurança
                    </h1>
                    <p>
                        Nosso sistema jurídico foi desenvolvido especialmente para escritórios de advocacia que buscam 
                        integrar todas as áreas essenciais da prática jurídica em um único ambiente intuitivo e seguro.
                        Com ele, você gerencia clientes, acompanha processos e armazena documentos de forma simples, 
                        ágil e centralizada.
                    </p>
                </div>
                <div className="imgCarrossel">
                    <div className="carrossel">
                        <Carrossel />
                    </div>
                </div>

                <div className="containerContatoDesktop" ref={sectionsRefDesktop.contato}>
                    <h1>
                        Entre em contato
                    </h1>
                    <div className="containerInputDesktop">
                        <Form />
                    </div>
                </div>

                <div className="footerDesktop">
                    <div className="infoDesktop">
                        <h1>Mapa do site</h1>
                        <p className='hover:cursor-pointer'>HOME</p>
                        <p className='hover:cursor-pointer'>SOBRE</p>
                        <p className='hover:cursor-pointer'>CONTATO</p>    
                    </div>
                    <div className="infoDesktop">
                        <h1>Endereço</h1>
                        <p>Rua XPTO, 660</p>
                    </div>
                    <div className="infoDesktop">
                        <h1>Informações Legais</h1>
                        <p>CNPJ: XXXXXXXXXXX OAB: XXXXXXXXXXXXXX</p>
                    </div>
                </div>

                <div className="direitosAutoraisDesktop">
                    <p>© Lynx Technology - todos os direitos reservados</p>
                </div>
            </div>
            
            {/* MOBILE */}
            <div className="mobile">
                <div className="sobre">
                    <div className="header-mobile">
                        <div className='containerLogo'>
                            <div className="logo"></div>
                            <p>TemisHub</p>
                        </div>
                        <div className='containerMenu'>
                            <img
                                src={menu}
                                alt="menu"
                                onClick={() => setMenuOpen(true)}
                                style={{ cursor: 'pointer' }}
                            />
                            {menuOpen && (
                                <div
                                    className="menu-overlay"
                                    style={{
                                        position: 'fixed',
                                        top: 0,
                                        left: 0,
                                        width: '100vw',
                                        height: '100vh',
                                        background: 'rgba(0,0,0,0.4)',
                                        zIndex: 1000,
                                    }}
                                >
                                    <nav
                                        style={{
                                            position: 'fixed',
                                            top: 0,
                                            right: 0,
                                            width: '220px',
                                            height: '100%',
                                            background: '#fff',
                                            boxShadow: '-2px 0 8px rgba(0,0,0,0.1)',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            padding: '32px 16px 16px 16px',
                                            gap: '24px',
                                            zIndex: 1001,
                                        }}
                                    >
                                        <button
                                            style={{
                                                alignSelf: 'flex-end',
                                                background: 'none',
                                                border: 'none',
                                                fontSize: '1.5rem',
                                                cursor: 'pointer',
                                            }}
                                            onClick={() => setMenuOpen(false)}
                                            aria-label="Fechar menu"
                                        >
                                            ×
                                        </button>
                                        <a
                                            href="#"
                                            onClick={e => { e.preventDefault(); scrollToSectionMobile("inicio"); }}
                                            style={{ fontSize: '1.1rem', fontWeight: 500 }}
                                        >
                                            Início
                                        </a>
                                        <a
                                            href="#"
                                            onClick={e => { e.preventDefault(); scrollToSectionMobile("sobre"); }}
                                            style={{ fontSize: '1.1rem', fontWeight: 500 }}
                                        >
                                            Sobre
                                        </a>
                                        <a
                                            href="#"
                                            onClick={e => { e.preventDefault(); scrollToSectionMobile("contato"); }}
                                            style={{ fontSize: '1.1rem', fontWeight: 500 }}
                                        >
                                            Contato
                                        </a>
                                        <button
                                            onClick={() => { window.location.href = '/login'; }}
                                            style={{
                                                marginTop: '16px',
                                                padding: '10px 0',
                                                background: '#013451',
                                                color: '#fff',
                                                border: 'none',
                                                borderRadius: '6px',
                                                fontWeight: 600,
                                                fontSize: '1rem',
                                                cursor: 'pointer',
                                            }}
                                        >
                                            Login
                                        </button>
                                    </nav>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="containerText" ref={sectionsRefMobile.inicio}>
                        <h1>
                            Eficiência, controle e inteligência
                            para escritórios de advocacia
                            modernos.
                        </h1>
                        <p>
                            Nosso sistema jurídico integra gestão de
                            clientes e processos, agenda automatizada
                            e um chat com inteligência artificial para
                            oferecer agilidade, organização e suporte
                            estratégico ao seu dia a dia jurídico.
                        </p>
                    </div>
                </div>
                <div className='containerAgenda'>
                    <div className='containerTextAgenda' ref={sectionsRefMobile.sobre}>
                        <h1>
                            Organize sua agenda jurídica
                            com clareza e precisão
                        </h1>
                        <p>
                            Gerencie compromissos processuais,
                            reuniões e prazos com uma agenda
                            pensada para a rotina de escritórios de
                            advocacia e profissionais do Direito.
                        </p>
                    </div>
                    <div className='containerImgAgenda'>
                        <img src={agenda} alt="Agenda" />
                    </div>
                </div>
                <div className='containerSeguranca'>
                    <div className='containerTextSeguranca' ref={sectionsRefMobile.saibaMais}>
                        <h1>
                            Organize seu escritório com
                            eficiência e segurança
                        </h1>
                        <p>
                            Nosso sistema jurídico foi desenvolvido
                            especialmente para escritórios de advocacia
                            que buscam integrar todas as áreas
                            essenciais da prática jurídica em um único
                            ambiente intuitivo e seguro.
                            Com ele, você gerencia clientes, acompanha
                            processos e armazena documentos de
                            forma simples, ágil e centralizada.
                        </p>
                    </div>
                    <div className='containerImgSeguranca'>
                        <div className='carrossel'>
                            <Carrossel />
                        </div>
                    </div>
                </div>
                <div className='containerContato'>
                    <div className='containerTextContato'>
                        <h1>
                            Entre em contato
                        </h1>
                    </div>
                    <div className='containerForm' ref={sectionsRefMobile.contato}>
                        <Form />
                    </div>
                </div>
                <div className='footer'>
                    <div className="info">
                        <div className='containerInfo'>
                            <h1>
                                Atendimento
                            </h1>
                            <p>
                                De segunda a sábado,
                                das 8h - 15h
                            </p>
                        </div>
                        <div className='containerInfo'>
                            <h1>
                                Endereço
                            </h1>
                            <p>
                                Rua XPTO, 660
                            </p>
                        </div>
                        <div className='containerInfo'>
                            <h1>
                                Informações Legais
                            </h1>
                            <p>
                                CNPJ: XXXXXXXXXXX
                                OAB: XXXXXXXXXXXXXX
                            </p>
                        </div>
                    </div>
                    <div className="redes">
                        <Redes />
                    </div>
                </div>
                <div className='direitoAutoral'>
                    <p>
                        © Lynx Technology - todos os direitos reservados
                    </p>
                </div>
            </div>
        </div>
    );
}