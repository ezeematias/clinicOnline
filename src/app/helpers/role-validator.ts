import { User } from "../entities/user";

export class RoleValidator {
    isSpecialist(user: User): boolean {
        return user.role === "Specialist";
    }

    isAdmin(user: User): boolean {
        return user.role === "Admin";
    }

    isPatient(user: User): boolean {
        return user.role === "Patient";
    }
}
