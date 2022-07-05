"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EHttpStatuses = void 0;
var EHttpStatuses;
(function (EHttpStatuses) {
    EHttpStatuses[EHttpStatuses["SUCCESS"] = 200] = "SUCCESS";
    EHttpStatuses[EHttpStatuses["BAD_REQUEST"] = 400] = "BAD_REQUEST";
    EHttpStatuses[EHttpStatuses["FORBIDDEN"] = 403] = "FORBIDDEN";
    EHttpStatuses[EHttpStatuses["INTERNAL_SERVER_ERROR"] = 500] = "INTERNAL_SERVER_ERROR";
})(EHttpStatuses || (EHttpStatuses = {}));
exports.EHttpStatuses = EHttpStatuses;
