import { InputMask } from '@react-input/mask';

export function CaseNumberInput(props) {
    return (
            <div className="flex flex-col items-center justify-center h-[14%] w-full gap-2">
             <span className="w-[65%] h-[30%] text-[16px] typography-semibold text-[var(--color-blueDark)]">
                {props.label}
            </span>
            <InputMask
                mask="DDDDDDD-DD.DDDD.D.DD.DDDD"
                replacement={{ D: /\d/ }}
                placeholder="0000000-00.0000.0.00.0000"
                className="w-[65%] h-[50px] rounded-[10px] border-2 border-[var(--color-blueLight)] p-[15px] bg-[var(--color-light)] text-[16px]"
                onChange={props.onChange}
                value={props.value}
            />
        </div>

    )
}