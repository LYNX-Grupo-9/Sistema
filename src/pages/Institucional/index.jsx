import logo from '../../assets/temis-logo.png';
import menu from '../../assets/menu.svg';
import agenda from '../../assets/agenda.svg';
import Carrossel from '../../components/Carrossel';
import { Form } from '../../components/Form';
import { Redes } from '../../components/Redes';


export function Institucional() {
    return (
        <div>
            <div className="sobre">
                <div className="header">
                    <div className='containerLogo'>
                        <img src={logo} alt="Logo" />
                        <p>
                            TemisHub
                        </p>
                    </div>
                    <div className='containerMenu'>
                        <img src={menu} alt="menu" />
                    </div>    
                </div>
                <div className="containerText">
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
                <div className='containerTextAgenda'>
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
                <div className='containerTextSeguranca'>
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
                <div className='containerForm'>
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
    );
}