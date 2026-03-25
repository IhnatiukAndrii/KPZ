import { AbstractSupportHandler } from './SupportHandler';

export class OperatorHandler extends AbstractSupportHandler {
    public handle(request: string): string | null {
        if (request === '4') {
            return "Operator: Connecting you to a human operator... Please hold the line.";
        }
        return super.handle(request);
    }
}
