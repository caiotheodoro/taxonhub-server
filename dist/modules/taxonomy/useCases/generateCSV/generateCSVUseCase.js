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
exports.GenerateCSVUseCase = void 0;
const csv_parser_1 = __importDefault(require("csv-parser"));
const fs_1 = __importDefault(require("fs"));
const get_stream_1 = __importDefault(require("get-stream"));
const objects_to_csv_1 = __importDefault(require("objects-to-csv"));
const constants_1 = require("src/modules/config/constants");
const defaultResponse_1 = require("src/modules/http/defaultResponse");
const httpStatus_1 = require("src/modules/http/httpStatus");
const types_1 = require("src/modules/wfo/enumerators/types");
const headers = ['binomialName'];
class GenerateCSVUseCase {
    constructor(getTaxonomyByNameUseCase, wfoRepository) {
        this.getTaxonomyByNameUseCase = getTaxonomyByNameUseCase;
        this.wfoRepository = wfoRepository;
    }
    execute(entryDataPath, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const columnNames = 'Nome pesquisado,' +
                'Nome retornado,' +
                'Nome aceito/sinonimo,' +
                'Sinônimo de,' +
                'Base de dados(FDB/TPL(WFO)),' +
                'Família respectiva da base de dados\n';
            const fileId = userId;
            const outputFilePath = `${constants_1.FILES_FOLDER}${fileId}-taxonomy.csv`;
            fs_1.default.writeFile(outputFilePath, columnNames, (err) => {
                if (err) {
                    console.log(err);
                }
            });
            const data = yield get_stream_1.default.array(fs_1.default
                .createReadStream(entryDataPath)
                .pipe((0, csv_parser_1.default)({ headers, skipLines: 1 })));
            yield data.reduce((promise, line) => __awaiter(this, void 0, void 0, function* () {
                yield promise;
                const { binomialName } = line;
                const returnedSpecies = yield this.getTaxonomyByNameUseCase.execute(binomialName);
                const colletionOfSpecies = [];
                returnedSpecies.forEach((species) => {
                    colletionOfSpecies.push(species);
                });
                const csv = new objects_to_csv_1.default(colletionOfSpecies);
                yield csv.toDisk(outputFilePath, {
                    append: true,
                });
            }), Promise.resolve());
            return outputFilePath;
        });
    }
    executeResponse(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            this.wfoRepository.updateDatabaseConsistencyStatus(types_1.EMetaTableValues.inUsage);
            const binomialNames = `${constants_1.FILES_FOLDER}${userId}-binomialNames.csv`;
            const path = yield this.execute(binomialNames, userId);
            this.wfoRepository.updateDatabaseConsistencyStatus(types_1.EMetaTableValues.consistent);
            return new defaultResponse_1.DefaultResponse(httpStatus_1.EHttpStatuses.SUCCESS, path);
        });
    }
}
exports.GenerateCSVUseCase = GenerateCSVUseCase;
