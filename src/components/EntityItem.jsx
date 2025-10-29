import { MidButton } from "./Buttons/MidButton";
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import LoadingSVG from '../assets/loading.svg';


export function EntityItem(props) {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    function handleNavigation(path, id, customer, idCustomer) {
        setIsLoading(true);
        navigate(path, { state: { id, customer, idCustomer} });
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
            {props.type === "case" ? (
                <div className="flex w-[100%] justify-between items-center border-t-1 border-[var(--lineSeparator)] mt-[20px] pt-[20px]">
                    <span className="typography-bold text-[14px] text-[var(--color-blueLight)] w-[20%]">{props.caseNumber}</span>
                    <span className="typography-bold text-[14px] text-[var(--color-blueDark)] w-[20%] ml-[1%] pr-4 truncate">{props.title}</span>
                    <span className="typography-bold text-[14px] text-[var(--color-blueDark)] w-[20%] ml-[1%] pr-4 truncate">{props.customer}</span>
                    <span className="typography-bold text-[14px] text-[var(--color-blueDark)] w-[20%] ml-[1%] pr-4 truncate">{props.classe}</span>
                    <span className="typography-bold text-[14px] text-[var(--color-blueDark)] w-[20%] ml-[1%] pr-4 truncate">{props.status}</span>

                    <MidButton
                        title="Detalhes"
                        click={() => handleNavigation("/CaseDetails", props.id, props.customer, props.idCustomer)}
                    />
                </div>
            ) : (

                <div className="flex w-[100%] justify-between items-center border-t-1 border-[var(--lineSeparator)] mt-[20px] pt-[20px]">
                    <span className="typography-bold text-[14px] text-[var(--color-blueDark)] w-[15%] mr-[2%] pr-4 truncate">{props.name}</span>
                    <span className="typography-bold text-[14px] text-[var(--color-blueDark)] w-[15%] mr-[2%] pr-4 truncate">{props.email}</span>
                    <span className="typography-bold text-[14px] text-[var(--color-blueDark)] w-[15%] mr-[2%] pr-4 truncate">{props.phone}</span>
                    <span className="typography-bold text-[14px] text-[var(--color-blueDark)] w-[15%] mr-[2%] pr-4 truncate">{props.country}</span>
                    <span className="typography-bold text-[14px] text-[var(--color-blueDark)] w-[15%] mr-[2%] pr-4 truncate">{props.dtNasc}</span>
                    <span className="typography-bold text-[14px] text-[var(--color-blueDark)] w-[15%] mr-[2%] pr-4 truncate">{props.qtCases}</span>
                    <MidButton title="Detalhes" click={() => handleNavigation("/CustomerDetails", props.id)} />
                </div>
            )
            }
        </>
    )
}