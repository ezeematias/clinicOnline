export class Specialist {
    id?: string;
    email: string;
    password: string;
    displayName: string;
    photoURL: string;
    name: string;
    lastName: string;
    age: number;
    dni: string;
    imageUrl: string;
    specialist: string[] = [];
    enable: boolean;

    constructor(email: string = '', password: string = '', displayName: string = '', photoURL: string = '', name: string = '', lastName: string = '', age: number = 0, dni: string = '', imageUrl: string = '', specialist: string = '', enable: boolean = false) {
        this.email = email;
        this.password = password;
        this.displayName = displayName;
        this.photoURL = photoURL;
        this.name = name;
        this.lastName = lastName;
        this.age = age;
        this.dni = dni;
        this.imageUrl = imageUrl;
        this.specialist.push(specialist);
        this.enable = enable;
    }
}
