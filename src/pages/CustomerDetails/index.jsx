import { useEffect, useState } from "react";
import { CustomerCase } from "../../components/CustomerCases";
import { CustomerInfo } from "../../components/CustomerInfo";
import { DropdownComponent } from "../../components/DropdownComponent";
import { EventCard } from "../../components/EventCard";
import { Layout } from "../../components/Layout";
import api from "../../services/api";
import { useLocation } from "react-router-dom";
import { SingleSelectComponent } from "../../components/SelectComponent";

export function CustomerDetails() {
    const location = useLocation();
    const { id } = location.state || {};

    const [customerData, setCustomerData] = useState([]);
    useEffect(() => {
        api.getCustomerById(id)
            .then((response) => {
                setCustomerData(response.data);
                console.log(response.data);
            })
            .catch((error) => {
                console.error("Erro ao buscar cliente:", error);
            });
    }, []);

    return (
        <div className="flex w-full h-full bg-[var(--bgColor-primary))] items-center justify-center">   
            <div className="pl-20 p-10 flex gap-10 w-[95%] h-full ">
                <div className="flex flex-col gap-6 w-1/2">
                    <div className="bgGlass w-full h-[10%] flex justify-center items-center">
                        <span className="typography-semibold text-lg sm:text-md md:text-xl lg:text-3xl text-[var(--color-blueDark)]">{customerData.nome}</span>
                    </div>
                    <div className="bgGlass w-full h-[85%] flex flex-col items-center gap-5 overflow-y-auto">

                        <CustomerInfo title="Documento de identificação" value={`${customerData.tipoDocumento} - ${customerData.documento}`} />
                        <CustomerInfo title="Data de nascimento" value={customerData.dataNascimento} />
                        <CustomerInfo title="Naturalidade" value={customerData.naturalidade} />
                        <CustomerInfo title="Endereço" value={customerData.endereco} />
                        <CustomerInfo title="Gênero" value={customerData.genero} />
                        <CustomerInfo title="Email" value={customerData.email} />
                        <CustomerInfo title="Telefone" value={customerData.telefone} />
                        <CustomerInfo title="Profissão" value={customerData.profissao} />
                        <CustomerInfo title="Habilitação" value={customerData.cnh} />
                        <CustomerInfo title="Passaporte" value={customerData.passaporte} />
                    </div>
                </div>
                <div className="flex flex-col gap-6 w-1/2">
                    <div className="bgGlass w-full h-[40%] flex flex-col">
                        <div className="flex w-full justify-between items-center">
                            <span className="typography-semibold text-3xl text-[var(--color-blueDark)]">Processos</span>
                            <SingleSelectComponent/>
                        </div>
                        <div className="h-[1px] w-full bg-[var(--lineSeparator)] rounded-2xl mt-[20px] mb-[16px]"></div>

                        {customerData?.processos?.length > 0 ? (
                            <>
                                <div className="flex w-[80%] justify-between items-center pl-[4%]">
                                    <span className="typography-medium text-[10px] text-[var(--grayText)] w-[20%]">Id do Processo</span>
                                    <span className="typography-medium text-[10px] text-[var(--grayText)] w-[20%] ">Tipo</span>
                                    <span className="typography-medium text-[10px] text-[var(--grayText)] w-[23%] ">Data de inicio</span>
                                    <span className="typography-medium text-[10px] text-[var(--grayText)] w-[25%] ">Previsão de conclusão</span>
                                </div>
                                <div className="flex-1 h-[65%] overflow-y-auto">
                                    <CustomerCase idCase="1321321" type="Aposentadoria" initialDate="10/10/2010" end="10/10/2020" />
                                    <CustomerCase idCase="1321321" type="Aposentadoria" initialDate="10/10/2010" end="10/10/2020" />
                                    <CustomerCase idCase="1321321" type="Aposentadoria" initialDate="10/10/2010" end="10/10/2020" />
                                    <CustomerCase idCase="1321321" type="Aposentadoria" initialDate="10/10/2010" end="10/10/2020" />
                                    <CustomerCase idCase="1321321" type="Aposentadoria" initialDate="10/10/2010" end="10/10/2020" />
                                    <CustomerCase idCase="1321321" type="Aposentadoria" initialDate="10/10/2010" end="10/10/2020" />
                                    <CustomerCase idCase="1321321" type="Aposentadoria" initialDate="10/10/2010" end="10/10/2020" />
                                    <CustomerCase idCase="1321321" type="Aposentadoria" initialDate="10/10/2010" end="10/10/2020" />
                                </div>
                            </>
                        ) : (
                            <div className="flex items-center justify-center h-[80%]">
                            <span className="typography-bold text-[16px] text-[var(--grayText)] w-full text-center">Este cliente não possui nenhum processo vinculado a ele.</span>
                        </div>
                        )}

                    </div>
                    <div className="bgGlass w-[100%] h-[40%] flex flex-col">
                        <span className="typography-semibold text-3xl text-[var(--color-blueDark)]">Eventos</span>

                        {
                            customerData?.eventos?.length > 0 ?
                                <div className="mt-2 h-[85%] overflow-y-auto">
                                    <EventCard date="12/04/2025" title="Oliver Bearman Metting" type="Presencial" />
                                    <EventCard date="12/04/2025" title="Oliver Bearman Metting" type="Presencial" />
                                    <EventCard date="12/04/2025" title="Oliver Bearman Metting" type="Presencial" />
                                    <EventCard date="12/04/2025" title="Oliver Bearman Metting" type="Presencial" />
                                    <EventCard date="12/04/2025" title="Oliver Bearman Metting" type="Presencial" />
                                    <EventCard date="12/04/2025" title="Oliver Bearman Metting" type="Presencial" />
                                </div>
                                :
                                <div className="flex items-center justify-center h-[80%]">
                                    <span className="typography-bold text-[16px] text-[var(--grayText)] w-full text-center">Este cliente não possui nenhum evento vinculado a ele.</span>
                                </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}