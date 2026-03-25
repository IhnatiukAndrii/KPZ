import { TextEditor } from './TextEditor';

function main() {
    const editor = new TextEditor();
    
    editor.type("Hello");
    editor.save();
    
    editor.type(" World!");
    editor.save();
    
    editor.type("\nThis is the Memento pattern.");
    
    editor.print(); 
    
    console.log("\n--- Undo ---");
    editor.undo();
    editor.print();
    
    console.log("\n--- Undo ---");
    editor.undo();
    editor.print();
}

main();
