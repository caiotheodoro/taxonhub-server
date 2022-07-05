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
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetDatabaseStatusUseCase = void 0;
const defaultResponse_1 = require("src/modules/http/defaultResponse");
const httpStatus_1 = require("src/modules/http/httpStatus");
class GetDatabaseStatusUseCase {
    constructor(wfoRepository) {
        this.wfoRepository = wfoRepository;
    }
    execute() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const consistencyStatus = yield this.wfoRepository.getDatabaseConsistencyStatus();
                const updateStatus = yield this.wfoRepository.getDatabaseUpdateStatus();
                return { consistencyStatus, updateStatus };
            }
            catch (e) {
                if (e instanceof Error) {
                    throw new Error(e.message);
                }
            }
            return null;
        });
    }
    executeResponse() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.execute();
                return new defaultResponse_1.DefaultResponse(httpStatus_1.EHttpStatuses.SUCCESS, response);
            }
            catch (e) {
                return new defaultResponse_1.DefaultResponse(httpStatus_1.EHttpStatuses.INTERNAL_SERVER_ERROR, e.message);
            }
        });
    }
}
exports.GetDatabaseStatusUseCase = GetDatabaseStatusUseCase;
