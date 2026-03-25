import { LightNode } from './LightNode';

export class OldLightElementNode extends LightNode {
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
    
    public innerHTML(): string {
        return "";
    }
    
    public outerHTML(): string {
        return "";
    }
}
