import React, { useEffect, useState } from "react";

import { TrendingUp, TrendingDown } from "lucide-react";
import axios from "axios";
import { toast } from "react-toastify";
import { format, set } from "date-fns";
import { ptBR } from "date-fns/locale";
import { OverviewNotification } from "../../components/OverviewNotification";
import DoubleLineChart from "../../components/Charts/DoubleLineChart";
import RecebimentosChart from "../../components/RecebimentosChart";
import { Calendar, Clock, FileText, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/Card";
import { ModalScheduling } from "../../components/ModalScheduling";
import { API_URL } from "../../services/configuracao";
import api from "../../services/api";

export default function Dashboard() {

    const [loading, setLoading] = useState(true);
    const [today, setToday] = useState("")
    const [solicitacoes, setSolicitacoes] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [idSolicitacao, setIdSolicitacao] = useState(null);
    const [qtdEventoDia, setQtdEventoDia] = useState(0);
    const [nextEvent, setNextEvent] = useState(null);
    const [totalProcessos, setTotalProcessos] = useState(0);
    const [totalEventos, setTotalEventos] = useState(0);
    const [totalClientes, setTotalClientes] = useState(0);
    const [totalPending, setTotalPending] = useState(0);
    const [pendingPercentual, setPendingPercentual] = useState(0);
    const [totalInvoiced, setTotalInvoiced] = useState(0);
    const [invoicedPercentual, setInvoicedPercentual] = useState(0);
    const [totalReceivable, setTotalReceivable] = useState(0);
    const [receivablePercentual, setReceivablePercentual] = useState(0);
    const idAdvogado = localStorage.getItem('idAdvogado');


    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 1500);

        const today = new Date();
        const formattedDate = format(today, "EEEE, d 'de' MMMM", { locale: ptBR });
        setToday(capitalizeFirstLetter(formattedDate))
        fetchData(idAdvogado);

        api.getTotalPending().then(response => {
            setTotalPending(response.data.totalPendente);
            setPendingPercentual(response.data.percentual);
        }).catch(error => {
            toast.error('Erro ao buscar total pendente:', error);
        });

        api.getTotalInvoicedMonth().then(response => {
            setTotalInvoiced(response.data.totalFaturado);
            setInvoicedPercentual(response.data.percentual);
        }).catch(error => {
            toast.error('Erro ao buscar total faturado:', error);
        });

        api.getTotalReceivable().then(response => {
            setTotalReceivable(response.data.totalAReceber);
            setReceivablePercentual(response.data.percentual);
        }).catch(error => {
            toast.error('Erro ao buscar total a receber:', error);
        }
        );
    }, [])

    function fetchData(idAdvogado) {
        getTotalProcessosAtivos(idAdvogado);
        getTotalClietesAtivos(idAdvogado);
        getSolicitacoeByAdvId(idAdvogado);
        getNextEventByIdAdv(idAdvogado);
        getTotalEventosMes(idAdvogado);
        getTotalClietesAtivos(idAdvogado);
    }
    function getTotalClietesAtivos(idAdvogado) {
        const token = localStorage.getItem('token');

        if (!token) {
            toast.error('Token de autenticação não encontrado. Por favor, faça login novamente.');
            return;
        }

        axios.get(`${API_URL}/clientes/advogado/${idAdvogado}/total-clientes`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            }
        })
            .then(response => {
                setTotalClientes(response.data);
            }).catch(error => {
                toast.error('Erro ao buscar total de clientes ativos:', error);
            })
    }
    function getTotalEventosMes(idAdvogado) {
        const token = localStorage.getItem('token');

        if (!token) {
            toast.error('Token de autenticação não encontrado. Por favor, faça login novamente.');
            return;
        }

        axios.get(`${API_URL}/eventos/advogado/${idAdvogado}/eventosMes`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            }
        })
            .then(response => {
                setTotalEventos(response.data.length);
            }).catch(error => {
                toast.error('Erro ao buscar total de processos ativos:', error);
            })
    }
    function getTotalProcessosAtivos(idAdvogado) {
        const token = localStorage.getItem('token');

        if (!token) {
            toast.error('Token de autenticação não encontrado. Por favor, faça login novamente.');
            return;
        }

        axios.get(`${API_URL}/processos/processosAtivos/${idAdvogado}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            }
        })
            .then(response => {
                setTotalProcessos(response.data.length);
            }).catch(error => {
                toast.error('Erro ao buscar total de processos ativos:', error);
            })
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
        <>
            {isModalOpen && (
                <ModalScheduling idSolicitacao={idSolicitacao} onClose={closeModal} onSuccess={() => { fetchData(idAdvogado) }} />
            )}
            <div className="flex h-full w-full bg-gray-100 px-6 py-8 space-y-6">
                <div className="flex flex-col w-full h-full gap-6 ">
                    <div className="flex w-full gap-4 h-[15%] justify-between">
                        <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white border-0 w-[20%]">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium opacity-90">Total de Processos</CardTitle>
                                <FileText className="h-5 w-5 opacity-90" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-3xl font-bold">{totalProcessos}</div>
                                <p className="text-xs opacity-80 mt-1">Processos ativos</p>
                            </CardContent>
                        </Card>

                        <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white border-0 w-[20%]">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium opacity-90">Clientes Ativos</CardTitle>
                                <Users className="h-5 w-5 opacity-90" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-3xl font-bold">{totalClientes}</div>
                                <p className="text-xs opacity-80 mt-1">Clientes em acompanhamento</p>
                            </CardContent>
                        </Card>

                        <Card className="bg-gradient-to-r from-amber-500 to-orange-500 text-white border-0 w-[20%]">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium opacity-90">Eventos do Mês</CardTitle>
                                <Calendar className="h-5 w-5 opacity-90" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-3xl font-bold">{totalEventos}</div>
                                <p className="text-xs opacity-80 mt-1">Compromissos agendados</p>
                            </CardContent>
                        </Card>

                        <div className="bgGlassNoPadding flex justify-around w-[30%] h-[100%]">
                            <div className="flex flex-col items-start justify-center">
                                <p className="text-[var(--grayText)] typography-regular">
                                    Previsão de caixa (prox. 30 dias)
                                </p>

                                <span
                                    className={`text-[32px] typography-black ${totalReceivable >= 0 ? "text-[var(--success)]" : "text-[var(--color-red)]"
                                        }`}
                                >
                                    {totalReceivable ?? 0}
                                </span>
                            </div>

                            <div
                                className={`flex items-center text-sm mt-1 ${receivablePercentual >= 0 ? "text-[var(--success)]" : "text-[var(--color-red)]"
                                    }`}
                            >
                                <div
                                    className={`flex items-center p-2 rounded text-xl ${receivablePercentual >= 0 ? "bg-green-100" : "bg-red-100"
                                        }`}
                                >
                                    {receivablePercentual >= 0 ? (
                                        <TrendingUp size={24} className="mr-1" />
                                    ) : (
                                        <TrendingDown size={24} className="mr-1" />
                                    )}
                                    {receivablePercentual}%
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
                            <div className="flex w-full h-[30%] gap-6">
                                <div className="bgGlassNoPadding flex justify-around  w-[35%] h-[140px]">
                                    <div className="flex flex-col items-start justify-center">
                                        <p className="text-[var(--grayText)] typography-regular">Faturado neste mês</p>

                                        <span
                                            className={`text-[32px] typography-black ${totalInvoiced >= 0 ? "text-[var(--success)]" : "text-[var(--color-red)]"
                                                }`}
                                        >
                                            {totalInvoiced ?? 0}
                                        </span>
                                    </div>

                                    <div
                                        className={`flex items-center text-sm mt-1 ${invoicedPercentual >= 0 ? "text-[var(--success)]" : "text-[var(--color-red)]"
                                            }`}
                                    >
                                        <div
                                            className={`flex items-center p-2 rounded text-xl ${invoicedPercentual >= 0 ? "bg-green-100" : "bg-red-100"
                                                }`}
                                        >
                                            {invoicedPercentual >= 0 ? (
                                                <TrendingUp size={24} className="mr-1" />
                                            ) : (
                                                <TrendingDown size={24} className="mr-1" />
                                            )}
                                            {invoicedPercentual}%
                                        </div>
                                    </div>
                                </div>
                                <div className="bgGlassNoPadding flex justify-around  w-[35%] h-[140px]">
                                    <div className="flex flex-col items-start justify-center">
                                        <p className="text-[var(--grayText)] typography-regular">Pendente neste mês</p>

                                        <span
                                            className={`text-[32px] typography-black ${totalPending >= 0 ? "text-[var(--color-red)]" : "text-[var(--success)]"
                                                }`}
                                        >
                                            {totalPending ?? 0}
                                        </span>
                                    </div>

                                    <div
                                        className={`flex items-center text-sm mt-1 ${pendingPercentual >= 0 ? "text-[var(--color-red)]" : "text-[var(--success)]"
                                            }`}
                                    >
                                        <div
                                            className={`flex items-center p-2 rounded text-xl ${pendingPercentual >= 0 ? "bg-red-100" : "bg-green-100"
                                                }`}
                                        >
                                            {pendingPercentual >= 0 ? (
                                                <TrendingUp size={24} className="mr-1" />
                                            ) : (
                                                <TrendingDown size={24} className="mr-1" />
                                            )}
                                            {pendingPercentual}%
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
                                        <RecebimentosChart />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
