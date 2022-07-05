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
const WfoRepositoryInMemory_1 = require("../../repositories/in-memory/WfoRepositoryInMemory");
let wfoRepositoryInMemory;
describe('Generate out CSV of Taxonomies', () => {
    beforeEach(() => {
        wfoRepositoryInMemory = new WfoRepositoryInMemory_1.WfoRepositoryInMemory();
    });
    it('should get the wfo record by name', () => __awaiter(void 0, void 0, void 0, function* () {
        const wfo = yield wfoRepositoryInMemory.getRecordByName('Araucária');
        expect(wfo.scientificName).toBe('Araucária');
    }));
    it('should not get wfo record when not founded', () => __awaiter(void 0, void 0, void 0, function* () {
        const wfo = yield wfoRepositoryInMemory.getRecordByName('Foo');
        expect(wfo).toBeUndefined();
    }));
    it("should get saved version of wfo record", () => __awaiter(void 0, void 0, void 0, function* () {
        const version = yield wfoRepositoryInMemory.getSavedVersion();
        expect(version).toBe('v.2022.04');
    }));
    it("should update the saved version of wfo record", () => __awaiter(void 0, void 0, void 0, function* () {
        yield wfoRepositoryInMemory.updateVersion('v.2022.05');
        const version = yield wfoRepositoryInMemory.getSavedVersion();
        expect(version).toBe('v.2022.05');
    }));
    it("should get record by taxonId", () => __awaiter(void 0, void 0, void 0, function* () {
        const record = yield wfoRepositoryInMemory.getRecord('1');
        expect(record.taxonID).toBe('1');
    }));
    it("should get records by scientific name", () => __awaiter(void 0, void 0, void 0, function* () {
        const records = yield wfoRepositoryInMemory.getRecordsByName('Araucária');
        expect(records.length).toBe(1);
    }));
    it("should save record", () => __awaiter(void 0, void 0, void 0, function* () {
        const record = {
            taxonID: '3',
            scientificNameID: '3',
            scientificName: 'Araucária',
            taxonRank: 'Família',
        };
        yield wfoRepositoryInMemory.saveRecord(record);
        const records = yield wfoRepositoryInMemory.getRecordsByName('Araucária');
        expect(records.length).toBe(2);
    }));
    it("should update record", () => __awaiter(void 0, void 0, void 0, function* () {
        const record = {
            taxonID: '1',
            scientificNameID: '1',
            scientificName: 'Teste',
            taxonRank: 'Família',
        };
        yield wfoRepositoryInMemory.updateRecord(record);
        const records = yield wfoRepositoryInMemory.getRecordsByName('Teste');
        expect(records.length).toBe(1);
    }));
    it("shoukd drop records", () => __awaiter(void 0, void 0, void 0, function* () {
        yield wfoRepositoryInMemory.dropRecordTable();
        const records = yield wfoRepositoryInMemory.getRecordsByName('Teste');
        expect(records.length).toBe(0);
    }));
    it("shoukd update database phase status", () => __awaiter(void 0, void 0, void 0, function* () {
        yield wfoRepositoryInMemory.updateDatabasePhaseStatus('phase1');
        const status = yield wfoRepositoryInMemory.getDatabaseUpdateStatus();
        expect(status.value).toBe('phase1');
    }));
    it("should update database consistency status", () => __awaiter(void 0, void 0, void 0, function* () {
        yield wfoRepositoryInMemory.updateDatabaseConsistencyStatus('consistent');
        const status = yield wfoRepositoryInMemory.getDatabaseConsistencyStatus();
        expect(status.value).toBe('consistent');
    }));
    it("should not getManyRecordsByName, saveVersion, updateMeta or saveMeta without context", () => __awaiter(void 0, void 0, void 0, function* () {
        expect(wfoRepositoryInMemory.getManyRecordsByName()).toBeUndefined();
        expect(wfoRepositoryInMemory.saveVersion()).toBeUndefined();
        expect(wfoRepositoryInMemory.updateMeta()).toBeUndefined();
        expect(wfoRepositoryInMemory.saveMeta()).toBeUndefined();
    }));
});
