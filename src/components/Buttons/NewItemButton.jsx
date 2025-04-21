import Icon from "../../assets/icons/Plus.svg"
export function NewItemButton(props){
    return(
        <button className="w-[190px] h-[50px] rounded-[6px] text-[var(--color-blueDark)] bg-[var(--color-light)] text-[16px] typography-bold border-2 border-[var(--color-blueLight)] flex items-center justify-between px-4 cursor-pointer" onClick={props.click}>
            <img src={Icon}/>
            {props.title}
        </button>
    )
}