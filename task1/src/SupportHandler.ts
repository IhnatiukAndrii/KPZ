export interface SupportHandler {
    setNext(handler: SupportHandler): SupportHandler;
    handle(request: string): string | null;
}

export abstract class AbstractSupportHandler implements SupportHandler {
    private nextHandler: SupportHandler | null = null;

    public setNext(handler: SupportHandler): SupportHandler {
        this.nextHandler = handler;
        return handler;
    }

    public handle(request: string): string | null {
        if (this.nextHandler) {
            return this.nextHandler.handle(request);
        }
        return null;
    }
}
