import sendIcon from "../../assets/icons/send.svg";
import { useState, useRef } from "react";

export function ChatAIInput(props) {
  const [prompt, setPrompt] = useState("");
  const textareaRef = useRef(null);

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      props.change(prompt);
      setPrompt(""); 
    }
  
    if (event.key === "Tab") {
      event.preventDefault();
      const textarea = textareaRef.current;
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const newValue = prompt.substring(0, start) + "\n" + prompt.substring(end);
      setPrompt(newValue);
      setTimeout(() => {
        textarea.selectionStart = textarea.selectionEnd = start + 1;
      }, 0);
    }
  };

  return (
    <>
    <div
      className="bg-[var(--color-light)] flex justify-between
      items-center w-full h-auto min-h-[60px] max-h-[200px]
      overflow-y-auto border-2 border-[var(--color-blueLight)]
      rounded-xl text-[var(--gradientHorizontal)] px-[2%]
      "
      >
      <textarea
        ref={textareaRef}
        className="w-[95%] outline-none resize-none overflow-hidden "
        rows="1"
        value={prompt}
        placeholder="Digite sua mensagem..."
        onInput={(e) => {
          e.target.style.height = "auto";
          e.target.style.height = `${e.target.scrollHeight}px`;
        }}
        onChange={(e) => setPrompt(e.target.value)}
        onKeyDown={handleKeyDown}
        />
      <img
        src={sendIcon}
        className="w-[3%]  cursor-pointer"
        onClick={() => {
          props.change(prompt);
          setPrompt(""); 
        }}
        alt="Enviar"
        />
    </div>
  </>
  );
}
