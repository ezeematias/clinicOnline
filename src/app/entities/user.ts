import { Roles } from "./role";

export class User {
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
    imageUrl: string[] = [];
    specialty?: string[] = [];
    enable: boolean;
    role: Roles;

    constructor(email: string = '', password: string = '', displayName: string = '', photoURL: string = '', name: string = '', lastName: string = '', age: number = 0, dni: string = '', socialWork: string ='',imageUrl: string[] = [], specialty: string[] = [], enable: boolean = false, role: Roles = 'Admin') {
        this.email = email;
        this.password = password;
        this.displayName = displayName;
        this.photoURL = photoURL;
        this.name = name;
        this.lastName = lastName;
        this.age = age;
        this.dni = dni;
        this.socialWork = socialWork;
        this.imageUrl = imageUrl;
        this.specialty = specialty;
        this.enable = enable;
        this.role = role;
    }    
}