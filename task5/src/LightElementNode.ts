import { LightNode } from './LightNode';

export class LightElementNode extends LightNode {
    private tagName: string;
    private displayType: "block" | "inline";
    private closingType: "single" | "paired";
    private cssClasses: string[];
    private children: LightNode[];
    private eventListeners: Map<string, Array<() => void>>;
    
    constructor(tagName: string, displayType: "block" | "inline", closingType: "single" | "paired", cssClasses: string[] = []) {
        super();
        this.tagName = tagName;
        this.displayType = displayType;
        this.closingType = closingType;
        this.cssClasses = cssClasses;
        this.children = [];
        this.eventListeners = new Map();
    }
    
    public addEventListener(eventType: string, listener: () => void): void {
        const listeners = this.eventListeners.get(eventType);
        if (listeners) {
            listeners.push(listener);
        } else {
            this.eventListeners.set(eventType, [listener]);
        }
    }

    public removeEventListener(eventType: string, listener: () => void): void {
        const listeners = this.eventListeners.get(eventType);
        if (listeners) {
            this.eventListeners.set(eventType, listeners.filter(l => l !== listener));
        }
    }

    public dispatchEvent(eventType: string): void {
        const listeners = this.eventListeners.get(eventType);
        if (listeners) {
            for (const listener of listeners) {
                listener();
            }
        }
    }
    
    public addChild(child: LightNode): void {
        this.children.push(child);
    }
    
    public getChildrenCount(): number {
        return this.children.length;
    }
    
    public innerHTML(): string {
        let html = "";
        for (const child of this.children) {
            html += child.outerHTML();
        }
        return html;
    }
    
    public outerHTML(): string {
        const classAttr = this.cssClasses.length > 0 ? ` class="${this.cssClasses.join(' ')}"` : '';
        
        if (this.closingType === "single") {
            return `<${this.tagName}${classAttr} />`;
        } else {
            return `<${this.tagName}${classAttr}>${this.innerHTML()}</${this.tagName}>`;
        }
    }
}
