export function MainInput (props) {
    return (
        <div className="flex flex-col items-center justify-center w-full gap-2">
            <span className="w-[65%] h-[30%] text-[16px] typography-semibold text-[var(--color-blueDark)]">
                {props.label}
            </span>
            <input type={props.type} placeholder={props.placeholder} className="w-[65%] h-[50px] rounded-[10px] border-2 border-[var(--color-blueLight)] p-[15px] bg-[var(--color-light)] text-[16px]"/>
        </div>
    );
} 