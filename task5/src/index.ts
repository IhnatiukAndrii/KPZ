import { LightElementNode } from './LightElementNode';
import { LightTextNode } from './LightTextNode';

function main() {
    const list = new LightElementNode("ul", "block", "paired", ["product-list", "mt-4"]);
    
    const items = ["Bread", "Milk", "Eggs", "Cheese"];
    
    for (const item of items) {
        const li = new LightElementNode("li", "block", "paired", ["product-item"]);
        const textNode = new LightTextNode(item);
        li.addChild(textNode);
        list.addChild(li);
    }
    
    console.log("--- Outer HTML ---");
    console.log(list.outerHTML());
    
    console.log("\n--- Inner HTML ---");
    console.log(list.innerHTML());
    
    console.log("\n--- Child node count (root ul) ---");
    console.log(list.getChildrenCount());
}

main();
