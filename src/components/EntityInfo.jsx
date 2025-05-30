export function EntityInfo(props){
    return(
        <div className="rounded-[10px] w-[100%] min-h-[60px] bg-[var(--color-light)] flex justify-between items-center px-[5%]">
            <span className="typography-semibold text-[18px] text-[var(--color-blueDark)]">{props.title}</span>
            <span className="typography-regular text-[18px] text-[var(--color-blueLight)]">{props.value}</span>
        </div>
    )
}