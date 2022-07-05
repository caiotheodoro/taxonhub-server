"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbClient = void 0;
const client_1 = require("@prisma/client");
const dbClient = new client_1.PrismaClient();
exports.dbClient = dbClient;
