import { AbstractSupportHandler } from './SupportHandler';

export class TechSupportHandler extends AbstractSupportHandler {
    public handle(request: string): string | null {
        if (request === '3') {
            return "Technical Support: What seems to be the issue with your device?";
        }
        return super.handle(request);
    }
}
