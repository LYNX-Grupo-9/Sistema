import React, { useRef, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useEffect } from "react";
import { supabaseKey, supabaseUrl } from "../config/supabase";
import icon from "../assets/icons/directory.svg";
import viewIcon from "../assets/icons/view.svg";
import trashIcon from "../assets/icons/trash.svg";
import Plus from "../assets/icons/plusWhite.svg";
import { createClient } from "@supabase/supabase-js";
import iconAttachment from '../assets/icons/attachment.svg';
import axios from "axios";
import { set } from "date-fns";
import { v4 as uuidv4 } from 'uuid';

const supabase = createClient(supabaseUrl, supabaseKey);

export function ButtonAnexo({ idCliente, idProcesso }) {
  const location = useLocation();

  useEffect(() => {
    console.log(idCliente);
    fetchData()
  }, [location.pathname, idCliente, idProcesso]);

  function fetchData() {
    if (location.pathname.includes("/CustomerDetails") && idCliente) {
      fetchAnexosDoCliente(idCliente);
    } else if (location.pathname.includes("/CaseDetails") && idProcesso) {
      fetchAnexosDoProcesso(idProcesso);
    }
  }

  const [open, setOpen] = useState(false);
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [files, setFiles] = useState([]);
  const [status, setStatus] = useState("");
  const [nomeAnexo, setNomeAnexo] = useState("");
  const fileInputRef = useRef(null);
  const [newAttachment, setNewAttachment] = useState(false);
  const [anexosCliente, setAnexosCliente] = useState([]);
  const [anexosProcesso, setAnexosProcesso] = useState([]);

  const bucketName = 'lynx';
  const folderPath = 'lynx-folder';

  async function listFiles() {
    try {
      setNewAttachment(false);
      setStatus('Buscando arquivos...');

      let anexos = [];

      if (location.pathname.includes('/CustomerDetails') && idCliente) {
        anexos = await fetchAnexosDoCliente(idCliente);  // Agora espera
      } else if (location.pathname.includes('/CaseDetails') && idProcesso) {
        anexos = await fetchAnexosDoProcesso(idProcesso);  // Agora espera
      }

      const { data: storageFiles, error } = await supabase.storage
        .from(bucketName)
        .list(folderPath);

      if (error) throw error;

      const arquivosFiltrados = storageFiles
        .filter(file => anexos.some(anexo => anexo.nomeAnexo === file.name))
        .map(file => {
          const anexo = anexos.find(a => a.nomeAnexo === file.name);
          return {
            ...file,
            id: anexo?.id
          };
        });
      console.log(arquivosFiltrados, "arqivosFiltrados");
      setStatus(`Encontrados ${arquivosFiltrados.length} anexos`, 'success');

    } catch (error) {
      console.error('Erro ao listar arquivos:', error);
      setStatus(`Erro ao listar arquivos: ${error.message}`, 'error');
      setFiles([]);
    }
  }


  async function fetchAnexosDoCliente(idCliente) {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`http://localhost:8080/api/anexos/cliente/${idCliente}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setAnexosCliente(response.data);
      setFiles(response.data);  // <-- Aqui! Usa o que acabou de chegar, sem depender do state
      return response.data;
    } catch (error) {
      console.error("Erro ao buscar anexos do cliente:", error);
      return [];
    }
  }

  async function fetchAnexosDoProcesso(idProcesso) {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`http://localhost:8080/api/anexos/processo/${idProcesso}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setAnexosProcesso(response.data);
      setFiles(response.data);  // <-- Aqui! Usa o que acabou de chegar, sem depender do state
      return response.data;
    } catch (error) {
      console.error("Erro ao buscar anexos dos processos:", error);
      return [];
    }
  }


  function formatFileSize(bytes) {
    if (bytes === 0 || !bytes) return '0 Bytes';

    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  function postAnexo(idCliente, idItem, idProcesso, nomeAnexo, fileName) {

    const token = localStorage.getItem("token");
    if (!token) {
      return false;
    }
    console.log("Postando anexo com os seguintes dados:", {
      idCliente,
      idItem,
      idProcesso,
      nomeAnexo,
      fileName
    });
    // Inicializa o payload com nulls
    let payload = {
      idCliente: idCliente ?? null,
      idItem: idItem ?? null,
      idProcesso: idProcesso ?? null,
      nomeAnexo: nomeAnexo ?? fileName
    };

    // Ajusta o payload dependendo da rota atual
    if (location.pathname.includes('CustomerDetails')) {
      payload.idCliente = idCliente ?? null;
      payload.idProcesso = null;
    } else if (location.pathname.includes('CaseDetails')) {
      payload.idCliente = null;
      payload.idProcesso = idProcesso ?? null;
    }

    console.log("Payload enviado:", payload);

    axios.post("http://localhost:8080/api/anexos", payload, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    })
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.error(error);
      });
  }

  async function handleUpload() {
    if (!file) return;
    setUploading(true);
    setStatus("Enviando anexo...");

    const uniqueFileId = uuidv4();

    const normalizedFolderPath = folderPath.endsWith("/") ? folderPath : folderPath + "/";
    const filePath = `${normalizedFolderPath}${uniqueFileId}`;

    const { data, error } = await supabase.storage.from(bucketName).upload(filePath, file, { upsert: true });


    if (data) {
      console.log("Arquivo enviado:", data);
      postAnexo(idCliente, uniqueFileId, idProcesso, nomeAnexo, file.name);
      fetchData()
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

  async function deleteAnexo(idItem) {
    const token = localStorage.getItem("token");
    if (!token) {
      return false;
    }

    return axios.delete(`http://localhost:8080/api/anexos/${idItem}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    })
      .then(async response => {
        console.log(response);
        await listFiles();
        return true;  
      })
      .catch(error => {
        console.error(error);
        return false;
      });
  }

  async function handleDelete(fileName, idItem, idAnexo) {
    if (!window.confirm(`Deseja realmente excluir o arquivo "${fileName}"?`)) return;
    setStatus("Excluindo arquivo...");

    const normalizedFolderPath = folderPath.endsWith("/") ? folderPath : folderPath + "/";
    const filePath = `${normalizedFolderPath}${idItem}`;
    const { error } = await supabase.storage.from(bucketName).remove([filePath]);
    if (error) {
      setStatus("Erro ao excluir arquivo");
    } else {
      deleteAnexo(idItem);
      setStatus("Arquivo excluído com sucesso!");
      await listFiles();
    }
  }

  function handleOpen() {
    setOpen(true);
    listFiles();
  }

  return (
    <>
      <button
        className="h-[90px] text-[var(--bgLight)] px-4 py-2 rounded-[10px] cursor-pointer text-[28px] typography-semibold flex items-center justify-center gap-2"
        style={{ background: 'var(--gradientHorizontal)' }}
        onClick={handleOpen}
      >
        Ver anexos
        <img src={iconAttachment} alt="Attachment Icon" className="w-[50px] ml-2 inline-block" />
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

              {newAttachment ? (
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

                    <input
                      placeholder="Nome do arquivo"
                      className="w-full border-white border-2 rounded outline-none text-white px-4"
                      value={nomeAnexo}
                      onChange={(e) => setNomeAnexo(e.target.value)}
                    />
                    <button
                      className="bg-[var(--color-blueDark)] text-white px-4 py-2 rounded disabled:opacity-50 min-w-[200px]"
                      onClick={handleUpload}
                      disabled={!file || uploading}
                    >
                      {uploading ? "Enviando..." : "Adicionar Anexo"}
                    </button>
                    <button
                      className="bg-gray-300 text-gray-800 px-4 py-2 rounded min-w-[150px]"
                      onClick={listFiles}
                    >
                      Ver Anexos
                    </button>
                  </div>
                </>
              ) : (

                <>
                  {console.log("Files:", files)}
                  <div className="flex items-center bg-[var(--bgMedium)] p-4 px-8 rounded-lg">
                    <div className="w-full flex items-center gap-4 ">
                      <img src={icon} alt="Ícone de Anexo" className="w-[5%]" />
                      <span className="text-[32px] text-[var(--color-light)] typography-semibold">Anexos</span>
                    </div>
                    <button onClick={() => setNewAttachment(true)}>
                      <img src={Plus} alt="Ícone de Anexo" className="w-[100%] text-white" />
                    </button>
                  </div>
                  <div className="flex flex-col gap-4 bg-[var(--bgDark)] p-8 rounded-lg w-full overflow-y-auto" style={{ maxHeight: "350px" }}>
                    {files.length > 0 ? (
                      <table className="w-full ">
                        <tbody>
                          {files.map(f => (
                            <tr key={f.idAnexo} className="flex justify-between items-center bg-[var(--bgMedium)] rounded-[20px] mb-4 p-2 px-8 ">
                              <td className="text-[20px] text-[var(--color-light)] typography-medium min-w-[150px] max-w-[350px] truncate">
                                {f.nomeAnexo}
                              </td>

                              <td className="flex gap-4 justify-end min-w-[80px]">
                                <button
                                  className="cursor-pointer"
                                  onClick={async () => {
                                    const normalizedFolderPath = folderPath.endsWith("/") ? folderPath : folderPath + "/";
                                    const filePath = `${normalizedFolderPath}${f.idItem}`;
                                    const { data, error } = await supabase
                                      .storage
                                      .from(bucketName)
                                      .createSignedUrl(filePath, 60);
                                    if (data?.signedUrl) {
                                      window.open(data.signedUrl, "_blank");
                                    } else {
                                      alert("Erro ao gerar link para visualização.");
                                    }
                                  }}
                                  title="Visualizar"
                                >
                                  <img src={viewIcon} alt="Visualizar arquivo" />
                                </button>
                                <button
                                  className="cursor-pointer"
                                  onClick={() => handleDelete(f.nomeAnexo, f.idItem, f.idAnexo)}
                                >
                                  <img src={trashIcon} alt="Excluir arquivo" />
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>

                      </table>
                    ) : (
                      <p className="text-center text-gray-400">Nenhum anexo encontrado.</p>
                    )}
                  </div>
                  <p className="mt-4 text-white">{status}</p>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
