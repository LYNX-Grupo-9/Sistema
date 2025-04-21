import { SmButton } from "./Buttons/SmButton"

export function CustomerCase(props){
    return(
        <div className="flex w-full items-center mt-[12px]">
            <div className="bg-[var(--color-blueDark)] h-[8px] w-[8px] rounded-[20px] mr-[36px]"></div>
            <span className="typography-bold text-[12px] text-[var(--color-blueDark)] w-[15%]">{props.idCase}</span>
            <span className="typography-bold text-[12px] text-[var(--color-blueDark)] w-[20%]">{props.type}</span>
            <span className="typography-bold text-[12px] text-[var(--color-blueDark)] w-[20%]">{props.initialDate}</span>
            <span className="typography-bold text-[12px] text-[var(--color-blueDark)] w-[20%]">{props.end}</span>
            <SmButton title="Ver Processo"/>
        </div>
    )
}