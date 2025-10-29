import axios from "axios";
import { X } from "lucide-react";
import { useEffect, useState } from "react"
import ModalDelete from "../ModalDelete";
import { FormNewEvent } from "../FormNewEvent";

const apiBaseURL = 'http://localhost:8080/api/';

export default function ModalEventDetails({ idEvento, onClose, onDeleteSuccess, isVisualize = false }) {

    const [event, setEvent] = useState(null);
    const [client, setClient] = useState(null);
    const [process, setProcess] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showEditForm, setShowEditForm] = useState(false);

    useEffect(() => {
        fetchData(idEvento)
    }, [idEvento]);

    function fetchData(idEvento) {
        if (idEvento !== undefined) {
            getEventById(idEvento).then(evento => {
                if (evento) {
                    setEvent(evento);

                    if (evento.cliente) {
                        getClientById(evento.cliente).then(cliente => {
                            if (cliente) {
                                setClient(cliente);

                                if (evento.processo) {
                                    getProcessById(evento.processo).then(processo => {
                                        if (processo) {
                                            setProcess(processo);
                                            console.log("Processo encontrado:", processo);
                                        } else {
                                            console.error("Processo não encontrado para o cliente:", evento.processo);
                                            setProcess(null);
                                        }
                                    });
                                }
                            }
                        });
                    }
                }
            });
        }
    }

    async function getEventById(idEvento) {
        const token = localStorage.getItem('token');

        if (!token) {
            console.error('Token de autenticação não encontrado.');
            return false;
        }

        return axios.get(apiBaseURL + `eventos/${idEvento}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => {
                return response.data;
            })
            .catch(error => {
                return false;
            });
    }


    async function getClientById(idCliente) {
        const token = localStorage.getItem('token');

        if (!token) {
            console.error('Token de autenticação não encontrado.');
            return false;
        }

        return axios.get(apiBaseURL + `clientes/${idCliente}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => {
                return response.data;
            })
            .catch(error => {
                return false;
            });
    }

    async function getProcessById(idProcesso) {
        const token = localStorage.getItem('token');

        if (!token) {
            console.error('Token de autenticação não encontrado.');
            return false;
        }

        return axios.get(apiBaseURL + `processos/${idProcesso}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }).then(response => {
            return response.data;
        }).catch(error => {
            console.error('Erro ao buscar processo:', error);
            return false;
        })
    }

    function formatDateBR(dateString) {
        if (!dateString) return "";
        const date = new Date(dateString);
        if (isNaN(date)) return dateString;
        return date.toLocaleDateString('pt-BR');
    }

    function formatTimeBR(timeString) {
        if (!timeString) return "";
        const [hour, minute] = timeString.split(":");
        return `${hour}:${minute}`;
    }

    function handleDelete() {
        setShowDeleteModal(true);
    }

    function handleDeleteSuccess() {
        // Fechar o modal de detalhes
        onClose();

        // Notificar o componente pai que o evento foi excluído
        if (onDeleteSuccess) {
            onDeleteSuccess();
        }
    }

    function openModalEdit() {
        setShowEditForm(true);
    }

    function closeModalEdit() {
        setShowEditForm(false)
    }

    return (
        <>
            {
                showEditForm &&
                <>
                    <div className="fixed inset-0 bg-black opacity-40 z-[998]" onClick={closeModalEdit}></div>
                    <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col gap-4 items-center z-[999]">
                        <FormNewEvent onClose={closeModalEdit} isEdit={true} idEvento={idEvento} onEditSuccess={() => { fetchData(idEvento) }} onSuccess={onDeleteSuccess} />
                    </div>
                </>
            }
            <div className="fixed inset-0 bg-[#0000005d] flex items-center justify-center z-40 " onClick={onClose}>
            </div>
            <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col gap-4 items-start bg-white rounded-lg shadow-lg p-6 z-50">
                <X onClick={onClose} size={30} color="#013451" className="self-end cursor-pointer" />
                <div>
                    <span className="typography-black text-[var(--color-blueDark)] text-xl ">Detalhes de  "{event ? event.nome : ""}": </span>
                    <div >
                        <div className="flex flex-col gap-2 mt-4 w-96">
                            <div>
                                <span className="font-bold text-[var(--color-grayLight)] text-xl">Data: </span>
                                <span className="font-semibold text-[var(--color-grayLight)] text-lg">
                                    {event ? `${formatDateBR(event.dataReuniao)}${event.horaInicio && event.horaFim ? `, das ${formatTimeBR(event.horaInicio)} às ${formatTimeBR(event.horaFim)}` : ""}` : ""}
                                </span>
                            </div>
                            <div>
                                <span className="font-bold text-[var(--color-grayLight)] text-xl">Descrição: </span>
                                <span className="font-semibold text-[var(--color-grayLight)] text-lg">{event ? event.descricao : ""}</span>
                            </div>
                            <div>
                                <span className="font-bold text-[var(--color-grayLight)] text-xl">Local: </span>
                                <span className="font-semibold text-[var(--color-grayLight)] text-lg">{event && event.local ? event.local : "Não foi informado um local para esse evento."}</span>
                            </div>
                            <div>
                                <span className="font-bold text-[var(--color-grayLight)] text-xl">Link: </span>
                                <span className="font-semibold text-[var(--color-grayLight)] text-lg">{event && event.link_reuniao ? event.link_reuniao : "Não há link disponível para esse evento."}</span>
                            </div>
                            <div className="w-full bg-gray-300 h-0.5 rounded-full my-4"></div>
                            <span className="typography-black text-[var(--color-blueDark)] text-xl ">Convidado: {client ? client.nome : ''} </span>
                            <div>
                                <span className="font-bold text-[var(--color-grayLight)] text-xl">Email: </span>
                                <span className="font-semibold text-[var(--color-grayLight)] text-lg">{client && client.email ? client.email : "Email indisponível"}</span>
                            </div>
                            <div>
                                <span className="font-bold text-[var(--color-grayLight)] text-xl">Telefone: </span>
                                <span className="font-semibold text-[var(--color-grayLight)] text-lg">{client && client.telefone ? client.telefone : "Telefone indisponível"}</span>
                            </div>
                            <div className="w-full bg-gray-300 h-0.5 rounded-full my-4"></div>
                            <span className="typography-black text-[var(--color-blueDark)] text-xl ">Processo: </span>
                            <div>
                                <span className="font-bold text-[var(--color-grayLight)] text-xl">Descrição: </span>
                                <span className="font-semibold text-[var(--color-grayLight)] text-lg">{process && process.assunto ? process.assunto : "Processo indisponível"}</span>
                            </div>
                            <div className="self-end flex gap-4 mt-4">
                                {isVisualize ? '' : <> <button
                                    className="cursor-pointer px-8 py-2 bg-red-500 text-white rounded-[10px]"
                                    onClick={handleDelete}
                                >
                                    Excluir
                                </button>
                                    <button onClick={openModalEdit} className="cursor-pointer px-8 py-2 bg-[color:var(--color-blueLight)] text-white rounded-[10px]">Editar</button>
                                </>
                                }
                                <button className="cursor-pointer px-8 py-2 text-[var(--color-blueLight)] border-2 border-[var(--color-blueLight)] rounded-[10px]" onClick={onClose}>Ok</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {showDeleteModal && (
                <ModalDelete
                    onClose={() => setShowDeleteModal(false)}
                    itemType="evento"
                    idToDelete={idEvento}
                    onDeleteSuccess={handleDeleteSuccess}
                />
            )}
        </>
    )
}   