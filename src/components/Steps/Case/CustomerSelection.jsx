import { useEffect } from "react"
import api from "../../../services/api";
import { CustomerItemSM } from "../../CustomerItemSM";
import { useState } from "react";
export function CustomerSelection({ caseData, setCaseData, type}) {
    const idAdvogado = localStorage.getItem("idAdvogado");
    const [customerList, setCustomerList] = useState([]);

    useEffect(() => {
        api.getAllCustomer(idAdvogado)
            .then((response) => {
                setCustomerList(response.data);
            })
            .catch((error) => {
                console.error("Erro ao obter todos os clientes", error);
            });
    }, [])

    return (
        <div className="flex flex-col w-full h-full overflow-y-auto p-4">
            {customerList.map((item, index) => (
                <CustomerItemSM
                    key={index}
                    id={item.idCliente}
                    name={item.nome}
                    email={item.email}
                    phone={item.telefone}
                    country={item.naturalidade}
                    caseData={caseData} 
                    setCaseData={setCaseData}
                    type={type}

                />
            ))}

        </div>
    )
}