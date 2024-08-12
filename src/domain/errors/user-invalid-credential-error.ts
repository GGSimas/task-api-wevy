export class UserInvalidCredentialsError extends Error {
    constructor() {
        super('Credenciais invalidas');
        this.name = 'UserInvalidCredentialsError'
    }
}