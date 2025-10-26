import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import api from '../../services/api';

export default function ModalDelete({ onClose, itemType, idToDelete, onDeleteSuccess, notify }) {

    const [nameItem, setNameItem] = useState(null);

    useEffect(() => {
        fetchData();
    }, [itemType, idToDelete]);


    function fetchData() {
        if (itemType === "categoria") {
            api.getCategoriaById(idToDelete).then(categoria => {
                setNameItem(categoria.data.nome);
            }).catch(error => {
                console.error("Categoria não encontrada.", error);
            });
        } else if (itemType === "evento") {
            api.getEventById(idToDelete).then(evento => {
                setNameItem(evento.data.nome);
            }).catch(error => {
                console.error("Evento não encontrado.", error);

            })
        }

    }

    function handleDelete(itemType, id) {
        if (itemType === "categoria") {
            api.deleteCategoria(id)
                .then(_ => {
                    toast.success("Categoria excluída com sucesso.", "success");
                    if (onDeleteSuccess) {
                        onDeleteSuccess();
                    }
                }).catch(error => {
                    console.error("Erro ao excluir categoria:", error);
                });
        } else if (itemType === "evento") {
            api.deleteEvento(id).then(_ => {
                toast.success("Evento excluído com sucesso.");
                if (onDeleteSuccess) {
                    onDeleteSuccess();
                }
            }).catch(error => {
                console.error("Erro ao excluir evento:", error);
            });
        }
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