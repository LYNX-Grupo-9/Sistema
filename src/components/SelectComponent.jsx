import React, { useState } from "react";
import filterIcon from "../assets/icons/Filter.svg";
import { SmButton } from "./SmButton";

export function SingleSelectComponent(props) {
    const options = props.options;
    const [selectedOption, setSelectedOption] = useState(null);
    const [isOpen, setIsOpen] = useState(false);


    const handleOptionSelect = (option) => {
        setSelectedOption(option);
        setIsOpen(false);
    };

    return (
        <div className="relative">

            <div
                className="border-2 w-[200px] h-[50px] flex items-center justify-between px-[22px] rounded-[10px] border-[var(--color-blueLight)] bg-[var(--color-light)] cursor-pointer"
                onClick={() => setIsOpen(!isOpen)}
            >

                {selectedOption ? (
                    <span className="text-[var(--color-blueDark)] typography-medium">
                        {selectedOption.label}
                    </span>
                ) : (
                    <div className="flex items-center justify-between w-25">
                        <span className="text-[var(--color-blueDark)] typography-semibold">
                            Ordenar
                        </span>
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
                <div className="absolute top-14 left-0 w-[200px] max-h-[270px] rounded-[10px] border-2 border-[var(--color-blueLight)] bg-[var(--color-light)] p-4 shadow-lg">
                    <div className="max-h-[200px] overflow-y-auto">

                        {options.map((option) => (
                            <div
                                key={option.id}
                                className={`flex items-center px-3 py-2 cursor-pointer hover:bg-[var(--lineSeparator)] rounded-2xl ${selectedOption?.id === option.id ? "bg-blue-100" : ""
                                    }`}
                                onClick={() => handleOptionSelect(option)}
                            >
                                <span className="ml-2 text-[var(--color-blueDark)] typography-medium">
                                    {option.label}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}