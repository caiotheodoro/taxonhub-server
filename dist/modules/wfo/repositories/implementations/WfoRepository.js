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
exports.WfoRepository = void 0;
const types_1 = require("../../enumerators/types");
class WfoRepository {
    constructor(prismaClient) {
        this.prismaClient = prismaClient;
    }
    getRecordByName(scientificName) {
        return __awaiter(this, void 0, void 0, function* () {
            const record = yield this.prismaClient.record.findFirst({
                where: {
                    scientificName,
                },
            });
            return record;
        });
    }
    getRecordsByName(scientificName) {
        return __awaiter(this, void 0, void 0, function* () {
            const record = yield this.prismaClient.record.findMany({
                where: {
                    scientificName: {
                        contains: scientificName,
                    },
                },
            });
            return record;
        });
    }
    getManyRecordsByName(scientificNames) {
        return __awaiter(this, void 0, void 0, function* () {
            const records = yield this.prismaClient.record.findMany({
                where: {
                    scientificName: {
                        in: scientificNames,
                    },
                },
            });
            return records;
        });
    }
    getRecord(taxonID) {
        return __awaiter(this, void 0, void 0, function* () {
            const record = yield this.prismaClient.record.findUnique({
                where: {
                    taxonID,
                },
            });
            return record;
        });
    }
    dropRecordTable() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.prismaClient.record.deleteMany({});
        });
    }
    saveRecord(data) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.prismaClient.record.create({
                data: Object.assign({}, data),
            });
        });
    }
    updateRecord(data) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.prismaClient.record.update({
                where: {
                    taxonID: data.taxonID,
                },
                data: Object.assign({}, data),
            });
        });
    }
    updateVersion(version) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.prismaClient.meta.update({
                where: {
                    key: types_1.EMetaTableKeys.currentDatabaseVersion,
                },
                data: {
                    value: version,
                },
            });
        });
    }
    saveVersion(version) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield this.prismaClient.meta.create({
                data: {
                    key: types_1.EMetaTableKeys.currentDatabaseVersion,
                    value: version,
                },
            });
            return data;
        });
    }
    getSavedVersion() {
        return __awaiter(this, void 0, void 0, function* () {
            let data = yield this.prismaClient.meta.findUnique({
                where: {
                    key: types_1.EMetaTableKeys.currentDatabaseVersion,
                },
            });
            if (!data) {
                data = yield this.saveVersion('please update!');
            }
            return data.value;
        });
    }
    updateMeta(key, value) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.prismaClient.meta.update({
                where: {
                    key,
                },
                data: {
                    value,
                },
            });
        });
    }
    saveMeta(key, value) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield this.prismaClient.meta.create({
                data: {
                    key,
                    value,
                },
            });
            return data;
        });
    }
    updateDatabasePhaseStatus(status) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield this.getDatabaseUpdateStatus();
            yield this.updateMeta(data.key, status);
        });
    }
    updateDatabaseConsistencyStatus(status) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield this.getDatabaseConsistencyStatus();
            yield this.prismaClient.meta.update({
                where: {
                    key: data.key,
                },
                data: {
                    value: status,
                },
            });
        });
    }
    // dbConsistencyStatus is if the database is good for read or not (for the final user)
    // dbUpdateStatus is if the database has been updated (for the system)
    getDatabaseConsistencyStatus() {
        return __awaiter(this, void 0, void 0, function* () {
            let dbConsistencyStatus = yield this.prismaClient.meta.findUnique({
                where: {
                    key: types_1.EMetaTableKeys.databaseConsistencyStatus,
                },
            });
            if (!dbConsistencyStatus) {
                dbConsistencyStatus = yield this.saveMeta(types_1.EMetaTableKeys.databaseConsistencyStatus, types_1.EMetaTableValues.consistent);
            }
            return dbConsistencyStatus;
        });
    }
    getDatabaseUpdateStatus() {
        return __awaiter(this, void 0, void 0, function* () {
            let dbUpdateStatus = yield this.prismaClient.meta.findUnique({
                where: {
                    key: types_1.EMetaTableKeys.databasePhaseStatus,
                },
            });
            if (!dbUpdateStatus) {
                dbUpdateStatus = yield this.saveMeta(types_1.EMetaTableKeys.databasePhaseStatus, types_1.EMetaTableValues.stable);
            }
            return dbUpdateStatus;
        });
    }
}
exports.WfoRepository = WfoRepository;
