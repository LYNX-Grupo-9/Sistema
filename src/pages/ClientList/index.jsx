import { useEffect, useState } from "react";
import { MultiSelectComponent } from "../../components/MultiSelectComponent";
import { SingleSelectComponent } from "../../components/SelectComponent";

import { Search } from "../../components/search";

export function ClientList() {

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
        <div className="bg-[var(--bgColor-primary)] w-screen h-screen pl-[220px] pt-[80px]">
            <span className="typography-bold text-[var(--color-blueDark)] text-4xl ">Central de Clientes</span>
            <div className="flex">
                <div className="flex gap-4">
                    <Search />
                    <MultiSelectComponent options={filterOptions} />
                    <SingleSelectComponent options={filterOptions} />
                </div>
            </div>
        </div>
    )
}