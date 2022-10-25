import { addHours } from 'date-fns';
import { Calendar } from 'react-big-calendar';
import { Navbar, CalendarEvent, CalendarModal, FabAddNew, FabDelete } from '../'
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { getMessagesES, localizer } from '../../helpers';
import { useEffect, useState } from 'react';
import { useUiStore, useCalendarStore, useAuthStore } from '../../hooks';

export const CalendarPage = () => {
    const { user } = useAuthStore();
    const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'week')
    const { openDateModal } = useUiStore();
    const { events, setActiveEvent, startLoadingEvents } = useCalendarStore();

    const eventStyleGetter = (event, start, end, isSelected) => {
        console.log(event);
        const isMyEvent = (user.id === event.user._id) || (user.id === event.user.id);

        const style = {
            backgroundColor: isMyEvent ? '#347CF7' : '#465660',
            borderRadius: '0px',
            opacity: 0.8,
            color: 'white',
        }

        return {
            style
        }
    }

    const onDoubleClick = (event) => {
        openDateModal();
    }

    const onSelect = (event) => {
        setActiveEvent(event);
    }

    const onViewChanged = (event) => {
        localStorage.setItem('lastView', event);
    }

    useEffect(() => {
        startLoadingEvents();
    }, []);


    return (
        <>
            <Navbar />
            <FabAddNew />
            <FabDelete />
            <CalendarModal />

            <Calendar
                culture='es'
                localizer={localizer}
                events={events}
                defaultView={lastView}
                messages={getMessagesES()}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 'calc( 100vh - 80px)' }}
                eventPropGetter={eventStyleGetter}
                components={{
                    event: CalendarEvent
                }}
                onDoubleClickEvent={onDoubleClick}
                onSelectEvent={onSelect}
                onView={onViewChanged}
            />
        </>
    )
}
