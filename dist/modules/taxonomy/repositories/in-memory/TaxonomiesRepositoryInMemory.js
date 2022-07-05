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
exports.TaxonomiesRepositoryInMemory = void 0;
class TaxonomiesRepositoryInMemory {
    constructor(wfoRepositoryInMemory) {
        this.wfoRepositoryInMemory = wfoRepositoryInMemory;
        this.taxonomies = [{
                taxonID: "1",
                scientificNameID: "1",
                scientificName: "Araucária",
                taxonRank: "Família",
            },
            {
                taxonID: "2",
                scientificNameID: "2",
                scientificName: "Curuba",
                taxonRank: "Família",
            }
        ];
    }
    getRecordByName(scientificName) {
        return __awaiter(this, void 0, void 0, function* () {
            const record = this.taxonomies.find((taxonomy) => taxonomy.scientificName === scientificName);
            return Promise.resolve(record);
        });
    }
}
exports.TaxonomiesRepositoryInMemory = TaxonomiesRepositoryInMemory;
