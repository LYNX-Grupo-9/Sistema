import Check from "../assets/icons/check.svg"
export function Stepper(props) {
    return (
        <div className="flex justify-center gap-3 w-full items-center">
            <div
                className="w-[60px] h-[60px] rounded-[30px] flex justify-center items-center"
                style={{
                    backgroundColor: props.currentStep === 1 ? 'var(--color-blueDark)' : 'var(--success)',
                }}
            >
                {
                    props.currentStep === 1 ? <span className="text-[20px] typography-bold text-[var(--color-light)]">1</span> : <img src={Check} />
                }
            </div>

            <div className="w-[100px] h-[6px] bg-[var(--lineSeparator)] rounded-2xl"></div>

            <div
                className="w-[60px] h-[60px] rounded-[30px] flex justify-center items-center"
                style={{
                    backgroundColor: props.currentStep === 2 ? 'var(--color-blueDark)' :
                    props.currentStep < 2 ? 'var(--color-light)' :
                    'var(--success)',
                    border: props.currentStep < 2 ? 'solid 4px var(--lineSeparator)' : 'none'
                }}
            >
                {
                    props.currentStep === 2 ? <span className="text-[20px] typography-bold text-[var(--color-light)]">2</span> :
                    props.currentStep < 2 ? <span className="text-[20px] typography-bold text-[var(--color-blueDark)]">2</span> : 
                    <img src={Check} 
                    />
                }
            </div>

                <div className="w-[100px] h-[6px] bg-[var(--lineSeparator)] rounded-2xl"></div>
                
            <div
                className="w-[60px] h-[60px] rounded-[30px] flex justify-center items-center"
                style={{
                    backgroundColor: props.currentStep === 3 ? 'var(--color-blueDark)' :
                    props.currentStep < 3 ? 'var(--color-light)' :
                    'var(--success)',
                    border: props.currentStep < 3 ? 'solid 4px var(--lineSeparator)' : 'none'
                }}
            >
                {
                    props.currentStep === 3 ? <span className="text-[20px] typography-bold text-[var(--color-light)]">3</span> :
                    props.currentStep < 3 ? <span className="text-[20px] typography-bold text-[var(--color-blueDark)]">3</span> : 
                    <img src={Check} 
                    />
                }
            </div>
        </div>
    )
}