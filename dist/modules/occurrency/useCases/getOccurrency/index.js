"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOccurrencyController = void 0;
const getOccurrencyController_1 = require("./getOccurrencyController");
const getOccurrencyUseCase_1 = require("./getOccurrencyUseCase");
const getOccurrencyUseCase = new getOccurrencyUseCase_1.GetOccurrencyUseCase();
const getOccurrencyController = new getOccurrencyController_1.GetOccurrencyController(getOccurrencyUseCase);
exports.getOccurrencyController = getOccurrencyController;
