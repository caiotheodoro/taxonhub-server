"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ocurrencyRoutes = void 0;
const express_1 = require("express");
const getOccurrency_1 = require("../../../occurrency/useCases/getOccurrency");
const constants_1 = require("../../../config/constants");
const ocurrencyRoutes = (0, express_1.Router)();
exports.ocurrencyRoutes = ocurrencyRoutes;
ocurrencyRoutes.get('/generatecsv', (req, res) => {
    return getOccurrency_1.getOccurrencyController.handle(req, res);
});
ocurrencyRoutes.get('/download', (req, res) => {
    const { userId } = req.query;
    res.download(`${constants_1.FILES_FOLDER}/${userId}-occurrency.csv`);
});
