import { LightNode } from './LightNode';

export class LightTextNode extends LightNode {
    private text: string;
    
    constructor(text: string) {
        super();
        this.text = text;
    }
    
    public innerHTML(): string {
        return this.text;
    }
    
    public outerHTML(): string {
        return this.text;
    }
}
