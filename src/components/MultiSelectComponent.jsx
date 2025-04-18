import React, { useState } from "react";
import { SmButton } from "./SmButton"
import filterIcon from "../assets/icons/Filter.svg"
const options = [
    { id: 1, label: "New York" },
    { id: 2, label: "London" },
    { id: 3, label: "Paris" },
    { id: 4, label: "Tokyo" },
    { id: 5, label: "Mumbai" },
    { id: 6, label: "Sydney" },
    { id: 7, label: "Dubai" },
];

export function MultiSelectComponent() {
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [isOpen, setIsOpen] = useState(false);


    const toggleOption = (option) => {
        if (selectedOptions.some((o) => o.id === option.id)) {
            setSelectedOptions(
                selectedOptions.filter((o) => o.id !== option.id)
            );
        } else {
            setSelectedOptions([...selectedOptions, option]);
        }
    };


    const isSelected = (option) =>
        selectedOptions.some((o) => o.id === option.id);

    return (
        <div className="relative w-80">
            <div
                className="border-2 w-[200px] h-[50px] flex items-center justify-between px-[22px] rounded-[10px] border-[var(--color-blueLight)] bg-[var(--color-light)] cursor-pointer"
                onClick={() => setIsOpen(!isOpen)}
            >

                {selectedOptions.length > 0 ? (
                    <div className="flex flex-wrap gap-1">
                        {selectedOptions.map((option) => (
                            <span
                                key={option.id}
                                className="bg-blue-100 text-blue-800 px-2 py-1 text-sm rounded"
                            >
                                {option.label}
                            </span>
                        ))}
                    </div>
                ) : (
                    <div className="flex items-center justify-between w-25">
                        <img src={filterIcon}/>
                        <span className="text-[var(--color-blueDark)] typography-semibold">Filtrar</span>
                    </div>
                )}


                <svg
                    className={`w-7 h-7 text-[var(--color-blueDark)] transform ${isOpen ? "rotate-180" : ""
                        }`}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                >
                    <path
                        fillRule="evenodd"
                        d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.25a.75.75 0 01-1.06 0L5.21 8.27a.75.75 0 01.02-1.06z"
                        clipRule="evenodd"
                    />
                </svg>
            </div>


            {isOpen && (
                <div className="absolute top-14 left-0 w-[350px] h-[270px] rounded-[10px] border-2 border-[var(--color-blueLight)] bg-[var(--color-light)] p-4 ">
                    <div className="h-[200px] overflow-scroll">
                    {options.map((option) => (
                        <div
                            key={option.id}
                            className={`flex items-center px-3 py-2 cursor-pointer hover:bg-[var(--lineSeparator)] rounded-2xl ${isSelected(option) ? "bg-blue-100" : ""
                                }`}
                            onClick={() => toggleOption(option)}
                        >

                            <input
                                type="checkbox"
                                checked={isSelected(option)}
                                onChange={() => toggleOption(option)}
                                className="form-checkbox h-4 w-4 text-blue-600"
                            />

                            <span className="ml-2 text-[var(--color-blueDark)] typography-medium">{option.label}</span>
                        </div>
                    ))}

                    </div>
                    <div className="flex w-full justify-end mt-[10px]">
                        <SmButton title="Filtrar" click={() => setIsOpen(!isOpen)} />
                    </div>
                </div>
            )}
        </div>
    );
};

