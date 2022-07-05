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
const csv_parser_1 = __importDefault(require("csv-parser"));
const fs_1 = __importDefault(require("fs"));
const get_stream_1 = __importDefault(require("get-stream"));
const WfoRepositoryInMemory_1 = require("../../../wfo/repositories/in-memory/WfoRepositoryInMemory");
const TaxonomiesRepositoryInMemory_1 = require("../../repositories/in-memory/TaxonomiesRepositoryInMemory");
let wfoRepositoryInMemory;
let taxonomiesRepositoryInMemory;
let getTaxonomyByNameUseCase;
describe('Generate out CSV of Taxonomies', () => {
    beforeEach(() => {
        wfoRepositoryInMemory = new WfoRepositoryInMemory_1.WfoRepositoryInMemory();
        taxonomiesRepositoryInMemory = new TaxonomiesRepositoryInMemory_1.TaxonomiesRepositoryInMemory(wfoRepositoryInMemory);
    });
    it('should generate the CSV', () => __awaiter(void 0, void 0, void 0, function* () {
        const headers = 'Nome pesquisado,' +
            'Nome retornado,' +
            'Nome aceito/sinonimo,' +
            'Sinônimo de,' +
            'Base de dados(FDB/TPL(WFO)),' +
            'Família respectiva da base de dados\n';
        const fileId = 'teste';
        const outputFilePath = `./tmp/${fileId}.csv`;
        fs_1.default.writeFile(outputFilePath, headers, (err) => {
            if (err) {
                console.log(err);
            }
        });
        expect(fs_1.default.existsSync(outputFilePath)).toBeTruthy();
    }));
    it('should generate the CSV with proper headers', () => __awaiter(void 0, void 0, void 0, function* () {
        const parser = '';
        const headers = 'Nome pesquisado,' +
            'Nome retornado,' +
            'Nome aceito/sinonimo,' +
            'Sinônimo de,' +
            'Base de dados(FDB/TPL(WFO)),' +
            'Família respectiva da base de dados\n';
        const fileId = 'teste';
        const outputFilePath = `./tmp/${fileId}.csv`;
        fs_1.default.writeFile(outputFilePath, headers, (err) => {
            if (err) {
                console.log(err);
            }
        });
        const data = yield get_stream_1.default.array(fs_1.default.createReadStream(outputFilePath).pipe((0, csv_parser_1.default)([parser])));
        yield data.reduce((line) => {
            return line;
        });
        expect(data[0]).toEqual({
            '': 'Nome pesquisado',
            _1: 'Nome retornado',
            _2: 'Nome aceito/sinonimo',
            _3: 'Sinônimo de',
            _4: 'Base de dados(FDB/TPL(WFO))',
            _5: 'Família respectiva da base de dados',
        });
    }));
});
