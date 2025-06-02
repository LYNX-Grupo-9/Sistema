import axios from "axios";
import { useEffect, useState } from "react";

export function ModalScheduling({ onClose, onSuccess, idSolicitacao }) {

    const [solicitacao, setSolicitacao] = useState(null);

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

    return (
        <>
            <div className="fixed inset-0 bg-black opacity-50 z-50" onClick={onClose}></div>
            <div className="fixed inset-0 flex items-center justify-center z-[999]">
                <div className="bg-white p-6 rounded-lg shadow-lg h-fit w-80">
                    <h2 className="text-lg font-semibold mb-4">Solicitação de agendamento</h2>

                    {solicitacao && <p>{solicitacao.nome}</p>}

                    <div className="mt-4 flex justify-end gap-2">
                        <button
                            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                        >
                            Excluir
                        </button>
                        <button
                            className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
                        >
                            Cancelar
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}