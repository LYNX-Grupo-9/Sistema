import icon from "../assets/icons/searchIcon.svg"
export function Search(props) {
    return (
        <div className="border-2 w-[350px] h-[50px] flex items-center justify-between px-[22px] rounded-[10px] border-[var(--color-blueLight)] bg-[var(--color-light)]">
            <input className="w-full h-full outline-0" placeholder="Pesquisar" onChange={props.change}/>
            <img src={icon} />
        </div>
    )
}