import api from "../../services/api";
import { use, useEffect, useState } from "react";
import { MultiSelectComponent } from "../../components/MultiSelectComponent";
import { SingleSelectComponent } from "../../components/SelectComponent";

import { Search } from "../../components/search";
import { NewItemButton } from "../../components/Buttons/NewItemButton";
import { EntityItem } from "../../components/EntityItem";

import { CaseRegister } from "../../components/modals/CaseRegister";

export function CaseList() {
    const idAdvogado = localStorage.getItem("idAdvogado");
    const [caseList, setCaseList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);


    const openModal = () => setModalOpen(true);
    const closeModal = () => setModalOpen(false);

    const [filterOptions, setFilterOptions] = useState([]);
    const [orderOptions, setOrderOptions] = useState([]);
    const [selectedOrderOptions, setSelectedOrderOptions] = useState(0);

    const [searchValue, setSearchValue] = useState("");

    const [debouncedSearchValue, setDebouncedSearchValue] = useState("");

    const [customerNamesMap, setCustomerNamesMap] = useState({});

    useEffect(() => {
        api.getAllCustomer(idAdvogado)
            .then((response) => {
                const map = {};
                response.data.forEach(cliente => {
                    map[cliente.idCliente] = cliente.nome;
                });
                setCustomerNamesMap(map);
            })
            .catch(error => {
                console.error("Erro ao buscar todos os clientes", error);
            });
    }, []);

    function handleOrderChange(selectedOption) {
        setSelectedOrderOptions(selectedOption);
    }

    function handleSearchChange(event) {
        setSearchValue(event.target.value);
    }

    useEffect(() => {
        setOrderOptions([
            { id: 1, label: "Cliente" },
            { id: 2, label: "Número de processos" },
            { id: 3, label: "Valor da ação" },
            { id: 4, label: "Status do Processo" },
        ]);
    }, []);


    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            setDebouncedSearchValue(searchValue);
        }, 300);

        return () => clearTimeout(delayDebounceFn);
    }, [searchValue]);

    useEffect(() => {
        setLoading(true);

        if (debouncedSearchValue.length > 0) {
            api.getCustomerBySearch(debouncedSearchValue, idAdvogado)
                .then((response) => {
                    setCaseList(response.data);
                    setLoading(false);
                })
                .catch((error) => {
                    console.error("Erro ao buscar usuário via busca", error);
                    setLoading(false);
                });
        } else {
            switch (selectedOrderOptions) {
                case 0:
                    api.getAllCases(idAdvogado)
                        .then((response) => {
                            setCaseList(response.data);
                            setLoading(false);
                        })
                        .catch((error) => {
                            console.error("Erro ao obter todos os clientes", error);
                            setLoading(false);
                        });
                    break;
                case 1:
                    api.getOrderByNameCustomer(idAdvogado)
                        .then((response) => {
                            setCaseList(response.data);
                            setLoading(false);
                        })
                        .catch((error) => {
                            console.error("Erro ao ordenar por nome", error);
                            setLoading(false);
                        });
                    break;
                case 2:
                    api.getOrderByNumber(idAdvogado)
                        .then((response) => {
                            setCaseList(response.data);
                            console.log(response.data);
                            setLoading(false);
                        })
                        .catch((error) => {
                            console.error("Erro ao ordenar por casos", error);
                            setLoading(false);
                        });
                    break;
                case 3:
                    api.getOrderByValue(idAdvogado)
                        .then((response) => {
                            setCaseList(response.data);
                            console.log(response.data);
                            setLoading(false);
                        })
                        .catch((error) => {
                            console.error("Erro ao ordenar por nacionalidade", error);
                            setLoading(false);
                        });
                    break;
                case 4:
                    api.getOrderByStatus(idAdvogado)
                        .then((response) => {
                            setCaseList(response.data);
                            setLoading(false);
                            console.log(response.data)
                        })
                        .catch((error) => {
                            console.error("Erro ao ordenar por data de nascimento", error);
                            setLoading(false);
                        });
                    break;
                default:
                    break;
            }
        }
    }, [debouncedSearchValue, selectedOrderOptions]);


    return (
        <div className="bg-[var(--bgColor-primary)] w-full h-full flex">
            <div className="p-[5%] w-[90%] absolute h-full">
                <span className="typography-bold text-[var(--color-blueDark)] text-4xl">Central de Processos</span>
                <div className="flex mt-[3%] mb-[30px] w-full justify-between">
                    <div className="flex gap-4">
                        <Search change={handleSearchChange} />
                        <SingleSelectComponent options={orderOptions} select={handleOrderChange} />
                    </div>
                    <NewItemButton title="Adicionar Processo" click={openModal} />
                </div>

                <div className="bgGlass w-full h-[70%]">
                    <div className="p-[2%] h-full">
                        <div className="flex w-[90%] justify-between items-center ">
                            <span className="typography-medium text-[10px] text-[var(--grayText)] w-[20%]">Número do processo</span>
                            <span className="typography-medium text-[10px] text-[var(--grayText)] w-[20%]">Titulo</span>
                            <span className="typography-medium text-[10px] text-[var(--grayText)] w-[20%] ">Cliente</span>
                            <span className="typography-medium text-[10px] text-[var(--grayText)] w-[20%] ">Classe</span>
                            <span className="typography-medium text-[10px] text-[var(--grayText)] w-[20%] ">Status</span>

                        </div>

                        <div className=" h-full overflow-scroll">
                            {
                            
                            caseList.map((item, index) => (
                                <EntityItem
                                key={index}
                                id={item.idProcesso}
                                caseNumber={item.numeroProcesso}
                                title={item.titulo}
                                customer={customerNamesMap[String(item.idCliente)] || "Carregando..."} 
                                idCustomer={item.idCliente} 
                                classe={item.classeProcessual}
                                status={item.status}
                                type="case"
                            />
                            ))}

                        </div>
                    </div>
                </div>
            </div>
            <CaseRegister isOpen={modalOpen} onClose={closeModal} />
        </div>
    );
}