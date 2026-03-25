import { LightElementNode } from './LightElementNode';
import { LightTextNode } from './LightTextNode';

function main() {
    const list = new LightElementNode("ul", "block", "paired", ["product-list", "mt-4"]);
    
    list.addEventListener("click", () => console.log("List was clicked!"));
    list.addEventListener("mouseover", () => console.log("Mouse hovered over the list!"));
    
    const items = ["Bread", "Milk", "Eggs", "Cheese"];
    const listItems: LightElementNode[] = [];
    
    for (const item of items) {
        const li = new LightElementNode("li", "block", "paired", ["product-item"]);
        const textNode = new LightTextNode(item);
        li.addChild(textNode);
        
        li.addEventListener("click", () => console.log(`Item "${item}" was clicked!`));
        listItems.push(li);
        
        list.addChild(li);
    }
    
    console.log("--- Outer HTML ---");
    console.log(list.outerHTML());
    
    console.log("\n--- Inner HTML ---");
    console.log(list.innerHTML());
    
    console.log("\n--- Child node count (root ul) ---");
    console.log(list.getChildrenCount());
    
    console.log("\n--- Simulating Events ---");
    list.dispatchEvent("mouseover");
    list.dispatchEvent("click");
    
    if (listItems.length > 0) {
        listItems[0].dispatchEvent("click");
    }
}

main();
