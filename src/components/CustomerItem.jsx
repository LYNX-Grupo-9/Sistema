import { MidButton } from "./Buttons/MidButton";

export function CustomerItem() {
    return (
        <div className="flex w-[100%] justify-between items-center border-t-1 border-[var(--lineSeparator)] mt-[20px] pt-[20px]">
            <span className="typography-semibold text-[14px] text-[var(--color-blueDark)] w-[12%]">123456</span>
            <span className="typography-semibold text-[14px] text-[var(--color-blueDark)] w-[16%]">OSCAR PIASTRI</span>
            <span className="typography-semibold text-[14px] text-[var(--color-blueDark)] w-[20%] ">oscarpiastri@gmail.com</span>
            <span className="typography-semibold text-[14px] text-[var(--color-blueDark)] w-[13%] ">(11) 123456789</span>
            <span className="typography-semibold text-[14px] text-[var(--color-blueDark)] w-[13%] ">AUSTRÁLIA</span>
            <span className="typography-semibold text-[14px] text-[var(--color-blueDark)] w-[13%] ">11/12/2023</span>
            <span className="typography-semibold text-[14px] text-[var(--color-blueDark)] w-[13%] ">2</span>
            <MidButton title="Detalhes"/>
        </div>
    )
}