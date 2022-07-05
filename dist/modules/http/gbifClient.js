"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GBIF_OCCURENCE_API = void 0;
const axios_1 = __importDefault(require("axios"));
exports.GBIF_OCCURENCE_API = axios_1.default.create({
    baseURL: 'https://api.gbif.org/v1/occurrence',
    headers: {
        Accept: '*/*',
        'Accept-Encoding': 'gzip, deflate, br',
        Connection: 'keep-alive',
    },
});
