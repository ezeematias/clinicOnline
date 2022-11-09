import { Schedule } from "./schedule";

export class ScheduleManagement {
    id?:string;
    specialist?: string;
    specialty?: string;
    schedule: Schedule[] = [];
    timeShift?: number;
}
