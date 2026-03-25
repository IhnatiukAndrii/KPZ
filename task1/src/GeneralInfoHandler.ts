import { AbstractSupportHandler } from './SupportHandler';

export class GeneralInfoHandler extends AbstractSupportHandler {
    public handle(request: string): string | null {
        if (request === '1') {
            return "General Information: Our working hours are 9 AM to 5 PM.";
        }
        return super.handle(request);
    }
}
