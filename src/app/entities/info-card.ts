import { Turns } from "./turns";

export class InfoCard {
    patient?:string;
    specialist?:string;
    turns?: Turns[];
    photoUrl?: string;
}
