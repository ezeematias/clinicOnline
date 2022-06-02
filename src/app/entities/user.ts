export class User {

    email: string;
    password: string;
    displayName: string;
    photoURL: string;

    constructor(email: string = '', password: string = '', displayName: string = '', photoURL: string = '') {
        this.email = email;
        this.password = password;
        this.displayName = displayName;
        this.photoURL = photoURL;
    }
}
