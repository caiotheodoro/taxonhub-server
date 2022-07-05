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
exports.DownloadNewDataUseCase = void 0;
const adm_zip_1 = __importDefault(require("adm-zip"));
const fs_1 = __importDefault(require("fs"));
const puppeteer_1 = __importDefault(require("puppeteer"));
const superagent_1 = __importDefault(require("superagent"));
const constants_1 = require("../../constants");
class DownloadNewDataUseCase {
    getDownloadLink() {
        return __awaiter(this, void 0, void 0, function* () {
            const browser = yield puppeteer_1.default.launch();
            const page = yield browser.newPage();
            yield page.goto('http://www.worldfloraonline.org/downloadData', {
                timeout: 180000,
            });
            const url = yield page.evaluate(() => {
                return Array.from(document.links)
                    .map((link) => link.href)
                    .filter((link) => link.includes('zip'));
            });
            if (url === undefined || url === null) {
                throw new Error('Url was not found.');
            }
            yield browser.close();
            return url[0];
        });
    }
    setPath(path) {
        if (path === undefined || path === null) {
            throw new Error('Path error.');
        }
        fs_1.default.rmSync(path, { recursive: true, force: true });
        if (!fs_1.default.existsSync(path))
            fs_1.default.mkdirSync(path);
    }
    downloadFile(link, pathToFolder, fullPath) {
        return __awaiter(this, void 0, void 0, function* () {
            yield new Promise((resolve, reject) => {
                superagent_1.default
                    .get(link)
                    .pipe(fs_1.default.createWriteStream(fullPath))
                    .on('finish', () => {
                    const zip = new adm_zip_1.default(fullPath);
                    zip.extractAllTo(pathToFolder);
                    resolve('Done');
                })
                    .on('error', () => {
                    reject(new Error('Could not download file'));
                });
            });
        });
    }
    execute() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const link = yield this.getDownloadLink();
                this.setPath(constants_1.pathToFolder);
                yield this.downloadFile(link, constants_1.pathToFolder, constants_1.pathToFolder.concat('/', constants_1.zipFile));
            }
            catch (e) {
                if (e instanceof Error) {
                    throw new Error(e.message);
                }
            }
        });
    }
}
exports.DownloadNewDataUseCase = DownloadNewDataUseCase;
