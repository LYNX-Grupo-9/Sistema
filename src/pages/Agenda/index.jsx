
import { Category } from '../../components/Category';
import { EventDay, NextEvent } from '../../components/NextEvent';

import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { ptBR } from 'date-fns/locale';
import '../../global/calendar.css';


// Configurações de localização (pt-BR)
const locales = {
    'pt-BR': ptBR,
};


const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
});

// Eventos de exemplo
const events = [
    {
        title: 'Reunião com o time',
        start: new Date(2025, 4, 10, 10, 0),
        end: new Date(2025, 4, 10, 11, 30),
        allDay: false,
    },
    {
        title: 'Almoço com cliente',
        start: new Date(2025, 4, 11, 12, 0),
        end: new Date(2025, 4, 11, 13, 0),
    },
];

export default function Agenda() {
    return (
        <>
            <div className="flex h-[99vh] w-full">
                <div className="min-w-2/7 bg-[color:var(--bg-light)] h-full">
                    <div className="h-1/2 px-10 pt-10">
                        <span className="typography-black text-[var(--color-blueDark)] text-3xl ">Próximos eventos</span>
                        <div className="mt-4 flex flex-col gap-4 overflow-y-scroll h-[85%]  scrollbar-thin-gray pr-4"  >
                            <EventDay legenda={"Dia 11, Terça-Feira - Hoje"} />
                            <NextEvent horaEvento="8:45" localEvento="Remoto" nomeEvento="Reunião XPTO" />
                            <NextEvent horaEvento="8:45" localEvento="Remoto" nomeEvento="Reunião XPTO" />
                            <NextEvent horaEvento="8:45" localEvento="Remoto" nomeEvento="Reunião XPTO" />
                            <NextEvent horaEvento="8:45" localEvento="Remoto" nomeEvento="Reunião XPTO" />
                            <NextEvent horaEvento="8:45" localEvento="Remoto" nomeEvento="Reunião XPTO" />
                            <NextEvent horaEvento="8:45" localEvento="Remoto" nomeEvento="Reunião XPTO" />
                        </div>
                    </div>
                    <div className="w-full h-0.5 bg-[color:#d9d9d9]"></div>
                    <div className="h-1/2 px-10 pt-10">
                        <span className="typography-black text-[var(--color-blueDark)] text-3xl ">Categorias</span>
                        <div className="mt-4 flex flex-col gap-4 overflow-y-scroll h-[85%]  scrollbar-thin-gray pr-4">
                            <Category corCategoria="#0093A6" nomeCategoria="Categoria XPTO" qtdEventos='12' />
                        </div>
                    </div>
                </div>
                <div className='bg-white h-screen w-full'>
                    <div className='px-5 pt-24'>
                        <Calendar
                            localizer={localizer}
                            events={events}
                            defaultView="month"
                            views={['month']}
                            style={{ minHeight: 800 }}
                            culture="pt-BR"
                        />
                    </div>
                </div>
            </div>
        </>
    );
}