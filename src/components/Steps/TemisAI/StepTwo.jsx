import icon from "../../../assets/icons/iaIcon.svg";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/github.css';
export function StepTwo({ chatHistory }) {
  return (
    <>

      {chatHistory.map((item, index) => (
        <div
          key={index}
          className="flex flex-col items-end  w-full justify-end gap-5 pb-[10%]"
        >
          {item.role === "user" && (
            <div className="max-w-[60%] flex bg-[var(--color-light)] rounded-2xl shadow-lg p-[2%] self-end mt-[5%]">
              <span className="text-[16px] typography-semibold text-[var(--color-blueDark)]">
                {item.parts[0]?.text}
              </span>
            </div>
          )}

          {item.role === "model" && (
            <div className="flex w-full items-start gap-4">
              <img src={icon} className="w-[3%]" />
              <div
                className="text-xl typography-regular text-[var(--color-blueDark)] px-[2%] prose prose-slate max-w-none space-y-6 break-words overflow-hidden"
              >

                <ReactMarkdown
                  components={{
                    code({ inline, children, ...props }) {
                      return inline ? (
                        <code
                          style={{
                            backgroundColor: "var(--color-light)",
                            borderRadius: "4px",
                            padding: "2px 5px",
                            fontSize: "14px",

                            whiteSpace: "normal",
                          }}
                        >
                          {children}
                        </code>
                      ) : (
                        <pre
                          style={{
                            backgroundColor: "var(--color-light)",
                            color: "var(--color-blueDark)",
                            padding: "1rem",
                            borderRadius: "8px",
                            overflowX: "auto",
                            fontSize: "14px",
                          }}
                        >
                          <code {...props}>{children}</code>
                        </pre>
                      );
                    },
                    p({ children }) {
                      return (
                        <p
                          style={{
                            marginBottom: "1rem",
                            lineHeight: 1.6,
                            fontSize: "16px",
                          }}
                        >
                          {children}
                        </p>
                      );
                    },
                    strong({ children }) {
                      return <strong style={{ fontWeight: 600 }}>{children}</strong>;
                    },
                  }}
                >
                  {item.parts[0].text}
                </ReactMarkdown>

              </div>
            </div>
          )}
        </div>
      ))}

    </>
  );
}
