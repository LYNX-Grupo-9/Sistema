import { useEffect, useState } from "react";
import { DropdownComponent } from "../../components/DropdownComponent";
import { HighlightedCases } from "../../components/HighlightedCases";
import { MonthEvent } from "../../components/MonthEvent";
import { OverviewNotification } from "../../components/OverviewNotification";
import { Search } from "../../components/search";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { HistoryComponent } from "../../components/HistoryComponent";
import { Layout } from "../../components/Layout";
import { SingleSelectComponent } from "../../components/SelectComponent";

export function Home() {

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    const [today, setToday] = useState("")

    useEffect(() => {
        const today = new Date();
        const formattedDate = format(today, "EEEE, d 'de' MMMM", { locale: ptBR });
        setToday(capitalizeFirstLetter(formattedDate))
    })

    return (
        <>
            <div className="flex h-screen w-screen">
                <Layout />
                <div className="pt-[60px] ml-[13%] absolute h-full w-[84%]">
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
                                        <HighlightedCases
                                            idCase="1321321"
                                            Customer="Paulo Cesar Dantas"
                                            type="Aposentadoria"
                                            initialDate="10/10/2010"
                                            end="10/10/2020"
                                        />
                                        <HighlightedCases
                                            idCase="1321321"
                                            Customer="Paulo Cesar Dantas"
                                            type="Aposentadoria"
                                            initialDate="10/10/2010"
                                            end="10/10/2020"
                                        />
                                        <HighlightedCases
                                            idCase="1321321"
                                            Customer="Paulo Cesar Dantas"
                                            type="Aposentadoria"
                                            initialDate="10/10/2010"
                                            end="10/10/2020"
                                        />
                                        <HighlightedCases
                                            idCase="1321321"
                                            Customer="Paulo Cesar Dantas"
                                            type="Aposentadoria"
                                            initialDate="10/10/2010"
                                            end="10/10/2020"
                                        />
                                        <HighlightedCases
                                            idCase="1321321"
                                            Customer="Paulo Cesar Dantas"
                                            type="Aposentadoria"
                                            initialDate="10/10/2010"
                                            end="10/10/2020"
                                        />
                                        <HighlightedCases
                                            idCase="1321321"
                                            Customer="Paulo Cesar Dantas"
                                            type="Aposentadoria"
                                            initialDate="10/10/2010"
                                            end="10/10/2020"
                                        />
                                        <HighlightedCases
                                            idCase="1321321"
                                            Customer="Paulo Cesar Dantas"
                                            type="Aposentadoria"
                                            initialDate="10/10/2010"
                                            end="10/10/2020"
                                        />
                                        <HighlightedCases
                                            idCase="1321321"
                                            Customer="Paulo Cesar Dantas"
                                            type="Aposentadoria"
                                            initialDate="10/10/2010"
                                            end="10/10/2020"
                                        />
                                        <HighlightedCases
                                            idCase="1321321"
                                            Customer="Paulo Cesar Dantas"
                                            type="Aposentadoria"
                                            initialDate="10/10/2010"
                                            end="10/10/2020"
                                        />
                                        <HighlightedCases
                                            idCase="1321321"
                                            Customer="Paulo Cesar Dantas"
                                            type="Aposentadoria"
                                            initialDate="10/10/2010"
                                            end="10/10/2020"
                                        />
                                        <HighlightedCases
                                            idCase="1321321"
                                            Customer="Paulo Cesar Dantas"
                                            type="Aposentadoria"
                                            initialDate="10/10/2010"
                                            end="10/10/2020"
                                        />
                                        <HighlightedCases
                                            idCase="1321321"
                                            Customer="Paulo Cesar Dantas"
                                            type="Aposentadoria"
                                            initialDate="10/10/2010"
                                            end="10/10/2020"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="mt-[24px] flex h-[35%]">
                                <div className="bgGlass w-[50%] mr-[12px]">
                                    <span className="typography-black text-[var(--color-blueDark)] text-[28px] ">Notificação</span>
                                    <div className="h-[80%] overflow-y-auto py-2.5">
                                        <OverviewNotification message="Nova consulta" />
                                        <OverviewNotification message="Nova consulta" />
                                        <OverviewNotification message="Nova consulta" />
                                        <OverviewNotification message="Nova consulta" />
                                        <OverviewNotification message="Nova consulta" />
                                        <OverviewNotification message="Nova consulta" />
                                        <OverviewNotification message="Nova consulta" />
                                        <OverviewNotification message="Nova consulta" />
                                    </div>
                                </div>
                                <div className="bgGlass w-[50%] ml-[12px] flex flex-col items-center">
                                    <span className="typography-black text-[var(--color-blueDark)] text-[28px] ">Eventos do mês</span>
                                    <div className="flex w-full pt-[20px] justify-between">
                                        <span className="text-[var(--grayText)] typography-medium text-[10px]">Nome do evento</span>
                                        <span className="text-[var(--grayText)] typography-medium text-[10px]">Data</span>
                                    </div>
                                    <div className="h-[250px] w-full overflow-y-auto">
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
                        <div className="mx-[24px] w-[30%]">
                            <div className="bgGlass h-[30%] mb-[24px] flex flex-col">
                                <span className="typography-black text-[var(--color-blueDark)] text-lg sm:text-xl md:text-2xl lg:text-3xl">
                                    {today}
                                </span>
                                <span className="typography-semibold text-[var(--grayText)] text-base sm:text-lg md:text-xl">
                                    Sem eventos hoje
                                </span>
                                <div className="h-[1px] w-full bg-[var(--lineSeparator)] rounded-2xl mt-[16px] mb-[16px]"></div>
                                <span className="typography-semibold text-[var(--color-blueDark)] text-lg sm:text-xl md:text-2xl">
                                    Próximo evento
                                </span>
                                <span className="typography-regular text-[var(--grayText)] text-base sm:text-lg md:text-xl">
                                    Atendimento Walace - 10 de março 2025
                                </span>
                            </div>

                            <div className="bgGlass h-[65%]">
                                <div className="flex justify-between items-center">
                                    <span className="typography-black text-[var(--color-blueDark)] text-[28px]">Histórico</span>
                                    <SingleSelectComponent />
                                </div>
                                <div className="flex w-full pt-[20px]">
                                    <span className="text-[var(--grayText)] typography-medium text-[12px]">Nome do cliente</span>
                                    <span className="text-[var(--grayText)] typography-medium text-[12px] ml-[15%]">Processos em aberto</span>
                                </div>
                                <div className="h-[80%] overflow-y-auto">
                                    <HistoryComponent title="Lewis Hamilton" message="2" />
                                    <HistoryComponent title="Lewis Hamilton" message="2" />
                                    <HistoryComponent title="Lewis Hamilton" message="2" />
                                    <HistoryComponent title="Lewis Hamilton" message="2" />
                                    <HistoryComponent title="Lewis Hamilton" message="2" />
                                    <HistoryComponent title="Lewis Hamilton" message="2" />
                                    <HistoryComponent title="Lewis Hamilton" message="2" />
                                    <HistoryComponent title="Lewis Hamilton" message="2" />
                                    <HistoryComponent title="Lewis Hamilton" message="2" />
                                    <HistoryComponent title="Lewis Hamilton" message="2" />
                                    <HistoryComponent title="Lewis Hamilton" message="2" />
                                    <HistoryComponent title="Lewis Hamilton" message="2" />
                                    <HistoryComponent title="Lewis Hamilton" message="2" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}