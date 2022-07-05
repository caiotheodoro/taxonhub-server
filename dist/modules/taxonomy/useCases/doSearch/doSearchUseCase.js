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
exports.DoSearchUseCase = void 0;
class DoSearchUseCase {
    constructor(taxonomiesRepository) {
        this.taxonomiesRepository = taxonomiesRepository;
    }
    execute(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                const taxonomies = [];
                data.forEach((line) => __awaiter(this, void 0, void 0, function* () {
                    taxonomies.push(yield this.taxonomiesRepository.getRecordByName(line.name1), yield this.taxonomiesRepository.getRecordByName(line.name2));
                }));
                resolve(taxonomies);
            });
        });
    }
}
exports.DoSearchUseCase = DoSearchUseCase;
