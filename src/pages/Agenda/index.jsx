
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
import { useEffect, useState } from 'react';
import { NewItemButton } from '../../components/Buttons/NewItemButton';
import { CirclePlus } from 'lucide-react';
import { FormNewEvent } from '../../components/FormNewEvent';
import axios from 'axios';
import { toast } from 'react-toastify';

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


const apiBaseURL = 'http://localhost:3001';

export default function Agenda() {

    const [currentDate, setCurrentDate] = useState(new Date());
    const [currentView, setCurrentView] = useState('month');
    const [showEventForm, setShowEventForm] = useState(false);
    const [categorias, setCategorias] = useState([]);
    const [events, setEvents] = useState([]);
    const idAdvogado = localStorage.getItem('idAdvogado') || 1;

    useEffect(() => {
        getCategorias();
        getEvents();
    }, []);

    function closeEventForm() {
        setShowEventForm(false);
    }

    function openEventForm() {
        setShowEventForm(true);
    }

    function getCategorias() {

        axios.get(apiBaseURL + `/categoria_evento?idadvogado=${idAdvogado}`)
            .then(response => {
                console.log('Categorias:', response.data);
                setCategorias(response.data);
            })
            .catch(error => {
                console.error('Erro ao buscar categorias:', error);
            });

    }

    function showCategorias(categorias) {

        if (categorias.length > 0) {
            const categoriesMap = categorias.map((categoria, index) => (
                <Category
                    key={index}
                    corCategoria={categoria.cor}
                    nomeCategoria={categoria.nome}
                    qtdEventos={0}
                />
            ));

            return categoriesMap;
        }

        return <></>;
    }

    function getEvents () {
        axios.get(apiBaseURL + `/evento?idadvogado=${idAdvogado}`)
        .then(response => {
            console.log('Eventos:', response.data);
            const eventsData = response.data.map(event => ({
                id: event.idevento,
                title: event.nome,
                start:  new Date(`${event.data}T${event.hora_inicio}:00`),
                end: new Date(`${event.data}T${event.hora_fim}:00`),
                allDay: true,
                color: event.cor_categoria
            }));
            
            console.log('Eventos:', eventsData);
            setEvents(eventsData);
        }).catch(error => {
            toast.error('Erro ao buscar eventos:', error);
        })
    }
''
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
                        <div className='w-full flex justify-between items-center'>
                            <span className="typography-black text-[var(--color-blueDark)] text-3xl ">Categorias</span>
                            <CirclePlus className='cursor-pointer' color='#013451' size={30} />
                        </div>
                        <div className="mt-4 flex flex-col gap-4 overflow-y-scroll h-[85%]  scrollbar-thin-gray pr-4">
                            {/* <Category corCategoria="#0093A6" nomeCategoria="Categoria XPTO" qtdEventos='12' /> */}
                            {categorias.length > 0 && showCategorias(categorias)}
                        </div>
                    </div>
                </div>
                <div className='bg-white h-screen w-full'>
                    <div className='px-5 pt-14 flex flex-col gap-4'>
                        <div className='self-end relative'>
                            <NewItemButton title="Novo evento" onClick={openEventForm} />
                            <div style={{
                                position: 'absolute',
                                right: 0,
                                top: '5rem', 
                                zIndex: 40,
                                display: showEventForm ? 'block' : 'none'
                            }} >
                                <FormNewEvent onClose={closeEventForm} categorys={categorias} />
                            </div>
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
                            style={{ height: 800 , maxWidth: '100%'}}
                            messages={{
                                month: 'Mês',
                                week: 'Semana',
                                day: 'Dia',
                                today: 'Hoje',
                                previous: 'Anterior',
                                next: 'Próximo',
                            }}
                            eventPropGetter={(event) => {
                                return {
                                    style: {
                                        backgroundColor: event.color || '#e3fcec',
                                        color: '#000',
                                        borderRadius: '4px',
                                        border: 'none',
                                        padding: '2px 4px',
                                    },
                                };
                            }}
                        />
                    </div>
                </div>
            </div>
        </>
    );
}