export interface Prototype<T> {
    clone(): T;
}

export class Virus implements Prototype<Virus> {
    constructor(
        public weight: number,
        public age: number,
        public name: string,
        public species: string,
        public children: Virus[] = []
    ) {}

    public clone(): Virus {
        const clonedChildren = this.children.map(child => child.clone());
        return new Virus(this.weight, this.age, this.name, this.species, clonedChildren);
    }
}

function main() {
    const gen3_1 = new Virus(0.1, 1, "V3.1", "Covid");
    const gen3_2 = new Virus(0.2, 1, "V3.2", "Covid");
    const gen3_3 = new Virus(0.15, 2, "V3.3", "Covid");
    
    const gen2_1 = new Virus(1.5, 5, "V2.1", "Covid", [gen3_1, gen3_2]);
    const gen2_2 = new Virus(1.2, 4, "V2.2", "Covid", [gen3_3]);
    
    const gen1 = new Virus(5.0, 10, "V1", "Covid", [gen2_1, gen2_2]);

    const clonedGen1 = gen1.clone();

    console.log(gen1 !== clonedGen1);
    console.log(gen1.children[0] !== clonedGen1.children[0]);
    console.log(gen1.children[0].children[0] !== clonedGen1.children[0].children[0]);
    console.log(clonedGen1.children[0].children[0].name);

    console.dir(clonedGen1, { depth: null });
}

main();
