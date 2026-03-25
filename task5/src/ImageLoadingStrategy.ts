export interface ImageLoadingStrategy {
    load(href: string): void;
}

export class FileSystemImageLoadingStrategy implements ImageLoadingStrategy {
    public load(href: string): void {
        console.log(`Loading image from file system: ${href}`);
    }
}

export class NetworkImageLoadingStrategy implements ImageLoadingStrategy {
    public load(href: string): void {
        console.log(`Loading image from network: ${href}`);
    }
}
