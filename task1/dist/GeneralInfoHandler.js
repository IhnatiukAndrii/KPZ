"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GeneralInfoHandler = void 0;
const SupportHandler_1 = require("./SupportHandler");
class GeneralInfoHandler extends SupportHandler_1.AbstractSupportHandler {
    handle(request) {
        if (request === '1') {
            return "General Information: Our working hours are 9 AM to 5 PM.";
        }
        return super.handle(request);
    }
}
exports.GeneralInfoHandler = GeneralInfoHandler;
