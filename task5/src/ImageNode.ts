import { LightNode } from './LightNode';
import { ImageLoadingStrategy, FileSystemImageLoadingStrategy, NetworkImageLoadingStrategy } from './ImageLoadingStrategy';

export class ImageNode extends LightNode {
    private href: string;
    private strategy: ImageLoadingStrategy;

    constructor(href: string) {
        super();
        this.href = href;
        if (href.startsWith('http://') || href.startsWith('https://')) {
            this.strategy = new NetworkImageLoadingStrategy();
        } else {
            this.strategy = new FileSystemImageLoadingStrategy();
        }
    }

    public load(): void {
        this.strategy.load(this.href);
    }

    public innerHTML(): string {
        return "";
    }

    public outerHTML(): string {
        return `<img src="${this.href}" />`;
    }
}
