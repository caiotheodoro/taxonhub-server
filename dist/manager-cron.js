"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const checkVersionAndUpdate_1 = require("./modules/routines/checkVersionAndUpdate");
class ManagerCron {
    constructor() {
        this.jobs = [checkVersionAndUpdate_1.routine];
    }
    run() {
        this.jobs.forEach((job) => job.start());
    }
}
exports.default = new ManagerCron();
