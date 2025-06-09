import axios from "axios";
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import email, { sendEmail } from "../../utils/email";

export function ModalScheduling({ onClose, onSuccess, idSolicitacao }) {

    const [solicitacao, setSolicitacao] = useState(null);
    const idAdvogado = localStorage.getItem('idAdvogado');


    useEffect(() => {
        getSolicitacaoById(idSolicitacao);
    }, []);

    function getSolicitacaoById(idSolicitacao) {
        const token = localStorage.getItem('token');

        if (!token) {
            toast.error('Token de autenticação não encontrado. Por favor, faça login novamente.');
            return;
        }

        axios.get(`http://localhost:8080/api/solicitacao-agendamento/solicitacao/${idSolicitacao}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            }
        })
            .then(response => {
                console.log(response.data);
                setSolicitacao(response.data);
            }).catch(error => {
                toast.error('Erro ao buscar solicitação:', error);
            })
    }

    function changeStatusSolicitacao(idSolicitacao) {
        const token = localStorage.getItem('token');

        if (!token) {
            toast.error('Token de autenticação não encontrado. Por favor, faça login novamente.');
            return;
        }

        axios.put(`http://localhost:8080/api/solicitacao-agendamento/visualizar/${idSolicitacao}`, {}, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            }
        })
            .then(response => {
                console.log(response.data);
            }).catch(error => {
                toast.error('Erro ao atualizar status:', error);
            })
    }

    function createEvent() {

        const [hora, minuto] = solicitacao.horaSolicitacao.split(':');
        const horaFim = (parseInt(hora) + 1) % 24;
        const horaFimFormatada = horaFim.toString().padStart(2, '0');

        const eventoPayload = {
            nome: `Agendamento de ${solicitacao.nome}`,
            descricao: `
            Solicitação de agendamento de reunião (Via Landing Page): 
            Nome: ${solicitacao.nome} 
            Assunto: ${solicitacao.assunto} 
            Telefone: ${solicitacao.telefone} 
            Email: ${solicitacao.email} 
            `,
            local: "",
            linkReuniao: "",
            idAdvogado: Number(idAdvogado),
            idCliente: 0,
            idCategoria: 0,
            idProcesso: 0,
            dataReuniao: new Date(`${solicitacao.dataSolicitacao}T12:00:00`).toISOString(),
            horaInicio: `${solicitacao.horaSolicitacao}`,
            horaFim: `${horaFimFormatada}:${minuto}`,
        };

        const token = localStorage.getItem("token");

        console.log("Payload do evento:", eventoPayload);

        if (!token) {
            console.error('Token de autenticação não encontrado.');
            toast.error("Erro ao criar evento, tente novamente.");
            return;
        }


        axios.post(`http://localhost:8080/api/eventos`, eventoPayload, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        }).then(response => {
            console.log(response.data)
            toast.success("Agendamento aceito com sucesso! O cliente será notificado por email.");
            changeStatusSolicitacao(idSolicitacao);
            sendEmail({
                nome: solicitacao.nome,
                data: formatDateBR(solicitacao.dataSolicitacao),
                hora: formatTimeBR(solicitacao.horaSolicitacao),
                local: "Remoto",
                email: solicitacao.email,
            }, "template_rphntnv")
            onSuccess && onSuccess();
            onClose && onClose();
        }).catch(error => {
            console.error("Erro ao criar" + error)
            toast.error("Erro ao criar evento, tente novamente mais tarde.");
        })
        return;
    }

    function declineScheduling() {
        changeStatusSolicitacao(idSolicitacao);

        toast.success("Você Recusou a solicitação de agendamento com sucesso! O cliente será notificado por email.");

        onSuccess && onSuccess();
    }

    function formatDateBR(dateString) {
        if (!dateString) return "";
        const date = new Date(dateString + 'T00:00:00');
        if (isNaN(date)) return dateString;
        return date.toLocaleDateString('pt-BR');
    }

    function formatTimeBR(timeString) {
        if (!timeString) return "";
        const [hour, minute] = timeString.split(":");
        return `${hour}:${minute}`;
    }

    return (
        <>
            <div className="fixed inset-0 bg-black opacity-50 z-50" ></div>
            <div className="fixed inset-0  flex items-center justify-center z-[999]">
                <div className="bg-white border-2 border-gray-300 px-12 pt-11 pb-8 rounded-lg shadow-lg h-fit min-w-80 flex flex-col gap-2">
                    <X className="self-end" onClick={onClose} />
                    <span className="typography-black text-[var(--color-blueDark)] text-xl">Solicitação de agendamento de "{solicitacao && solicitacao.nome || ""}"</span>

                    <div className="mt-8">
                        <span className="font-bold text-[var(--color-grayLight)] text-xl">Data: </span>
                        <span className="font-semibold text-[var(--color-grayLight)] text-lg underline">{solicitacao ? `${formatDateBR(solicitacao.dataSolicitacao)} às ${formatTimeBR(solicitacao.horaSolicitacao)}` : ""}</span>
                    </div>
                    <div >
                        <span className="font-bold text-[var(--color-grayLight)] text-xl">Assunto: </span>
                        <span className="font-semibold text-[var(--color-grayLight)] text-lg">{solicitacao ? solicitacao.assunto : ""}</span>
                    </div>
                    <div>
                        <span className="font-bold text-[var(--color-grayLight)] text-xl">Telefone: </span>
                        <span className="font-semibold text-[var(--color-grayLight)] text-lg">{solicitacao ? solicitacao.telefone : ""}</span>
                    </div>
                    <div className="mb-8">
                        <span className="font-bold text-[var(--color-grayLight)] text-xl">Email: </span>
                        <span className="font-semibold text-[var(--color-grayLight)] text-lg">{solicitacao ? solicitacao.email : ""}</span>
                    </div>


                    <div className="mt-4 flex justify-end gap-2">
                        <button
                            onClick={declineScheduling}
                            className="bg-red-400 text-white px-4 py-2 rounded hover:bg-red-600 cursor-pointer"
                        >
                            Recusar
                        </button>
                        <button
                            className=" text-gray-800 border-2 border-[var(--color-blueDark)] px-4 py-2 rounded hover:bg-gray-200 cursor-pointer"
                            onClick={createEvent}
                        >
                            Aceitar
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}