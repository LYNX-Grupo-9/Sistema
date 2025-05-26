import { X } from "lucide-react";
import { FormNEInput } from "../FormNewEvent/FormNEInput";
import { useState } from "react";
import axios from "axios";

export default function FormCreateCategory({ onClose }) {

    const [nome, setNome] = useState("");
    const [color, setColor] = useState("#000000"); // Default color
    const idAdvogado = localStorage.getItem("idAdvogado");

    function handleSubmit() {
        console.log(color)
        axios.post(
            'http://localhost:8080/api/categorias',
            {   
                nomeEvento: nome ,
                cor: color + "80",
                idAdvogado
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZHZvZ2Fkb0BnbWFpbC5jb20iLCJpYXQiOjE3NDgyMDAxNjcsImV4cCI6MTc1MTgwMDE2N30.PvnDENQ5TAzvIQLl8IdUc79fylmkTJgbTSrQ55l5tjVjjGA0ys0vWhESdyTZj70spM30-lQduQTrqcSIt8MkMg`,
                }
            }
        )
            .then((response) => {
                console.log(response.data);
                alert("Categoria criada com sucesso!");
                onClose();
            })
            .catch((error) => {
                console.error(error);
                alert("Erro ao criar categoria.");
            });
    }

    return (
        <>
            <div className="bg-white p-4 flex flex-col gap-4 rounded-lg w-72">
                <X onClick={onClose} className="self-end" />
                <h1 className="font-semibold text-xl text-[var(--color-blueDark)] whitespace-nowrap">Adicionar categoria</h1>
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
                <div className="self-end flex gap-4">
                    <button onClick={onClose} className="cursor-pointer px-8 py-2 text-[var(--color-blueLight)] border-2 border-[var(--color-blueLight)] rounded-[10px]">Cancelar</button>
                    <button onClick={handleSubmit} className="cursor-pointer px-8 py-2 bg-[color:var(--color-blueLight)] text-white rounded-[10px]">Salvar</button>
                </div>
            </div>
        </>
    );
}




