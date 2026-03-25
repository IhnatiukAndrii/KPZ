"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbstractSupportHandler = void 0;
class AbstractSupportHandler {
    constructor() {
        this.nextHandler = null;
    }
    setNext(handler) {
        this.nextHandler = handler;
        return handler;
    }
    handle(request) {
        if (this.nextHandler) {
            return this.nextHandler.handle(request);
        }
        return null;
    }
}
exports.AbstractSupportHandler = AbstractSupportHandler;
