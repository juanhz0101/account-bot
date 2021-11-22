import { utcToZonedTime, format } from "date-fns-tz"

export const getDate = (): { date: string, hour: string} => {

    const zonedDate = utcToZonedTime (new Date(), 'America/Bogota')
    const date = format (zonedDate, 'dd/MM/yyyy', { timeZone: 'America/Bogota' })
    const hour = format (zonedDate, 'hh:mm:ss aaa', { timeZone: 'America/Bogota' })

    return { date, hour}

}