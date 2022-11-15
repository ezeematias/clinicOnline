import { Status } from "./status";

export class Turns {
    id?: string;
    name?: string;
    specialist?: string;
    specialty?: string;
    patient?: string;
    date?: Date;
    day?: number;
    dayWeek?: number;
    month?: number;
    hour?: number;
    minutes?: number;
    poll?: string;
    rating?: number;
    status?: Status;
}
