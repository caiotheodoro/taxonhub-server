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
exports.routine = exports.checkVersionAndUpdate = void 0;
const node_cron_1 = __importDefault(require("node-cron"));
const types_1 = require("../wfo/enumerators/types");
const repositories_1 = require("../wfo/repositories");
const downloadNewData_1 = require("../wfo/useCases/downloadNewData");
const getDatabaseStatus_1 = require("../wfo/useCases/getDatabaseStatus");
const getVersion_1 = require("../wfo/useCases/getVersion");
const updateDatabase_1 = require("../wfo/useCases/updateDatabase");
const checkVersionAndUpdate = () => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield getVersion_1.getVersionUseCase.execute();
    const datetime = new Date();
    console.log('version check performed at:', datetime);
    console.log('Is updated:', data.isUpdated);
    if (!data.isUpdated && data.versionFromWebsite) {
        yield downloadNewData_1.downloadNewDataUseCase.execute();
        yield updateDatabase_1.updateDatabaseUseCase.execute(data.versionFromWebsite);
    }
    else {
        repositories_1.wfoRepository.updateDatabasePhaseStatus(types_1.EMetaTableValues.stable);
    }
});
exports.checkVersionAndUpdate = checkVersionAndUpdate;
const execute = () => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield getDatabaseStatus_1.getDatabaseStatusUseCase.execute();
    if (data.consistencyStatus.value !== types_1.EMetaTableValues.inUsage &&
        (data.updateStatus.value === types_1.EMetaTableValues.stable ||
            data.updateStatus.value === types_1.EMetaTableValues.needToCheck ||
            data.updateStatus.value === types_1.EMetaTableValues.errorOnUpdate)) {
        yield checkVersionAndUpdate();
    }
});
const routine = node_cron_1.default.schedule('*/20 * * * *', () => __awaiter(void 0, void 0, void 0, function* () {
    yield execute();
}), {
    scheduled: false,
});
exports.routine = routine;
