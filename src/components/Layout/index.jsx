import TemisLogo from '../../assets/temis-logo.png';
import { IconHome } from '../IconHome';
import { IconProfile } from '../IconProfile';
import { IconDocs } from '../IconDocs';
import { IconCalendar } from '../IconCalendar';
import { IconAi } from '../IconAi';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { use, useEffect, useState } from 'react';
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
        '/customerlist': 'custumerlist',
        '/CustomerDetails': 'custumerlist',
        '/caselist': 'caselist',
        '/agenda': 'agenda',
        '/temisai': 'temisai',
    };

    const currentPage = pageMapping[location.pathname];

    const whiteBarMapping = {
        'home': "416px",
        'custumerlist': "312px",
        'caselist': "208px",
        'agenda': "104px",
        'temisai': "0px"
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


    console.log("Current Path:", location.pathname);
    console.log("Current Page:", currentPage);

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

                    <div className='flex flex-col items-center gap-10 w-full relative'>
                        <div className='w-full flex justify-center items-center h-16' onClick={() => handleNavigation('/home')}>
                            <IconHome actualcolor={currentPage == "home" ? "#fff" : "#87939E"} hovercolor="#fff" />
                        </div>

                        <div className='w-full flex justify-center items-center h-16' onClick={() => handleNavigation('/customerlist')}>
                            <IconProfile actualcolor={currentPage == "custumerlist" ? "#fff" : "#87939E"} hovercolor="#fff" />
                        </div>

                        <div className='w-full flex justify-center items-center h-16' onClick={() => handleNavigation('/caselist')}>
                            <IconDocs actualcolor={currentPage == "caselist" ? "#fff" : "#87939E"} hovercolor="#fff" />
                        </div>

                        <div className='w-full flex justify-center items-center h-16' onClick={() => handleNavigation('/agenda')}>
                            <IconCalendar actualcolor={currentPage == "agenda" ? "#fff" : "#87939E"} hovercolor="#fff" />
                        </div>

                        <div className='w-full flex justify-center items-center h-16' onClick={() => handleNavigation('/temisai')}>
                            <IconAi actualcolor={currentPage == "temisai" ? "#fff" : "#87939E"} hovercolor="#fff" />
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