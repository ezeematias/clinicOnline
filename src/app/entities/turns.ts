import { Status } from "./status";

export class Turns {
    id?: string;
    name?: string;
    nameDate?: string;
    specialist?: string;
    specialistUid?: string;
    specialty?: string;
    patient?: string;
    patientUid?: string;
    date?: Date;
    day?: number;
    dayWeek?: number;
    month?: number;
    hour?: number;
    minutes?: number;
    poll?: string;
    rating?: number;
    status?: Status;
    commentCancel?: string;
    review?: string;
}
