export class UserAlreadyExistsError extends Error {
    constructor() {
        super('E-mail já registrado');
        this.name = 'UserAlreadyExistsError';
    }
}