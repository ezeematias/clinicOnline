import { Roles } from "./role";

export interface Iuser {
    id?: string;
    email: string;
    password: string;
    displayName: string;
    photoURL: string;
    name: string;
    lastName: string;
    age: number;
    dni: string;
    socialWork?: string;
    imageUrl: string[];
    specialty?: string[];
    enable: boolean;
    role: Roles;
}
