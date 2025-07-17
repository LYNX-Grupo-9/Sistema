export function MidButton(props){
    return(
        <button className="w-[130px] h-[40px] rounded-[10px] text-[var(--color-light)] text-[10px] typography-medium bg-[var(--color-blueLight)] cursor-pointer" onClick={props.click}>
            {props.title}
        </button>
    )
}