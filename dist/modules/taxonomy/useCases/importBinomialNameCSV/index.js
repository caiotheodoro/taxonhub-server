"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.importBinomialNameCSVController = void 0;
const importBinomialNameCSVController_1 = require("./importBinomialNameCSVController");
const importBinomialNameCSVUseCase_1 = require("./importBinomialNameCSVUseCase");
const importBinomialNameCSVUseCase = new importBinomialNameCSVUseCase_1.ImportBinomialNameCSVUseCase();
const importBinomialNameCSVController = new importBinomialNameCSVController_1.ImportBinomialNameCSVController(importBinomialNameCSVUseCase);
exports.importBinomialNameCSVController = importBinomialNameCSVController;
