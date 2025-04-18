import { MultiSelectComponent } from "../../components/MultiSelectComponent";
import { Search } from "../../components/search";

export function ClientList(){
    return(
        <div className="bg-[var(--bgColor-primary)] w-screen h-screen pl-[220px] pt-[80px]">
            <span className="typography-bold text-[var(--color-blueDark)] text-4xl ">Central de Clientes</span>
            <div className="flex">
                <Search />
                <MultiSelectComponent/>
            </div>
        </div>
    )
}