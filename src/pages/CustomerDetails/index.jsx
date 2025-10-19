import { useEffect, useState } from "react";
import { CustomerCase } from "../../components/CustomerCases";
import { EntityInfo } from "../../components/EntityInfo";
import { EventCard } from "../../components/EventCard";
import api from "../../services/api";
import { useLocation } from "react-router-dom";
import { SingleSelectComponent } from "../../components/SelectComponent";
import { ButtonAnexo } from "../../components/ButtonAnexo";
import ModalEventDetails from "../../components/ModalEventDetails";
import { format } from 'date-fns';
import edit from "../../assets/icons/edit.svg";
import CoinImg from "../../assets/icons/coin.png";
import { CustomerRegister } from "../../components/modals/CustomerRegister";
import FinancialOverlay from "../../components/FinancialOverlay";



export function CustomerDetails() {
    const [modalOpen, setModalOpen] = useState(false);
    const openModal = () => setModalOpen(true);
    const closeModal = () => setModalOpen(false);

    const location = useLocation();
    const { id } = location.state || {};
    const [isModalDetailsOpen, setIsModalDetailsOpen] = useState(false);
    const [customerData, setCustomerData] = useState([]);
    const [casesData, setCasesData] = useState([]);
    const [events, setEvents] = useState([]);
    const [idEventDetails, setIdEventDetails] = useState(Number)
    const [orderOptions, setOrderOptions] = useState([]);
    const [selectedOrderOptions, setSelectedOrderOptions] = useState(0);

    const [isFinancialOverlayOpen, setIsFinancialOverlayOpen] = useState(false);

    useEffect(() => {
        setOrderOptions([
            { id: 1, label: "Cliente" },
            { id: 2, label: "Número de processos" },
            { id: 3, label: "Valor da ação" },
            { id: 4, label: "Status do Processo" },
        ]);
    }, []);

    useEffect(() => {
        console.log("ID do cliente:", id);

        api.getCustomerById(id)
            .then((response) => {
                setCustomerData(response.data);
            })
            .catch((error) => {
                console.error("Erro ao buscar cliente:", error);
            });
    }, []);
    useEffect(() => {
        api.getCasesByCustomerId(id)
            .then((response) => {
                setCasesData(response.data);
            })
            .catch((error) => {
                console.error("Erro ao buscar cliente:", error);
            });
    }, []);
    useEffect(() => {
        api.getEventsByCustomerId(id)
            .then((response) => {
                setEvents(response.data);
            })
            .catch((error) => {
                console.error("Erro ao buscar cliente:", error);
            });
    }, []);

    function closeModalDetails() {
        setIsModalDetailsOpen(false);
    }

    function openModalDetails(id) {
        setIdEventDetails(id)
        setIsModalDetailsOpen(true);
    }

    function handleOrderChange(selectedOption) {
        setSelectedOrderOptions(selectedOption);
    }

    function openFinancialOverlay() {
        setIsFinancialOverlayOpen(true);
    }

    function closeFinancialOverlay() {
        setIsFinancialOverlayOpen(false);
    }

    return (
        <>
            {
                isModalDetailsOpen &&
                <ModalEventDetails onClose={closeModalDetails} idEvento={idEventDetails} />
            }
            {
                modalOpen &&
                <CustomerRegister isOpen={modalOpen} onClose={closeModal} CustomerData={customerData} editMode={true} />
            }
            <div className="flex w-full h-screen bg-[var(--bgColor-primary))] items-center justify-center">
                <FinancialOverlay isOpen={isFinancialOverlayOpen} onClose={closeFinancialOverlay}/>
                <div className="pl-20 p-10 flex gap-10 w-[95%] h-full ">
                    <div className="flex flex-col gap-6 w-1/2 h-full">
                        <div className="bgGlass w-full h-[10%] flex justify-between items-center">
                            <span className="typography-semibold text-lg sm:text-md md:text-xl lg:text-3xl text-[var(--color-blueDark)]">{customerData.nome}</span>
                            <div className="flex gap-2">
                                <img src={edit} className="w-7 ml-4 cursor-pointer" alt="Editar" onClick={openModal} />
                                <img src={CoinImg} className="w-7 ml-4 cursor-pointer" alt="Financeiro" onClick={openFinancialOverlay} />
                            </div>
                        </div>
                        <div className="bgGlass w-full h-[83%] flex flex-col items-center gap-5 overflow-y-auto">

                            <EntityInfo title="Documento de identificação" value={`${customerData.tipoDocumento} - ${customerData.documento}`} />
                            <EntityInfo
                                title="Data de nascimento"
                                value={customerData.dataNascimento ? format(new Date(customerData.dataNascimento), 'dd/MM/yyyy') : 'Data inválida'}
                            />
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
                                events?.length > 0 ?
                                    <div className="mt-2 h-[85%] overflow-y-auto">
                                        {
                                            events.map((event) => (
                                                <EventCard
                                                    key={event.idEvento}
                                                    id={event.idEvento}
                                                    title={event.nome}
                                                    description={event.descricao}
                                                    date={event.dataReuniao}
                                                    send={openModalDetails}

                                                />
                                            ))
                                        }
                                    </div>
                                    :
                                    <div className="flex items-center justify-center h-[80%]">
                                        <span className="typography-bold text-[16px] text-[var(--grayText)] w-full text-center">Este cliente não possui nenhum evento vinculado a ele.</span>
                                    </div>
                            }
                        </div>

                        {id && <ButtonAnexo idCliente={id} />}
                    </div>
                </div>
            </div>
        </>
    )
}