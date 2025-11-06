import React, { useEffect, useState } from "react";

import { TrendingUp, TrendingDown } from "lucide-react";
import axios from "axios";
import { toast } from "react-toastify";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { OverviewNotification } from "../../components/OverviewNotification";
import DoubleLineChart from "../../components/Charts/DoubleLineChart";
import RecebimentosChart from "../../components/RecebimentosChart";
import api from "../../services/api";
import { Loading } from "../../components/Loading";

export default function Dashboard() {

   const [loading, setLoading] = useState(true);
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
    const [processosPorTipo, setProcessosPorTipo] = useState();
    const [qtdEventoDia, setQtdEventoDia] = useState(0);
    const [nextEvent, setNextEvent] = useState(null);
    const [valorMedio, setValorMedio] = useState(0);

    const idAdvogado = localStorage.getItem('idAdvogado');

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 1500);

        const today = new Date();
        const formattedDate = format(today, "EEEE, d 'de' MMMM", { locale: ptBR });
        setToday(capitalizeFirstLetter(formattedDate))
        fetchData(idAdvogado);
    }, [])

    function fetchData(idAdvogado) {
        getEventosProx7dias(idAdvogado);
        getSolicitacoeByAdvId(idAdvogado);
        getQtdEventosPorCategoriaByIdAdv(idAdvogado);
        getContagemPorStatus(idAdvogado);
        getTotalProcessosAtivos(idAdvogado);
        getTotalEventosMes(idAdvogado);
        getTotalClietesAtivos(idAdvogado);
        getProcessosPorTipoDeAcao(idAdvogado);
        getQtdEventosDia(idAdvogado);
        getNextEventByIdAdv(idAdvogado);
        getValorMedioProcessos(idAdvogado);
    }

    function getNextEventByIdAdv(idAdvogado) {
        const token = localStorage.getItem('token');

        if (!token) {
            toast.error('Token de autenticação não encontrado. Por favor, faça login novamente.');
            return;
        }

        api.getNextEventByIdAdv(idAdvogado)
            .then(response => {
                if (response.status === 204) {
                    return false;
                }

                setNextEvent(response.data);
            }).catch(error => {
                toast.error('Erro ao buscar próximo evento:', error);
            })
    }

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    function getQtdEventosDia(idAdvogado) {
        const token = localStorage.getItem('token');

        if (!token) {
            toast.error('Token de autenticação não encontrado. Por favor, faça login novamente.');
            return;
        }

        api.getQtdEventosDia(idAdvogado)
            .then(response => {
                setQtdEventoDia(response.data.quantidadeEvento);
            }).catch(error => {
                toast.error('Erro ao buscar processos por tipo:', error);
            })
    }


    function getProcessosPorTipoDeAcao(idAdvogado) {
        const token = localStorage.getItem('token');

        if (!token) {
            toast.error('Token de autenticação não encontrado. Por favor, faça login novamente.');
            return;
        }

       api.getProcessosPorTipoDeAcao(idAdvogado)
            .then(response => {
                setProcessosPorTipo(response.data.contagemPorClasseProcessual);
            }).catch(error => {
                toast.error('Erro ao buscar processos por tipo:', error);
            })
    }

    function getSolicitacoeByAdvId(idAdvogado) {
        const token = localStorage.getItem('token');

        if (!token) {
            toast.error('Token de autenticação não encontrado. Por favor, faça login novamente.');
            return;
        }


        api.getSolicitacoeByAdvId(idAdvogado)
            .then(response => {
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
                        <OverviewNotification key={index} onClick={() => { handleModalSolicitacao(notificacao.idSolicitacao) }} message={`Agendamento de ${notificacao.nome}`} />
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

        api.getQtdEventosPorCategoriaByIdAdv(idAdvogado)
            .then(response => {
                setEventosPorCategoria(response.data.categorias);
            }).catch(error => {
                toast.error('Erro ao buscar eventos por categoria:', error);
            })

    }

    function getValorMedioProcessos(idAdvogado) {
        const token = localStorage.getItem('token');

        if (!token) {
            toast.error('Token de autenticação não encontrado. Por favor, faça login novamente.');
            return;
        }

       api.getValorMedioProcessos(idAdvogado)
            .then(response => {
                setValorMedio(response.data.valorMedio);
            }).catch(error => {
                toast.error('Erro ao buscar valor médio dos processos:', error);
            })
    }

    function getContagemPorStatus(idAdvogado) {
        const token = localStorage.getItem('token');

        if (!token) {
            toast.error('Token de autenticação não encontrado. Por favor, faça login novamente.');
            return;
        }

        api.getContagemPorStatus(idAdvogado)
            .then(response => {
                setProcessosPorStatus(response.data.contagemPorStatus
                );
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

        api.getEventosProx7dias(idAdvogado)
            .then(response => {
                console.log(response.data);
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

        api.getTotalProcessosAtivos(idAdvogado)
            .then(response => {
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

        api.getTotalEventosMes(idAdvogado)
            .then(response => {
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

        api.getTotalClietesAtivos(idAdvogado)
            .then(response => {
                setTotalClientes(response.data);
            }).catch(error => {
                toast.error('Erro ao buscar total de clientes ativos:', error);
            })
    }

    function transformEventosToChartData(eventos) {
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
    
        if (eventos && eventos.length > 0) {
            eventos.forEach(evento => {
                const dataEventoFormatada = format(new Date(evento.dataReuniao), 'yyyy-MM-dd');
    
                proximosSeteDias.forEach(dia => {
                    const diaDataFormatada = format(dia.data, 'yyyy-MM-dd');
    
                    if (diaDataFormatada === dataEventoFormatada) {
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

    function showProcessosPorTipo(processosPorTipo) {
        if (!processosPorTipo || processosPorTipo.length === 0) {
            return (
                <span className="typography-regular text-[var(--grayText)] text-base sm:text-lg md:text-xl">
                    Nenhum evento
                </span>
            );
        }

        return Object.entries(processosPorTipo).map(([tipo, quantidade], index) => (
            <div key={index} className="flex items-center justify-between">
                <span className="text-sm font-medium">{tipo}</span>
                <div className="flex items-center gap-3">
                    <Badge variant="outline">{quantidade}</Badge>
                </div>
            </div>
        ));
    }

    function showNextEvent(nextEvent) {
        if (!nextEvent) {
            return (
                <span className="typography-regular text-[var(--grayText)] text-base sm:text-lg md:text-xl">
                    Nenhum evento agendado.
                </span>
            );
        }

        const formattedDate = nextEvent.dataReuniao ?
            (() => {
            const date = new Date(nextEvent.dataReuniao);
            const adjustedDate = new Date(date.getTime() + date.getTimezoneOffset() * 60000);
            return format(adjustedDate, "d 'de' MMMM", { locale: ptBR });
            })() : '';

        return (
            <span className="typography-regular text-[var(--grayText)] text-base sm:text-lg md:text-xl">
                {nextEvent.nome || "Atendimento"} - {formattedDate} ({nextEvent.horaInicio?.substring(0, 5)} às {nextEvent.horaFim?.substring(0, 5)})
            </span>
        );
    }
    

    return (
        
        loading ? <Loading /> :
        
        <div className="flex h-full w-full bg-gray-100 px-6 py-8 space-y-6">
            
            <div className="flex flex-col w-full h-full gap-6 ">


                <div className="flex justify-between">
                    <div className="bgGlassNoPadding flex w-[45%] h-[140px] items-center justify-between px-[24px]">
                        <div>
                            <span className="text-[var(--grayText)] typography-regular">Próximo pagamento</span>
                            <div className="mt-2 text-sm">
                                <span className="text-[var(--color-blueDark)] typography-bold text-[20px]">Lewis Hamilton</span> - <span className="text-[var(--color-red)] typography-semibold text-[20px]">Em atraso</span>
                            </div>
                        </div>
                        <div className="text-sm flex flex-col items-end ">
                            <span className="text-[var(--color-blueLight)] typography-bold text-[20px]">Venc. 06/11/2025</span>
                            <span className="text-[var(--color-blueDark)] typography-bold text-[20px]">Parcela 2/3 - €600,00</span>
                        </div>
                    </div>

                    <div className="bgGlassNoPadding flex justify-around  w-[25%] h-[140px]">
                        <div className="flex flex-col items-start justify-center">
                            <p className="text-[var(--grayText)] typography-regular">Faturado neste mês</p>
                            <span className="text-[32px] typography-black text-[var(--success)] ">R$ 4.000,53</span>
                        </div>
                        <div className="text-[var(--success)]  flex items-center text-sm mt-1">
                            <div className="bg-green-100 flex items-center p-2 rounded text-xl">
                                <TrendingUp size={24} className="mr-1" /> -4%
                            </div>
                        </div>
                    </div>

                    <div className="bgGlassNoPadding flex justify-around  w-[25%] h-[140px]">
                        <div className="flex flex-col items-start justify-center">
                            <p className="text-[var(--grayText)] typography-regular">Pendente neste mês</p>
                            <span className="text-[32px] typography-black text-[var(--color-red)] ">R$ 4.000,53</span>
                        </div>
                        <div className="text-[var(--color-red)]  flex items-center text-sm mt-1">
                            <div className="bg-red-100 flex items-center p-2 rounded text-xl">
                                <TrendingUp size={24} className="mr-1" /> -4%
                            </div>
                        </div>
                    </div>
                </div>

                {/* Middle section */}
                <div className="flex w-full gap-4 h-[90%]">
                    <div className="flex flex-col gap-4 w-[40%] h-[100%]">
                        <div className="bgGlassNoPadding px-5 py-7 h-[30%] w-full flex flex-col justify-around">
                            <span className="typography-black text-[var(--color-blueDark)] text-lg sm:text-md md:text-xl lg:text-2xl">
                                {today}
                            </span>
                            <span className="typography-semibold text-[var(--grayText)] text-base sm:text-lg md:text-xl">
                                {qtdEventoDia === 0 ? 'Sem eventos hoje.' : `Você tem ${qtdEventoDia} evento hoje.`}
                            </span>
                            <div className="h-[1px] w-full bg-[var(--lineSeparator)] rounded-2xl mt-[16px] mb-[16px]"></div>
                            <span className="typography-semibold text-[var(--color-blueDark)] text-lg sm:text-md md:text-xl">
                                Próximo evento
                            </span>
                            <span className="typography-regular text-[var(--grayText)] text-base sm:text-lg md:text-xl">
                                {showNextEvent(nextEvent)}
                            </span>
                        </div>

                        <div className="bgGlassNoPadding px-5 py-7 h-[60%] w-full ">
                            <span className="typography-black text-[var(--color-blueDark)] text-[28px] ">Solicitações de agendamento</span>
                            <div className=" w-full mr-[12px] h-4/5 overflow-y-auto ">
                                <div className="h-full py-2.5">
                                    {solicitacoes && showNotificacoes(solicitacoes)}
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* Bottom section */}
                    <div className="flex flex-col  w-full h-full">
                        <div className="flex justify-between w-full h-[30%] ">
                            <div className=" bgGlassNoPadding w-[30%] h-[80%] px-8 py-4  flex items-center justify-between">
                                <div className="flex flex-col items-start justify-center">
                                    <p className="text-[var(--grayText)] typography-regular">Clientes inadimplentes</p>
                                    <span className="text-[28px] typography-black text-[var(--color-red)] ">12</span>
                                </div>
                                <div className="text-[var(--color-red)]  flex items-center text-sm mt-1">
                                    <div className="bg-red-100 flex items-center p-2 rounded text-xl">
                                        <TrendingUp size={16} className="mr-1" /> -4%
                                    </div>
                                </div>
                            </div>

                            <div className=" bgGlassNoPadding w-[30%] h-[80%] px-8 py-4 flex items-center justify-between">
                                <div className="flex flex-col items-start justify-center">
                                    <p className="text-[var(--grayText)] typography-regular">Processos com pendências</p>
                                    <span className="text-[28px] typography-black text-[var(--color-red)] ">12</span>
                                </div>
                                <div className="text-[var(--color-red)]  flex items-center text-sm mt-1">
                                    <div className="bg-red-100 flex items-center p-2 rounded text-xl">
                                        <TrendingUp size={16} className="mr-1" /> -4%
                                    </div>
                                </div>
                            </div>

                          
                    <div className="bgGlassNoPadding flex justify-around  w-[38%] h-[80%]">
                        <div className="flex flex-col items-start justify-center">
                            <p className="text-[var(--grayText)] typography-regular">Previsão de caixa (prox. 30 dias)</p>
                            <span className="text-[32px] typography-black text-[var(--success)] ">R$ 15.000,53</span>
                        </div>
                        <div className="text-[var(--success)]  flex items-center text-sm mt-1">
                            <div className="bg-green-100 flex items-center p-2 rounded text-xl">
                                <TrendingUp size={24} className="mr-1" /> -4%
                            </div>
                        </div>
                    </div>

                        </div>

                        <div className="flex justify-between h-full">
                            <div className="bgGlassNoPadding px-5 py-7 h-[90%] w-[50%]">
                                <div>
                                    <span className="text-[var(--grayText)] typography-regular">Relação</span>
                                    <div className="mt-2 text-sm">
                                        <span className="text-[var(--color-blueDark)] typography-bold text-[20px]">Recebido/Pendente</span>
                                    </div>
                                </div>
                                <div className="h-full flex items-center justify-center text-gray-400 text-sm">
                                    <DoubleLineChart />
                                </div>
                            </div>

                            <div className="bgGlassNoPadding px-5 py-7 h-[90%] w-[48%]">
                            <div>
                                    <span className="text-[var(--grayText)] typography-regular">Faturamento</span>
                                    <div className="mt-2 text-sm">
                                        <span className="text-[var(--color-blueDark)] typography-bold text-[20px]">Ultimos 6 meses</span>
                                    </div>
                                </div>
                                <div className="h-40 flex items-center justify-center text-gray-400 text-sm">
                                    <RecebimentosChart/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
