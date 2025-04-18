import { SmButton } from "./SmButton"
export function OverviewNotification(props) {
    return (
        <div className="flex w-full items-center justify-between mt-[12px]">
            <div className="bg-[var(--color-blueDark)] h-[8px] w-[8px] rounded-[8px]"></div>
            <div className="w-full flex justify-between pl-[24px] items-center"> 
                <span className="typography-semibold text-[24px] text-[var(--color-blueDark)]">{props.message}</span>
                <SmButton title="Ver mais" />
            </div>
        </div>
    )

}