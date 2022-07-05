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
exports.GetTaxonomyByNameUseCase = void 0;
const puppeteer_1 = __importDefault(require("puppeteer"));
const TaxonomyException_1 = require("src/modules/exception/TaxonomyException");
const defaultResponse_1 = require("src/modules/http/defaultResponse");
const httpStatus_1 = require("src/modules/http/httpStatus");
const types_1 = require("src/modules/model/enumerators/types");
const Taxonomy_1 = require("src/modules/model/Taxonomy");
var ENameType;
(function (ENameType) {
    ENameType["accepted"] = "accepted";
    ENameType["synonym"] = "synonym";
    ENameType["unresolved"] = "unresolved";
})(ENameType || (ENameType = {}));
class GetTaxonomyByNameUseCase {
    constructor(taxonomyRepository) {
        this.taxonomyRepository = taxonomyRepository;
        this.nameDataStatusStringPosition = 2;
        this.acceptedNameFromSynonymPosition = 3;
        this.nameDataStatusPosition = 2;
        this.namePosition = 0;
        this.arrayStatusPosition = 1;
        this.puppeteerTimeoutLimit = 180000;
    }
    divideIntoChunks(items, size) {
        if (items === null || items.length === 0)
            return [];
        const chunks = [];
        const its = [].concat(...items);
        while (its.length) {
            chunks.push(its.splice(0, size));
        }
        return chunks;
    }
    fetchData(link) {
        return __awaiter(this, void 0, void 0, function* () {
            const browser = yield puppeteer_1.default.launch();
            const page = yield browser.newPage();
            yield page.goto(link, { timeout: this.puppeteerTimeoutLimit });
            const searchedNameData = yield page.$$eval('h1 span', (spans) => spans
                .map((span) => {
                return span.textContent.replace(/\n/g, '');
            })
                .filter((e) => e));
            const acceptedName = searchedNameData[this.namePosition];
            const nameStatus = searchedNameData[this.nameDataStatusStringPosition].split(' ')[this.nameDataStatusPosition];
            if (nameStatus === ENameType.unresolved) {
                const cleanData = [];
                cleanData.push({
                    name: acceptedName,
                    status: nameStatus,
                    synonymOf: null,
                });
                return cleanData;
            }
            if (nameStatus === ENameType.synonym) {
                const acceptedNameFromSynonym = searchedNameData[this.acceptedNameFromSynonymPosition];
                const cleanData = [];
                cleanData.push({
                    name: acceptedName,
                    status: nameStatus,
                    synonymOf: acceptedNameFromSynonym,
                });
                return cleanData;
            }
            const synonyms = yield page.evaluate(() => {
                const tds = Array.from(document.querySelectorAll('table tr td'));
                return tds.map((td) => td.textContent).filter((e) => e);
            });
            yield browser.close();
            const chunks = this.divideIntoChunks(synonyms, 4);
            const cleanData = chunks.map((row) => {
                return {
                    name: row[this.namePosition],
                    status: row[this.arrayStatusPosition],
                    synonymOf: acceptedName,
                };
            });
            cleanData.unshift({
                name: acceptedName,
                status: nameStatus,
                synonymOf: '',
            });
            return cleanData;
        });
    }
    convertStatusToPTBR(status) {
        switch (status.toLocaleLowerCase()) {
            case 'accepted':
                return types_1.ETaxonomyName.ACCEPTED;
            case 'synonym':
                return types_1.ETaxonomyName.SYNONYM;
            case 'unresolved':
                return types_1.ETaxonomyName.UNRESOLVED;
            default:
                throw new Error(`Unknown status: ${status}`);
        }
    }
    execute(scientificName) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const returnedData = yield this.taxonomyRepository.getRecordByName(scientificName);
                if (returnedData === undefined || returnedData === null) {
                    throw new TaxonomyException_1.TaxonomyException(httpStatus_1.EHttpStatuses.BAD_REQUEST, `Specie with name ${scientificName} was not found.`);
                }
                const fetchedData = yield this.fetchData(returnedData.tplId);
                const taxonomies = [];
                const firtInstance = new Taxonomy_1.TaxonomyModel(scientificName, fetchedData[0].name, this.convertStatusToPTBR(fetchedData[0].status), fetchedData[0].synonymOf, types_1.EDataset.WFO, returnedData.family);
                taxonomies.push(firtInstance);
                fetchedData.shift();
                fetchedData.forEach((taxonomy) => {
                    const searchedName = scientificName;
                    const returnedName = taxonomy.name;
                    const acceptedNameOrSynonym = taxonomy.status;
                    const synonymName = taxonomy.synonymOf;
                    const dataset = types_1.EDataset.WFO;
                    const respectiveFamily = returnedData.family;
                    const newTaxonomyData = new Taxonomy_1.TaxonomyModel(searchedName, returnedName, this.convertStatusToPTBR(acceptedNameOrSynonym), synonymName, dataset, respectiveFamily);
                    taxonomies.push(newTaxonomyData);
                });
                return taxonomies;
            }
            catch (e) {
                if (e instanceof TaxonomyException_1.TaxonomyException) {
                    const unfoundData = [];
                    const instance = new Taxonomy_1.TaxonomyModel(scientificName, e.message, '', '', types_1.EDataset.WFO, '');
                    unfoundData.push(instance);
                    return unfoundData;
                }
                throw new Error('an unknown error occurred.');
            }
        });
    }
    executeResponse(scientificName) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.execute(scientificName);
                return new defaultResponse_1.DefaultResponse(httpStatus_1.EHttpStatuses.SUCCESS, response);
            }
            catch (e) {
                if (e instanceof TaxonomyException_1.TaxonomyException) {
                    return new defaultResponse_1.DefaultResponse(e.status, e.message);
                }
                if (e instanceof Error) {
                    return new defaultResponse_1.DefaultResponse(httpStatus_1.EHttpStatuses.INTERNAL_SERVER_ERROR, e.message);
                }
                return new defaultResponse_1.DefaultResponse(httpStatus_1.EHttpStatuses.INTERNAL_SERVER_ERROR, 'An unknown error occurred.');
            }
        });
    }
}
exports.GetTaxonomyByNameUseCase = GetTaxonomyByNameUseCase;
