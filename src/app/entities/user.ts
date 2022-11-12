import { Roles } from "./role";
import { Specialty } from "./specialty";

export class User {
    id?: string;
    uid?: string;
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
    specialty?: Specialty[] = [];
    enable: boolean;
    role: Roles;
    emailVerified?: boolean;
    registerAdmin?: boolean;

    constructor(uid: string = '', email: string = '', password: string = '', displayName: string = '', photoURL: string = '', name: string = '', lastName: string = '', age: number = 0, dni: string = '', socialWork: string = '', imageUrl: string[] = [], specialty: Specialty[] = [], enable: boolean = false, role: Roles = 'Admin', emailVerified: boolean = false, registerAdmin: boolean = false) {
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
        this.emailVerified = emailVerified;
        this.uid = uid;
        this.registerAdmin = registerAdmin;
    }
}