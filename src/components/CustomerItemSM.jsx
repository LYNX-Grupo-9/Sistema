
import { useState } from 'react';
import LoadingSVG from '../assets/loading.svg';


export function CustomerItemSM({id, name, email, phone, country, caseData, setCaseData, type}) {

    const [isLoading, setIsLoading] = useState(false);
    function handleCustomerSelected() {
        setIsLoading(true);
        setCaseData({...caseData, idCliente: id});
        type("selected");
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
            <div className="flex w-[100%] justify-between items-center mt-[20px] p-[2%] rounded-[10px] bg-[var(--bgLight)] active:scale-95 transition-all" onClick={handleCustomerSelected}>
                <span className="typography-bold text-[14px] text-[var(--color-blueLight)] w-[10%] mr-[2%] pr-4 truncate">{id}</span>
                <span className="typography-bold text-[14px] text-[var(--color-blueDark)] w-[20%] mr-[2%] pr-4 truncate">{name}</span>
                <span className="typography-bold text-[14px] text-[var(--color-blueDark)] w-[20%] mr-[2%] pr-4 truncate">{email}</span>
                <span className="typography-bold text-[14px] text-[var(--color-blueDark)] w-[20%] mr-[2%] pr-4 truncate">{phone}</span>
                <span className="typography-bold text-[14px] text-[var(--color-blueDark)] w-[20%] mr-[2%] pr-4 truncate">{country}</span>
            </div>
        </>
    )
}