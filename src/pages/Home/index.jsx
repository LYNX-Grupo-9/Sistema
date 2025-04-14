import { Search } from "../../components/search";

export function Home(){
   return(
   <>
        <div className="py-[50px] px-[90px] bg-[var(--bgColor-primary)] h-screen w-screen">
            <div className="flex justify-between">
                <span className="typography-black text-[var(--color-blueDark)] text-[40px]">Visão geral</span>
                <Search/>
            </div>
        </div>
    </>
   )
}