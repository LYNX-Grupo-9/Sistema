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

export default function Dashboard() {

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
        const today = new Date();
        const formattedDate = format(today, "EEEE, d 'de' MMMM", { locale: ptBR });
        setToday(capitalizeFirstLetter(formattedDate))


        fetchData(idAdvogado);
    }, [])

    function fetchData(idAdvogado) {
        console.log("Fetching data for advogado ID:", idAdvogado);



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

        axios.get(`http://localhost:8080/api/eventos/proximo/${idAdvogado}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            }
        })
            .then(response => {
                console.log("Próximo evento recebido:", response);

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

        axios.get(`http://localhost:8080/api/eventos/contar-eventos-dia/${idAdvogado}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            }
        })
            .then(response => {
                console.log("Processos por tipo recebidos:", response.data);
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

        axios.get(`http://localhost:8080/api/processos/quantidade-por-classe/${idAdvogado}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            }
        })
            .then(response => {
                console.log("Processos por tipo recebidos:", response.data);
                setProcessosPorTipo(response.data);
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

    function getValorMedioProcessos(idAdvogado) {
        const token = localStorage.getItem('token');

        if (!token) {
            toast.error('Token de autenticação não encontrado. Por favor, faça login novamente.');
            return;
        }

        axios.get(`http://localhost:8080/api/processos/media-valor/${idAdvogado}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            }
        })
            .then(response => {
                console.log("Valor médio recebido:", response.data);
                setValorMedio(response.data);
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



    function showNextEvent(nextEvent) {
        console.log("Próximo evento:", nextEvent);

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
    }

    return (
        <div className="flex h-full w-full bg-gray-100 px-6 py-8 space-y-6">
            {/* Top cards */}
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
