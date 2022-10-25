import { useDispatch, useSelector } from "react-redux"
import Swal from "sweetalert2";
import { calendarApi } from "../api";
import { convertEventsToDateEvents } from "../helpers";
import { onAddNewEvent, onDeleteEvent, onLoadEvents, onSetActiveEvent, onUpdateEvent } from "../store";

export const useCalendarStore = () => {
    const dispatch = useDispatch();
    const { events, activeEvent } = useSelector(state => state.calendar)
    const { user } = useSelector(state => state.auth);

    const setActiveEvent = (calendarEvent) => {
        dispatch(onSetActiveEvent(calendarEvent))
    }

    const startSavingEvent = async (calendarEvent) => {
        // TODO: llegar al backend

        if (calendarEvent.id) {
            //* Actualizando            
            try {
                await calendarApi.put(`/events/${calendarEvent.id}`, calendarEvent);
                dispatch(onUpdateEvent({ ...calendarEvent, user }));
                return true;
            } catch (error) {
                console.log(error);
                return error.response.data?.msg ||
                    Object.values(error.response.data.errors)[0].msg
            }
        } else {
            //* Creando
            try {
                const { data } = await calendarApi.post('/events', calendarEvent);

                dispatch(onAddNewEvent({
                    ...calendarEvent,
                    id: data.evento.id,
                    user
                }));
                return data.ok;
            } catch (error) {
                console.log(error);
                return error.response.data?.msg ||
                    Object.values(error.response.data.errors)[0].msg
            }
        }
    }

    const startDeletingEvent = async () => {
        try {
            await calendarApi.delete(`/events/${activeEvent.id}`);
            dispatch(onDeleteEvent());
            Swal.fire('Eliminado', 'Evento eliminado correctamente', 'success');
        } catch (error) {
            console.log(error);
            Swal.fire('Error al eliminar', error.response.data?.msg ||
                Object.values(error.response.data.errors)[0].msg, 'error');
        }
    }

    const startLoadingEvents = async () => {
        try {
            const { data } = await calendarApi.get('/events');
            const events = convertEventsToDateEvents(data.eventos);
            dispatch(onLoadEvents(events));

        } catch (error) {
            console.log(error);
            return error.response.data?.msg ||
                Object.values(error.response.data.errors)[0].msg

        }
    }

    return {
        //* Propiedades
        activeEvent,
        events,
        hasEventSelected: !!activeEvent?.id,
        //* Metodo
        setActiveEvent,
        startDeletingEvent,
        startLoadingEvents,
        startSavingEvent,
    }
}
