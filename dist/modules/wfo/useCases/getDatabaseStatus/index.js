"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDatabaseStatusController = exports.getDatabaseStatusUseCase = void 0;
const repositories_1 = require("../../repositories");
const getDatabaseStatusController_1 = require("./getDatabaseStatusController");
const getDatabaseStatusUseCase_1 = require("./getDatabaseStatusUseCase");
const getDatabaseStatusUseCase = new getDatabaseStatusUseCase_1.GetDatabaseStatusUseCase(repositories_1.wfoRepository);
exports.getDatabaseStatusUseCase = getDatabaseStatusUseCase;
const getDatabaseStatusController = new getDatabaseStatusController_1.GetDatabaseStatusController(getDatabaseStatusUseCase);
exports.getDatabaseStatusController = getDatabaseStatusController;
