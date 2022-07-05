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
exports.GetOccurrencyUseCase = void 0;
const csv_parser_1 = __importDefault(require("csv-parser"));
const fs_1 = __importDefault(require("fs"));
const get_stream_1 = __importDefault(require("get-stream"));
const objects_to_csv_1 = __importDefault(require("objects-to-csv"));
const constants_1 = require("../../../config/constants");
const OccurrencyException_1 = require("../../../exception/OccurrencyException");
const defaultResponse_1 = require("../../../http/defaultResponse");
const gbifClient_1 = require("../../../http/gbifClient");
const httpStatus_1 = require("../../../http/httpStatus");
const types_1 = require("../../../model/enumerators/types");
const headers = ['binomialName'];
const sleep = (ms) => new Promise((r) => {
    setTimeout(r, ms);
});
class GetOccurrencyUseCase {
    execute(entryDataPath, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const columnNames = 'nome de entrada,' +
                'nome encontrado,' +
                'nome aceito,' +
                'base de dados,' +
                'familia,' +
                'pais,' +
                'ano,' +
                'mes,' +
                'dia,' +
                'latitude,' +
                'longitude\n';
            const fileId = userId;
            const outputFilePath = `${constants_1.FILES_FOLDER}${fileId}-occurrency.csv`;
            fs_1.default.writeFile(outputFilePath, columnNames, (err) => {
                if (err) {
                    throw new OccurrencyException_1.OccurrencyException(httpStatus_1.EHttpStatuses.INTERNAL_SERVER_ERROR, 'FILE ERROR');
                }
            });
            const data = yield get_stream_1.default.array(fs_1.default
                .createReadStream(entryDataPath)
                .pipe((0, csv_parser_1.default)({ headers, skipLines: 1 })));
            yield data.reduce((promise, line) => __awaiter(this, void 0, void 0, function* () {
                yield promise;
                const { binomialName } = line;
                const limit = 300;
                const count = yield this.getCount(binomialName);
                const resultPromise = [];
                for (let offset = 0; offset < count; offset += limit) {
                    resultPromise.push(this.getDataFromGbifAPI(offset, limit, binomialName));
                }
                const result = yield Promise.all(resultPromise);
                const allData = result.flat();
                const csv = new objects_to_csv_1.default(allData);
                yield csv.toDisk(outputFilePath, {
                    append: true,
                });
            }), Promise.resolve());
            return outputFilePath;
        });
    }
    getDataFromGbifAPI(offset, limit, binomialName) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield sleep(offset);
                const { data: { results }, } = yield gbifClient_1.GBIF_OCCURENCE_API.get('/search', {
                    params: {
                        scientificName: binomialName,
                        offset,
                        limit,
                    },
                });
                if (!results) {
                    yield sleep(offset);
                    return this.getDataFromGbifAPI(offset, limit, binomialName);
                }
                return results
                    .filter((result) => result.decimalLatitude && result.decimalLongitude)
                    .filter((result) => result.decimalLatitude !== 0 &&
                    result.decimalLongitude !== 0)
                    .map((result) => ({
                    entryName: binomialName,
                    foundName: result.scientificName,
                    acceptedName: result.acceptedScientificName,
                    dataset: types_1.EDataset.GBIF,
                    family: result.family,
                    country: result.country,
                    year: result.year,
                    month: result.month,
                    day: result.day,
                    latitude: result.decimalLatitude,
                    longitude: result.decimalLongitude,
                }));
            }
            catch (_a) {
                throw new OccurrencyException_1.OccurrencyException(httpStatus_1.EHttpStatuses.INTERNAL_SERVER_ERROR, 'Error during occurrency proccess');
            }
        });
    }
    getCount(binomialName) {
        return __awaiter(this, void 0, void 0, function* () {
            const { data: { count }, } = yield gbifClient_1.GBIF_OCCURENCE_API.get('/search', {
                params: {
                    scientificName: binomialName,
                    limit: 1,
                },
            });
            return count;
        });
    }
    executeResponse(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const binomialNames = `${constants_1.FILES_FOLDER}${userId}-binomialNames.csv`;
            try {
                const path = yield this.execute(binomialNames, userId);
                return new defaultResponse_1.DefaultResponse(httpStatus_1.EHttpStatuses.SUCCESS, path);
            }
            catch (e) {
                if (e instanceof OccurrencyException_1.OccurrencyException) {
                    return new defaultResponse_1.DefaultResponse(e.status, e.message);
                }
                return new defaultResponse_1.DefaultResponse(httpStatus_1.EHttpStatuses.INTERNAL_SERVER_ERROR, 'Unexpected error');
            }
        });
    }
}
exports.GetOccurrencyUseCase = GetOccurrencyUseCase;
