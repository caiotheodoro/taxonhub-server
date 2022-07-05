"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WfoRepositoryInMemory = void 0;
class WfoRepositoryInMemory {
    constructor() {
        this.dados = [{
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
        this.version = "v.2022.04";
        this.status = "valid";
        this.consistencyStatus = 'true';
    }
    getSavedVersion() {
        return Promise.resolve(this.version);
    }
    updateVersion(version) {
        this.version = version;
        return;
    }
    getRecord(taxonID) {
        let record = this.dados.find((record) => record.taxonID === taxonID);
        return Promise.resolve(record);
    }
    getRecordByName(scientificName) {
        const record = this.dados.find((taxonomy) => taxonomy.scientificName === scientificName);
        return Promise.resolve(record);
    }
    getRecordsByName(scientificName) {
        let records = this.dados.filter((record) => record.scientificName === scientificName);
        return Promise.resolve(records);
    }
    saveRecord(data) {
        this.dados.push(data);
        return Promise.resolve();
    }
    updateRecord(data) {
        if (data) {
            let index = this.dados.findIndex((record) => record.taxonID === data.taxonID);
            this.dados[index] = data;
        }
        return Promise.resolve();
    }
    dropRecordTable() {
        let records = [];
        this.dados = records;
        return Promise.resolve();
    }
    updateDatabasePhaseStatus(status) {
        this.status = status;
        return Promise.resolve();
    }
    updateDatabaseConsistencyStatus(status) {
        this.consistencyStatus = status;
        return Promise.resolve();
    }
    getDatabaseConsistencyStatus() {
        return Promise.resolve({
            key: "consistencyStatus",
            value: this.consistencyStatus,
        });
    }
    getDatabaseUpdateStatus() {
        return Promise.resolve({
            key: "status",
            value: this.status,
        });
    }
    getManyRecordsByName() {
        return;
    }
    saveVersion() {
        return;
    }
    updateMeta() {
        return;
    }
    saveMeta() {
        return;
    }
}
exports.WfoRepositoryInMemory = WfoRepositoryInMemory;
