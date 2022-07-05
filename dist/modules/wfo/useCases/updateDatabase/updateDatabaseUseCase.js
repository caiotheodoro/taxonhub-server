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
exports.UpdateDatabaseUseCase = void 0;
const csv_parser_1 = __importDefault(require("csv-parser"));
const fs_1 = __importDefault(require("fs"));
const constants_1 = require("../../constants");
const types_1 = require("../../enumerators/types");
const headers = [
    'taxonID',
    'scientificNameID',
    'localID',
    'scientificName',
    'taxonRank',
    'parentNameUsageID',
    'scientificNameAuthorship',
    'family',
    'subfamily',
    'tribe',
    'subtribe',
    'genus',
    'subgenus',
    'specificEpithet',
    'infraspecificEpithet',
    'verbatimTaxonRank',
    'nomenclaturalStatus',
    'namePublishedIn',
    'taxonomicStatus',
    'acceptedNameUsageID',
    'originalNameUsageID',
    'nameAccordingToID',
    'taxonRemarks',
    'created',
    'modified',
    'references',
    'source',
    'majorGroup',
    'tplId',
];
class UpdateDatabaseUseCase {
    constructor(wfoRepository) {
        this.wfoRepository = wfoRepository;
    }
    updateDatabase(path) {
        return __awaiter(this, void 0, void 0, function* () {
            yield new Promise((resolve, reject) => {
                const readStream = fs_1.default.createReadStream(path);
                readStream
                    .pipe((0, csv_parser_1.default)({
                    separator: '\t',
                    skipLines: 1,
                    escape: '',
                    quote: '',
                    headers,
                }))
                    .on('data', (row) => __awaiter(this, void 0, void 0, function* () {
                    try {
                        const data = Object.assign({}, row);
                        if (data.taxonID === undefined ||
                            data.taxonID === null) {
                            return;
                        }
                        yield this.wfoRepository.saveRecord(data);
                    }
                    catch (err) {
                        reject(new Error('Some error occurred.'));
                    }
                }))
                    .on('end', () => {
                    resolve('');
                });
            });
        });
    }
    setDatabaseStatusOnUpdate() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.wfoRepository.updateDatabaseConsistencyStatus(types_1.EMetaTableValues.inconsistent);
            yield this.wfoRepository.updateDatabasePhaseStatus(types_1.EMetaTableValues.unstable);
        });
    }
    execute(newVersion) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.setDatabaseStatusOnUpdate();
            yield this.wfoRepository.dropRecordTable();
            try {
                yield this.updateDatabase(constants_1.pathToDataFile);
                yield this.wfoRepository.updateVersion(newVersion);
                yield this.wfoRepository.updateDatabaseConsistencyStatus(types_1.EMetaTableValues.consistent);
                yield this.wfoRepository.updateDatabasePhaseStatus(types_1.EMetaTableValues.stable);
            }
            catch (_a) {
                yield this.wfoRepository.updateVersion(types_1.EMetaTableValues.errorOnUpdate);
                yield this.wfoRepository.updateDatabasePhaseStatus(types_1.EMetaTableValues.errorOnUpdate);
            }
        });
    }
}
exports.UpdateDatabaseUseCase = UpdateDatabaseUseCase;
