import { LightNode } from './LightNode';

export class LightElementNode extends LightNode {
    private tagName: string;
    private displayType: "block" | "inline";
    private closingType: "single" | "paired";
    private cssClasses: string[];
    private children: LightNode[];
    
    constructor(tagName: string, displayType: "block" | "inline", closingType: "single" | "paired", cssClasses: string[] = []) {
        super();
        this.tagName = tagName;
        this.displayType = displayType;
        this.closingType = closingType;
        this.cssClasses = cssClasses;
        this.children = [];
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
