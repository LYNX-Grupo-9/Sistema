import { CustomerCase } from "../../components/CustomerCases";
import { CustomerInfo } from "../../components/CustomerInfo";
import { DropdownComponent } from "../../components/DropdownComponent";
import { EventCard } from "../../components/EventCard";

export function CustomerDetails() {
    return (
        <div className="w-screen h-screen bg-[var(--bgColor-primary))] pl-[200px] pt-[80px] flex gap-10">
            <div className="flex flex-col gap-6">
                <div className="bgGlass w-[700px] h-[120px] flex justify-center items-center">
                    <span className="typography-semibold text-3xl text-[var(--color-blueDark)]">Lewis Carl Davidson Hamilton</span>
                </div>
                <div className="bgGlass w-[700px] h-[650px] flex flex-col items-center gap-5">
                    <CustomerInfo title="Documento de identificação" value="CPF -123456789-12" />
                    <CustomerInfo title="Documento de identificação" value="CPF -123456789-12" />
                    <CustomerInfo title="Documento de identificação" value="CPF -123456789-12" />
                    <CustomerInfo title="Documento de identificação" value="CPF -123456789-12" />
                    <CustomerInfo title="Documento de identificação" value="CPF -123456789-12" />
                    <CustomerInfo title="Documento de identificação" value="CPF -123456789-12" />
                    <CustomerInfo title="Documento de identificação" value="CPF -123456789-12" />
                </div>
            </div>
            <div className="flex flex-col gap-6">
                <div className="bgGlass w-[700px] h-[350px]">
                    <div className="flex w-full justify-between items-center">
                        <span className="typography-semibold text-3xl text-[var(--color-blueDark)]">Processos</span>
                        <DropdownComponent />
                    </div>
                    <div className="h-[1px] w-full bg-[var(--lineSeparator)] rounded-2xl mt-[20px] mb-[16px]"></div>

                    <div className="flex w-[80%] justify-between items-center pl-[6%]">
                        <span className="typography-medium text-[10px] text-[var(--grayText)] w-[100px]">Id do Processo</span>
                        <span className="typography-medium text-[10px] text-[var(--grayText)] w-[100px] ">Tipo</span>
                        <span className="typography-medium text-[10px] text-[var(--grayText)] w-[100px] ">Data de inicio</span>
                        <span className="typography-medium text-[10px] text-[var(--grayText)] w-[150px] ">Previsão de conclusão</span>
                    </div>
                    <div className="h-[180px] overflow-scroll">
                        <CustomerCase idCase="1321321" type="Aposentadoria" initialDate="10/10/2010" end="10/10/2020" />
                        <CustomerCase idCase="1321321" type="Aposentadoria" initialDate="10/10/2010" end="10/10/2020" />
                        <CustomerCase idCase="1321321" type="Aposentadoria" initialDate="10/10/2010" end="10/10/2020" />
                        <CustomerCase idCase="1321321" type="Aposentadoria" initialDate="10/10/2010" end="10/10/2020" />
                        <CustomerCase idCase="1321321" type="Aposentadoria" initialDate="10/10/2010" end="10/10/2020" />
                        <CustomerCase idCase="1321321" type="Aposentadoria" initialDate="10/10/2010" end="10/10/2020" />
                        <CustomerCase idCase="1321321" type="Aposentadoria" initialDate="10/10/2010" end="10/10/2020" />
                        <CustomerCase idCase="1321321" type="Aposentadoria" initialDate="10/10/2010" end="10/10/2020" />
                    </div>
                </div>
                <div className="bgGlass w-[700px] h-[420px]">
                    <span className="typography-semibold text-3xl text-[var(--color-blueDark)]">Eventos</span>
                    
                    <div className="mt-2 h-[300px] overflow-scroll">
                    <EventCard date="12/04/2025" title="Oliver Bearman Metting" type="Presencial" />
                    <EventCard date="12/04/2025" title="Oliver Bearman Metting" type="Presencial" />
                    <EventCard date="12/04/2025" title="Oliver Bearman Metting" type="Presencial" />
                    <EventCard date="12/04/2025" title="Oliver Bearman Metting" type="Presencial" />
                    <EventCard date="12/04/2025" title="Oliver Bearman Metting" type="Presencial" />
                    <EventCard date="12/04/2025" title="Oliver Bearman Metting" type="Presencial" />
                    </div>
                </div>
            </div>
        </div>
    )
}