import { useEffect } from "react";
import { ChatAIInput } from "../../components/inputs/ChatAIButton";

export function TemisAI() {

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('http://localhost:3002/api/gemini/generate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ prompt: 'Qual a capital da França?' }),
        });

        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data = await res.json();
        console.log(data.text);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  return (
    <div className="flex flex-col items-center justify-center h-screen w-full">
      <div className="flex flex-col w-[60%]">
        <span className="text-6xl typography-semibold"
          style={{
            background: "var(--gradientHorizontal)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}>Olá, Alvany,
        </span>

        <span className="text-5xl typography-semibold mb-[4%]"
          style={{
            background: "var(--gradientHorizontal)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}>como posso ajudar?
        </span>
        <ChatAIInput />
      </div>
    </div>
  );
}