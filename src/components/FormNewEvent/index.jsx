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

export function FormNewEvent({ onClose }) {

    const [dataSelecionada, setDataSelecionada] = useState(null);
    const [nomeEvento, setNomeEvento] = useState("");
    const [horaInicio, setHoraInicio] = useState("");
    const [horaFim, setHoraFim] = useState("");
    const [convidado, setConvidado] = useState("0");
    const [categoria, setCategoria] = useState("");
    const [processo, setProcesso] = useState("0");
    const [descricao, setDescricao] = useState("");
    const [categoriaOptions, setCategoriaOptions] = useState([]);
    const [clientesOptions, setClientesOptions] = useState([]);
    const [processosOptions, setProcessosOptions] = useState([]);
    const idAdvogado = localStorage.getItem('idAdvogado') || 1;

    useEffect(() => {
        if (idAdvogado) {
            getCategorias(idAdvogado);
            getClientsByIdAdvogado(idAdvogado);
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
            idCliente: Number(convidado) ,
            idCategoria: Number(categoria),
            idProcesso: Number(processo),
            dataReuniao: dataSelecionada ? new Date(dataSelecionada).toISOString() : null,
            horaInicio: `${horaInicio}:00`,
            horaFim: `${horaFim}:00`,
        };

        axios.post(`http://localhost:8080/api/eventos`,
            eventoPayload,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZHZvZ2Fkb0BnbWFpbC5jb20iLCJpYXQiOjE3NDgyMDAxNjcsImV4cCI6MTc1MTgwMDE2N30.PvnDENQ5TAzvIQLl8IdUc79fylmkTJgbTSrQ55l5tjVjjGA0ys0vWhESdyTZj70spM30-lQduQTrqcSIt8MkMg`,
                }
            }
        ).then(response => {
            console.log('Evento criado com sucesso:', response.data);
            toast.success("Evento criado com sucesso!")
            onClose();
            clearInputs();
        }).catch(error => {
            console.error('Erro ao criar evento:', error);
            toast.error("Erro ao criar evento, tente novamente.")
        })


        console.log(JSON.stringify({eventoPayload}));
    }

    function getCategorias(idAdvogado) {

        axios.get(`http://localhost:8080/api/categorias/advogado/${idAdvogado}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZHZvZ2Fkb0BnbWFpbC5jb20iLCJpYXQiOjE3NDgyMDAxNjcsImV4cCI6MTc1MTgwMDE2N30.PvnDENQ5TAzvIQLl8IdUc79fylmkTJgbTSrQ55l5tjVjjGA0ys0vWhESdyTZj70spM30-lQduQTrqcSIt8MkMg`,
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
        axios.get(`http://localhost:8080/api/clientes/listarPorAdvogado/${idAdvogado}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZHZvZ2Fkb0BnbWFpbC5jb20iLCJpYXQiOjE3NDgyMDAxNjcsImV4cCI6MTc1MTgwMDE2N30.PvnDENQ5TAzvIQLl8IdUc79fylmkTJgbTSrQ55l5tjVjjGA0ys0vWhESdyTZj70spM30-lQduQTrqcSIt8MkMg`,
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
        axios.get(`http://localhost:8080/api/processos/cliente/${idCliente}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZHZvZ2Fkb0BnbWFpbC5jb20iLCJpYXQiOjE3NDgyMDAxNjcsImV4cCI6MTc1MTgwMDE2N30.PvnDENQ5TAzvIQLl8IdUc79fylmkTJgbTSrQ55l5tjVjjGA0ys0vWhESdyTZj70spM30-lQduQTrqcSIt8MkMg`,
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


    return (
        <>
            <div className="px-12 pt-11 pb-8 bg-white border-2 border-gray-300 rounded-xl flex flex-col gap-3.5 min-w-96">
                <h1 className="font-semibold text-xl text-[var(--color-blueDark)] whitespace-nowrap">Adicionar evento</h1>
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
                <FormNEInput placeholder="Descrição" value={descricao} onChange={(e) => setDescricao(e.target.value)} />
                <div className="self-end flex gap-4">
                    <button onClick={() => {
                        onClose()
                        clearInputs()
                    }} className="cursor-pointer px-8 py-2 text-[var(--color-blueLight)] border-2 border-[var(--color-blueLight)] rounded-[10px]">Cancelar</button>
                    <button onClick={handleSubmit} className="cursor-pointer px-8 py-2 bg-[color:var(--color-blueLight)] text-white rounded-[10px]">Salvar</button>
                </div>
            </div>
        </>
    )
}