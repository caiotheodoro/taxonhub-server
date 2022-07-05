"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImportBinomialNameCSVUseCase = void 0;
const csv_parser_1 = __importDefault(require("csv-parser"));
const fs_1 = __importDefault(require("fs"));
const FileException_1 = require("src/modules/exception/FileException");
const defaultResponse_1 = require("src/modules/http/defaultResponse");
const httpStatus_1 = require("src/modules/http/httpStatus");
class ImportBinomialNameCSVUseCase {
    execute(file) {
        return __awaiter(this, void 0, void 0, function* () {
            const stream = fs_1.default.createReadStream(file.path);
            try {
                if (fs_1.default.statSync(file.path).size === 0) {
                    throw new FileException_1.FileException(httpStatus_1.EHttpStatuses.BAD_REQUEST, 'File must not be empty');
                }
            }
            catch (e) {
                if (e instanceof FileException_1.FileException) {
                    return new defaultResponse_1.DefaultResponse(e.status, {
                        correct: false,
                        message: e.message,
                    });
                }
            }
            const incorrectNames = [];
            try {
                yield new Promise((resolve, reject) => {
                    stream
                        .pipe((0, csv_parser_1.default)())
                        .on('data', (row) => {
                        const name = row;
                        if (!this.parseLine(name)) {
                            incorrectNames.push(name.BinomialName);
                        }
                    })
                        .on('error', () => {
                        reject(new FileException_1.FileException(httpStatus_1.EHttpStatuses.INTERNAL_SERVER_ERROR, 'Error on file import'));
                    })
                        .on('end', () => {
                        resolve('');
                    });
                });
            }
            catch (_a) {
                return new defaultResponse_1.DefaultResponse(httpStatus_1.EHttpStatuses.INTERNAL_SERVER_ERROR, {
                    correct: incorrectNames.length === 0,
                    incorrectNames,
                });
            }
            return new defaultResponse_1.DefaultResponse(httpStatus_1.EHttpStatuses.SUCCESS, {
                correct: incorrectNames.length === 0,
                incorrectNames,
            });
        });
    }
    onlyLetters(str) {
        return /^[a-zA-Z\s]+$/.test(str);
    }
    parseLine(line) {
        const count = (line.BinomialName.match(/ /g) || []).length;
        return this.onlyLetters(line.BinomialName) && count === 1;
    }
}
exports.ImportBinomialNameCSVUseCase = ImportBinomialNameCSVUseCase;
