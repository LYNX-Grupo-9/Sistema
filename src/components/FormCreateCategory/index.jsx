import { X } from "lucide-react";
import { FormNEInput } from "../FormNewEvent/FormNEInput";
import { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

export default function FormCreateCategory({ onClose, isEdit, idCategoria, onSuccess }) {

    const [nome, setNome] = useState("");
    const [color, setColor] = useState("#000000"); // Default color
    const idAdvogado = localStorage.getItem("idAdvogado");



    useEffect(() => {
        if (isEdit) {
            getCategoriaById(idCategoria);
        }
    }, [isEdit, idCategoria]);

    function getCategoriaById(idCategoria) {
        console.log("Buscando categoria com ID:", idCategoria);

        const token = localStorage.getItem("token");

        if (!token) {
            toast.error("Sessão expirada. Faça login novamente.", {
                theme: "colored",
            });
            return;
        }

        axios.get(`http://localhost:8080/api/categorias/${idCategoria}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            }
        })
            .then((response) => {
                console.log(response.data);
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

    function postNewCategory(nomeEvento, color, idAdvogado) {
        const token = localStorage.getItem("token");

        if (!token) {
            toast.error("Sessão expirada. Faça login novamente.", {
                theme: "colored",
            });
            return;
        }

        axios.post(
            'http://localhost:8080/api/categorias',
            {
                nomeEvento,
                cor: color + "BF",
                idAdvogado
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                }
            }
        )
            .then((response) => {
                console.log(response.data);
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
        const token = localStorage.getItem("token");

        if (!token) {
            toast.error("Sessão expirada. Faça login novamente.", {
                theme: "colored",
            });
            return;
        }

        axios.patch(
            `http://localhost:8080/api/categorias/${idCategoria}`,
            {
                nomeEvento,
                cor: color + "BF",
                idAdvogado
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                }
            }
        )
            .then((response) => {
                console.log(response.data);
                toast.success("Categoria criada com sucesso!", {
                    theme: "colored",
                });
                onClose();
            })
            .catch((error) => {
                console.error(error);
                toast.error("Erro ao criar categoria.", {
                    theme: "colored",
                });
            });
    }

    return (
        <>
            <ToastContainer />
            <div className="bg-white p-4 flex flex-col gap-4 rounded-lg w-72">
                <X onClick={onClose} className="self-end" />
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




