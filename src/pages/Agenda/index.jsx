
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
import { toast } from 'react-toastify';
import ModalEventDetails from '../../components/ModalEventDetails';
import FormCreateCategory from '../../components/FormCreateCategory';
import ModalDelete from '../../components/ModalDelete';
import api from "../../services/api";

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

    const [nextEvents, setNextEvents] = useState([]);
    const [showEditForm, setShowEditForm] = useState(false);
    const [idEventoEdit, setIdEventoEdit] = useState(null);

    const idAdvogado = localStorage.getItem('idAdvogado');

    useEffect(() => {
        if (idAdvogado) {
            fetchData();
        }
    }, [idAdvogado]);

    function fetchData() {
        if (idAdvogado) {
            api.getCategorias(idAdvogado)
                .then((response) => {
                    setCategorias(response.data);
                })
                .catch((error) => {
                    toast.error("Erro ao buscar categorias:", error);
                });


            api.getEvents(idAdvogado)
                .then((response) => {
                    setEvents(response.data);
                })
                .catch((error) => {
                    toast.error("Erro ao buscar eventos:", error);
                });

            api.getEventsNext7days(idAdvogado)
                .then((response) => {
                    console.log('Eventos próximos:', response.data);
                    setNextEvents(response.data);
                })
                .catch((error) => {
                    toast.error("Erro ao buscar eventos próximos:", error);
                });

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

    function showCategorias(categorias) {
        if (categorias.length > 0) {
            const categoriesMap = categorias.map((categoria, index) => (
                <Category
                    editarCategoria={() => {
                        openEditCategoryForm(categoria.idCategoria)
                    }}
                    key={index}
                    corCategoria={categoria.cor}
                    nomeCategoria={categoria.nome}
                    qtdEventos={0}
                    excluirCategoria={() => {
                        openModalDelete(categoria.idCategoria, "categoria");
                    }}
                />
            ));

            return categoriesMap;
        }

        return <></>;
    }

    function adapterEventRequisitionToValidEvent(events) {
        try {
            const eventsData = events.map(event => {
                const categoria = categorias.find(cat => cat.idCategoria === event.categoria);
                const dataReuniao = event.dataReuniao.split('T')[0];

                return {
                    id: event.idEvento,
                    title: event.nome,
                    start: new Date(`${dataReuniao}T${event.horaInicio}`),
                    end: new Date(`${dataReuniao}T${event.horaFim}`),
                    allDay: false,
                    color: categoria?.cor ? categoria.cor : '#c9c9c9BF',
                };
            });

            console.log('Eventos adaptados:', eventsData);

            return eventsData;
        } catch (error) {
            console.error('Erro ao adaptar eventos:', error);
            return [];
        }
    }


    function formatarLegenda(dataStr) {
        const hoje = new Date();
        const [ano, mes, dia] = dataStr.split('T')[0].split("-");
        const data = new Date(Number(ano), Number(mes) - 1, Number(dia)); // Corrigido

        const ehHoje = data.toDateString() === hoje.toDateString();

        const legenda =
            `Dia ${data.getDate()}, ${data.toLocaleDateString("pt-BR", {
                weekday: "long",
            })}${ehHoje ? " - Hoje" : ""}`;

        return legenda.charAt(0).toUpperCase() + legenda.slice(1);
    }

    const eventosPorDia = nextEvents.reduce((acc, evento) => {
        const data = evento.dataReuniao;
        if (!acc[data]) acc[data] = [];
        acc[data].push(evento);
        return acc;
    }, {});


    const datasOrdenadas = Object.keys(eventosPorDia).sort();


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

    function openModalEdit() {
        setShowEditForm(true);
    }

    function closeModalEdit() {
        setShowEditForm(false)
    }

    return (
        <>
            {isModalDeleteOpen && <ModalDelete onClose={closeModalDelete} idToDelete={idToDelete} itemType={deleteItemType} onDeleteSuccess={fetchData} />}
            {
                isModalDetailsOpen &&
                <ModalEventDetails onClose={closeModalDetails} idEvento={idEventDetails} onDeleteSuccess={fetchData} />
            }
            {
                showEditForm &&
                <>
                    <div className="fixed inset-0 bg-black opacity-40 z-[998]" onClick={closeModalEdit}></div>
                    <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col gap-4 items-center z-[999]">
                        <FormNewEvent onClose={closeModalEdit} isEdit={true} idEvento={idEventoEdit} onEditSuccess={fetchData} />
                    </div>|
                </>
            }
            <div className="flex h-[99vh] w-full">
                <div className="min-w-2/7 bg-[color:var(--bg-light)] h-full">
                    <div className="h-1/2 px-10 pt-10">
                        <span className="typography-black text-[var(--color-blueDark)] text-3xl ">Eventos da semana</span>
                        <div className="mt-4 flex flex-col gap-4 overflow-y-scroll h-[85%]  scrollbar-thin-gray pr-4"  >
                            {datasOrdenadas.map((data) => (
                                <>
                                    <EventDay legenda={formatarLegenda(data)} />
                                    {eventosPorDia[data].map((evento) => (
                                        <NextEvent
                                            onEditClick={() => {
                                                setIdEventoEdit(evento.idEvento);
                                                openModalEdit();
                                            }}
                                            onDeleteClick={() => openModalDelete(evento.idEvento, "evento")}
                                            key={evento.idEvento}
                                            horaEvento={evento.horaInicio.slice(0, 5)}
                                            localEvento={evento.local || "Remoto"}
                                            nomeEvento={evento.nome}
                                        />
                                    ))}
                                </>
                            ))}
                        </div>
                    </div>
                    <div className="w-full h-0.5 bg-[color:#d9d9d9]"></div>
                    <div className="h-1/2 px-10 pt-10">
                        <div className='w-full flex justify-between items-center relative'>
                            <span className="typography-black text-[var(--color-blueDark)] text-3xl ">Categorias</span>
                            <CirclePlus className='cursor-pointer' color='#013451' size={30} onClick={openCreateCategoryForm} />
                            <div style={{
                                position: 'absolute',
                                left: "105%",
                                top: "10%",
                                zIndex: 40,
                                display: showCategoryForm ? 'block' : 'none'
                            }} >
                                <FormCreateCategory onClose={closeCategoryForm} isEdit={isEditCategory} idCategoria={EditCategoryId} onSuccess={fetchData} />
                            </div>
                        </div>
                        <div className="mt-4 flex flex-col gap-4 overflow-y-scroll h-[85%]  scrollbar-thin-gray pr-4">
                            {/* <Category corCategoria="#0093A6" nomeCategoria="Categoria XPTO" qtdEventos='12' /> */}
                            {categorias && categorias.length > 0 && showCategorias(categorias)}
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
                                <FormNewEvent onSuccess={fetchData} onClose={closeEventForm} />
                            </div>
                        </div>
                        <Calendar
                            localizer={localizer}
                            events={adapterEventRequisitionToValidEvent(events)}
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