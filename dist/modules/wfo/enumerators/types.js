"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EMetaTableValues = exports.EMetaTableKeys = void 0;
var EMetaTableKeys;
(function (EMetaTableKeys) {
    EMetaTableKeys["currentDatabaseVersion"] = "wfoVersion";
    EMetaTableKeys["databaseConsistencyStatus"] = "databaseConsistencyStatus";
    EMetaTableKeys["databasePhaseStatus"] = "databaseUpdateStatus";
})(EMetaTableKeys = exports.EMetaTableKeys || (exports.EMetaTableKeys = {}));
var EMetaTableValues;
(function (EMetaTableValues) {
    // for the user
    EMetaTableValues["consistent"] = "consistent";
    EMetaTableValues["inconsistent"] = "inconsistent";
    // for the system
    EMetaTableValues["stable"] = "stable";
    EMetaTableValues["unstable"] = "unstable";
    EMetaTableValues["inUsage"] = "inUsage";
    EMetaTableValues["errorOnUpdate"] = "errorOnUpdate";
    EMetaTableValues["needToCheck"] = "needToCheck";
})(EMetaTableValues = exports.EMetaTableValues || (exports.EMetaTableValues = {}));
