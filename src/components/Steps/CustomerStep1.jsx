import { MainInput } from "../inputs/MainInput"
import { DateInput } from "../inputs/DateInput"
import { useState, useEffect } from "react";
import { SelectInput } from "../inputs/SelectInput"
import axios from "axios";
import { GenderRadioInput } from "../inputs/GenderInput";
export function CustomerStep1({ user, setUser }) {

    const [countries, setCountries] = useState([]);
    const [maritalStatus, setMaritalStatus] = useState([]);
    const [gender, setGender] = useState("");

    const [selectedCity, setSelectedCity] = useState(null);
    const [selectedStatus, setSelectedStatus] = useState(null);

    function handleCountryChange(selectedOption) {
        setSelectedCity(selectedOption);
        setUser({ ...user, naturalidade: selectedOption.label });
    }
    function handleStatusChange(selectedOption) {
        setSelectedStatus(selectedOption);
        setUser({ ...user, estadoCivil: selectedOption.label });
    }
    function handleGenderChange(selectedOption) {
        setGender(selectedOption);
        setUser({ ...user, genero: selectedOption });
    }
    useEffect(() => {
        axios
            .get("https://servicodados.ibge.gov.br/api/v1/paises/{paises}")
            .then((response) => {
                const formatted = response.data.map((item) => ({
                    id: item.id["ISO-ALPHA-3"],
                    label: item.nome.abreviado,
                }),);
                setCountries(formatted);
            })
            .catch((error) => {
                console.error("Erro ao buscar países:", error);
            });

        setMaritalStatus([
            { id: 1, label: "Casado" },
            { id: 2, label: "Solteiro" },
            { id: 3, label: "União estável" },
            { id: 4, label: "Divorciado" },
            { id: 5, label: "Viúvo" }
        ])


    }, []);

    return (
        <div className="h-full flex flex-col gap-6 pt-10">
            <MainInput label="Nome" placeholder="Insira o nome do cliente" value={user.nome} onChange={(e) => setUser({ ...user, nome: e.target.value })} />
            <DateInput label="Data de nascimento" value={user.dataNascimento} onChange={(e) => setUser({ ...user, dataNascimento: e.target.value })} />
            <SelectInput
                label="Nacionalidade"
                options={countries}
                value={selectedCity}
                onChange={handleCountryChange}
                placeholder="Digite para filtrar"
            />
            <SelectInput
                label="Estado civil"
                options={maritalStatus}
                value={selectedStatus}
                onChange={handleStatusChange}
                placeholder="Digite para filtrar"
            />
            <GenderRadioInput
                label="Gênero"
                value={gender}
                onChange={handleGenderChange}
            />
        </div>

    )
}