import { DropdownComponent } from "../../components/DropdownComponent";
import { Search } from "../../components/search";

export function Home() {
    return (
        <>
            <div className="py-[50px] px-[90px] bg-[var(--bgColor-primary)] h-screen w-screen">
                <div className="flex justify-between mb-[20px]">
                    <span className="typography-black text-[var(--color-blueDark)] text-[40px]">Visão geral</span>
                    <Search />
                </div>
                <div className="flex w-full h-full">
                    <div className="">
                        <div className="bgGlass h-[450px] w-[990px]">
                            <div className="flex justify-between">
                                <span className="typography-black text-[var(--color-blueDark)] text-[28px] ">Processos em destaque</span>
                                <DropdownComponent/>
                            </div>

                            <div className="h-[1px] w-full bg-[var(--lineSeparator)] rounded-2xl mt-[16px] mb-[16px]"></div>
                        </div>
                    </div>
                    <div className="">

                    </div>
                </div>
            </div>
        </>
    )
}