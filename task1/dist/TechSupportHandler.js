"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TechSupportHandler = void 0;
const SupportHandler_1 = require("./SupportHandler");
class TechSupportHandler extends SupportHandler_1.AbstractSupportHandler {
    handle(request) {
        if (request === '3') {
            return "Technical Support: What seems to be the issue with your device?";
        }
        return super.handle(request);
    }
}
exports.TechSupportHandler = TechSupportHandler;
