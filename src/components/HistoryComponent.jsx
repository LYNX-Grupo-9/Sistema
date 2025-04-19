import { SmButton } from "./Buttons/SmButton"
export function HistoryComponent(props) {
    return (
        <div className="flex w-full justify-between pt-[16px]">
            <span className="typography-semibold text-[16px] text-[var(--color-blueDark)]">{props.title}</span>
            <span className="typography-semibold text-[16px] text-[var(--color-blueDark)]">{props.message}</span>
            <SmButton title="Ver mais" />
        </div>
    )
}