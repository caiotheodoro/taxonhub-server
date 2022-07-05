"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.taxonomyRoutes = void 0;
const express_1 = require("express");
const constants_1 = require("../../../config/constants");
const generateCSV_1 = require("../../../taxonomy/useCases/generateCSV");
const taxonomyRoutes = (0, express_1.Router)();
exports.taxonomyRoutes = taxonomyRoutes;
taxonomyRoutes.get('/generatecsv', (req, res) => {
    return generateCSV_1.generateCSVController.handle(req, res);
});
taxonomyRoutes.get('/download', (req, res) => {
    const { userId } = req.query;
    res.download(`${constants_1.FILES_FOLDER}/${userId}-taxonomy.csv`);
});
