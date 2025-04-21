import { MidButton } from "./Buttons/MidButton";
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import LoadingSVG from '../assets/loading.svg';


export function CustomerItem() {

    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    function handleNavigation(path) {
        setIsLoading(true);
        navigate(path);
        setTimeout(() => {
            setIsLoading(false);
        }, 1000);
    }
    
    return (
        <>
            {isLoading && (
                <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex justify-center items-center z-50">
                    <img src={LoadingSVG} alt="Carregando" className="w-16" />
                </div>
            )}
            <div className="flex w-[100%] justify-between items-center border-t-1 border-[var(--lineSeparator)] mt-[20px] pt-[20px]">
                <span className="typography-bold text-[14px] text-[var(--color-blueLight)] w-[12%]">123456</span>
                <span className="typography-bold text-[14px] text-[var(--color-blueDark)] w-[16%]">OSCAR PIASTRI</span>
                <span className="typography-bold text-[14px] text-[var(--color-blueDark)] w-[20%] ">oscarpiastri@gmail.com</span>
                <span className="typography-bold text-[14px] text-[var(--color-blueDark)] w-[13%] ">(11) 123456789</span>
                <span className="typography-bold text-[14px] text-[var(--color-blueDark)] w-[13%] ">AUSTRÁLIA</span>
                <span className="typography-bold text-[14px] text-[var(--color-blueDark)] w-[13%] ">11/12/2023</span>
                <span className="typography-bold text-[14px] text-[var(--color-blueDark)] w-[13%] ">2</span>
                <MidButton title="Detalhes" click={() => handleNavigation("/CustomerDetails")} />
            </div>
        </>
    )
}