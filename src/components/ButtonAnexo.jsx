import React, { useRef, useState } from "react";
import { supabaseKey, supabaseUrl } from "../config/supabase";
import icon from "../assets/icons/directory.svg";
import viewIcon from "../assets/icons/view.svg";
import trashIcon from "../assets/icons/trash.svg";
import Plus from "../assets/icons/plusWhite.svg";
// Importa o supabase-js
import { createClient } from "@supabase/supabase-js";
import iconAttachment from '../assets/icons/attachment.svg';
import axios from "axios";


const supabase = createClient(supabaseUrl, supabaseKey);

const filesContainer = document.getElementById('filesContainer');

const bucketName = 'lynx';
const folderPath = 'lynx-folder';

export function ButtonAnexo() {
    const [open, setOpen] = useState(false);
    const [file, setFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [files, setFiles] = useState([]);
    const [status, setStatus] = useState("");
    const fileInputRef = useRef(null);
    const [newAttachment, setNewAttachment] = useState(false)

    // Listar arquivos do Supabase Storage
    async function listFiles() {
        try {
            setNewAttachment(false);
            setStatus('Buscando arquivos...');
            const { data, error } = await supabase.storage
                .from(bucketName)
                .list(folderPath);
            if (error) throw error;
            setFiles(data || []);
            setStatus(`Encontrados ${data?.length || 0} itens`, 'success');
        } catch (error) {
            console.error('Error listing files:', error);
            setStatus(`Erro ao listar arquivos: ${error.message}`, 'error');
            setFiles([]);
        }
    }

    function displayFiles(files) {
        if (files.length === 0) {
            filesContainer.innerHTML = '<p>Nenhum arquivo encontrado</p>';
            return;
        }

        let html = `
            <table>
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Tipo</th>
                        <th>Tamanho</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
        `;

        files.forEach(file => {
            const isFolder = file.name.endsWith('/');
            const fileType = isFolder ? 'Pasta' : (file.metadata?.mimetype || 'Arquivo');
            const fileSize = isFolder ? '-' : formatFileSize(file.metadata?.size);

            html += `
                <tr>
                    <td>${file.name}</td>
                    <td>${fileType}</td>
                    <td>${fileSize}</td>
                    <td>
                        ${!isFolder ? `
                            <button onclick="generateSignedUrl('${file.name}')" class="success-btn">URL Assinada</button>
                            <button onclick="getPublicUrl('${file.name}')">URL Pública</button>
                        ` : ''}
                        <button onclick="deleteItem('${file.name}', ${isFolder})" class="danger-btn">Excluir</button>
                    </td>
                </tr>
            `;
        });

        html += `
                </tbody>
            </table>
        `;

        filesContainer.innerHTML = html;
    }

    function formatFileSize(bytes) {
        if (bytes === 0 || !bytes) return '0 Bytes';

        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));

        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }

    // Upload de arquivo

    function postAnexo (idCliente, iditem, idProcesso, nomeAnexo) {
        const token = localStorage.getItem("token")
        if (!token) {
            return false
        }

        console.log({
            idCliente,
            idItem: iditem, 
            idProcesso, 
            nomeAnexo
        })

        axios.post("http://localhost:8080/api/anexos", {
            idCliente: idCliente ?? null,
            idItem: iditem ?? null,
            idProcesso: idProcesso ?? null,
            nomeAnexo: nomeAnexo ?? null
        },{
            headers: {
                "Authorization": `Bearer ${token}`, 
                "Content-Type": "application/json"
            }
        }).then (response => {
            console.log(response)
        }).catch (error => {
            console.error(error)
        })
    }

    async function handleUpload() {
        if (!file) return;
        setUploading(true);
        setStatus("Enviando anexo...");
        // Adicione uma barra ao final do folderPath se não houver
        const normalizedFolderPath = folderPath.endsWith("/") ? folderPath : folderPath + "/";
        const filePath = `${normalizedFolderPath}${file.name}`;
        const { data, error } = await supabase.storage.from(bucketName).upload(filePath, file, { upsert: true });
        
        if (data) {
            console.log(data)
            postAnexo(1, data.id, null, "testePost")
        }

        if (error) {
            setStatus("Erro ao enviar anexo");
        } else {
            setStatus("Anexo enviado com sucesso!");
            setFile(null);
            await listFiles();
        }
        setUploading(false);
    }

    function deleteAnexo(idAnexo) {
    const token = localStorage.getItem("token");
    if (!token) {
        return false;
    }

    console.log({ idAnexo });

    return axios.delete(`http://localhost:8080/api/anexos/${idAnexo}`, {
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        }
    })
    .then(response => {
        console.log(response);
        return true;
    })
    .catch(error => {
        console.error(error);
        return false;
    });
}

    // Função para deletar arquivo
    async function handleDelete(fileName, idAnexo) {
        if (!window.confirm(`Deseja realmente excluir o arquivo "${fileName}"?`)) return;
        setStatus("Excluindo arquivo...");
        const normalizedFolderPath = folderPath.endsWith("/") ? folderPath : folderPath + "/";
        const filePath = `${normalizedFolderPath}${fileName}`;
        const { error } = await supabase.storage.from(bucketName).remove([filePath]);
        if (error) {
            setStatus("Erro ao excluir arquivo");
        } else {
            console.log(fileName)
            deleteAnexo(idAnexo)
            setStatus("Arquivo excluído com sucesso!");
            await listFiles();
        }
    }

    // Abrir modal e listar anexos
    function handleOpen() {
        setOpen(true);
        listFiles();
    }

    return (
        <>
            <button className="h-[90px] text-[var(--bgLight)] px-4 py-2 rounded-[10px] cursor-pointer text-[28px] typography-semibold flex items-center justify-center gap-2  " style={{
                background: 'var(--gradientHorizontal)',
            }}
            onClick={handleOpen}
            >
                Ver anexos
                <img src={iconAttachment} alt="Attachment Icon" className="w-[50px]  ml-2 inline-block" />
            </button>

            {open && (
                <div className="fixed inset-0 flex items-center justify-center bg-[var(--bgTransparentDark)] bg-opacity-40 z-50">
                    <div className="bgDarkGlass rounded-lg p-6 min-w-[50%] h-[60%] shadow-lg relative">
                        <button
                            className="absolute top-2 right-6 text-white text-[40px]"
                            onClick={() => setOpen(false)}
                        >
                            ×
                        </button>
                        <div className="flex flex-col">

                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={e => setFile(e.target.files[0])}
                                className="mb-2"
                                style={{ display: "none" }}
                            />

                            {
                                newAttachment ? (
                                    <>
                                        <div
                                            onDragOver={(e) => {
                                                e.preventDefault();
                                                e.stopPropagation();
                                                e.currentTarget.classList.add("border-[var(--color-blueLight)]");
                                            }}
                                            onDragLeave={(e) => {
                                                e.preventDefault();
                                                e.stopPropagation();
                                                e.currentTarget.classList.remove("border-[var(--color-blueLight)]");
                                            }}
                                            onDrop={(e) => {
                                                e.preventDefault();
                                                e.stopPropagation();
                                                e.currentTarget.classList.remove("border-[var(--color-blueLight)]");
                                                const droppedFiles = e.dataTransfer.files;
                                                if (droppedFiles && droppedFiles.length > 0) {
                                                    setFile(droppedFiles[0]);
                                                }
                                            }}
                                            className="w-full p-8 border-2 border-dashed border-gray-300 rounded-lg text-center text-white hover:border-[var(--color-blueLight)] transition-all duration-200"
                                        >
                                            <img src={icon} alt="Ícone de Anexo" className="mx-auto w-12 mb-4" />
                                            <p className="text-lg">Arraste e solte o arquivo aqui ou</p>
                                            <button
                                                className="mt-2 bg-[var(--color-blueLight)] text-white px-4 py-2 rounded disabled:opacity-50"
                                                onClick={() => fileInputRef.current && fileInputRef.current.click()}
                                                disabled={uploading}
                                            >
                                                Selecionar Arquivo
                                            </button>
                                            {file && (
                                                <p className="mt-2 text-sm text-gray-300">
                                                    Arquivo selecionado: <strong>{file.name}</strong>
                                                </p>
                                            )}
                                        </div>

                                        <div className="mt-4 flex gap-4 justify-end">
                                            <button
                                                className="bg-[var(--color-blueDark)] text-white px-4 py-2 rounded disabled:opacity-50"
                                                onClick={handleUpload}
                                                disabled={!file || uploading}
                                            >
                                                {uploading ? "Enviando..." : "Adicionar Anexo"}
                                            </button>
                                            <button
                                                className="bg-gray-300 text-gray-800 px-4 py-2 rounded"
                                                onClick={listFiles}
                                            >
                                                Ver Anexos
                                            </button>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div className="flex items-center bg-[var(--bgMedium))] p-4 px-8 rounded-lg ">
                                            <div className="w-full flex items-center gap-4 ">
                                                <img src={icon} alt="Ícone de Anexo" className="w-[5%]" />
                                                <span className="text-[32px] text-[var(--color-light)] typography-semibold">Anexos</span>
                                            </div>
                                            <button onClick={() => setNewAttachment(true)}>
                                                <img src={Plus} alt="Ícone de Anexo" className="w-[100%] text-white" />
                                            </button>
                                        </div>
                                        <div className="flex flex-col gap-4 bg-[var(--bgDark)] p-8 rounded-lg w-full ">
                                            {files.length > 0 ? (
                                                <table className="w-full ">
                                                    <tbody className="flex flex-col h-[300px] overflow-y-auto">
                                                        {files.filter(f => !f.name.endsWith('/')).map(f => (
                                                            <tr key={f.name} className="flex justify-between items-center bg-[var(--bgMedium)] rounded-[20px] mb-4 p-2 px-8 ">
                                                                <td className="text-[20px] text-[var(--color-light)] typography-medium min-w-[150px] max-w-[300px] truncate">{f.name}</td>
                                                                <td className="p-1">
                                                                    <button
                                                                        className="px-2 py-1 mr-2"
                                                                        onClick={async () => {
                                                                            const { data, error } = await supabase
                                                                                .storage
                                                                                .from(bucketName)
                                                                                .createSignedUrl(`${folderPath}/${f.name}`, 60);
                                                                            if (data?.signedUrl) {
                                                                                window.open(data.signedUrl, "_blank");
                                                                            } else {
                                                                                alert("Erro ao gerar link para visualização.");
                                                                            }
                                                                        }}
                                                                        title="Visualizar"
                                                                    >
                                                                        <img src={viewIcon} />
                                                                    </button>
                                                                    <button
                                                                        className="px-2 py-1"
                                                                        onClick={() => handleDelete(f.name, f.idAnexo)}
                                                                        title="Excluir"
                                                                    >
                                                                        <img src={trashIcon} />
                                                                    </button>
                                                                </td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            ) : (
                                                <span className="text-xs text-gray-400">Nenhum anexo encontrado</span>
                                            )}
                                        </div>
                                    </>
                                )
                            }

                        </div>
                    </div>
                </div>
            )}
        </>
    );
}