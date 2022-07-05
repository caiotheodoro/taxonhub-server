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
exports.DoSearchController = void 0;
class DoSearchController {
    constructor(doSearchUseCase) {
        this.doSearchUseCase = doSearchUseCase;
    }
    handle(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const { data } = request.body;
            try {
                const result = yield this.doSearchUseCase.execute(data);
                return response.status(200).json({
                    status: 200,
                    data: result,
                });
            }
            catch (error) {
                return response.status(500).json({
                    status: 500,
                    message: error.message,
                });
            }
        });
    }
}
exports.DoSearchController = DoSearchController;
