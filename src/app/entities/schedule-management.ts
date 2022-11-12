import { Schedule } from "./schedule";
import { Specialty } from "./specialty";

export class ScheduleManagement {
    id?: string;
    specialist?: string;
    specialty?: Specialty;
    schedule: Schedule[] = [];
    timeShift?: number;
}
