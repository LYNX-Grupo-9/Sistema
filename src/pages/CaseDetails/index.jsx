import { useEffect, useState } from "react";
import { CustomerCase } from "../../components/CustomerCases";
import { CustomerInfo } from "../../components/CustomerInfo";

import { EventCard } from "../../components/EventCard";
import edit from "../../assets/icons/edit.svg";
import api from "../../services/api";
import { useLocation } from "react-router-dom";
import { SingleSelectComponent } from "../../components/SelectComponent";
import { AttachmentButton } from "../../components/Buttons/AttachmentButton";
import { ExternalTJSP } from "../../components/Buttons/ExternalTJSP";

export function CaseDetails() {
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
            <div className="pl-20 flex gap-10 w-[95%] h-full justify-center items-center">
                <div className="flex flex-col gap-6 w-1/2">
                    <div className="bgGlass w-full h-[10%] flex justify-between items-center">
                        <span className="typography-semibold text-lg sm:text-md md:text-xl lg:text-3xl text-[var(--color-blueDark)]">Informações do processo</span>
                        <img src={edit} className="w-[5%] ml-4 cursor-pointer" alt="Editar" onClick={() => console.log("Editar cliente")} />
                    </div>
                    <div className="bgGlass w-full h-[70%] flex flex-col items-center gap-5 overflow-y-auto">

                        <CustomerInfo title="Titulo do processo" value={`${customerData.tipoDocumento} - ${customerData.documento}`} />
                        <CustomerInfo title="Número do processo" value={customerData.dataNascimento} />
                        <CustomerInfo title="Cliente" value={customerData.naturalidade} />
                        <CustomerInfo title="Status do processo" value={customerData.endereco} />
                        <CustomerInfo title="Classe processual" value={customerData.genero} />
                        <CustomerInfo title="Assunto" value={customerData.email} />
                        <CustomerInfo title="Tribunal/Comarca" value={customerData.telefone} />
                        <CustomerInfo title="Valor da ação" value={customerData.profissao} />
                    </div>
                </div>
                <div className="flex flex-col w-1/2 flex flex-col h-[75%] justify-between ">
                    <div className="flex flex-col gap-6">
                        <div className="bgGlass w-full h-[20%] flex justify-start items-center">
                            <span className="typography-semibold text-lg sm:text-md md:text-xl lg:text-3xl text-[var(--color-blueDark)]">Partes envolvidas</span>
                        </div>
                        <div className="bgGlass flex flex-col gap-4 h-[100%] justify-center w-full ">
                            <CustomerInfo title="Classe processual" value={customerData.genero} />
                            <CustomerInfo title="Assunto" value={customerData.email} />
                            <CustomerInfo title="Tribunal/Comarca" value={customerData.telefone} />
                            <CustomerInfo title="Valor da ação" value={customerData.profissao} />
                        </div>
                    </div>
                    <div className=" flex flex-col gap-6 ">
                        <ExternalTJSP />
                        <AttachmentButton />
                    </div>
                </div>
            </div>
        </div>
    )
}