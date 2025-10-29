import api from "../../services/api";
import { useEffect, useState } from "react";
import { SingleSelectComponent } from "../../components/SelectComponent";
import { format, set } from 'date-fns';
import { Search } from "../../components/search";
import { NewItemButton } from "../../components/Buttons/NewItemButton";
import { EntityItem } from "../../components/EntityItem";
import { CustomerRegister } from "../../components/modals/CustomerRegister";
import { LgButton } from "../../components/Buttons/LgButton";

export function CustomerList() {
    const idAdvogado = localStorage.getItem("idAdvogado");
    const [customerList, setCustomerList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);

    const [pagina, setPagina] = useState(0);
    const [totalPaginas, setTotalPaginas] = useState(0);
    const [ordenacao, setOrdenacao] = useState("nome");
    const tamanhoPagina = 4;


    const openModal = () => setModalOpen(true);
    const closeModal = () => setModalOpen(false);

    const [orderOptions, setOrderOptions] = useState([]);
    const [selectedOrderOptions, setSelectedOrderOptions] = useState(0);

    const [searchValue, setSearchValue] = useState("");
    const [debouncedSearchValue, setDebouncedSearchValue] = useState("");

    function handleOrderChange(selectedOption) {
        setSelectedOrderOptions(selectedOption);
    }

    function handleSearchChange(event) {
        setSearchValue(event.target.value);
    }

    function handlePrevPage() {
        if (pagina > 0) {
            setPagina(pagina - 1);
        }
    }

    function handleNextPage() {
        if (pagina < totalPaginas - 1) {
            setPagina(pagina + 1);
        }
    }

    useEffect(() => {
        setOrderOptions([
            { id: 1, label: "Nome" },
            { id: 2, label: "Número de processos " },
            { id: 3, label: "Nacionalidade" },
            { id: 4, label: "Data de nascimento" },
        ]);
    }, []);

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            setDebouncedSearchValue(searchValue);
        }, 300);

        return () => clearTimeout(delayDebounceFn);
    }, [searchValue]);

    const handleGetCustomers = (ordem = ordenacao) => {
        setOrdenacao(ordem);
        setLoading(true);

        api.getCustomerPagination(pagina, tamanhoPagina, ordem)
            .then((res) => {
                setCustomerList(res.data.content);
                setTotalPaginas(res.data.totalPages);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Erro ao buscar clientes:", error);
                setLoading(false);
            });
    };

    useEffect(() => {
        setLoading(true);
        handleGetCustomers("nome");

        if (debouncedSearchValue.length > 0) {
            api.getCustomerBySearch(debouncedSearchValue, idAdvogado)
                .then((response) => {
                    setCustomerList(response.data);
                    setLoading(false);
                })
                .catch((error) => {
                    console.error("Erro ao buscar usuário via busca", error);
                    setLoading(false);
                });
        } else {
            let ordem = "nome";

            switch (selectedOrderOptions) {
                case 1:
                    ordem = "nome";
                    break;
                case 2:
                    ordem = "qtdProcessos";
                    break;
                case 3:
                    ordem = "naturalidade";
                    break;
                case 4:
                    ordem = "dataNascimento";
                    break;
                default:
                    ordem = "nome";
                    break;
            }

            handleGetCustomers(ordem);

        }
    }, [debouncedSearchValue, selectedOrderOptions, pagina]);

    return (
        <div className="bg-[var(--bgColor-primary)] w-full h-full flex">
            <div className="p-[5%] w-[90%] absolute h-full">
                <span className="typography-bold text-[var(--color-blueDark)] text-4xl">Central de Clientes</span>
                <div className="flex mt-[3%] mb-[30px] w-full justify-between">
                    <div className="flex gap-4">
                        <Search change={handleSearchChange} />
                        <SingleSelectComponent options={orderOptions} select={handleOrderChange} />
                    </div>
                    <NewItemButton title="Adicionar Cliente" click={openModal} />
                </div>

                <div className="bgGlass w-full h-[85%]">
                    <div className="p-[2%] h-full">
                        <div className="flex w-[90%] justify-between items-center ">
                            <span className="typography-medium text-[10px] text-[var(--grayText)] w-[15%]">NOME</span>
                            <span className="typography-medium text-[10px] text-[var(--grayText)] w-[15%] ">EMAIL</span>
                            <span className="typography-medium text-[10px] text-[var(--grayText)] w-[15%] ">TELEFONE</span>
                            <span className="typography-medium text-[10px] text-[var(--grayText)] w-[15%] ">NACIONALIDADE</span>
                            <span className="typography-medium text-[10px] text-[var(--grayText)] w-[15%]  ">DATA DE NASCIMENTO</span>
                            <span className="typography-medium text-[10px] text-[var(--grayText)] w-[15%] ">PROCESSOS EM CURSO</span>
                        </div>

                        <div className=" h-full ">
                            {customerList.map((item, index) => (
                                <EntityItem
                                    key={index}

                                    name={item.nome}
                                    email={item.email}
                                    phone={item.telefone}
                                    country={item.naturalidade}
                                    dtNasc={format(new Date(item.dataNascimento), 'dd/MM/yyyy')}
                                    qtCases={item.qtdProcessos ? item.qtdProcessos : 0}
                                />
                            ))}

                            <div className="w-full mt-4 flex justify-center gap-4 absolute bottom-5 right-5">
                                <LgButton title="Pagina anterior" click={handlePrevPage} />
                                <span className="typography-medium text-[var(--grayText)] text-sm flex items-center">Página {pagina + 1} de {totalPaginas}</span>
                                <LgButton title="Proxima pagina" click={handleNextPage} />

                            </div>

                        </div>
                    </div>
                </div>
            </div>
            <CustomerRegister isOpen={modalOpen} onClose={closeModal} caseFlow={false} />
        </div>
    );
}