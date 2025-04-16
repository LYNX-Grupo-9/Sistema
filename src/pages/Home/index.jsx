import { useEffect, useState } from "react";
import { DropdownComponent } from "../../components/DropdownComponent";
import { HighlightedCases } from "../../components/HighlightedCases";
import { MonthEvent } from "../../components/MonthEvent";
import { OverviewNotification } from "../../components/OverviewNotification";
import { Search } from "../../components/search";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

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
            <div className="flex bg-[var(--bgColor-primary)] h-screen w-screen">
                <div className="h-screen w-[140px] bg-[var(--color-blueDark)]"></div>
                <div className="pt-[50px] ml-[200px] absolute">
                    <div className="flex justify-between mb-[20px] pr-[20px]">
                        <span className="typography-black text-[var(--color-blueDark)] text-[40px]">Visão geral</span>
                        <Search />
                    </div>
                    <div className="flex w-full ">
                        <div>
                            <div className="bgGlass h-[450px] w-[950px]">
                                <div className="flex justify-between">
                                    <span className="typography-black text-[var(--color-blueDark)] text-[28px] ">Processos em destaque</span>
                                    <DropdownComponent />
                                </div>

                                <div className="h-[1px] w-full bg-[var(--lineSeparator)] rounded-2xl mt-[16px] mb-[16px]"></div>
                                <div className="flex flex-col w-full">
                                    <div className="flex w-[85%] justify-between items-center pl-[5%]">
                                        <span className="typography-medium text-[10px] text-[var(--lineSeparator)] w-[150px]">Id do Processo</span>
                                        <span className="typography-medium text-[10px] text-[var(--lineSeparator)] w-[200px]">Nome do cliente</span>
                                        <span className="typography-medium text-[10px] text-[var(--lineSeparator)] w-[150px] ">Tipo</span>
                                        <span className="typography-medium text-[10px] text-[var(--lineSeparator)] w-[150px] ">Data de inicio</span>
                                        <span className="typography-medium text-[10px] text-[var(--lineSeparator)] w-[150px] ">Previsão de conclusão</span>
                                    </div>
                                    <div className="overflow-scroll h-[250px]">
                                        <HighlightedCases
                                            idCase="1321321"
                                            Client="Paulo Cesar Dantas"
                                            type="Aposentadoria"
                                            initialDate="10/10/2010"
                                            end="10/10/2020"
                                        />
                                        <HighlightedCases
                                            idCase="1321321"
                                            Client="Paulo Cesar Dantas"
                                            type="Aposentadoria"
                                            initialDate="10/10/2010"
                                            end="10/10/2020"
                                        />
                                        <HighlightedCases
                                            idCase="1321321"
                                            Client="Paulo Cesar Dantas"
                                            type="Aposentadoria"
                                            initialDate="10/10/2010"
                                            end="10/10/2020"
                                        />
                                        <HighlightedCases
                                            idCase="1321321"
                                            Client="Paulo Cesar Dantas"
                                            type="Aposentadoria"
                                            initialDate="10/10/2010"
                                            end="10/10/2020"
                                        />
                                        <HighlightedCases
                                            idCase="1321321"
                                            Client="Paulo Cesar Dantas"
                                            type="Aposentadoria"
                                            initialDate="10/10/2010"
                                            end="10/10/2020"
                                        />
                                        <HighlightedCases
                                            idCase="1321321"
                                            Client="Paulo Cesar Dantas"
                                            type="Aposentadoria"
                                            initialDate="10/10/2010"
                                            end="10/10/2020"
                                        />
                                        <HighlightedCases
                                            idCase="1321321"
                                            Client="Paulo Cesar Dantas"
                                            type="Aposentadoria"
                                            initialDate="10/10/2010"
                                            end="10/10/2020"
                                        />
                                        <HighlightedCases
                                            idCase="1321321"
                                            Client="Paulo Cesar Dantas"
                                            type="Aposentadoria"
                                            initialDate="10/10/2010"
                                            end="10/10/2020"
                                        />
                                        <HighlightedCases
                                            idCase="1321321"
                                            Client="Paulo Cesar Dantas"
                                            type="Aposentadoria"
                                            initialDate="10/10/2010"
                                            end="10/10/2020"
                                        />
                                        <HighlightedCases
                                            idCase="1321321"
                                            Client="Paulo Cesar Dantas"
                                            type="Aposentadoria"
                                            initialDate="10/10/2010"
                                            end="10/10/2020"
                                        />
                                        <HighlightedCases
                                            idCase="1321321"
                                            Client="Paulo Cesar Dantas"
                                            type="Aposentadoria"
                                            initialDate="10/10/2010"
                                            end="10/10/2020"
                                        />
                                        <HighlightedCases
                                            idCase="1321321"
                                            Client="Paulo Cesar Dantas"
                                            type="Aposentadoria"
                                            initialDate="10/10/2010"
                                            end="10/10/2020"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="mt-[24px] flex">
                                <div className="bgGlass w-[525px] h-[350px] mr-[12px]">
                                    <span className="typography-black text-[var(--color-blueDark)] text-[28px] ">Notificação</span>
                                    <div className="h-[220px] overflow-y-scroll py-2.5">
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
                                <div className="bgGlass w-[400px] h-[350px] ml-[12px] flex flex-col items-center">
                                    <span className="typography-black text-[var(--color-blueDark)] text-[28px] ">Eventos do mês</span>
                                    <div className="flex w-full pt-[20px]">
                                        <span className="text-[var(--lineSeparator)] typography-medium text-[10px]">Nome do evento</span>
                                        <span className="text-[var(--lineSeparator)] typography-medium text-[10px] ml-[50%]">Data</span>
                                    </div>
                                    <div className="h-[250px] w-full overflow-scroll">
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
                        <div className="mx-[24px]">
                            <div className="bgGlass w-[500px] h-[250px] mb-[24px] flex flex-col">
                                <span className="typography-black text-[var(--color-blueDark)] text-[28px]">{today}</span>
                                <span className="typography-semibold text-[var(--lineSeparator)] text-[20px]">Sem eventos hoje</span>
                                <div className="h-[1px] w-full bg-[var(--lineSeparator)] rounded-2xl mt-[16px] mb-[16px]"></div>
                                <span className="typography-semibold text-[var(--color-blueDark)] text-[24px]">Próximo evento</span>
                                <span className="typography-regular text-[var(--lineSeparator)] text-[20px]">Atendimento Walace - 10 de março 2025</span>
                            </div>
                            <div className="bgGlass w-[500px] h-[550px]">
                                <div className="flex justify-between items-center">
                                    <span className="typography-black text-[var(--color-blueDark)] text-[28px]">Histórico</span>
                                    <DropdownComponent />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}