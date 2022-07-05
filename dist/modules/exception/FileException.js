"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileException = void 0;
class FileException extends Error {
    constructor(status, message) {
        super(message);
        this.status = status;
        this.message = message;
        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.FileException = FileException;
