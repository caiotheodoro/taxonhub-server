"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.wfoRoutes = void 0;
const express_1 = require("express");
const getDatabaseStatus_1 = require("src/modules/wfo/useCases/getDatabaseStatus");
const getVersion_1 = require("src/modules/wfo/useCases/getVersion");
const wfoRoutes = (0, express_1.Router)();
exports.wfoRoutes = wfoRoutes;
wfoRoutes.get('/version', (req, res) => {
    return getVersion_1.getVersionController.handle(req, res);
});
wfoRoutes.get('/dbstatus', (req, res) => {
    return getDatabaseStatus_1.getDatabaseStatusController.handle(req, res);
});
