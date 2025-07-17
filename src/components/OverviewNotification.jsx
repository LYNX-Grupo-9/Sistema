import { SmButton } from "./Buttons/SmButton"
export function OverviewNotification({message, onClick}) {
    return (
        <div className="flex w-full items-center justify-between mt-[12px] gap-2">
            <div className="bg-[var(--color-blueDark)] h-[8px] w-[8px] rounded-[8px]"></div>
            <div onClick={onClick} className="w-full flex justify-between pl-[24px] items-center hover:bg-gray-200 rounded-full cursor-pointer">
                <span className="typography-semibold text-[20px] text-[var(--color-blueDark)] truncate pr-2">{message}</span>
            </div>
        </div>
    )

}