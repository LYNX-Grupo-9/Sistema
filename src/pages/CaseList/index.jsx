import api from "../../services/api";
import { useEffect, useState } from "react";
import { SingleSelectComponent } from "../../components/SelectComponent";
import { Search } from "../../components/search";
import { NewItemButton } from "../../components/Buttons/NewItemButton";
import { EntityItem } from "../../components/EntityItem";
import { CaseRegister } from "../../components/modals/CaseRegister";
import { LgButton } from "../../components/Buttons/LgButton"; // Importar LgButton para os botões de paginação

export function CaseList() {
    const idAdvogado = localStorage.getItem("idAdvogado");
    const [caseList, setCaseList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);

    // Estados de Paginação
    const [pagina, setPagina] = useState(0);
    const [totalPaginas, setTotalPaginas] = useState(0);
    const [ordenacao, setOrdenacao] = useState("titulo"); // Ordenação padrão
    const tamanhoPagina = 4; // Tamanho de página fixo

    const openModal = () => setModalOpen(true);
    const closeModal = () => setModalOpen(false);

    const [orderOptions, setOrderOptions] = useState([]);
    const [selectedOrderOptions, setSelectedOrderOptions] = useState(0);

    const [searchValue, setSearchValue] = useState("");
    const [debouncedSearchValue, setDebouncedSearchValue] = useState("");

    const [customerNamesMap, setCustomerNamesMap] = useState({});

    // Funções de manipulação de página
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

    // Função de mudança de ordenação
    function handleOrderChange(selectedOption) {
        setSelectedOrderOptions(selectedOption);
        setPagina(0); // Volta para a primeira página ao mudar a ordenação
    }

    // Função de mudança de pesquisa
    function handleSearchChange(event) {
        setSearchValue(event.target.value);
        setPagina(0); // Volta para a primeira página ao iniciar a pesquisa
    }

    // Função para buscar processos com paginação e ordenação
    const handleGetCases = (ordem = ordenacao) => {
        setOrdenacao(ordem);
        setLoading(true);

        // Assumindo que você terá um endpoint 'getCasePagination' similar ao 'getCustomerPagination'
        api.getCasePagination(pagina, tamanhoPagina, ordem)
            .then((res) => {
                setCaseList(res.data.content);
                setTotalPaginas(res.data.totalPages);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Erro ao buscar processos:", error);
                setLoading(false);
            });
    };

    // 1. Carregar opções de ordenação
    useEffect(() => {
        setOrderOptions([
            { id: 1, label: "Título" }, // Mudar para Título para ser ordenação padrão
            { id: 2, label: "Cliente" },
            { id: 3, label: "Valor da ação" },
            { id: 4, label: "Status do Processo" },
        ]);
    }, []);

    // 2. Lógica do Debounce para a pesquisa
    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            setDebouncedSearchValue(searchValue);
        }, 300);

        return () => clearTimeout(delayDebounceFn);
    }, [searchValue]);

    // 3. Carregar Nomes dos Clientes (Necessário para a exibição)
    useEffect(() => {
        // Mantenho a busca por todos os clientes para mapeamento, já que a EntityItem usa o nome do cliente.
        // Se a API de processos retornar o nome do cliente, essa chamada pode ser removida.
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


    // 4. Efeito principal para buscar processos (depende de pesquisa, ordenação e página)
    useEffect(() => {
        setLoading(true);

        if (debouncedSearchValue.length > 0) {
            // Lógica de pesquisa: Busca direta, sem paginação/ordenação no front
            // Mantenho a busca original, mas idealmente, o backend deveria retornar paginado mesmo na pesquisa.
            api.getCaseBySearch(debouncedSearchValue, idAdvogado)
                .then((response) => {
                    setCaseList(response.data);
                    setTotalPaginas(1); // Se não for paginado no back, trata como 1 página
                    setPagina(0);
                    setLoading(false);
                })
                .catch((error) => {
                    console.error("Erro ao buscar processos via busca", error);
                    setLoading(false);
                });
        } else {
            // Lógica de Paginação e Ordenação
            let ordem = "titulo"; // Padrão

            switch (selectedOrderOptions) {
                case 1:
                    ordem = "titulo";
                    break;
                case 2:
                    ordem = "cliente"; // Assumindo que a propriedade no backend seja 'cliente'
                    break;
                case 3:
                    ordem = "valorAcao"; // Assumindo 'valorAcao'
                    break;
                case 4:
                    ordem = "status"; // Assumindo 'status'
                    break;
                default:
                    ordem = "titulo";
                    break;
            }

            handleGetCases(ordem);
        }
    }, [debouncedSearchValue, selectedOrderOptions, pagina]); // Adicionado 'pagina'

    // O código da função 'CaseList' aqui...
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

                <div className="bgGlass w-full h-[85%]"> {/* Aumentei a altura para melhor visualização da paginação */}
                    <div className="p-[2%] h-full flex flex-col justify-between">
                        <div className="flex-grow">
                            <div className="flex w-[90%] justify-between items-center ">
                                <span className="typography-medium text-[10px] text-[var(--grayText)] w-[20%]">Número do processo</span>
                                <span className="typography-medium text-[10px] text-[var(--grayText)] w-[20%]">Titulo</span>
                                <span className="typography-medium text-[10px] text-[var(--grayText)] w-[20%] ">Cliente</span>
                                <span className="typography-medium text-[10px] text-[var(--grayText)] w-[20%] ">Classe</span>
                                <span className="typography-medium text-[10px] text-[var(--grayText)] w-[20%] ">Status</span>

                            </div>

                            <div className="h-full overflow-scroll">
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


                        <div className="w-full mt-4 flex justify-center gap-4">
                            <LgButton
                                title="Pagina anterior"
                                click={handlePrevPage}
                                disabled={pagina === 0 || caseList.length === 0}
                            />
                            <span className="typography-medium text-[var(--grayText)] text-sm flex items-center">
                                Página {pagina + 1} de {totalPaginas}
                            </span>
                            <LgButton
                                title="Proxima pagina"
                                click={handleNextPage}
                                disabled={pagina === totalPaginas - 1 || caseList.length === 0}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <CaseRegister isOpen={modalOpen} onClose={closeModal} />
        </div>
    );
}