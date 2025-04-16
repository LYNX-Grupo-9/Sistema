import { DropdownComponent } from "../../components/DropdownComponent";
import { HighlightedCases } from "../../components/HighlightedCases";
import { OverviewNotification } from "../../components/OverviewNotification";
import { Search } from "../../components/search";

export function Home() {
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
                        <div className="">
                            <div className="bgGlass h-[450px] w-[1000px]">
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
                                <div className="bgGlass w-[550px] h-[350px] mr-[12px]">
                                    <span className="typography-black text-[var(--color-blueDark)] text-[28px] ">Notificação</span>
                                    <div className="h-[220px] overflow-y-scroll py-2.5">
                                    <OverviewNotification message="Nova consulta"/>
                                    <OverviewNotification message="Nova consulta"/>
                                    <OverviewNotification message="Nova consulta"/>
                                    <OverviewNotification message="Nova consulta"/>
                                    <OverviewNotification message="Nova consulta"/>
                                    <OverviewNotification message="Nova consulta"/>
                                    <OverviewNotification message="Nova consulta"/>
                                    <OverviewNotification message="Nova consulta"/>
                                    </div>
                                </div>
                                <div className="bgGlass w-[422px] h-[350px] ml-[12px]">

                                </div>
                            </div>
                        </div>
                        <div className="mx-[24px]">
                            <div className="bgGlass w-[450px] h-[350px] mb-[24px]">

                            </div>
                            <div className="bgGlass w-[450px] h-[450px]">

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}