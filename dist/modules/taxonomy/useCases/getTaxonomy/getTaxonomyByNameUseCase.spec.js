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
const WfoRepositoryInMemory_1 = require("../../../wfo/repositories/in-memory/WfoRepositoryInMemory");
const TaxonomiesRepositoryInMemory_1 = require("../../repositories/in-memory/TaxonomiesRepositoryInMemory");
let wfoRepositoryInMemory;
let taxonomiesRepositoryInMemory;
describe('Generate out CSV of Taxonomies', () => {
    beforeEach(() => {
        wfoRepositoryInMemory = new WfoRepositoryInMemory_1.WfoRepositoryInMemory();
        taxonomiesRepositoryInMemory = new TaxonomiesRepositoryInMemory_1.TaxonomiesRepositoryInMemory(wfoRepositoryInMemory);
    });
    it('should get the taxonomy by name', () => __awaiter(void 0, void 0, void 0, function* () {
        const taxonomies = yield taxonomiesRepositoryInMemory.getRecordByName('Araucária');
        expect(taxonomies.scientificName).toBe('Araucária');
    }));
    it('should not get taxonomy when not founded', () => __awaiter(void 0, void 0, void 0, function* () {
        const taxonomies = yield taxonomiesRepositoryInMemory.getRecordByName('Foo');
        expect(taxonomies).toBeUndefined();
    }));
});
