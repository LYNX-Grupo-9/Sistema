import { SmButton } from "./Buttons/SmButton"
import { useNavigate } from 'react-router-dom';
export function EventCard(props) {
    const navigate = useNavigate();
    function handleNavigation(path, id, customer) {
        navigate(path, { state: { id, customer} });
    }
    function handleSeeMore() {
       const idEvento = props.id
       props.send(idEvento)
    }
    return (
        <div className="flex w-full justify-between items-center bg-[var(--color-light)] px-[3%] py-[3%] rounded-2xl mt-4">
            <div className="flex gap-5 items-center">
                <span className="typography-bold text-[14px] text-[var(--color-blueLight)]">{props.date}</span>
                <div className="w-1 h-7 bg-[var(--color-blueLight)] rounded-2xl"></div>
                <div className="flex flex-col">
                    <span className="typography-semibold text-[16px] text-[var(--color-grayLight)]">{props.title}</span>
                </div>

            </div>

            <SmButton title="Ver mais" click={handleSeeMore}/>
        </div>
    )
}