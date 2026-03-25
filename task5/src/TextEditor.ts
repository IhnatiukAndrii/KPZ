import { TextDocument } from './TextDocument';
import { DocumentMemento } from './DocumentMemento';

export class TextEditor {
    private document: TextDocument;
    private history: DocumentMemento[];

    constructor() {
        this.document = new TextDocument();
        this.history = [];
    }

    public type(text: string): void {
        this.document.write(text);
    }

    public save(): void {
        this.history.push(this.document.save());
    }

    public undo(): void {
        if (this.history.length > 0) {
            const memento = this.history.pop()!;
            this.document.restore(memento);
        }
    }

    public print(): void {
        console.log(`[Document Content]: ${this.document.getContent()}`);
    }
}
