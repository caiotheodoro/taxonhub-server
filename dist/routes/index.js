"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const constants_1 = require("../../../config/constants");
const importBinomialNameCSV_1 = require("../../../taxonomy/useCases/importBinomialNameCSV");
const occurrency_routes_1 = require("./occurrency.routes");
const taxonomy_routes_1 = require("./taxonomy.routes");
const wfo_routes_1 = require("./wfo.routes");
const storage = multer_1.default.diskStorage({
    destination: constants_1.FILES_FOLDER,
    filename(req, file, cb) {
        const { userId } = req.query;
        cb(null, `${userId}-binomialNames.csv`);
    },
});
const upload = (0, multer_1.default)({
    storage,
});
const router = (0, express_1.Router)();
exports.router = router;
router.use('/taxonomy', taxonomy_routes_1.taxonomyRoutes);
router.use('/occurrency', occurrency_routes_1.ocurrencyRoutes);
router.use('/wfo', wfo_routes_1.wfoRoutes);
router.post('/import', upload.single('file'), (req, res) => {
    return importBinomialNameCSV_1.importBinomialNameCSVController.handle(req, res);
});
