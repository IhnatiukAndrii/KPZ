import { LightNode } from './LightNode';

export class ElementContext {
    public tagName: string;
    public displayType: "block" | "inline";
    public closingType: "single" | "paired";
    public cssClasses: string[];

    constructor(tagName: string, displayType: "block" | "inline", closingType: "single" | "paired", cssClasses: string[]) {
        this.tagName = tagName;
        this.displayType = displayType;
        this.closingType = closingType;
        this.cssClasses = cssClasses;
    }
}

export class LightElementNodeFactory {
    private static contexts: Map<string, ElementContext> = new Map();

    public static getContext(tagName: string, displayType: "block" | "inline", closingType: "single" | "paired", cssClasses: string[]): ElementContext {
        const key = `${tagName}_${displayType}_${closingType}_${cssClasses.join(',')}`;
        if (!this.contexts.has(key)) {
            this.contexts.set(key, new ElementContext(tagName, displayType, closingType, cssClasses));
        }
        return this.contexts.get(key)!;
    }
}

export class LightElementNode extends LightNode {
    private context: ElementContext;
    private children: LightNode[];
    
    constructor(tagName: string, displayType: "block" | "inline", closingType: "single" | "paired", cssClasses: string[] = []) {
        super();
        this.context = LightElementNodeFactory.getContext(tagName, displayType, closingType, cssClasses);
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
