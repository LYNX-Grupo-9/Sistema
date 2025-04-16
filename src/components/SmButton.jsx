export function SmButton(props){
    return(
        <button className="w-[130px] h-[24px] rounded-[6px] text-[var(--color-light)] text-[10px] typography-medium bg-[var(--color-blueLight)]">
            {props.title}
        </button>
    )
}