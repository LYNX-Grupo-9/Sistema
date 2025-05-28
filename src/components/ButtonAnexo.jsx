import React, { useRef, useState } from "react";

// Importa o supabase-js
import { createClient } from "@supabase/supabase-js";

// Configuração do Supabase
const supabaseUrl = 'https://fmgrvapuauxwphxyjiqq.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZtZ3J2YXB1YXV4d3BoeHlqaXFxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg0NzIwMTksImV4cCI6MjA2NDA0ODAxOX0.7XHoqbFoXPLklEsM6znZNu0d-uyGFN5f-SPqVcCEqi8';
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

    // Listar arquivos do Supabase Storage
    async function listFiles() {
        try {
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
            setFiles([]); // Limpa a lista em caso de erro
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
    async function handleUpload() {
        if (!file) return;
        setUploading(true);
        setStatus("Enviando anexo...");
        // Adicione uma barra ao final do folderPath se não houver
        const normalizedFolderPath = folderPath.endsWith("/") ? folderPath : folderPath + "/";
        const filePath = `${normalizedFolderPath}${file.name}`;
        const { error } = await supabase.storage.from(bucketName).upload(filePath, file, { upsert: true });
        if (error) {
            setStatus("Erro ao enviar anexo");
        } else {
            setStatus("Anexo enviado com sucesso!");
            setFile(null);
            await listFiles();
        }
        setUploading(false);
    }

    // Função para deletar arquivo
    async function handleDelete(fileName) {
        if (!window.confirm(`Deseja realmente excluir o arquivo "${fileName}"?`)) return;
        setStatus("Excluindo arquivo...");
        const normalizedFolderPath = folderPath.endsWith("/") ? folderPath : folderPath + "/";
        const filePath = `${normalizedFolderPath}${fileName}`;
        const { error } = await supabase.storage.from(bucketName).remove([filePath]);
        if (error) {
            setStatus("Erro ao excluir arquivo");
        } else {
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
            <button
                className="bg-blue-600 text-white px-4 py-2 rounded"
                onClick={handleOpen}
            >
                Anexos
            </button>

            {open && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
                    <div className="bg-white rounded-lg p-6 min-w-[320px] shadow-lg relative">
                        <button
                            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                            onClick={() => setOpen(false)}
                        >
                            ×
                        </button>
                        <div className="flex flex-col gap-4">
                            {/* Input de arquivo escondido */}
                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={e => setFile(e.target.files[0])}
                                className="mb-2"
                                style={{ display: "none" }}
                            />
                            {/* Botão que abre o explorador de arquivos */}
                            <button
                                className="bg-green-600 text-white px-4 py-2 rounded disabled:opacity-50"
                                onClick={() => fileInputRef.current && fileInputRef.current.click()}
                                disabled={uploading}
                            >
                                Selecionar Arquivo
                            </button>
                            {/* Botão de upload só habilita se houver arquivo */}
                            <button
                                className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
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
                            {status && <span className="text-sm text-gray-600">{status}</span>}
                            <div>
                                {files.length > 0 ? (
                                    <table className="w-full text-sm mt-2">
                                        <thead>
                                            <tr>
                                                <th className="text-left p-1">Nome</th>
                                                <th className="text-left p-1">Tipo</th>
                                                <th className="text-left p-1">Tamanho</th>
                                                <th className="text-left p-1">Ações</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {files.filter(f => !f.name.endsWith('/')).map(f => (
                                                <tr key={f.name}>
                                                    <td className="p-1">{f.name}</td>
                                                    <td className="p-1">{f.metadata?.mimetype || "Arquivo"}</td>
                                                    <td className="p-1">
                                                        {f.metadata?.size
                                                            ? formatFileSize(f.metadata.size)
                                                            : "-"}
                                                    </td>
                                                    <td className="p-1">
                                                        <button
                                                            className="bg-blue-500 text-white px-2 py-1 rounded text-xs mr-2"
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
                                                            👁️
                                                        </button>
                                                        <button
                                                            className="bg-red-500 text-white px-2 py-1 rounded text-xs"
                                                            onClick={() => handleDelete(f.name)}
                                                            title="Excluir"
                                                        >
                                                            🗑️
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
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}