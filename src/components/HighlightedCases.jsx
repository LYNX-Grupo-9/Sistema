import { SmButton } from "./Buttons/SmButton"

export function HighlightedCases(props){
    return(
        <div className="flex w-full items-center mt-[12px]">
            <div className="bg-[var(--color-blueDark)] h-[8px] w-[8px] rounded-[8px] mr-[36px]"></div>
            <span className="typography-bold text-[16px] text-[var(--color-blueDark)] w-[150px]">{props.idCase}</span>
            <span className="typography-bold text-[16px] text-[var(--color-blueDark)] w-[200px]">{props.Customer}</span>
            <span className="typography-bold text-[16px] text-[var(--color-blueDark)] w-[150px]">{props.type}</span>
            <span className="typography-bold text-[16px] text-[var(--color-blueDark)] w-[150px]">{props.initialDate}</span>
            <span className="typography-bold text-[16px] text-[var(--color-blueDark)] w-[150px]">{props.end}</span>
            <SmButton title="Ver Processo"/>
        </div>
    )
}