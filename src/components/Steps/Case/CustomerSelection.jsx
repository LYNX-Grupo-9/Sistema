import { useEffect } from "react"
import api from "../../../services/api";
import { CustomerItemSM } from "../../CustomerItemSM";
import { useState } from "react";
export function CustomerSelection({caseData, setCaseData}) {
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
    useEffect(() => {
        console.log(customerList)
    }, [customerList])

    return (
        <div className="flex flex-col">
            <div>Antes da lista</div>
            {
                customerList.map(( item, index ) => {
                    <CustomerItemSM
                        key={item.idCliente}
                        id={item.idCliente}
                        name={item.nome}
                        email={item.email}
                        phone={item.telefone}
                        country={item.naturalidade}
                        caseData={caseData}
                        setCaseData={setCaseData}
                    />
                })
            }
            <div>Depois da lista</div>

        </div>
    )
}