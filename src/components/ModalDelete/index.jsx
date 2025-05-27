import axios from "axios";
import { useEffect, useState } from "react";

export default function ModalDelete({ onClose, itemType, idToDelete, onDeleteSuccess }) {

    const [nameItem, setNameItem] = useState(null);

    useEffect(() => {

        if (itemType === "categoria") {
            getCategoriaById(idToDelete).then(categoria => {
                if (categoria) {
                    console.log("Categoria encontrada:", categoria);
                    setNameItem(categoria.nomeEvento);
                } else {
                    console.error("Categoria não encontrada.");
                }
            });
        } else if (itemType === "evento") {
            getEventoById(idToDelete).then(evento => {
                if (evento) {
                    console.log("Evento encontrado:", evento);
                    setNameItem(evento.titulo);
                } else {
                    console.error("Evento não encontrado.");
                }
            });
        }

    }, [itemType, idToDelete]);

    function getCategoriaById(idCategoria) {
        const token = localStorage.getItem("token");

        if (!token) {
            console.error('Token de autenticação não encontrado.');
            return false;
        }

        return axios.get(`http://localhost:8080/api/categorias/${idCategoria}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            }
        })
            .then(response => {
                return response.data;
            })
            .catch(error => {
                console.error("Erro ao buscar categoria:", error);
                return false;
            });
    }

    function getEventoById(idEvento) {
        const token = localStorage.getItem("token");

        if (!token) {
            console.error('Token de autenticação não encontrado.');
            return false;
        }

        return axios.get(`http://localhost:8080/api/eventos/${idEvento}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            }
        })
            .then(response => {
                return response.data;
            })
            .catch(error => {
                console.error("Erro ao buscar evento:", error);
                return false;
            });
    }


    function handleDelete(itemType, id) {
        if (itemType === "categoria") {
            deleteCategoria(id).then(response => {
                if (response) {
                    console.log("Categoria excluída com sucesso.");
                    if (onDeleteSuccess) {
                        onDeleteSuccess();
                    }
                } else {
                    console.error("Erro ao excluir categoria.");
                }

            })
        } else if (itemType === "evento") {
            deleteEvento(id).then(response => {
                if (response) {
                    console.log("Evento excluído com sucesso.");
                    if (onDeleteSuccess) {
                        onDeleteSuccess();
                    }
                } else {
                    console.error("Erro ao excluir evento.");
                }
            });
        }
    }

    function deleteEvento(idEvento) {
        const token = localStorage.getItem("token");

        if (!token) {
            console.error('Token de autenticação não encontrado.');
            return;
        }

        return axios.delete(`http://localhost:8080/api/eventos/${idEvento}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            }
        })
            .then(response => {
                console.log("Evento excluído com sucesso:", response.data);
                return true;
            })
            .catch(error => {
                console.error("Erro ao excluir evento:", error);
                return false;
            });
    }

    function deleteCategoria(idCategoria) {
        const token = localStorage.getItem("token");

        if (!token) {
            console.error('Token de autenticação não encontrado.');
            return;
        }

        return axios.delete(`http://localhost:8080/api/categorias/${idCategoria}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            }
        })
            .then(response => {
                console.log("Categoria excluída com sucesso:", response.data);
                return true;
            })
            .catch(error => {
                console.error("Erro ao excluir categoria:", error);
                return false;
            });
    }

    return (
        <>
            <div className="fixed inset-0 bg-black opacity-50 z-50"></div>
            <div className="fixed inset-0 flex items-center justify-center z-[999]">
                <div className="bg-white p-6 rounded-lg shadow-lg h-fit w-80">
                    <h2 className="text-lg font-semibold mb-4">Confirmação de Exclusão</h2>
                    {itemType === "categoria" ?
                        <p>Você tem certeza que deseja excluir a categoria "{nameItem}"?</p> :
                        itemType === "evento" ?
                            <p>Você tem certeza que deseja excluir o evento "{nameItem}"?</p> :
                            ""}
                    <div className="mt-4 flex justify-end gap-2">
                        <button
                            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                            onClick={() => {
                                handleDelete(itemType, idToDelete);
                                onClose();
                            }}
                        >
                            Excluir
                        </button>
                        <button
                            className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
                            onClick={onClose}
                        >
                            Cancelar
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}