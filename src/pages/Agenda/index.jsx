
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
import { useState } from 'react';
import { NewItemButton } from '../../components/Buttons/NewItemButton';


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
        title: 'Reunião com o time ',
        start: new Date(2025, 4, 10, 10, 0),
        end: new Date(2025, 4, 10, 11, 30),
        allDay: false,
    },
    {
        title: 'Almoço com cliente',
        start: new Date(2025, 4, 11, 12, 0),
        end: new Date(2025, 4, 11, 13, 0),
    },
    {
        title: 'Nome do evento',
        start: new Date(2025, 4, 12, 9, 30),  // 12 de maio de 2025, 09:30
        end: new Date(2025, 4, 12, 14, 0),    // 12 de maio de 2025, 11:00
        allDay: false, // ou true, se for o dia inteiro
    }
];

export default function Agenda() {

    const [currentDate, setCurrentDate] = useState(new Date());
    const [currentView, setCurrentView] = useState('month');


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
                    <div className='px-5 pt-14 flex flex-col gap-4'>
                        <div className='self-end'>
                            <NewItemButton title="Novo evento" />
                        </div>
                        <Calendar
                            localizer={localizer}
                            events={events}
                            date={currentDate}
                            view={currentView}
                            onView={view => setCurrentView(view)}
                            onNavigate={date => setCurrentDate(date)}
                            views={['month', 'day']}
                            culture="pt-BR"
                            style={{ height: 800 }}
                            messages={{
                                month: 'Mês',
                                week: 'Semana',
                                day: 'Dia',
                                today: 'Hoje',
                                previous: 'Anterior',
                                next: 'Próximo',
                            }}
                        />
                    </div>
                </div>
            </div>
        </>
    );
}