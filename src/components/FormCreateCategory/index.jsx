import { X } from "lucide-react";
import { FormNEInput } from "../FormNewEvent/FormNEInput";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import api from "../../services/api.js";

export default function FormCreateCategory({ onClose, isEdit, idCategoria, onSuccess }) {

    const [nome, setNome] = useState("");
    const [color, setColor] = useState("#000000"); // Default color
    const idAdvogado = localStorage.getItem("idAdvogado");

    useEffect(() => {
        clearInputs();
    }, [isEdit])

    useEffect(() => {
        if (isEdit) {
            fetchData()
        }
    }, [isEdit, idCategoria]);

    function clearInputs() {
        setNome("");
        setColor("#000000");
    }

    function fetchData() {
        api.getCategoriaById(idCategoria).then((response) => {
            setNome(response.data.nomeEvento);
            setColor(response.data.cor.replace("BF", ""));
        })
            .catch((error) => {
                console.error(error);
                toast.error("Erro ao buscar categoria.", {
                    theme: "colored",
                });
            });
    }

    function handleSubmit() {

        if (!nome || !color) {
            toast.error("Por favor, preencha todos os campos.", {
                theme: "colored",
            });
            return;
        }

        if (isEdit) {
            updateCategory(nome, color, idAdvogado, idCategoria);
            return;
        }

        postNewCategory(nome, color, idAdvogado);
    }

    function postNewCategory(nome, color, idAdvogado) {
        api.newCategory({ nome, cor: color + "BF", idAdvogado })
            .then((response) => {
                toast.success("Categoria criada com sucesso!", {
                    theme: "colored",
                });
                onClose();
                if (onSuccess) {
                    onSuccess();
                }
            })
            .catch((error) => {
                console.error(error);
                toast.error("Erro ao criar categoria.", {
                    theme: "colored",
                });
            });
    }

    function updateCategory(nomeEvento, color, idAdvogado, idCategoria) {
        api.updateCategory(idCategoria, { nomeEvento, cor: color + "BF", idAdvogado })
            .then((response) => {
                toast.success("Categoria atualizada com sucesso!", {
                    theme: "colored",
                });
                onClose();
                if (onSuccess) {
                    onSuccess();
                }
            })
            .catch((error) => {
                console.error(error);
                toast.error("Erro ao atualizar categoria.", {
                    theme: "colored",
                });
            });
    }

    return (
        <>
            <div className="bg-white px-12 pt-11 pb-8 border-2 border-gray-300  flex flex-col gap-4 rounded-lg min-w-72 shadow-lgs">
                <X onClick={onClose} className="self-end cursor-pointer" />
                <h1 className="font-semibold text-xl text-[var(--color-blueDark)] whitespace-nowrap">{isEdit ? "Editar" : "Adicionar "} categoria</h1>
                <label className="block text-sm font-medium text-gray-700">Nome: </label>
                <FormNEInput value={nome} placeholder="Nome categoria" onChange={e => { setNome(e.target.value) }} />

                <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Cor da categoria: </label>
                    <input
                        type="color"
                        value={color}
                        onChange={(e) => setColor(e.target.value)}
                        className="h-14 w-full rounded-md border border-gray-300 p-1"
                    />
                </div>
                <div className="self-end flex gap-4 mt-4">
                    <button onClick={onClose} className="cursor-pointer px-8 py-2 text-[var(--color-blueLight)] border-2 border-[var(--color-blueLight)] rounded-[10px]">Cancelar</button>
                    <button onClick={handleSubmit} className="cursor-pointer px-8 py-2 bg-[color:var(--color-blueLight)] text-white rounded-[10px]">{isEdit ? "Editar" : "Salvar"}</button>
                </div>
            </div>
        </>
    );
}




