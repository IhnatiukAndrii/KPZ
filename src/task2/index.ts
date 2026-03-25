import { TechFactory, IProneFactory, KiaomiFactory, BalaxyFactory } from "./factories";

function testFactory(factory: TechFactory) {
    const laptop = factory.createLaptop();
    const netbook = factory.createNetbook();
    const ebook = factory.createEBook();
    const smartphone = factory.createSmartphone();

    console.log(laptop.name);
    console.log(netbook.name);
    console.log(ebook.name);
    console.log(smartphone.name);
}

function main() {
    console.log("Testing IProneFactory:");
    testFactory(new IProneFactory());
    
    console.log("\nTesting KiaomiFactory:");
    testFactory(new KiaomiFactory());
    
    console.log("\nTesting BalaxyFactory:");
    testFactory(new BalaxyFactory());
}

main();
