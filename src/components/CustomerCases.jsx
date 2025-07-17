import { SmButton } from "./Buttons/SmButton"
import { useNavigate } from 'react-router-dom';

export function CustomerCase(props){
    const navigate = useNavigate();
    function handleNavigation(path, id, customer) {

        navigate(path, { state: { id, customer} });

    }
    return(
        <div className="flex w-full items-center mt-[12px]">
            <div className="bg-[var(--color-blueDark)] h-[8px] w-[8px] rounded-[20px] mr-[36px]"></div>
            <span className="typography-bold text-[12px] text-[var(--color-blueDark)] w-[15%] truncate mr-[1%]">{props.idCase}</span>
            <span className="typography-bold text-[12px] text-[var(--color-blueDark)] w-[20%] truncate mr-[1%]">{props.type}</span>
            <span className="typography-bold text-[12px] text-[var(--color-blueDark)] w-[20%] truncate mr-[1%]">{props.initialDate}</span>
            <span className="typography-bold text-[12px] text-[var(--color-blueDark)] w-[20%] truncate mr-[1%]">{props.end}</span>
            <SmButton title="Ver Processo" click={() => handleNavigation("/CaseDetails", props.idCase, props.customer)}/>
            
        </div>
    )
}