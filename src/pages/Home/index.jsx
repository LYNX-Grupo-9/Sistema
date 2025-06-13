import { useEffect, useState } from "react";
import { MonthEvent } from "../../components/MonthEvent";
import { OverviewNotification } from "../../components/OverviewNotification";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { SingleSelectComponent } from "../../components/SelectComponent";
import axios from "axios";
import { toast } from "react-toastify";
import { ModalScheduling } from "../../components/ModalScheduling";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/Card";
import { Calendar, Clock, FileText, TrendingUp, Users } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { Badge } from "../../components/Badge";



const processosPorTipo = [
    { tipo: "Aposentadoria", quantidade: 45 },
    { tipo: "Revisão", quantidade: 32 },
    { tipo: "Pensão", quantidade: 28 },
    { tipo: "Auxílio-doença", quantidade: 21 },
    { tipo: "LOAS", quantidade: 16 }
];



export function Home() {

    const [today, setToday] = useState("")
    const [solicitacoes, setSolicitacoes] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [idSolicitacao, setIdSolicitacao] = useState(null);
    const [eventosPorCategoria, setEventosPorCategoria] = useState([]);
    const [eventosPorDia, setEventosPorDia] = useState([]);
    const [processosPorStatus, setProcessosPorStatus] = useState([])
    const [totalProcessos, setTotalProcessos] = useState(0);
    const [totalEventos, setTotalEventos] = useState(0);
    const [totalClientes, setTotalClientes] = useState(0);

    const idAdvogado = localStorage.getItem('idAdvogado');

    useEffect(() => {
        const today = new Date();
        const formattedDate = format(today, "EEEE, d 'de' MMMM", { locale: ptBR });
        setToday(capitalizeFirstLetter(formattedDate))


        fetchData(idAdvogado);
    }, [])

    function fetchData(idAdvogado) {
        console.log("Fetching data for advogado ID:", idAdvogado);
        getSolicitacoeByAdvId(idAdvogado);
        getQtdEventosPorCategoriaByIdAdv(idAdvogado);
        getEventosProx7dias(idAdvogado);
        getContagemPorStatus(idAdvogado);
        getTotalProcessosAtivos(idAdvogado);
        getTotalEventosMes(idAdvogado);
        getTotalClietesAtivos(idAdvogado);
    }

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }


    function getSolicitacoeByAdvId(idAdvogado) {
        const token = localStorage.getItem('token');

        if (!token) {
            toast.error('Token de autenticação não encontrado. Por favor, faça login novamente.');
            return;
        }

        axios.get(`http://localhost:8080/api/solicitacao-agendamento/advogado/${idAdvogado}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            }
        })
            .then(response => {
                console.log("Solicitações recebidas:", response.data);
                setSolicitacoes(response.data);
            }).catch(error => {
                toast.error('Erro ao buscar solicitacoes:', error);
            })
    }

    function showNotificacoes(notificacoes) {
        if (!notificacoes || notificacoes.length === 0) {
            return (
                <span className="typography-regular text-[var(--grayText)] text-base sm:text-lg md:text-xl">
                    Nenhuma notificação
                </span>
            );
        }

        let qtdNotVizualized = 0;
        const NotVizualizedNotifications = notificacoes.map((notificacao, index) => {
            if (!notificacao.visualizado) {
                qtdNotVizualized++;
                return (
                    <>
                        <OverviewNotification key={index} onClick={() => { handleModalSolicitacao(notificacao.idSolicitacaoAgendamento) }} message={`Agendamento de ${notificacao.nome}`} />
                    </>
                )
            }
        })

        return qtdNotVizualized > 0 ? NotVizualizedNotifications : (
            <span className="typography-regular text-[var(--grayText)] text-base sm:text-lg md:text-xl">
                Nenhuma notificação
            </span>
        );
    }

    function openModal() {
        setIsModalOpen(true);
    }

    function closeModal() {
        setIsModalOpen(false);
    }

    function handleModalSolicitacao(idSolicitacao) {
        setIdSolicitacao(idSolicitacao);
        openModal();

    }

    function getQtdEventosPorCategoriaByIdAdv(idAdvogado) {
        const token = localStorage.getItem('token');

        if (!token) {
            toast.error('Token de autenticação não encontrado. Por favor, faça login novamente.');
            return;
        }

        axios.get(`http://localhost:8080/api/categorias/contagem-por-nome/${idAdvogado}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            }
        })
            .then(response => {
                console.log("Eventos por categoria recebidos:", response.data);
                setEventosPorCategoria(response.data);
            }).catch(error => {
                toast.error('Erro ao buscar eventos por categoria:', error);
            })

    }

    function getContagemPorStatus(idAdvogado) {
        const token = localStorage.getItem('token');

        if (!token) {
            toast.error('Token de autenticação não encontrado. Por favor, faça login novamente.');
            return;
        }

        axios.get(`http://localhost:8080/api/processos/contagem-por-status/${idAdvogado}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            }
        })
            .then(response => {
                console.log("Processos por status:", response.data);
                setProcessosPorStatus(response.data);
            }).catch(error => {
                toast.error('Erro ao buscar eventos por categoria:', error);
            })

    }

    function showEventosPorCategoria(eventos) {
        if (!eventos || eventos.length === 0) {
            return (
                <span className="typography-regular text-[var(--grayText)] text-base sm:text-lg md:text-xl">
                    Nenhum evento
                </span>
            );
        }

        return Object.entries(eventos).map(([categoria, dados], index) => {
            // console.log(`Categoria: ${categoria}, Quantidade: ${dados.quantidade}, Cor: ${dados.cor}`);
            return (
                <div key={index} className="flex items-center justify-between">
                    <span className="text-sm font-medium">{categoria}</span>
                    <div className="flex items-center gap-3">
                        <div
                            className="w-4 h-4 rounded-full"
                            style={{ backgroundColor: dados.cor }}
                        ></div>
                        <Badge variant="outline">{dados.quantidade}</Badge>
                    </div>
                </div>
            );
        })
    }

    function getEventosProx7dias(idAdvogado) {
        const token = localStorage.getItem('token');

        if (!token) {
            toast.error('Token de autenticação não encontrado. Por favor, faça login novamente.');
            return;
        }

        axios.get(`http://localhost:8080/api/eventos/advogado/${idAdvogado}/7dias`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            }
        })
            .then(response => {
                console.log("Eventos recebidos:", response.data);
                const eventosChartData = transformEventosToChartData(response.data);
                setEventosPorDia(eventosChartData);
            }).catch(error => {
                toast.error('Erro ao buscar eventos:', error);
            })
    }

    function getTotalProcessosAtivos(idAdvogado) {
        const token = localStorage.getItem('token');

        if (!token) {
            toast.error('Token de autenticação não encontrado. Por favor, faça login novamente.');
            return;
        }

        axios.get(`http://localhost:8080/api/processos/processosAtivos/${idAdvogado}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            }
        })
            .then(response => {
                console.log("Total de processos ativos:", response.data);
                setTotalProcessos(response.data.length);
            }).catch(error => {
                toast.error('Erro ao buscar total de processos ativos:', error);
            })
    }

    function getTotalEventosMes(idAdvogado) {
        const token = localStorage.getItem('token');

        if (!token) {
            toast.error('Token de autenticação não encontrado. Por favor, faça login novamente.');
            return;
        }

        axios.get(`http://localhost:8080/api/eventos/advogado/${idAdvogado}/eventosMes`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            }
        })
            .then(response => {
                console.log("Total de eventos ativos:", response.data);
                setTotalEventos(response.data.length);
            }).catch(error => {
                toast.error('Erro ao buscar total de processos ativos:', error);
            })
    }

    function getTotalClietesAtivos(idAdvogado) {
        const token = localStorage.getItem('token');

        if (!token) {
            toast.error('Token de autenticação não encontrado. Por favor, faça login novamente.');
            return;
        }

        axios.get(`http://localhost:8080/api/clientes/advogado/${idAdvogado}/total-clientes`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            }
        })
            .then(response => {
                console.log("Total de clientes ativos:", response.data);
                setTotalClientes(response.data);
            }).catch(error => {
                toast.error('Erro ao buscar total de clientes ativos:', error);
            })
    }

    function transformEventosToChartData(eventos) {
        // Obter os próximos 7 dias a partir de hoje
        const hoje = new Date();
        const proximosSeteDias = [];

        for (let i = 0; i < 7; i++) {
            const data = new Date(hoje);
            data.setDate(hoje.getDate() + i);
            proximosSeteDias.push({
                data: data,
                dataFormatada: format(data, 'dd/MM'),
                dia: format(data, 'EEE', { locale: ptBR }).charAt(0).toUpperCase() + format(data, 'EEE', { locale: ptBR }).slice(1),
                eventos: 0
            });
        }

        // Contar eventos por dia
        if (eventos && eventos.length > 0) {
            eventos.forEach(evento => {
                const dataEvento = new Date(evento.dataReuniao);

                // Verificar se o evento está nos próximos 7 dias
                proximosSeteDias.forEach(dia => {
                    if (format(dia.data, 'yyyy-MM-dd') === evento.dataReuniao) {
                        dia.eventos++;
                    }
                });
            });
        }

        return proximosSeteDias.map(dia => ({
            dia: dia.dia,
            data: dia.dataFormatada,
            eventos: dia.eventos
        }));
    }


    function showNextDayCharts(eventosPorDia) {

        if (eventosPorDia.length === 0) {
            return (
                <span className="typography-regular text-[var(--grayText)] text-base sm:text-lg md:text-xl">
                    Não há dados disponíveis.
                </span>
            );
        }

        return (
            <ResponsiveContainer width="90%" height='85%'>
                <BarChart data={eventosPorDia}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="dia" />
                    <YAxis />
                    <Tooltip
                        formatter={(value, name) => [value, 'Eventos']}
                        labelFormatter={(label, payload) => {
                            const item = payload?.[0]?.payload;
                            return item ? `${label} - ${item.data}` : label;
                        }}
                    />
                    <Bar dataKey="eventos" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                </BarChart>
            </ResponsiveContainer>
        )
    }

    function showEventsByStatus(processosPorStatus) {

        if (processosPorStatus.length === 0) {
            return (
                <span className="typography-regular text-[var(--grayText)] text-base sm:text-lg md:text-xl">
                    Não há dados disponíveis.
                </span>
            );
        }

        const cores = ['#3498db', '#2ecc71', '#e74c3c', '#f39c12', '#9b59b6', '#34495e', '#1abc9c'];
        const dadosFormatados = Object.entries(processosPorStatus).map(([status, quantidade], index) => ({
            status,
            quantidade,
            cor: cores[index],
        }));

        return (
            <ResponsiveContainer width="90%" height="85%">
                <PieChart>
                    <Pie
                        data={dadosFormatados}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        dataKey="quantidade"
                        label={({ status, quantidade }) => `${status}: ${quantidade}`}
                    >
                        {dadosFormatados.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.cor} />
                        ))}
                    </Pie>
                    <Tooltip />
                </PieChart>
            </ResponsiveContainer>
        );
    }

    return (
        <>
            {isModalOpen && (
                <ModalScheduling idSolicitacao={idSolicitacao} onClose={closeModal} onSuccess={() => { fetchData(idAdvogado) }} />
            )}
            <div className="flex h-full w-full">
                <div className="p-10 pl-20 absolute h-full w-[92%]">
                    <div className="flex justify-between mb-[20px] pr-[20px]">
                        <span className="typography-black text-[var(--color-blueDark)] text-[40px]">Visão geral</span>
                    </div>
                    <div className="flex w-full h-[90%]">
                        <div className="mr-[2%] w-[30%]">
                            <div className="grid grid-cols-2 gap-4 mb-4">
                                <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white border-0">
                                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                        <CardTitle className="text-sm font-medium opacity-90">Total de Processos</CardTitle>
                                        <FileText className="h-5 w-5 opacity-90" />
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-3xl font-bold">{totalProcessos}</div>
                                        <p className="text-xs opacity-80 mt-1">Processos ativos</p>
                                    </CardContent>
                                </Card>


                                <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white border-0">
                                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                        <CardTitle className="text-sm font-medium opacity-90">Clientes Ativos</CardTitle>
                                        <Users className="h-5 w-5 opacity-90" />
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-3xl font-bold">{totalClientes}</div>
                                        <p className="text-xs opacity-80 mt-1">Clientes em acompanhamento</p>
                                    </CardContent>
                                </Card>

                                <Card className="bg-gradient-to-r from-amber-500 to-orange-500 text-white border-0">
                                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                        <CardTitle className="text-sm font-medium opacity-90">Eventos do Mês</CardTitle>
                                        <Calendar className="h-5 w-5 opacity-90" />
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-3xl font-bold">{totalEventos}</div>
                                        <p className="text-xs opacity-80 mt-1">Compromissos agendados</p>
                                    </CardContent>
                                </Card>

                                <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white border-0">
                                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                        <CardTitle className="text-sm font-medium opacity-90">Tempo Médio</CardTitle>
                                        <Clock className="h-5 w-5 opacity-90" />
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-3xl font-bold">50</div>
                                        <p className="text-xs opacity-80 mt-1">Duração dos processos</p>
                                    </CardContent>
                                </Card>
                            </div>

                            <div className="bgGlass h-[65%] mb-4">
                                <span className="typography-black text-[var(--color-blueDark)] text-[28px] ">Solicitações de agendamento</span>
                                <div className=" w-full mr-[12px] h-4/5 overflow-y-auto ">
                                    <div className="h-full py-2.5">
                                        {solicitacoes && showNotificacoes(solicitacoes)}
                                    </div>
                                </div>
                            </div>


                            {/* 
                            <div className="bgGlass h-[30%] mb-[4%] flex flex-col justify-around">
                                <span className="typography-black text-[var(--color-blueDark)] text-lg sm:text-md md:text-xl lg:text-2xl">
                                    {today}
                                </span>
                                <span className="typography-semibold text-[var(--grayText)] text-base sm:text-lg md:text-xl">
                                    Sem eventos hoje
                                </span>
                                <div className="h-[1px] w-full bg-[var(--lineSeparator)] rounded-2xl mt-[16px] mb-[16px]"></div>
                                <span className="typography-semibold text-[var(--color-blueDark)] text-lg sm:text-md md:text-xl">
                                    Próximo evento
                                </span>
                                <span className="typography-regular text-[var(--grayText)] text-base sm:text-lg md:text-xl truncate">
                                    Atendimento Walace - 10 de março 2025
                                </span>
                            </div> */}
                        </div>
                        <div className="w-[70%]">
                            <div className="h-2/5 flex gap-4 mb-4">
                                <div className="bgGlassNoPadding px-5 py-7 h-[100%] w-[33%] flex flex-col justify-around">
                                    <span className="typography-black text-[var(--color-blueDark)] text-lg sm:text-md md:text-xl lg:text-2xl">
                                        {today}
                                    </span>
                                    <span className="typography-semibold text-[var(--grayText)] text-base sm:text-lg md:text-xl">
                                        Sem eventos hoje
                                    </span>
                                    <div className="h-[1px] w-full bg-[var(--lineSeparator)] rounded-2xl mt-[16px] mb-[16px]"></div>
                                    <span className="typography-semibold text-[var(--color-blueDark)] text-lg sm:text-md md:text-xl">
                                        Próximo evento
                                    </span>
                                    <span className="typography-regular text-[var(--grayText)] text-base sm:text-lg md:text-xl">
                                        Atendimento Walace - 10 de março 2025
                                    </span>
                                </div>
                                <div className="bgGlassNoPadding py-5 px-6 h-[100%] w-[33%]">
                                    <span className="typography-black text-[var(--color-blueDark)] text-lg sm:text-md md:text-xl lg:text-2xl ">
                                        Eventos Por categoria
                                    </span>
                                    <div className="space-y-4 max-h-[80%] overflow-y-auto mt-5 scrollbar-thin-gray px-4" >
                                        {eventosPorCategoria && showEventosPorCategoria(eventosPorCategoria)}
                                    </div>
                                </div>
                                <div className="bgGlassNoPadding py-5 px-6 h-[100%] w-[33%]">
                                    <span className="typography-black text-[var(--color-blueDark)] text-lg sm:text-md md:text-xl lg:text-2xl ">
                                        Processos por Tipo de Ação

                                    </span>
                                    <div className="space-y-4 max-h-[80%] overflow-y-auto mt-5 scrollbar-thin-gray px-4" >
                                        {processosPorTipo.map((item, index) => (
                                            <div key={index} className="flex items-center justify-between">
                                                <span className="text-sm font-medium">{item.tipo}</span>
                                                <div className="flex items-center gap-3">
                                                    <Badge variant="outline">{item.quantidade}</Badge>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                            </div>
                            <div className="h-3/5 flex gap-4 mb-[4%]">
                                <div className="bgGlassNoPadding h-[100%] w-[50%] p-6 flex flex-col gap-4">
                                    <span className="typography-black text-[var(--color-blueDark)] text-[28px]">Eventos nos próximos 7 dias </span>
                                    {eventosPorDia && showNextDayCharts(eventosPorDia)}
                                </div>

                                <div className="bgGlassNoPadding h-[100%] w-[50%] p-6 flex flex-col gap-4">
                                    <span className="typography-black text-[var(--color-blueDark)] text-[28px]">Processos Por Status</span>
                                    {processosPorStatus && showEventsByStatus(processosPorStatus)}
                                </div>
                            </div>

                        </div>

                    </div>
                </div>
            </div >
        </>
    )
}