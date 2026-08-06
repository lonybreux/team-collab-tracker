export class AppError extends Error {
    public readonly statusCode: number

    constructor(message: string, statusCode: number){
        super(message)
        this.statusCode = statusCode
    }
}

export class UserAlreadyExistsError extends AppError {
    constructor(message: string = 'El usuario ya existe') {
        super(message, 409)
    }
}