import { useEffect, useState } from "react";
import { ChatAIInput } from "../../components/inputs/ChatAIButton";
import { GoogleGenAI } from "@google/genai";
import { StepOne } from "../../components/Steps/TemisAI/StepOne";
import { StepTwo } from "../../components/Steps/TemisAI/StepTwo";
import LoadingSVG from "../../assets/loading.svg";
import { apikey } from "../../config/gemini";
export function TemisAI() {
  const [prompt, setPrompt] = useState("");
  const [promptResponse, setPromptResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [chatHistory, setChatHistory] = useState([]);

  function handlePromptChange(newPrompt) {
    setPrompt(newPrompt);
    setChatHistory((prev) => [
      ...prev,
      { role: "user", parts: [{ text: newPrompt }] }
    ]);
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!prompt) return;
        setIsLoading(true);
        const ai = new GoogleGenAI({
          apiKey: apikey
        });

        async function main() {
          const response = await ai.models.generateContent({
            model: "gemini-2.0-flash",
            contents: chatHistory,
          });

          const text = response.text;

          setPromptResponse(text);

          const updatedHistory = [
            ...chatHistory,
            { role: "model", parts: [{ text }] }
          ];

          setChatHistory(updatedHistory);
        }

        await main();
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [prompt]);

  return (
    <>
      {isLoading && (
        <div className="fixed inset-0 bg-[var(--bgTransparentDark)] backdrop-blur-sm flex justify-center items-center z-50">
          <img src={LoadingSVG} alt="Carregando" className="w-16" />
        </div>
      )}
      <div className="flex flex-col items-center h-screen w-full relative overflow-y-auto">
        <div className="flex flex-col w-[60%] h-full pb-[80px] ">
          {!prompt ? (
            <>
              <div className="fixed w-[57%] h-full pb-4 z-10 flex flex-col justify-center">
                <StepOne />
                <ChatAIInput change={handlePromptChange} />
              </div>
            </>
          ) : (
            <>
              <StepTwo
                prompt={prompt}
                promptResponse={promptResponse}
                chatHistory={chatHistory}
              />
              <div className="fixed bottom-0 w-[57%] pb-4 z-10">
                <ChatAIInput change={handlePromptChange} />
              </div>
            </>
          )}
        </div>

      </div>

    </>
  );
}
