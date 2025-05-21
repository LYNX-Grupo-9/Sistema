import axios from "axios";
import { X } from "lucide-react";
import { useEffect, useState } from "react"

const apiBaseURL = 'http://localhost:8080/api/';

export default function ModalEventDetails({ idEvento, onClose }) {

    const [event, setEvent] = useState(null);

    useEffect(() => {
        if (idEvento !== undefined) {
            getEventById(idEvento).then(evento => {
                if (evento) {
                    setEvent(evento);
                    console.log(evento);
                }
            });
            return;
        }
    }, [idEvento])


    function getEventById(idEvento) {
        return axios.get(apiBaseURL + `eventos/${idEvento}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZHZvZ2Fkb0BlbWFpbC5jb20iLCJpYXQiOjE3NDc0MTIxMDIsImV4cCI6MTc1MTAxMjEwMn0.Y3q5ZoMdUo-1EnKlDMCXr3ye74TCXW2oflIdN3VzRhPtwwTg0Jdjvw1EdqjvgLEQWH7prBc1kKMtTsdwTRtUPw`
            }
        })
            .then(response => {
                return response.data;
            })
            .catch(error => {
                console.error('Erro ao buscar evento:', error);
                return false;
            });
    }



    function formatDateBR(dateString) {
        if (!dateString) return "";
        const date = new Date(dateString);
        if (isNaN(date)) return dateString;
        return date.toLocaleDateString('pt-BR');
    }

    function formatTimeBR(timeString) {
        if (!timeString) return "";
        const [hour, minute] = timeString.split(":");
        return `${hour}:${minute}`;
    }

    return (
        <>
            <div className="fixed inset-0 bg-[#0000005d] flex items-center justify-center z-40 " onClick={onClose}>
            </div>
            <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col gap-4 items-start bg-white rounded-lg shadow-lg p-6 z-50">
                <X onClick={onClose} size={30} color="#013451" className="self-end cursor-pointer" />
                <div>
                    <span className="typography-black text-[var(--color-blueDark)] text-xl ">Detalhes de  "{event ? event.nome : ""}": </span>
                    <div className="flex flex-col gap-2 mt-4 w-96">
                        <div>
                            <span className="font-bold text-[var(--color-grayLight)] text-xl">Data: </span>
                            <span className="font-semibold text-[var(--color-grayLight)] text-lg">
                                {event ? `${formatDateBR(event.dataReuniao)}${event.horaInicio && event.horaFim ?`, das ${formatTimeBR(event.horaInicio)} às ${formatTimeBR(event.horaFim)}` : ""}` : ""}
                            </span>
                        </div>
                        <div>
                            <span className="font-bold text-[var(--color-grayLight)] text-xl">Descrição: </span>
                            <span className="font-semibold text-[var(--color-grayLight)] text-lg">{event ? "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus ex facilis nostrum optio eos, et doloribus dolore, architecto voluptatem officiis maxime culpa iusto. Odio architecto aliquam consequuntur repellendus ducimus tenetur" : ""}</span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}   