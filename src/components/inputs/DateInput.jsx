import { InputMask } from '@react-input/mask';

export function DateInput(props) {
    return (
            <div className="flex flex-col items-center justify-center h-[14%] w-full gap-2">
             <span className="w-[65%] h-[30%] text-[16px] typography-semibold text-[var(--color-blueDark)]">
                {props.label}
            </span>
            <InputMask mask="AAAA-MM-DD" replacement={{ D: /\d/, M: /\d/, A: /\d/ }} 
            placeholder='Insira a data de nascimento do cliente'
             className='w-[65%] h-[50px] rounded-[10px] border-2 border-[var(--color-blueLight)] p-[15px] bg-[var(--color-light)] text-[16px]'
             onChange={props.onChange} 
             value={props.value}
             />
        </div>

    )
}