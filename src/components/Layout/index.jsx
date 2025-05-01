import TemisLogo from '../../assets/temis-logo.png';
import { IconHome } from '../IconHome';
import { IconProfile } from '../IconProfile';
import { IconDocs } from '../IconDocs';
import { IconCalendar } from '../IconCalendar';
import { IconAi } from '../IconAi';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import LoadingSVG from '../../assets/loading.svg';

export function Layout() {

    const location = useLocation();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    function handleNavigation(path) {
        setIsLoading(true);
        navigate(path);
        setTimeout(() => {
            setIsLoading(false);
        }, 1000); // Simulating a loading time of 1 second
    }

    const pageMapping = {
        '/home': 'home',
        '/CustomerList': 'CustomerList',
        '/processos': 'processos',
        '/agenda': 'agenda',
        '/ia': 'ia',
        '/CustomerDetails': 'CustomerList',
    };

    const currentPage = pageMapping[location.pathname] || 'home';

    const whiteBarMapping = {
        home: "93%",
        CustomerList: "83%",
        processos: "73%",
        agenda: "63%",
        ia: "53%"
    }

    const whiteBarStyle = {
        height: '4rem',
        width: '0.375rem',
        backgroundColor: 'white',
        borderRadius: '9999px',
        position: 'absolute',
        right: '0',
        bottom: whiteBarMapping[currentPage],
        transition: 'all 0.2s ease-in-out',
    }

    return (
        <>
            {isLoading && (
                <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex justify-center items-center z-50">
                    <img src={LoadingSVG} alt="Carregando" className="w-16" />
                </div>
            )}
            <div className="w-full h-full flex">
                <aside className="w-36 h-screen bg-gradient-to-b from-[var(--color-blueDark)] to-[var(--color-blueLight)] 
                rounded-r-4xl shadow-[0px_0px_20px_rgba(0,0,0,0.40)]
                flex flex-col items-center py-8 gap-16
                ">
                    <img src={TemisLogo} alt="" className='w-2/3 cursor-pointer' />

                    <div className='flex flex-col items-center gap-10 w-full relative h-full'>
                        <div className='w-full flex justify-center items-center h-[8%]' onClick={() => handleNavigation('/home')}>
                            <IconHome actualcolor={currentPage == "home" ? "#fff" : "#87939E"} hovercolor="#fff" />
                        </div>

                        <div className='w-full flex justify-center items-center h-[8%]' onClick={() => handleNavigation('/CustomerList')}>
                            <IconProfile actualcolor={currentPage == "CustomerList" ? "#fff" : "#87939E"} hovercolor="#fff" />
                        </div>

                        <div className='w-full flex justify-center items-center h-[8%]' onClick={() => handleNavigation('/processos')}>
                            <IconDocs actualcolor={currentPage == "processos" ? "#fff" : "#87939E"} hovercolor="#fff" />
                        </div>

                        <div className='w-full flex justify-center items-center h-[8%]' onClick={() => handleNavigation('/agenda')}>
                            <IconCalendar actualcolor={currentPage == "agenda" ? "#fff" : "#87939E"} hovercolor="#fff" />
                        </div>

                        <div className='w-full flex justify-center items-center h-[8%]' onClick={() => handleNavigation('/ia')}>
                            <IconAi actualcolor={currentPage == "ia" ? "#fff" : "#87939E"} hovercolor="#fff" />
                        </div>

                        <div style={whiteBarStyle}></div>
                    </div>
                </aside>

                <div className="flex-1 ">
                    <Outlet />
                </div>
            </div>
        </>
    )
}