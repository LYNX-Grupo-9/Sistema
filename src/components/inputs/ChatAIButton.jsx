import sendIcon from "../../assets/icons/send.svg";
export function ChatAIInput() {
  return (
    <div className="flex justify-between items-center w-full h-auto min-h-[60px] max-h-[200px] overflow-y-auto border-4 border-[var(--color-blueLight)] rounded-lg text-[var(--gradientHorizontal)] px-[2%]"> 
     <textarea
        className="w-[95%] outline-none resize-none overflow-hidden"
        rows="1"
        onInput={(e) => {
          e.target.style.height = "auto"; // Reseta a altura
          e.target.style.height = `${e.target.scrollHeight}px`; // Ajusta para o conteúdo
        }}
      />
        <img src={sendIcon} className="w-[2%] fixed left-[78%]"/>
     
    </div>
  );
}