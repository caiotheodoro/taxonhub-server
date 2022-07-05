"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateDatabaseUseCase = void 0;
const repositories_1 = require("../../repositories");
const updateDatabaseUseCase_1 = require("./updateDatabaseUseCase");
const updateDatabaseUseCase = new updateDatabaseUseCase_1.UpdateDatabaseUseCase(repositories_1.wfoRepository);
exports.updateDatabaseUseCase = updateDatabaseUseCase;
