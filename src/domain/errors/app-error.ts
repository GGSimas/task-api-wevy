export class AppError extends Error {
    constructor() {
        super('Erro interno do servidor. Tente novamente mais tarde!');
        this.name = 'AppError'
    }
}