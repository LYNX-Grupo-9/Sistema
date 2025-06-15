
export function StepOne() {
    const nome = localStorage.getItem("nomeAdvogado");

    return(
        <>
        <span className="text-6xl typography-semibold"
              style={{
                background: "var(--gradientHorizontal)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}>Olá, {nome}!
            </span>

            <span className="text-5xl typography-regular mb-[4%] leading-16"
              style={{
                background: "var(--gradientHorizontal)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}>como posso ajudar?
            </span>
        </>
    )
}
