import { useEffect, useState } from "react";
import { DropdownComponent } from "../../components/DropdownComponent";
import { HighlightedCases } from "../../components/HighlightedCases";
import { MonthEvent } from "../../components/MonthEvent";
import { OverviewNotification } from "../../components/OverviewNotification";
import { Search } from "../../components/search";
import { format, set } from "date-fns";
import { ptBR } from "date-fns/locale";
import { HistoryComponent } from "../../components/HistoryComponent";
import { Layout } from "../../components/Layout";
import { SingleSelectComponent } from "../../components/SelectComponent";
import axios from "axios";
import { toast } from "react-toastify";
import { ModalScheduling } from "../../components/ModalScheduling";

const apiBaseURL = import.meta.env.VITE_API_BASE_URL;

export function Home() {

    const [today, setToday] = useState("")
    const [solicitacoes, setSolicitacoes] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [idSolicitacao, setIdSolicitacao] = useState(null);

    const idAdvogado = localStorage.getItem('idAdvogado');

    useEffect(() => {
        const today = new Date();
        const formattedDate = format(today, "EEEE, d 'de' MMMM", { locale: ptBR });
        setToday(capitalizeFirstLetter(formattedDate))


        fetchData(idAdvogado);
    }, [])

    function fetchData(idAdvogado) {
        getSolicitacoeByAdvId(idAdvogado);
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

        return notificacoes.map((notificacao, index) => {
            if (notificacao.visualizado == false) {
                return (
                    <>
                        <OverviewNotification key={index} onClick={() => { handleModalSolicitacao(notificacao.idSolicitacaoAgendamento) }} message={`Agendamento de ${notificacao.nome}`} />
                    </>
                )
            }

        })

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

    return (
        <>
            {isModalOpen && (
                <ModalScheduling idSolicitacao={idSolicitacao} onClose={closeModal} />
            )}
            <div className="flex h-full w-full">
                <div className="p-10 pl-20 absolute h-full w-[92%]">
                    <div className="flex justify-between mb-[20px] pr-[20px]">
                        <span className="typography-black text-[var(--color-blueDark)] text-[40px]">Visão geral</span>
                        <Search />
                    </div>
                    <div className="flex w-full h-[90%]">
                        <div className="w-[70%]">
                            <div className="bgGlass h-[60%] w-[100%]">
                                <div className="flex justify-between">
                                    <span className="typography-black text-[var(--color-blueDark)] text-[28px] ">Processos em destaque</span>
                                    <SingleSelectComponent />
                                </div>

                                <div className="h-[1px] w-full bg-[var(--lineSeparator)] rounded-2xl mt-[16px] mb-[16px]"></div>
                                <div className="flex flex-col w-full h-[100%] p-[20px]">
                                    <div className="flex w-[85%] justify-between items-center pl-[5%]">
                                        <span className="typography-medium text-[10px] text-[var(--grayText)] w-[150px]">Id do Processo</span>
                                        <span className="typography-medium text-[10px] text-[var(--grayText)] w-[200px]">Nome do cliente</span>
                                        <span className="typography-medium text-[10px] text-[var(--grayText)] w-[150px] ">Tipo</span>
                                        <span className="typography-medium text-[10px] text-[var(--grayText)] w-[150px] ">Data de inicio</span>
                                        <span className="typography-medium text-[10px] text-[var(--grayText)] w-[150px] ">Previsão de conclusão</span>
                                    </div>
                                    <div className="overflow-y-auto h-[75%] w-full">

                                    </div>
                                </div>
                            </div>
                            <div className="mt-[2%] flex h-[35%]">

                                <div className="bgGlass w-[50%] ml-[12px] flex flex-col items-center">
                                    <span className="typography-black text-[var(--color-blueDark)] text-[28px] ">Eventos do mês</span>
                                    <div className="flex w-full pt-[20px] justify-between">
                                        <span className="text-[var(--grayText)] typography-medium text-[10px]">Nome do evento</span>
                                        <span className="text-[var(--grayText)] typography-medium text-[10px]">Data</span>
                                    </div>
                                    <div className="h-[80%] w-full overflow-y-auto">
                                        <MonthEvent title="Audiência Carlos Sainz" date="15/04/2025" />
                                        <MonthEvent title="Audiência Carlos Sainz" date="15/04/2025" />
                                        <MonthEvent title="Audiência Carlos Sainz" date="15/04/2025" />
                                        <MonthEvent title="Audiência Carlos Sainz" date="15/04/2025" />
                                        <MonthEvent title="Audiência Carlos Sainz" date="15/04/2025" />
                                        <MonthEvent title="Audiência Carlos Sainz" date="15/04/2025" />
                                        <MonthEvent title="Audiência Carlos Sainz" date="15/04/2025" />
                                        <MonthEvent title="Audiência Carlos Sainz" date="15/04/2025" />
                                        <MonthEvent title="Audiência Carlos Sainz" date="15/04/2025" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="mx-[2%] w-[30%]">
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
                            </div>

                            <div className="bgGlass h-[30%]">
                                <span className="typography-black text-[var(--color-blueDark)] text-[28px] ">Notificação</span>
                                <div className=" w-full mr-[12px] h-4/5 overflow-y-scroll ">
                                    <div className="h-full py-2.5">
                                        {solicitacoes && showNotificacoes(solicitacoes)}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}