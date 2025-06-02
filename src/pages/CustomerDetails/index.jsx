import { useEffect, useState } from "react";
import { CustomerCase } from "../../components/CustomerCases";
import { EntityInfo } from "../../components/EntityInfo";
import { DropdownComponent } from "../../components/DropdownComponent";
import { EventCard } from "../../components/EventCard";
import { Layout } from "../../components/Layout";
import api from "../../services/api";
import { useLocation } from "react-router-dom";
import { SingleSelectComponent } from "../../components/SelectComponent";
import { ButtonAnexo } from "../../components/ButtonAnexo";

export function CustomerDetails() {
    const location = useLocation();
    const { id } = location.state || {};

    const [customerData, setCustomerData] = useState([]);
    const [casesData, setCasesData] = useState([]);
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
    useEffect(() => {
        api.getCasesByCustomerId(id)
            .then((response) => {
                setCasesData(response.data);
                console.log(response.data);
            })
            .catch((error) => {
                console.error("Erro ao buscar cliente:", error);
            });
    }, []);

    return (
        <div className="flex w-full h-screen bg-[var(--bgColor-primary))] items-center justify-center">   
            <div className="pl-20 p-10 flex gap-10 w-[95%] h-full ">
                <div className="flex flex-col gap-6 w-1/2 h-full">
                    <div className="bgGlass w-full h-[10%] flex justify-center items-center">
                        <span className="typography-semibold text-lg sm:text-md md:text-xl lg:text-3xl text-[var(--color-blueDark)]">{customerData.nome}</span>
                    </div>
                    <div className="bgGlass w-full h-[83%] flex flex-col items-center gap-5 overflow-y-auto">

                        <EntityInfo title="Documento de identificação" value={`${customerData.tipoDocumento} - ${customerData.documento}`} />
                        <EntityInfo title="Data de nascimento" value={customerData.dataNascimento} />
                        <EntityInfo title="Naturalidade" value={customerData.naturalidade} />
                        <EntityInfo title="Endereço" value={customerData.endereco} />
                        <EntityInfo title="Gênero" value={customerData.genero} />
                        <EntityInfo title="Email" value={customerData.email} />
                        <EntityInfo title="Telefone" value={customerData.telefone} />
                        <EntityInfo title="Profissão" value={customerData.profissao} />
                        <EntityInfo title="Habilitação" value={customerData.cnh} />
                        <EntityInfo title="Passaporte" value={customerData.passaporte} />
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
                                    <span className="typography-medium text-[10px] text-[var(--grayText)] w-[20%]">Número do processo</span>
                                    <span className="typography-medium text-[10px] text-[var(--grayText)] w-[20%] ">Titulo</span>
                                    <span className="typography-medium text-[10px] text-[var(--grayText)] w-[23%] ">Classe</span>
                                    <span className="typography-medium text-[10px] text-[var(--grayText)] w-[25%] ">Status</span>
                                </div>
                                <div className="flex-1 h-[65%] overflow-y-auto">
                                    {
                                        casesData.map((caseItem) => (
                                            <CustomerCase 
                                                key={caseItem.idProcesso} 
                                                idCase={caseItem.idProcesso} 
                                                type={caseItem.titulo} 
                                                initialDate={caseItem.classeProcessual} 
                                                end={caseItem.status} 
                                                customer={customerData.nome}
                                            />
                                        ))
                                    }

                                 
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
            <ButtonAnexo />
                </div>
            </div>
        </div>
    )
}