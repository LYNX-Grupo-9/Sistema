import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { toast } from "react-toastify";
import api from "../../services/api";

export default function Cases() {
    const [cases, setCases] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [selectedCase, setSelectedCase] = useState(null);
    const [selectedArea, setSelectedArea] = useState("Todos");
    const [showContactModal, setShowContactModal] = useState(false);
    const [initialMessage, setInitialMessage] = useState("");
    const [contactLoading, setContactLoading] = useState(false);

    const idAdvogado = localStorage.getItem("idAdvogado");

    const areaFilters = [
        "Todos",
        ...new Set(cases.map((item) => item.areaDireito).filter(Boolean))
    ];
    const filteredCases = selectedArea === "Todos"
        ? cases
        : cases.filter((item) => item.areaDireito === selectedArea);

    useEffect(() => {
        api.getCasosAbertos().then((res) => {
            const payload = Array.isArray(res.data) ? res.data : res.data?.content || [];
            setCases(payload);
            setError("");
        }).catch(() => {
            setError("Erro ao buscar casos abertos.");
        }).finally(() => {
            setLoading(false);
        });
    }, []);

    function formatDate(dateString) {
        if (!dateString) return "Nao informado";

        const [year, month, day] = dateString.split("-");

        if (!year || !month || !day) return dateString;

        return `${day}/${month}/${year}`;
    }

    function getValue(value) {
        return value || "Nao informado";
    }

    function openContactModal() {
        setInitialMessage("");
        setShowContactModal(true);
    }

    function closeContactModal() {
        if (contactLoading) return;

        setShowContactModal(false);
        setInitialMessage("");
    }

    function getClientId(caseData) {
        return caseData?.cliente?.idClienteApp || caseData?.cliente?.idCliente;
    }

    function getConversationId(responseData) {
        return (
            responseData?.idConversa ||
            responseData?.conversaId ||
            responseData?.id ||
            responseData?.data?.idConversa ||
            responseData?.data?.id
        );
    }

    async function handleContactSubmit() {
        const trimmedMessage = initialMessage.trim();
        const idCaso = selectedCase?.idCaso;
        const idCliente = getClientId(selectedCase);

        if (!idAdvogado) {
            toast.error("ID do advogado não encontrado. Por favor, faça login novamente.");
            return;
        }

        if (!idCaso || !idCliente) {
            toast.error("Não foi possível identificar o caso ou o cliente.");
            return;
        }

        if (!trimmedMessage) {
            toast.error("Escreva uma mensagem inicial para o cliente.");
            return;
        }

        setContactLoading(true);

        try {
            await api.registrarInteresseCaso(idCaso, idAdvogado);

            const conversaResponse = await api.criarConversaCaso({
                idCliente,
                idAdvogado,
                idCaso
            });

            const idConversa = getConversationId(conversaResponse?.data);

            if (!idConversa) {
                throw new Error("idConversa não retornado pela API.");
            }

            await api.enviarMensagem({
                idConversa,
                conteudo: trimmedMessage,
                remetenteTipo: "ADVOGADO",
                remetenteId: idAdvogado
            });

            toast.success("Contato iniciado com sucesso.");
            closeContactModal();
            closeModal();
        } catch (requestError) {
            console.error("Erro ao iniciar contato com o cliente:", requestError);
            toast.error("Erro ao iniciar contato com o cliente. Tente novamente.");
        } finally {
            setContactLoading(false);
        }
    }

    function closeModal() {
        setSelectedCase(null);
        setShowContactModal(false);
        setInitialMessage("");
    }

    return (
        <div className="w-full h-[94vh] overflow-y-auto bg-[var(--bgColor-primary)] px-8 py-6">
            <div className="mb-6">
                <h1 className="typography-bold text-[var(--color-blueDark)] text-3xl">Casos abertos</h1>
            </div>

            {loading && (
                <div className="w-full min-h-[50vh] flex items-center justify-center">
                    <span className="typography-medium text-[var(--grayText)]">Carregando casos...</span>
                </div>
            )}

            {!loading && error && (
                <div className="w-full min-h-[50vh] flex items-center justify-center">
                    <span className="typography-medium text-red-500">{error}</span>
                </div>
            )}

            {!loading && !error && cases.length === 0 && (
                <div className="w-full min-h-[50vh] flex items-center justify-center">
                    <span className="typography-medium text-[var(--grayText)]">Nenhum caso aberto encontrado.</span>
                </div>
            )}

            {!loading && !error && cases.length > 0 && (
                <>
                    <div className="mb-6 flex gap-3 overflow-x-auto pb-2">
                        {areaFilters.map((area) => {
                            const isActive = selectedArea === area;

                            return (
                                <button
                                    key={area}
                                    type="button"
                                    className={`min-w-[150px] h-[74px] rounded-lg border p-4 text-left cursor-pointer transition-colors ${isActive
                                        ? "bg-[var(--color-blueLight)] border-[var(--color-blueLight)] text-white"
                                        : "bg-white border-[#e8eef2] text-[var(--color-blueDark)]"
                                    }`}
                                    onClick={() => setSelectedArea(area)}
                                >
                                    <span className="block typography-bold text-sm">{area}</span>
                                    <span className={`block typography-medium text-xs mt-2 ${isActive ? "text-white" : "text-[var(--grayText)]"}`}>
                                        {area === "Todos"
                                            ? `${cases.length} casos`
                                            : `${cases.filter((item) => item.areaDireito === area).length} casos`}
                                    </span>
                                </button>
                            );
                        })}
                    </div>

                    {filteredCases.length === 0 ? (
                        <div className="w-full min-h-[35vh] flex items-center justify-center">
                            <span className="typography-medium text-[var(--grayText)]">Nenhum caso encontrado nessa area.</span>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                            {filteredCases.map((item) => (
                                <div key={item.idCaso} className="bg-white rounded-lg shadow-sm border border-[#e8eef2] p-5 flex flex-col min-h-[260px]">
                                    <div className="flex-1">
                                        <div className="flex items-start justify-between gap-3 mb-4">
                                            <h2 className="typography-bold text-[var(--color-blueDark)] text-xl leading-tight">
                                                {getValue(item.titulo)}
                                            </h2>
                                            <span className="typography-medium text-xs text-[var(--color-blueDark)] bg-[#e8f4fb] px-3 py-1 rounded-full whitespace-nowrap">
                                                {getValue(item.status)}
                                            </span>
                                        </div>

                                        <div className="flex flex-col gap-2 mb-4">
                                            <span className="typography-medium text-sm text-[var(--grayText)]">
                                                Criado em {formatDate(item.dataCriacao)}
                                            </span>
                                            <span className="typography-medium text-sm text-[var(--grayText)]">
                                                Cliente: {getValue(item.cliente?.nome)}
                                            </span>
                                        </div>

                                        <p
                                            className="typography-medium text-sm text-[#4b5563] leading-6 overflow-hidden"
                                            style={{
                                                display: "-webkit-box",
                                                WebkitLineClamp: 2,
                                                WebkitBoxOrient: "vertical"
                                            }}
                                        >
                                            {getValue(item.descricao)}
                                        </p>
                                    </div>

                                    <button
                                        type="button"
                                        className="mt-6 w-full h-11 rounded-lg bg-[var(--color-blueLight)] text-white typography-medium cursor-pointer"
                                        onClick={() => setSelectedCase(item)}
                                    >
                                        Ver Detalhes
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </>
            )}

            {selectedCase && (
                <>
                    <div className="fixed inset-0 bg-[#00000070] z-40" onClick={closeModal}></div>
                    <div className="fixed top-1/2 left-1/2 z-50 w-[92%] max-w-3xl max-h-[88vh] -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-xl flex flex-col">
                        <div className="flex items-start justify-between gap-4 p-6 border-b border-[#e8eef2]">
                            <div>
                                <h2 className="typography-bold text-[var(--color-blueDark)] text-2xl">
                                    {getValue(selectedCase.titulo)}
                                </h2>
                                <span className="typography-medium text-sm text-[var(--grayText)]">
                                    {getValue(selectedCase.areaDireito)} - {getValue(selectedCase.status)}
                                </span>
                            </div>
                            <button type="button" className="cursor-pointer text-[var(--color-blueDark)]" onClick={closeModal}>
                                <X size={28} />
                            </button>
                        </div>

                        <div className="p-6 overflow-y-auto flex-1">
                            <section className="mb-6">
                                <h3 className="typography-bold text-[var(--color-blueDark)] text-lg mb-3">Dados do caso</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <Detail label="ID do caso" value={selectedCase.idCaso} />
                                    <Detail label="Data de criacao" value={formatDate(selectedCase.dataCriacao)} />
                                    <Detail label="Area do direito" value={selectedCase.areaDireito} />
                                    <Detail label="Status" value={selectedCase.status} />
                                </div>
                                <Detail label="Descricao" value={selectedCase.descricao} large />
                            </section>

                            <section className="mb-6">
                                <h3 className="typography-bold text-[var(--color-blueDark)] text-lg mb-3">Cliente</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <Detail label="Nome" value={selectedCase.cliente?.nome} />
                                    <Detail label="Email" value={selectedCase.cliente?.email} />
                                </div>
                            </section>

                            <section>
                                <h3 className="typography-bold text-[var(--color-blueDark)] text-lg mb-3">Analise IA</h3>
                                <Detail label="Analise" value={selectedCase.analiseIa} large />
                            </section>
                        </div>

                        <div className="p-6 border-t border-[#e8eef2] flex flex-col sm:flex-row justify-end gap-3">
                            <button
                                type="button"
                                className="h-11 px-6 rounded-lg bg-[var(--color-blueLight)] text-white typography-medium cursor-pointer"
                                onClick={openContactModal}
                            >
                                Entrar em contato
                            </button>
                            <button
                                type="button"
                                className="h-11 px-6 rounded-lg border-2 border-[var(--color-blueLight)] text-[var(--color-blueLight)] typography-medium cursor-pointer"
                                onClick={closeModal}
                            >
                                Cancelar
                            </button>
                        </div>
                    </div>
                </>
            )}

            {selectedCase && showContactModal && (
                <>
                    <div className="fixed inset-0 bg-[#00000070] z-[60]" onClick={closeContactModal}></div>
                    <div className="fixed top-1/2 left-1/2 z-[70] w-[92%] max-w-xl -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-xl">
                        <div className="flex items-start justify-between gap-4 p-6 border-b border-[#e8eef2]">
                            <div>
                                <h2 className="typography-bold text-[var(--color-blueDark)] text-2xl">
                                    Mensagem inicial
                                </h2>
                                <span className="typography-medium text-sm text-[var(--grayText)]">
                                    Envie uma mensagem para {getValue(selectedCase.cliente?.nome)}
                                </span>
                            </div>
                            <button
                                type="button"
                                className="cursor-pointer text-[var(--color-blueDark)]"
                                onClick={closeContactModal}
                                disabled={contactLoading}
                            >
                                <X size={24} />
                            </button>
                        </div>

                        <div className="p-6">
                            <label className="block typography-bold text-sm text-[var(--color-blueDark)] mb-2">
                                Sua mensagem
                            </label>
                            <textarea
                                className="w-full min-h-[160px] rounded-lg border border-[#d8e1e8] p-4 typography-medium text-sm text-[#4b5563] outline-none resize-none focus:border-[var(--color-blueLight)]"
                                placeholder="Escreva a primeira mensagem para o cliente"
                                value={initialMessage}
                                onChange={(event) => setInitialMessage(event.target.value)}
                                disabled={contactLoading}
                            />
                        </div>

                        <div className="p-6 border-t border-[#e8eef2] flex flex-col sm:flex-row justify-end gap-3">
                            <button
                                type="button"
                                className="h-11 px-6 rounded-lg bg-[var(--color-blueLight)] text-white typography-medium cursor-pointer disabled:opacity-70"
                                onClick={handleContactSubmit}
                                disabled={contactLoading}
                            >
                                {contactLoading ? "Enviando..." : "Enviar mensagem"}
                            </button>
                            <button
                                type="button"
                                className="h-11 px-6 rounded-lg border-2 border-[var(--color-blueLight)] text-[var(--color-blueLight)] typography-medium cursor-pointer disabled:opacity-70"
                                onClick={closeContactModal}
                                disabled={contactLoading}
                            >
                                Cancelar
                            </button>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}

function Detail({ label, value, large = false }) {
    return (
        <div className={large ? "mt-4" : ""}>
            <span className="block typography-bold text-sm text-[var(--color-blueDark)] mb-1">{label}</span>
            <span className="block typography-medium text-sm text-[#4b5563] break-words whitespace-pre-wrap">
                {value || "Nao informado"}
            </span>
        </div>
    );
}
