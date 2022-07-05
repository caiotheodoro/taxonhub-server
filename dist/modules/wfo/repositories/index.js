"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.wfoRepository = void 0;
const client_1 = require("../../database/client");
const WfoRepository_1 = require("./implementations/WfoRepository");
const wfoRepository = new WfoRepository_1.WfoRepository(client_1.dbClient);
exports.wfoRepository = wfoRepository;
