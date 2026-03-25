"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BillingHandler = void 0;
const SupportHandler_1 = require("./SupportHandler");
class BillingHandler extends SupportHandler_1.AbstractSupportHandler {
    handle(request) {
        if (request === '2') {
            return "Billing & Payments: Please wait while we process your request.";
        }
        return super.handle(request);
    }
}
exports.BillingHandler = BillingHandler;
