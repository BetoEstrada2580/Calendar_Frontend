import { addHours } from "date-fns";
import { useCalendarStore, useUiStore } from "../../hooks"

const newEvent = {
    title: '',
    notes: '',
    start: new Date(),
    end: addHours(new Date(), 2),
    bgColor: '#fafafa',
    user: {
        _id: '',
        name: ''
    }
}

export const FabAddNew = () => {

    const { openDateModal } = useUiStore();
    const { setActiveEvent } = useCalendarStore();

    const handleClick = () => {
        setActiveEvent(newEvent);
        openDateModal();
    }

    return (
        <button
            className="btn btn-primary fab"
            onClick={handleClick}
        >
            <i className="fas fa-plus"></i>
        </button>
    )
}
