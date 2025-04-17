import { SmButton } from "./SmButton";

export function EventCard(props) {
    return (
        <div className="flex w-full justify-between items-center bg-[var(--color-light)] px-6 py-4 rounded-2xl mt-4">
            <div className="flex gap-5 items-center">

                <span className="typography-bold text-[14px] text-[var(--color-blueLight)]">{props.date}</span>

                <div className="w-1 h-7 bg-[var(--color-blueLight)] rounded-2xl"></div>
                <div className="flex flex-col">
                    <span className="typography-semibold text-[16px] text-[var(--color-grayLight)]">{props.title}</span>
                    <span className="typography-regular text-[12px] text-[var(--color-grayLight)]">{props.type}</span>
                </div>

            </div>

            <SmButton title="Ver mais" />
        </div>
    )
}