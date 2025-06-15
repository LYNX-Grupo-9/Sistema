import { useEffect, useState } from "react";
import { EntityInfo } from "../../components/EntityInfo";
import edit from "../../assets/icons/edit.svg";
import api from "../../services/api";
import { useLocation } from "react-router-dom";
import { ExternalTJSP } from "../../components/Buttons/ExternalTJSP";
import { ButtonAnexo } from "../../components/ButtonAnexo";
import { EditCase } from "../../components/modals/EditCase";

export function CaseDetails() {
    const location = useLocation();
    const { id, customer, idCustomer } = location.state || {};
    const [modalOpen, setModalOpen] = useState(false);
    const openModal = () => setModalOpen(true);
    const closeModal = () => setModalOpen(false);
    const [caseData, setCaseData] = useState([]);
    
    useEffect(() => {
        api.getCaseById(id)
            .then((response) => {
                setCaseData(response.data);
            })
            .catch((error) => {
                console.error("Erro ao buscar cliente:", error);
            });
    }, []);


    return (
        <div className="flex w-full h-full bg-[var(--bgColor-primary))] items-center justify-center">
            <div className="pl-20 flex gap-10 w-[95%] h-full justify-center items-center">
                <div className="flex flex-col gap-6 w-1/2 h-full justify-center">
                    <div className="bgGlass w-full h-[10%] flex justify-between items-center">
                        <span className="typography-semibold text-lg sm:text-md md:text-xl lg:text-3xl text-[var(--color-blueDark)]">Informações do processo</span>
                        <img src={edit} className="w-[5%] ml-4 cursor-pointer" alt="Editar" onClick={openModal} />
                    </div>
                    <div className="bgGlass w-full h-[70%] flex flex-col items-center gap-5 overflow-y-auto">
                        <EntityInfo title="Titulo do processo" value={caseData.titulo} />
                        <EntityInfo title="Número do processo" value={caseData.numeroProcesso} />
                        <EntityInfo title="Cliente" value={customer}/>
                        <EntityInfo title="Status do processo" value={caseData.status} />
                        <EntityInfo title="Classe processual" value={caseData.classeProcessual} />
                        <EntityInfo title="Assunto" value={caseData.assunto} />
                        <EntityInfo title="Tribunal/Comarca" value={caseData.tribunal} />
                        <EntityInfo title="Valor da ação" value={caseData.valor} />
                    </div>
                </div>
                <div className="flex flex-col w-1/2 h-full justify-center gap-15">
                    <div className="flex flex-col gap-6">
                        <div className="bgGlass w-full h-[20%] flex justify-start items-center">
                            <span className="typography-semibold text-lg sm:text-md md:text-xl lg:text-3xl text-[var(--color-blueDark)]">Partes envolvidas</span>
                        </div>
                        <div className="bgGlass flex flex-col gap-4 h-[100%] justify-center w-full ">
                            <EntityInfo title="Autor" value={caseData.autor} />
                            <EntityInfo title="Advogado Requerente" value={caseData.advRequerente} />
                            <EntityInfo title="Réu" value={caseData.reu} />
                            <EntityInfo title="Advogado do réu" value={caseData.advReu} />
                        </div>
                    </div>
                    <div className=" flex flex-col gap-6 ">
                        <ExternalTJSP />
                        <ButtonAnexo idCliente={idCustomer} idProcesso={id}/>
                    </div>
                </div>
            </div>
            <EditCase isOpen={modalOpen} onClose={closeModal} selectedCaseData={caseData} idProcesso={id}/>
        </div>
    )
}