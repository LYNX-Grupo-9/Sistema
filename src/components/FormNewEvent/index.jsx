import { useEffect, useState } from "react";
import { FormNEInput } from "./FormNEInput.jsx";
import { Calendar, ChevronDown, Clock10, MoveRight, UsersRound, X } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";


const hourlyOptions = Array.from({ length: 24 }, (_, i) => {
    const hour = i.toString().padStart(2, '0');
    return {
        label: `${hour}:00`,
        value: `${hour}:00`,
    };
});

export function FormNewEvent({ onClose, onSuccess, isEdit, idEvento, onEditSuccess }) {

    const [dataSelecionada, setDataSelecionada] = useState(null);
    const [nomeEvento, setNomeEvento] = useState("");
    const [horaInicio, setHoraInicio] = useState("");
    const [horaFim, setHoraFim] = useState("");
    const [convidado, setConvidado] = useState("0");
    const [categoria, setCategoria] = useState("");
    const [processo, setProcesso] = useState("0");
    const [descricao, setDescricao] = useState("");
    const [linkReuniao, setLinkReuniao] = useState("");
    const [local, setLocal] = useState("");
    const [categoriaOptions, setCategoriaOptions] = useState([]);
    const [clientesOptions, setClientesOptions] = useState([]);
    const [processosOptions, setProcessosOptions] = useState([]);

    const idAdvogado = localStorage.getItem('idAdvogado') || 1;

    useEffect(() => {
        if (idAdvogado) {
            getCategorias(idAdvogado);
            getClientsByIdAdvogado(idAdvogado);
        }

        if (isEdit && idEvento) {
            getEventById(idEvento);
        }
    }, [])

    useEffect(() => {
        if (convidado != '0') {
            getProcessosByIdCliente(convidado);
        }
    }, [convidado]);


    function clearInputs() {
        setNomeEvento("");
        setDataSelecionada(null);
        setHoraInicio("");
        setHoraFim("");
        setConvidado("");
        setCategoria("");
        setProcesso("");
        setDescricao("");
    }



    function handleSubmit() {

        if (!nomeEvento || !dataSelecionada || horaInicio == '0' || horaFim == '0' || categoria == '0' || !descricao) {
            toast.error("Por favor, preencha todos os campos antes de salvar.", {
                theme: "colored",
            });
            return;
        }

        const eventoPayload = {
            nome: nomeEvento,
            descricao,
            local: "",
            linkReuniao: "",
            idAdvogado: Number(idAdvogado),
            idCliente: Number(convidado),
            idCategoria: Number(categoria),
            idProcesso: Number(processo),
            dataReuniao: dataSelecionada ? new Date(dataSelecionada).toISOString() : null,
            horaInicio: `${horaInicio}:00`,
            horaFim: `${horaFim}:00`,
        };

        console.log("Payload do evento:", eventoPayload);

        const token = localStorage.getItem("token");

        if (!token) {
            console.error('Token de autenticação não encontrado.');
            toast.error("Erro ao criar evento, tente novamente.");
            return;
        }

        if (isEdit) {
            axios.patch(`http://localhost:8080/api/eventos/${idEvento}`, eventoPayload, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            }).then(response => {
                console.log(response.data)
                toast.success("Evento editado com sucesso!")
                onEditSuccess && onEditSuccess()
                onSuccess()
                onClose()
            }).catch(error => {
                console.error("Erro ao alterar" + error)
            })
            return;
        }


        axios.post(`http://localhost:8080/api/eventos`,
            eventoPayload,
            {
                headers: {  
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                }
            }
        ).then(response => {
            console.log('Evento criado com sucesso:', response.data);
            toast.success("Evento criado com sucesso!")
            onClose();
            clearInputs();
            onSuccess && onSuccess();
        }).catch(error => {
            console.error('Erro ao criar evento:', error);
            toast.error("Erro ao criar evento, tente novamente.")
        })


        console.log(JSON.stringify({ eventoPayload }));
    }

    function getCategorias(idAdvogado) {

        const token = localStorage.getItem("token");

        if (!token) {
            console.error('Token de autenticação não encontrado.');
            toast.error("Erro ao criar evento, tente novamente.");
            return;
        }

        axios.get(`http://localhost:8080/api/categorias/advogado/${idAdvogado}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            }
        })
            .then(response => {

                const categoriesMap = response.data.map((categoria, index) => ({
                    label: categoria.nomeEvento,
                    value: categoria.idCategoriaEvento,
                }));

                // console.log('Categorias Options:', categoriesMap);
                setCategoriaOptions(categoriesMap);
            })
            .catch(error => {
                console.error('Erro ao buscar categorias:', error);
            });

    }

    function getClientsByIdAdvogado(idAdvogado) {

        const token = localStorage.getItem("token");

        if (!token) {
            console.error('Token de autenticação não encontrado.');
            toast.error("Erro ao criar evento, tente novamente.");
            return;
        }

        axios.get(`http://localhost:8080/api/clientes/listarPorAdvogado/${idAdvogado}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            }
        })
            .then(response => {
                const clientsMap = response.data.map((cliente, index) => ({
                    label: cliente.nome,
                    value: cliente.idCliente,
                }));
                setClientesOptions(clientsMap);
            })
            .catch(error => {
                console.error('Erro ao buscar clientes:', error);
            });
    }

    function getProcessosByIdCliente(idCliente) {

        const token = localStorage.getItem("token");

        if (!token) {
            console.error('Token de autenticação não encontrado.');
            toast.error("Erro ao criar evento, tente novamente.");
            return;
        }


        axios.get(`http://localhost:8080/api/processos/cliente/${idCliente}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            }
        }).then(response => {
            console.log('Processos:', response.data);
            const processosMap = response.data.map((processo, index) => ({
                label: processo.descricao,
                value: processo.idProcesso,
            }));
            setProcessosOptions(processosMap);
        }).catch(error => {
            console.error('Erro ao buscar processos:', error);
        })
    }

    function getEventById(idEvento) {
        const token = localStorage.getItem("token");

        if (!token) {
            console.error('Token de autenticação não encontrado.');
            toast.error("Erro ao buscar evento, tente novamente.");
            return;
        }

        axios.get(`http://localhost:8080/api/eventos/${idEvento}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            }
        }).then(response => {
            const evento = response.data;

            setNomeEvento(evento.nome);
            setDataSelecionada(evento.dataReuniao + 'T00:00:00');
            setHoraInicio(evento.horaInicio.slice(0, -3));
            setHoraFim(evento.horaFim.slice(0, -3));
            setConvidado(evento.idCliente);
            setCategoria(evento.idCategoria);
            setProcesso(evento.idProcesso);
            setDescricao(evento.descricao);
            setLinkReuniao(evento.linkReuniao || "");
            setLocal(evento.local || "");

        }).catch(error => {
            console.error('Erro ao buscar evento:', error);
        });
    }

    return (
        <>
            <div className="px-12 pt-11 pb-8 bg-white border-2 border-gray-300 rounded-xl flex flex-col gap-3.5 min-w-96 shadow-lg">
                {
                    isEdit ?
                        <h1 className="font-semibold text-xl text-[var(--color-blueDark)] whitespace-nowrap">Editar evento</h1>
                        :
                        <h1 className="font-semibold text-xl text-[var(--color-blueDark)] whitespace-nowrap">Adicionar evento</h1>
                }
                <div className="w-full h-0.5 bg-gray-300"></div>
                <FormNEInput placeholder="Nome do evento" value={nomeEvento} onChange={e => setNomeEvento(e.target.value)} />
                <FormNEInput
                    type="date"
                    icon={<Calendar color='#013451' size={20} />}
                    value={dataSelecionada}
                    onChange={(date) => setDataSelecionada(date)}
                />
                <div className="flex gap-4 items-center">
                    <FormNEInput
                        optionLabel="De..."
                        type="select"
                        icon={<Clock10 color='#013451' />}
                        options={hourlyOptions}
                        value={horaInicio}
                        onChange={(e) => setHoraInicio(e.target.value)}
                    />
                    <MoveRight color='#013451' size={25} className="w-1/3" />
                    <FormNEInput
                        optionLabel="Até..."
                        type="select"
                        icon={<Clock10 color='#013451' />}
                        options={hourlyOptions}
                        value={horaFim}
                        onChange={(e) => setHoraFim(e.target.value)}
                    />
                </div>
                <FormNEInput optionLabel="Adicionar Convidado" type="select" icon={<UsersRound color='#013451' />} value={convidado} options={clientesOptions} onChange={(e) => setConvidado(e.target.value)} />
                <FormNEInput optionLabel="Selecionar Categoria" type="select" icon={<ChevronDown color='#013451' />} options={categoriaOptions} value={categoria} onChange={(e) => setCategoria(e.target.value)} />
                <FormNEInput optionLabel="Processo " type="select" icon={<ChevronDown color='#013451' />} value={processo} options={processosOptions} disabled={convidado == 0} onChange={(e) => setProcesso(e.target.value)} />
                <FormNEInput placeholder="Link (Opcional)" value={linkReuniao} onChange={(e) => setLinkReuniao(e.target.value)} />
                <FormNEInput placeholder="Local (Opcional)" value={local} onChange={(e) => setLocal(e.target.value)} />
                <FormNEInput placeholder="Descrição" value={descricao} onChange={(e) => setDescricao(e.target.value)} />
                <div className="self-end flex gap-4">
                    <button onClick={() => {
                        onClose()
                        clearInputs()
                    }} className="cursor-pointer px-8 py-2 text-[var(--color-blueLight)] border-2 border-[var(--color-blueLight)] rounded-[10px]">Cancelar</button>
                    <button onClick={handleSubmit} className="cursor-pointer px-8 py-2 bg-[color:var(--color-blueLight)] text-white rounded-[10px]">{isEdit ? "Editar" : "Salvar"}</button>
                </div>
            </div>
        </>
    )
}