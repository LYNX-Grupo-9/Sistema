import logo from '../../assets/temis-logo.png';
import menu from '../../assets/menu.svg';

export function Institucional() {
    return (
        <div>
            <div className="sobre">
                <div className="header">
                    <div className='containerLogo'>
                        <img src={logo} alt="Logo"  width="70%" height="70%" />
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
        </div>
    );
}