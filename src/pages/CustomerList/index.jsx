import api from "../../services/api";
import { useEffect, useState } from "react";
import { MultiSelectComponent } from "../../components/MultiSelectComponent";
import { SingleSelectComponent } from "../../components/SelectComponent";

import { Search } from "../../components/search";
import { NewItemButton } from "../../components/Buttons/NewItemButton";
import { CustomerItem } from "../../components/CustomerItem";
import { Layout } from "../../components/Layout";
import { CustomerRegister } from "../../components/modals/CustomerRegister";
import axios from "axios";

export function CustomerList() {
    const [customerList, setCustomerList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);

    const openModal = () => setModalOpen(true);
    const closeModal = () => setModalOpen(false);

    const [filterOptions, setFilterOptions] = useState([])

    useEffect(() => {
        setFilterOptions([
            { id: 1, label: "New York" },
            { id: 2, label: "London" },
            { id: 3, label: "Paris" },
            { id: 4, label: "Tokyo" },
            { id: 5, label: "Mumbai" },
            { id: 6, label: "Sydney" },
            { id: 7, label: "Dubai" },
        ])

        api.getAllCustomer()
            .then((response) => {
                setCustomerList(response.data)
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error registering user", error);
            });
    }, [customerList])

    return (
        <div className="bg-[var(--bgColor-primary)] w-full h-full flex">
            <Layout />
            <div className=" ml-[200px] pt-[80px] w-[85%] absolute">
                <span className="typography-bold text-[var(--color-blueDark)] text-4xl">Central de Clientes</span>
                <div className="flex mt-[60px] mb-[30px] w-full justify-between">
                    <div className="flex gap-4">
                        <Search />
                        <MultiSelectComponent options={filterOptions} />
                        <SingleSelectComponent options={filterOptions} />
                    </div>
                    <NewItemButton title="Adicionar Cliente" click={openModal} />
                </div>

                <div className="bgGlass w-full h-[650px]">
                    <div className="p-[2%] h-full">
                        <div className="flex w-[90%] justify-between items-center ">
                            <span className="typography-medium text-[10px] text-[var(--grayText)] w-[7%]">ID CLIENTE</span>
                            <span className="typography-medium text-[10px] text-[var(--grayText)] w-[16%]">NOME</span>
                            <span className="typography-medium text-[10px] text-[var(--grayText)] w-[20%] ">EMAIL</span>
                            <span className="typography-medium text-[10px] text-[var(--grayText)] w-[13%] ">TELEFONE</span>
                            <span className="typography-medium text-[10px] text-[var(--grayText)] w-[13%] ">NACIONALIDADE</span>
                            <span className="typography-medium text-[10px] text-[var(--grayText)] w-[12%] ">DATA DE REGISTRO</span>
                            <span className="typography-medium text-[10px] text-[var(--grayText)] w-[13%] ">PROCESSOS EM CURSO</span>
                        </div>

                        <div className=" h-full overflow-scroll">
                            {customerList.map((item, index) => (
                                <CustomerItem
                                    key={item.idCliente} 
                                    id={item.idCliente}
                                    name={item.nome}
                                    email={item.email}
                                    phone={item.telefone}
                                    country={item.naturalidade}
                                    dtNasc={item.dataNascimento}
                                    qtCases={item.qtdProcessos}
                                />
                            ))}
                        </div>
                    </div>

                </div>
            </div>
            <CustomerRegister isOpen={modalOpen} onClose={closeModal} />
        </div>
    )
}