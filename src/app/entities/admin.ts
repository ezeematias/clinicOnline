export class Admin {

    email: string;
    password: string;
    displayName: string;
    photoURL: string;
    typeUser: string;

    constructor(email: string = '', password: string = '', displayName: string = '', photoURL: string = '') {
        this.email = email;
        this.password = password;
        this.displayName = displayName;
        this.photoURL = photoURL;
        this.typeUser = "Admin";
    }
}
