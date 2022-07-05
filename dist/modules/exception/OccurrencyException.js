"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OccurrencyException = void 0;
class OccurrencyException extends Error {
    constructor(status, message) {
        super(message);
        this.status = status;
        this.message = message;
        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.OccurrencyException = OccurrencyException;
