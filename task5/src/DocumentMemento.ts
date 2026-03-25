export class DocumentMemento {
    private readonly content: string;

    constructor(content: string) {
        this.content = content;
    }

    public getContent(): string {
        return this.content;
    }
}
