export class UnauthorizedError extends Error {
    constructor() {
        super('JWT não informado');
        this.name = 'UnauthorizedError';
    }
}