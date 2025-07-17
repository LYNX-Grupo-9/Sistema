import icon from '../../assets/icons/external.svg';
export function ExternalTJSP(){
    function handleTJSPLink() {
        const tjspUrl = "https://www.tjsp.jus.br/";
        window.open(tjspUrl, "_blank");
    }
    return (
        <button className="h-[90px] text-[var(--bgLight)] px-4 py-2 rounded-[10px] cursor-pointer text-[28px] typography-semibold flex items-center justify-center gap-2 bg-[var(--color-grayLight)]"
        onClick={handleTJSPLink}
        >
            Visualizar no TJSP
            <img src={icon} alt="Attachment Icon" className="w-[50px]  ml-2 inline-block" />
        </button>
    );
}