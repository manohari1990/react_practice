export class AppError extends Error{
    constructor(statusCode, message, error){
        super(message);
        this.statusCode = statusCode
        this.error = error
    }
}