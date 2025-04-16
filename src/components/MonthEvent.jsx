export function MonthEvent(props) {
    return(
    <div className="flex justify-between w-full pt-[10px]">
        <span className="text-[var(--color-grayLight)] typography-medium text-[18px]">{props.title}</span>
        <span className="text-[var(--color-blueLight)] typography-medium text-[18px]">{props.date}</span>
    </div>
    )
}