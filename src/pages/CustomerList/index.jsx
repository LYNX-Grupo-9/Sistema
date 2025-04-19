import { useEffect, useState } from "react";
import { MultiSelectComponent } from "../../components/MultiSelectComponent";
import { SingleSelectComponent } from "../../components/SelectComponent";

import { Search } from "../../components/search";
import { NewItemButton } from "../../components/Buttons/NewItemButton";
import { CustomerItem } from "../../components/CustomerItem";

export function CustomerList() {

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
    }, [])

    return (
        <div className="bg-[var(--bgColor-primary)] w-screen h-screen pl-[220px] pt-[80px] pr-[80px]">
            <span className="typography-bold text-[var(--color-blueDark)] text-4xl">Central de Clientes</span>
            <div className="flex mt-[60px] mb-[30px] w-full justify-between">
                <div className="flex gap-4">
                    <Search />
                    <MultiSelectComponent options={filterOptions} />
                    <SingleSelectComponent options={filterOptions} />
                </div>
                <NewItemButton title="Adicionar Cliente" />
            </div>

            <div className="bgGlass w-full h-[650px]">
                <div className="p-[2%] h-full">
                    <div className="flex w-[90%] justify-between items-center ">
                        <span className="typography-medium text-[10px] text-[var(--grayText)] w-[12%]">ID CLIENTE</span>
                        <span className="typography-medium text-[10px] text-[var(--grayText)] w-[16%]">NOME</span>
                        <span className="typography-medium text-[10px] text-[var(--grayText)] w-[20%] ">EMAIL</span>
                        <span className="typography-medium text-[10px] text-[var(--grayText)] w-[13%] ">TELEFONE</span>
                        <span className="typography-medium text-[10px] text-[var(--grayText)] w-[13%] ">NACIONALIDADE</span>
                        <span className="typography-medium text-[10px] text-[var(--grayText)] w-[13%] ">DATA DE REGISTRO</span>
                        <span className="typography-medium text-[10px] text-[var(--grayText)] w-[13%] ">PROCESSOS EM CURSO</span>
                    </div>

                    <div className="h-full overflow-scroll">
                        <CustomerItem />
                        <CustomerItem />
                        <CustomerItem />
                        <CustomerItem />
                        <CustomerItem />
                        <CustomerItem />
                        <CustomerItem />
                        <CustomerItem />
                        <CustomerItem />
                    </div>
                </div>


            </div>
        </div>
    )
}