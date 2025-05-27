
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
import ModalEventDetails from '../../components/ModalEventDetails';
import FormCreateCategory from '../../components/FormCreateCategory';
import ModalDelete from '../../components/ModalDelete';

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


const apiBaseURL = 'http://localhost:8080/api/';

export default function Agenda() {

    const [currentDate, setCurrentDate] = useState(new Date());
    const [currentView, setCurrentView] = useState('month');
    const [showEventForm, setShowEventForm] = useState(false);
    const [categorias, setCategorias] = useState([]);
    const [events, setEvents] = useState([]);
    const [idEventDetails, setIdEventDetails] = useState(null);
    const [showCategoryForm, setShowCategoryForm] = useState(false);
    const [isEditCategory, setIsEditCategory] = useState(false);
    const [isModalDetailsOpen, setIsModalDetailsOpen] = useState(false);
    const [EditCategoryId, setEditCategoryId] = useState(null);

    const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
    const [idToDelete, setIdToDelete] = useState(null);
    const [deleteItemType, setDeleteItemType] = useState(null);

    const idAdvogado = localStorage.getItem('idAdvogado');


    useEffect(() => {
        if (idAdvogado) {
            fetchData();
        }
    }, [idAdvogado]);

    function fetchData() {
        if (idAdvogado) {
            getCategorias(idAdvogado);
            getEvents(idAdvogado);
        } else {
            toast.error('ID do advogado não encontrado. Por favor, faça login novamente.');
        }
    }
    
    function closeEventForm() {
        setShowEventForm(false);
    }

    function openEventForm() {
        setShowEventForm(true);
    }

    function getCategorias(idAdvogado) {

        const token = localStorage.getItem('token');

        if (!token) {
            toast.error('Token de autenticação não encontrado. Por favor, faça login novamente.');
            return;
        }

        axios.get(apiBaseURL + `categorias/advogado/${idAdvogado}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            }
        })
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
                    editarCategoria={() => {
                        openEditCategoryForm(categoria.idCategoriaEvento)
                    }}
                    key={index}
                    corCategoria={categoria.cor}
                    nomeCategoria={categoria.nomeEvento}
                    qtdEventos={0}
                    excluirCategoria={() => {
                        openModalDelete(categoria.idCategoriaEvento, "categoria");
                    } }
                />
            ));

            return categoriesMap;
        }

        return <></>;
    }
    function getEvents(idAdvogado) {
        const token = localStorage.getItem('token');

        if (!token) {
            toast.error('Token de autenticação não encontrado. Por favor, faça login novamente.');
            return;
        }

        axios.get(apiBaseURL + `eventos/advogado/${idAdvogado}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            }
        })
            .then(response => {
                console.log('Eventos:', response.data);
                const eventsData = adapterEventRequisitionToValidEvent(response.data);
                setEvents(eventsData);
            }).catch(error => {
                toast.error('Erro ao buscar eventos:', error);
            })
    }

    function adapterEventRequisitionToValidEvent(events) {
        try {
            const eventsData = events.map(event => ({
                id: event.idEvento,
                title: event.nome,
                start: new Date(`${event.dataReuniao}T${event.horaInicio}`),
                end: new Date(`${event.dataReuniao}T${event.horaFim}`),
                allDay: false,
                color: event.cor,
            }));

            console.log('Eventos adaptados:', eventsData);

            return eventsData;
        } catch (error) {
            console.error('Erro ao adaptar eventos:', error);
            return [];
        }
    }




    function closeModalDetails() {
        setIsModalDetailsOpen(false);
    }

    function openModalDetails() {
        setIsModalDetailsOpen(true);
    }

    function openEventoDetails(idEvento) {
        console.log('Abrindo modal de detalhes do evento');
        setIdEventDetails(idEvento);
        openModalDetails();
    }

    function closeCategoryForm() {
        setShowCategoryForm(false);
    }

    function openCategoryForm() {
        setShowCategoryForm(true);
    }

    function openModalDelete(id, itemType) {
        setIdToDelete(id);
        setDeleteItemType(itemType);
        
        setIsModalDeleteOpen(true);
    }

    function closeModalDelete() {
        setIsModalDeleteOpen(false);
    }

    function openCreateCategoryForm() {
        setIsEditCategory(false);
        openCategoryForm();
        setEditCategoryId(null);
    }

    function openEditCategoryForm(idCategoria) {
        setIsEditCategory(true);
        openCategoryForm();
        setEditCategoryId(idCategoria);

    }

    

    return (
        <>
            {isModalDeleteOpen && <ModalDelete  onClose={closeModalDelete} idToDelete={idToDelete} itemType={deleteItemType} onDeleteSuccess={fetchData}/>}
            {
                isModalDetailsOpen &&
                <ModalEventDetails onClose={closeModalDetails} idEvento={idEventDetails} />
            }
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
                        <div className='w-full flex justify-between items-center relative'>
                            <span className="typography-black text-[var(--color-blueDark)] text-3xl ">Categorias</span>
                            <CirclePlus className='cursor-pointer' color='#013451' size={30} onClick={openCreateCategoryForm} />
                            <div style={{
                                position: 'absolute',
                                left: 0,
                                zIndex: 40,
                                display: showCategoryForm ? 'block' : 'none'
                            }} >
                                <FormCreateCategory onClose={closeCategoryForm} isEdit={isEditCategory} idCategoria={EditCategoryId} onSuccess={fetchData}/>
                            </div>
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
                                <FormNewEvent onClose={closeEventForm} />
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
                            style={{ height: 800, maxWidth: 1220 }}
                            messages={{
                                month: 'Mês',
                                week: 'Semana',
                                day: 'Dia',
                                today: 'Hoje',
                                previous: 'Anterior',
                                next: 'Próximo',
                            }}

                            onSelectEvent={(event) => {
                                openEventoDetails(event.id);
                            }}
                            eventPropGetter={(event) => {
                                return {
                                    style: {
                                        backgroundColor: event.color || '#c9c9c9BF',
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