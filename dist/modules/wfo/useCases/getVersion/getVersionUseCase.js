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
exports.GetVersionUseCase = void 0;
const puppeteer_1 = __importDefault(require("puppeteer"));
const defaultResponse_1 = require("src/modules/http/defaultResponse");
const httpStatus_1 = require("src/modules/http/httpStatus");
class GetVersionUseCase {
    constructor(wfoRepository) {
        this.wfoRepository = wfoRepository;
        this.versionValuePositionOnPage = 3;
        this.puppeteerTimeoutLimit = 30000;
    }
    getVersionFromWebsite(websiteURL) {
        return __awaiter(this, void 0, void 0, function* () {
            const browser = yield puppeteer_1.default.launch();
            const page = yield browser.newPage();
            yield page.goto(websiteURL, {
                timeout: this.puppeteerTimeoutLimit,
            });
            const fetchedData = yield page.$$eval('table thead tr td', (tds) => tds.map((td) => {
                return td.textContent;
            }));
            const version = fetchedData[this.versionValuePositionOnPage];
            yield browser.close();
            return version;
        });
    }
    compareVersion(scrappedVersion, savedVersion) {
        return scrappedVersion === savedVersion;
    }
    execute() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const versionFromWebsite = yield this.getVersionFromWebsite('http://www.worldfloraonline.org/downloadData');
                const savedVersion = yield this.wfoRepository.getSavedVersion();
                const isUpdated = this.compareVersion(versionFromWebsite, savedVersion);
                const response = {
                    versionFromWebsite,
                    savedVersion,
                    isUpdated,
                };
                return response;
            }
            catch (e) {
                if (e instanceof Error) {
                    throw new Error(e.message);
                }
            }
            return null;
        });
    }
    executeResponse() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.execute();
                if (response === null) {
                    throw new Error('An unknown error occurred.');
                }
                return new defaultResponse_1.DefaultResponse(httpStatus_1.EHttpStatuses.SUCCESS, response);
            }
            catch (e) {
                if (e instanceof Error) {
                    return new defaultResponse_1.DefaultResponse(httpStatus_1.EHttpStatuses.INTERNAL_SERVER_ERROR, e.message);
                }
            }
            return new defaultResponse_1.DefaultResponse(httpStatus_1.EHttpStatuses.INTERNAL_SERVER_ERROR, 'An unknown error occurred.');
        });
    }
}
exports.GetVersionUseCase = GetVersionUseCase;
