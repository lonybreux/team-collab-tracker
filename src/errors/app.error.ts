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

export class UserNotFoundError extends AppError {
    
    constructor(message: string = 'Usuario no encontrado') {
        super(message, 404)
    }
}

export class InvalidVerificationTokenError extends AppError {
    
    constructor(message: string = 'El token de verificación no es válido') {
        super(message, 400)
    }
}


