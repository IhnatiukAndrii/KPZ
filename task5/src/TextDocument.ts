import { DocumentMemento } from './DocumentMemento';

export class TextDocument {
    private content: string;

    constructor(content: string = "") {
        this.content = content;
    }

    public write(text: string): void {
        this.content += text;
    }

    public getContent(): string {
        return this.content;
    }

    public save(): DocumentMemento {
        return new DocumentMemento(this.content);
    }

    public restore(memento: DocumentMemento): void {
        this.content = memento.getContent();
    }
}
