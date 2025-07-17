export function LgButton(props){
    return(
        <>
        {
            props.type === "alternative" ?

            <button className="w-[180px] h-[50px] rounded-[10px] text-[var(--color-blueDark)] border-2 text-[16px] typography-medium border-[var(--color-blueLight)] cursor-pointer" onClick={props.click}>
                {props.title}
            </button> : 

            <button className="w-[180px] h-[50px] rounded-[10px] text-[var(--color-light)] text-[16px] typography-medium bg-[var(--color-blueLight)] cursor-pointer" onClick={props.click}>
                {props.title}
            </button> 
        }
        </>
    )
}