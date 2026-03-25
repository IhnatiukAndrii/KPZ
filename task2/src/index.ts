import { Hero } from './Hero';
import { Warrior } from './Warrior';
import { Mage } from './Mage';
import { Palladin } from './Palladin';
import { Clothing } from './Clothing';
import { Weapon } from './Weapon';
import { Artifact } from './Artifact';

function main() {
    console.log("--- Warrior Output ---");
    let warrior: Hero = new Warrior();
    warrior = new Clothing(warrior);
    warrior = new Weapon(warrior);
    warrior = new Weapon(warrior); 
    
    console.log(warrior.getDescription());
    console.log("Total Power: " + warrior.getPower());
    
    console.log("\n--- Mage Output ---");
    let mage: Hero = new Mage();
    mage = new Clothing(mage);
    mage = new Artifact(mage);
    mage = new Artifact(mage);
    
    console.log(mage.getDescription());
    console.log("Total Power: " + mage.getPower());
    
    console.log("\n--- Palladin Output ---");
    let palladin: Hero = new Palladin();
    palladin = new Weapon(palladin);
    palladin = new Artifact(palladin);
    
    console.log(palladin.getDescription());
    console.log("Total Power: " + palladin.getPower());
}

main();
