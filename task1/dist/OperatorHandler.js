"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OperatorHandler = void 0;
const SupportHandler_1 = require("./SupportHandler");
class OperatorHandler extends SupportHandler_1.AbstractSupportHandler {
    handle(request) {
        if (request === '4') {
            return "Operator: Connecting you to a human operator... Please hold the line.";
        }
        return super.handle(request);
    }
}
exports.OperatorHandler = OperatorHandler;
