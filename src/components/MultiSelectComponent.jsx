import React, { useState } from "react";
import { SmButton } from "./Buttons/SmButton";
import filterIcon from "../assets/icons/Filter.svg";

export function MultiSelectComponent(props) {
  const filterGroups = props.options; // Agora é [{ title, options: [{id, label}] }]
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const toggleOption = (option) => {
    if (selectedOptions.some((o) => o.id === option.id)) {
      setSelectedOptions(selectedOptions.filter((o) => o.id !== option.id));
    } else {
      setSelectedOptions([...selectedOptions, option]);
    }
  };

  const isSelected = (option) =>
    selectedOptions.some((o) => o.id === option.id);

  const DISPLAY_LIMIT = 1;

  return (
    <div className="relative z-10">
      <div
        className="border-2 w-[100%] min-h-[50px] h-[100%] flex items-center justify-between px-[22px] rounded-[10px] border-[var(--color-blueLight)] bg-[var(--color-light)] cursor-pointer gap-4"
        onClick={() => setIsOpen(!isOpen)}
      >
        {selectedOptions.length > 0 ? (
          <div className="flex flex-wrap gap-1">
            {selectedOptions.length > DISPLAY_LIMIT ? (
              <span className="text-[var(--color-blueDark)] typography-semibold">
                {selectedOptions.length} selecionados
              </span>
            ) : (
              selectedOptions.map((option) => (
                <span
                  key={option.id}
                  className="bg-blue-100 text-[var(--color-blueDark)] px-3 py-0.5 typography-regular rounded"
                >
                  {option.label}
                </span>
              ))
            )}
          </div>
        ) : (
          <div className="flex items-center justify-between w-25">
            <img src={filterIcon} alt="Filter Icon" />
            <span className="text-[var(--color-blueDark)] typography-semibold">
              Filtrar
            </span>
          </div>
        )}

        <svg
          className={`w-7 h-7 text-[var(--color-blueDark)] transform ${
            isOpen ? "rotate-180" : ""
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
        <div className="absolute top-14 left-0 w-[100%] max-h-[300px] rounded-[10px] border-2 border-[var(--color-blueLight)] bg-[var(--color-light)] p-4 overflow-auto">
          {filterGroups.map((group, index) => (
            <div key={index} className="mb-4">
              <h4 className="text-sm text-[var(--color-blueDark)] font-semibold mb-2">
                {group.title}
              </h4>
              {group.options.map((option) => (
                <div
                  key={option.id}
                  className="flex items-center px-3 py-2 cursor-pointer hover:bg-[var(--lineSeparator)] rounded-2xl"
                  onClick={() => toggleOption(option)}
                >
                  <input
                    type="checkbox"
                    checked={isSelected(option)}
                    onChange={() => toggleOption(option)}
                    className="form-checkbox h-4 w-4"
                  />
                  <span className="ml-2 text-[var(--color-blueDark)] typography-medium">
                    {option.label}
                  </span>
                </div>
              ))}
            </div>
          ))}
          <div className="flex w-full justify-center mt-[10px] bg-[var(--color-light)]">
            <SmButton title="Filtrar" click={() => setIsOpen(false)} />
          </div>
        </div>
      )}
    </div>
  );
}
