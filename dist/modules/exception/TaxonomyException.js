"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaxonomyException = void 0;
class TaxonomyException extends Error {
    constructor(status, message) {
        super(message);
        this.status = status;
        this.message = message;
        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.TaxonomyException = TaxonomyException;
