"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const manager_cron_1 = __importDefault(require("./manager-cron"));
const swagger_json_1 = __importDefault(require("./swagger.json"));
const checkVersionAndUpdate_1 = require("./modules/routines/checkVersionAndUpdate");
const routes_1 = require("./routes");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use(routes_1.router);
app.use("/api-docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_json_1.default));
app.get('/', (_, res) => res.send('API UP'));
app.listen(process.env.PORT || 3333, () => {
    console.log(`Server running on port ${process.env.PORT || 3333}`);
    //wfoRepository.updateDatabasePhaseStatus(EMetaTableValues.needToCheck);
    (() => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, checkVersionAndUpdate_1.checkVersionAndUpdate)();
    }))();
    manager_cron_1.default.run();
});
