import icon from "../../../assets/icons/iaIcon.svg";
import ReactMarkdown from "react-markdown";

export function StepTwo({ chatHistory }) {
  return (
    <>

      {chatHistory.map((item, index) => (
          <div
          key={index}
          className="flex flex-col items-end  w-full justify-end gap-5 py-[5%]"
          >
          {item.role === "user" && (
              <div className="max-w-[60%] flex bg-[var(--color-light)] rounded-2xl shadow-lg p-[2%] self-end">
              <span className="text-[16px] typography-semibold text-[var(--color-blueDark)]">
                {item.parts[0]?.text}
              </span>
            </div>
          )}

          {item.role === "model" && (
              <div className="flex w-full items-start gap-4">
              <img src={icon} className="w-[3%]" />
              <div className="text-xl typography-regular text-[var(--color-blueDark)] px-[2%] prose prose-slate max-w-none space-y-6">
                <ReactMarkdown>{item.parts[0]?.text}</ReactMarkdown>
              </div>
            </div>
          )}
        </div>
      ))}

    </>
  );
}
