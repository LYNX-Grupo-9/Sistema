
import { useState } from 'react';
import LoadingSVG from '../assets/loading.svg';


export function CustomerItemSM(props, {caseData, setCaseData}) {


    const [isLoading, setIsLoading] = useState(false);
    const idCliente = props.id

    function handleCustomerSelected() {
        setIsLoading(true);
        setCaseData({ ...caseData, cliente: idCliente });
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
            <div className="flex w-[100%] justify-between items-center border-t-1 border-[var(--lineSeparator)] mt-[20px] pt-[20px]" onClick={handleCustomerSelected}>
                <span className="typography-bold text-[14px] text-[var(--color-blueLight)] w-[20%] mr-[2%] pr-4 truncate">{props.id}</span>
                <span className="typography-bold text-[14px] text-[var(--color-blueDark)] w-[20%] mr-[2%] pr-4 truncate">{props.name}</span>
                <span className="typography-bold text-[14px] text-[var(--color-blueDark)] w-[20%] mr-[2%] pr-4 truncate">{props.email}</span>
                <span className="typography-bold text-[14px] text-[var(--color-blueDark)] w-[20%] mr-[2%] pr-4 truncate">{props.phone}</span>
                <span className="typography-bold text-[14px] text-[var(--color-blueDark)] w-[20%] mr-[2%] pr-4 truncate">{props.country}</span>
            </div>
        </>
    )
}