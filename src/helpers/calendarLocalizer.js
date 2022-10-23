import { getDay, format, parse, startOfWeek } from 'date-fns';
import { dateFnsLocalizer } from 'react-big-calendar';
import esEs from 'date-fns/locale/es'
import 'react-big-calendar/lib/css/react-big-calendar.css';

const locales = {
    'es': esEs,
}

export const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
})

