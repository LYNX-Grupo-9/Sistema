import { useEffect, useRef, useState } from "react";
import { MessageSquare } from "lucide-react";
import { toast } from "react-toastify";
import api from "../../services/api";

export default function Chats() {
    const [conversations, setConversations] = useState([]);
    const [selectedConversation, setSelectedConversation] = useState(null);
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [messagesLoading, setMessagesLoading] = useState(false);
    const [newMessage, setNewMessage] = useState("");
    const [sendingMessage, setSendingMessage] = useState(false);
    const [error, setError] = useState("");
    const socketRef = useRef(null);

    const idAdvogado = localStorage.getItem("idAdvogado");

    function appendMessage(message) {
        setMessages((currentMessages) => {
            if (message?.idMensagem && currentMessages.some((item) => item.idMensagem === message.idMensagem)) {
                return currentMessages;
            }

            return [...currentMessages, message];
        });
    }

    useEffect(() => {
        if (!idAdvogado) {
            setError("ID do advogado não encontrado. Por favor, faça login novamente.");
            setLoading(false);
            return;
        }

        api.getConversasPorAdvogado(idAdvogado)
            .then((response) => {
                const payload = Array.isArray(response.data) ? response.data : [];
                setConversations(payload);
                setSelectedConversation(payload[0] || null);
                setError("");
            })
            .catch((requestError) => {
                console.error("Erro ao buscar conversas:", requestError);
                setError("Erro ao buscar conversas.");
                toast.error("Erro ao buscar conversas.");
            })
            .finally(() => {
                setLoading(false);
            });
    }, [idAdvogado]);

    useEffect(() => {
        if (!selectedConversation?.idConversa) {
            setMessages([]);
            return;
        }

        setMessagesLoading(true);

        api.getMensagensPorConversa(selectedConversation.idConversa)
            .then((response) => {
                const payload = Array.isArray(response.data) ? response.data : [];
                setMessages(payload);
            })
            .catch((requestError) => {
                console.error("Erro ao buscar mensagens:", requestError);
                setMessages([]);
                toast.error("Erro ao buscar mensagens da conversa.");
            })
            .finally(() => {
                setMessagesLoading(false);
            });
    }, [selectedConversation?.idConversa]);

    useEffect(() => {
        const idConversa = selectedConversation?.idConversa;
        const token = localStorage.getItem("token");

        if (!idConversa || !token) {
            return;
        }

        const socket = new WebSocket(api.getChatWebSocketUrl(token));
        socketRef.current = socket;

        socket.onopen = () => {
            socket.send(JSON.stringify({
                type: "SUBSCRIBE",
                idConversa
            }));
        };

        socket.onmessage = (event) => {
            try {
                const payload = JSON.parse(event.data);

                if (payload?.type === "MESSAGE" && payload.data?.idConversa === idConversa) {
                    appendMessage(payload.data);
                }
            } catch (parseError) {
                console.error("Erro ao processar mensagem do chat:", parseError);
            }
        };

        socket.onerror = (socketError) => {
            console.error("Erro no WebSocket do chat:", socketError);
        };

        return () => {
            socket.close();
            socketRef.current = null;
        };
    }, [selectedConversation?.idConversa]);

    function formatDate(dateString) {
        if (!dateString) return "Nao informado";

        const date = new Date(dateString);

        if (Number.isNaN(date.getTime())) return dateString;

        return new Intl.DateTimeFormat("pt-BR", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric"
        }).format(date);
    }

    function formatTime(dateString) {
        if (!dateString) return "";

        const date = new Date(dateString);

        if (Number.isNaN(date.getTime())) return "";

        return new Intl.DateTimeFormat("pt-BR", {
            hour: "2-digit",
            minute: "2-digit"
        }).format(date);
    }

    async function handleSendMessage() {
        const trimmedMessage = newMessage.trim();
        const idConversa = selectedConversation?.idConversa;

        if (!idAdvogado) {
            toast.error("ID do advogado não encontrado. Por favor, faça login novamente.");
            return;
        }

        if (!idConversa) {
            toast.error("Selecione uma conversa para enviar a mensagem.");
            return;
        }

        if (!trimmedMessage) {
            toast.error("Escreva uma mensagem antes de enviar.");
            return;
        }

        setSendingMessage(true);

        try {
            if (socketRef.current?.readyState === WebSocket.OPEN) {
                socketRef.current.send(JSON.stringify({
                    type: "SEND",
                    idConversa,
                    conteudo: trimmedMessage,
                    remetenteTipo: "ADVOGADO"
                }));
                setNewMessage("");
                return;
            }

            const response = await api.enviarMensagem({
                idConversa,
                conteudo: trimmedMessage,
                remetenteTipo: "ADVOGADO",
                remetenteId: idAdvogado
            });

            const createdMessage = response?.data;

            if (createdMessage && typeof createdMessage === "object" && !Array.isArray(createdMessage)) {
                appendMessage(createdMessage);
            } else {
                const messagesResponse = await api.getMensagensPorConversa(idConversa);
                const payload = Array.isArray(messagesResponse.data) ? messagesResponse.data : [];
                setMessages(payload);
            }

            setNewMessage("");
        } catch (requestError) {
            console.error("Erro ao enviar mensagem:", requestError);
            toast.error("Erro ao enviar mensagem.");
        } finally {
            setSendingMessage(false);
        }
    }

    function handleMessageKeyDown(event) {
        if (event.key === "Enter" && !event.shiftKey) {
            event.preventDefault();
            if (!sendingMessage) {
                handleSendMessage();
            }
        }
    }

    return (
        <div className="w-full h-[94vh] bg-[var(--bgColor-primary)] px-8 py-6">

            <div className="h-[calc(100%-72px)] rounded-2xl border border-[#e8eef2] bg-white shadow-sm overflow-hidden">
                {loading ? (
                    <div className="h-full flex items-center justify-center">
                        <span className="typography-medium text-[var(--grayText)]">Carregando conversas...</span>
                    </div>
                ) : error ? (
                    <div className="h-full flex items-center justify-center">
                        <span className="typography-medium text-red-500">{error}</span>
                    </div>
                ) : (
                    <div className="grid h-full grid-cols-1 lg:grid-cols-[1.5fr_420px]">
                        <div className="flex min-h-0 flex-col overflow-hidden bg-[#f8fbfd]">
                            {selectedConversation ? (
                                <>
                                    <div className="border-b border-[#e8eef2] bg-white px-6 py-5">
                                        <span className="block typography-bold text-xl text-[var(--color-blueDark)]">
                                            {selectedConversation.cliente?.nome || "Cliente"}
                                        </span>
                                        <span className="block mt-1 typography-medium text-sm text-[var(--grayText)]">
                                            {selectedConversation.caso?.titulo || "Caso sem titulo"}
                                        </span>
                                    </div>

                                    <div className="flex min-h-0 flex-1 flex-col">
                                        <div className="flex-1 overflow-y-auto px-6 py-6 flex flex-col gap-4 bg-[#f8fbfd]">
                                            {messagesLoading ? (
                                                <div className="flex-1 flex items-center justify-center">
                                                    <span className="typography-medium text-[var(--grayText)]">Carregando mensagens...</span>
                                                </div>
                                            ) : messages.length === 0 ? (
                                                <div className="flex-1 flex items-center justify-center">
                                                    <div className="max-w-md text-center">
                                                        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#e8f4fb] text-[var(--color-blueLight)]">
                                                            <MessageSquare size={28} />
                                                        </div>
                                                        <h2 className="typography-bold text-2xl text-[var(--color-blueDark)] mb-3">
                                                            Nenhuma mensagem ainda
                                                        </h2>
                                                        <p className="typography-medium text-sm leading-6 text-[var(--grayText)]">
                                                            Essa conversa foi criada, mas ainda nao possui mensagens para exibir.
                                                        </p>
                                                    </div>
                                                </div>
                                            ) : (
                                                messages.map((message) => {
                                                    const isAdvogado = message.remetenteTipo === "ADVOGADO";

                                                    return (
                                                        <div
                                                            key={message.idMensagem}
                                                            className={`flex ${isAdvogado ? "justify-end" : "justify-start"}`}
                                                        >
                                                            <div
                                                                className={`max-w-[80%] rounded-2xl px-4 py-3 shadow-sm ${isAdvogado
                                                                    ? "bg-[var(--color-blueLight)] text-white rounded-br-md"
                                                                    : "bg-white text-[var(--color-blueDark)] border border-[#e8eef2] rounded-bl-md"
                                                                    }`}
                                                            >
                                                                <span className="block typography-medium text-sm leading-6 whitespace-pre-wrap break-words">
                                                                    {message.conteudo}
                                                                </span>
                                                                <span className={`block mt-2 text-[11px] ${isAdvogado ? "text-[#dbeeff]" : "text-[var(--grayText)]"}`}>
                                                                    {formatTime(message.enviadoEm)}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    );
                                                })
                                            )}
                                        </div>

                                        <div className="border-t border-[#e8eef2] bg-white px-6 py-4">
                                            <div className="flex items-end gap-3">
                                                <textarea
                                                    className="min-h-[52px] max-h-32 flex-1 resize-none rounded-2xl border border-[#d8e1e8] px-4 py-3 typography-medium text-sm text-[#4b5563] outline-none focus:border-[var(--color-blueLight)]"
                                                    placeholder="Digite sua mensagem..."
                                                    value={newMessage}
                                                    onChange={(event) => setNewMessage(event.target.value)}
                                                    onKeyDown={handleMessageKeyDown}
                                                    disabled={sendingMessage}
                                                />
                                                <button
                                                    type="button"
                                                    className="h-[52px] min-w-[132px] rounded-2xl bg-[var(--color-blueLight)] px-5 text-white typography-medium cursor-pointer disabled:opacity-70"
                                                    onClick={handleSendMessage}
                                                    disabled={sendingMessage}
                                                >
                                                    {sendingMessage ? "Enviando..." : "Enviar"}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <div className="h-full flex items-center justify-center px-6">
                                    <div className="max-w-md text-center">
                                        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#e8f4fb] text-[var(--color-blueLight)]">
                                            <MessageSquare size={28} />
                                        </div>
                                        <h2 className="typography-bold text-2xl text-[var(--color-blueDark)] mb-3">
                                            Nenhuma conversa selecionada
                                        </h2>
                                        <p className="typography-medium text-sm leading-6 text-[var(--grayText)]">
                                            Escolha uma conversa na lista a direita para abrir o chat.
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>

                        <aside className="border-t lg:border-t-0 lg:border-l border-[#e8eef2] bg-white flex flex-col">
                            <div className="px-5 py-4 border-b border-[#e8eef2]">
                                <h2 className="typography-bold text-lg text-[var(--color-blueDark)]">Conversas</h2>
                                <span className="typography-medium text-sm text-[var(--grayText)]">
                                    {conversations.length} {conversations.length === 1 ? "conversa" : "conversas"}
                                </span>
                            </div>

                            {conversations.length === 0 ? (
                                <div className="flex-1 flex items-center justify-center px-6">
                                    <p className="typography-medium text-sm text-center text-[var(--grayText)]">
                                        Nenhuma conversa encontrada para este advogado.
                                    </p>
                                </div>
                            ) : (
                                <div className="flex-1 overflow-y-auto">
                                    {conversations.map((conversation) => {
                                        const isActive = selectedConversation?.idConversa === conversation.idConversa;

                                        return (
                                            <button
                                                key={conversation.idConversa}
                                                type="button"
                                                className={`w-full border-b border-[#eef3f6] px-5 py-4 text-left transition-colors cursor-pointer ${isActive
                                                    ? "bg-[#e8f4fb]"
                                                    : "bg-white hover:bg-[#f8fbfd]"
                                                    }`}
                                                onClick={() => setSelectedConversation(conversation)}
                                            >
                                                <span className="block typography-bold text-base text-[var(--color-blueDark)]">
                                                    {conversation.cliente?.nome || "Cliente sem nome"}
                                                </span>
                                                <span className="block mt-1 typography-medium text-sm text-[#4b5563]">
                                                    {conversation.caso?.titulo || "Caso sem titulo"}
                                                </span>
                                                <span className="block mt-2 typography-medium text-xs text-[var(--grayText)]">
                                                    Criado em {formatDate(conversation.criadoEm)}
                                                </span>
                                            </button>
                                        );
                                    })}
                                </div>
                            )}
                        </aside>
                    </div>
                )}
            </div>
        </div>
    );
}
