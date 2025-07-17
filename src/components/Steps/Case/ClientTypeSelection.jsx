import Person from '../../../assets/icons/person.svg'
import add from '../../../assets/icons/add.svg'
export function ClientTypeSelection({handleClientSelectionType}) {

    const handleExistingClientClick = () => {
        handleClientSelectionType("existing");
    }
    const handleNewClientClick = () => {
        handleClientSelectionType("new");
    }
    return (
        <div className="flex items-center justify-center gap-5 w-full h-[80%]">
            <div className="flex flex-col items-center justify-center w-[40%] h-[40%] p-5 bg-[var(--bgColor-light)] rounded-[8%] shadow-lg gap-10 cursor-pointer hover:border-4 hover:border-[var(--color-blueLight)] transition-all transition-ease-in-out"
                onClick={handleExistingClientClick}>
                <img src={Person}  />
                <span className='typography-semibold text-[var(--color-blueDark)] text-[20px]'>Cliente existente</span>
            </div>
            <div className="flex flex-col items-center justify-center w-[40%] h-[40%] p-5 bg-[var(--bgColor-light)] rounded-[8%] shadow-lg gap-10 cursor-pointer hover:border-4 hover:border-[var(--color-blueLight)] transition-all transition-ease-in-out"
                onClick={handleNewClientClick}>
                <img src={add}  />
                <span className='typography-semibold text-[var(--color-blueDark)] text-[20px]'>Novo cliente</span>
            </div>
        </div>
    )
}