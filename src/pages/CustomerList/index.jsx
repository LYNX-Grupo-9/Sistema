import api from "../../services/api";
import { useEffect, useState } from "react";
import { MultiSelectComponent } from "../../components/MultiSelectComponent";
import { SingleSelectComponent } from "../../components/SelectComponent";

import { Search } from "../../components/search";
import { NewItemButton } from "../../components/Buttons/NewItemButton";
import { CustomerItem } from "../../components/CustomerItem";
import { Layout } from "../../components/Layout";
import { CustomerRegister } from "../../components/modals/CustomerRegister";


export function CustomerList() {

    const [customerList, setCustomerList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);

    const openModal = () => setModalOpen(true);
    const closeModal = () => setModalOpen(false);

    const [filterOptions, setFilterOptions] = useState([])
    const [orderOptions, setOrderOptions] = useState([])
    const [selectedOrderOptions, setSelectedOrderOptions] = useState(0)
    
    const [searchValue, setSearchValue] = useState(""

    )
    function handleOrderChange(selectedOption) {
        setSelectedOrderOptions(selectedOption);
    }
    
    function handleSearchChange(event) {
        setSearchValue(event.target.value);
    }
    
    useEffect(() => {
        setFilterOptions([
            {
              title: "Quantidade de processos em curso",
              options: [
                { id: 1, label: "0" },
                { id: 2, label: "1-5" },
                { id: 3, label: "6+" }
              ]
            },
            {
              title: "Nacionalidade",
              options: [
                { id: 4, label: "Brasileiro" },
                { id: 5, label: "Estrangeiro" }
            ]
        },
            {
              title: "Tipo de caso",
              options: [
                { id: 6, label: "Cível" },
                { id: 7, label: "Trabalhista" },
                { id: 8, label: "Penal" },
                { id: 9, label: "Família" },
                { id: 10, label: "Tributário" }
            ]
        },
          ])

        setOrderOptions([
            { id: 1, label: "Nome" },
            { id: 2, label: "Número de processos " },
            { id: 3, label: "Nacionalidade" },
            { id: 4, label: "Data de nascimento" },
        ])
        
        searchValue.length > 0 ? api.getCustomerBySearch(searchValue)
            .then((response) => {  setCustomerList(response.data) })
            .catch((error) => {
                console.error("Erro ao buscar usuario via busca", error);
            })
        : api.getAllCustomer()
            .then((response) => {
                setCustomerList(response.data)  })
            .catch((error) => {
                console.error("Error registering user", error);
            })
    

        switch (selectedOrderOptions) {
            case 0:
                api.getAllCustomer()
                    .then((response) => {
                        setCustomerList(response.data)
                        setLoading(false);
                    })
                    .catch((error) => {
                        console.error("Error registering user", error);
                    });
                break;
            case 1:
                api.getOrderByName()
                    .then((response) => {
                        setCustomerList(response.data)
                        setLoading(false);
                    })
                    .catch((error) => {
                        console.error("Error registering user", error);
                    });
                break;
            case 2:
                api.getOrderByCases()
                    .then((response) => {
                        setCustomerList(response.data)
                        setLoading(false);
                    })
                    .catch((error) => {
                        console.error("Error registering user", error);
                    });
                break;
            case 3:
                api.getOrderByNationality()
                    .then((response) => {
                        setCustomerList(response.data)
                        setLoading(false);
                    })
                    .catch((error) => {
                        console.error("Error registering user", error);
                    });
                break;
            case 4:
                api.getOrderByBornDate()
                    .then((response) => {
                        setCustomerList(response.data)
                        setLoading(false);
                    })
                    .catch((error) => {
                        console.error("Error registering user", error);
                    });
                break;
            default:
                break;
        }


    }, [ selectedOrderOptions, searchValue]);

    return (
        <div className="bg-[var(--bgColor-primary)] w-full h-full flex">
            <Layout />
            <div className=" ml-[14%] pt-[6%] w-[80%] absolute h-full">
                <span className="typography-bold text-[var(--color-blueDark)] text-4xl">Central de Clientes</span>
                <div className="flex mt-[3%] mb-[30px] w-full justify-between">
                    <div className="flex gap-4">
                        <Search change={handleSearchChange}/>
                        <MultiSelectComponent options={filterOptions} />
                        <SingleSelectComponent options={orderOptions} select={handleOrderChange}/>
                    </div>
                    <NewItemButton title="Adicionar Cliente" click={openModal} />
                </div>

                <div className="bgGlass w-full h-[70%]">
                    <div className="p-[2%] h-full">
                        <div className="flex w-[90%] justify-between items-center ">
                            <span className="typography-medium text-[10px] text-[var(--grayText)] w-[10%]">ID CLIENTE</span>
                            <span className="typography-medium text-[10px] text-[var(--grayText)] w-[15%]">NOME</span>
                            <span className="typography-medium text-[10px] text-[var(--grayText)] w-[15%] ">EMAIL</span>
                            <span className="typography-medium text-[10px] text-[var(--grayText)] w-[15%] ">TELEFONE</span>
                            <span className="typography-medium text-[10px] text-[var(--grayText)] w-[15%] ">NACIONALIDADE</span>
                            <span className="typography-medium text-[10px] text-[var(--grayText)] w-[15%]  ">DATA DE NASCIMENTO</span>
                            <span className="typography-medium text-[10px] text-[var(--grayText)] w-[15%] ">PROCESSOS EM CURSO</span>
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
                                    qtCases={item.qtdProcessos ? item.qtdProcessos : 0}
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