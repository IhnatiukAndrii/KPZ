import { AbstractSupportHandler } from './SupportHandler';

export class BillingHandler extends AbstractSupportHandler {
    public handle(request: string): string | null {
        if (request === '2') {
            return "Billing & Payments: Please wait while we process your request.";
        }
        return super.handle(request);
    }
}
