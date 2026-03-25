export class Character {
    public height: number = 0;
    public build: string = "";
    public hairColor: string = "";
    public eyeColor: string = "";
    public clothing: string = "";
    public inventory: string[] = [];
    public deeds: string[] = [];
}

export interface CharacterBuilder {
    setHeight(height: number): this;
    setBuild(build: string): this;
    setHairColor(color: string): this;
    setEyeColor(color: string): this;
    setClothing(clothing: string): this;
    addInventoryItem(item: string): this;
    getResult(): Character;
}

export class HeroBuilder implements CharacterBuilder {
    private character: Character = new Character();

    public setHeight(height: number): this {
        this.character.height = height;
        return this;
    }

    public setBuild(build: string): this {
        this.character.build = build;
        return this;
    }

    public setHairColor(color: string): this {
        this.character.hairColor = color;
        return this;
    }

    public setEyeColor(color: string): this {
        this.character.eyeColor = color;
        return this;
    }

    public setClothing(clothing: string): this {
        this.character.clothing = clothing;
        return this;
    }

    public addInventoryItem(item: string): this {
        this.character.inventory.push(item);
        return this;
    }

    public doGoodDeed(deed: string): this {
        this.character.deeds.push(`Good: ${deed}`);
        return this;
    }

    public getResult(): Character {
        const result = this.character;
        this.character = new Character();
        return result;
    }
}

export class EnemyBuilder implements CharacterBuilder {
    private character: Character = new Character();

    public setHeight(height: number): this {
        this.character.height = height;
        return this;
    }

    public setBuild(build: string): this {
        this.character.build = build;
        return this;
    }

    public setHairColor(color: string): this {
        this.character.hairColor = color;
        return this;
    }

    public setEyeColor(color: string): this {
        this.character.eyeColor = color;
        return this;
    }

    public setClothing(clothing: string): this {
        this.character.clothing = clothing;
        return this;
    }

    public addInventoryItem(item: string): this {
        this.character.inventory.push(item);
        return this;
    }

    public doEvilDeed(deed: string): this {
        this.character.deeds.push(`Evil: ${deed}`);
        return this;
    }

    public getResult(): Character {
        const result = this.character;
        this.character = new Character();
        return result;
    }
}

export class Director {
    public constructDreamHero(builder: HeroBuilder): void {
        builder.setHeight(180)
               .setBuild("Athletic")
               .setHairColor("Blonde")
               .setEyeColor("Blue")
               .setClothing("Shining Armor")
               .addInventoryItem("Excalibur")
               .addInventoryItem("Shield of Light")
               .doGoodDeed("Saved the village");
    }

    public constructWorstEnemy(builder: EnemyBuilder): void {
        builder.setHeight(200)
               .setBuild("Muscular")
               .setHairColor("Black")
               .setEyeColor("Red")
               .setClothing("Dark Cloak")
               .addInventoryItem("Cursed Blade")
               .doEvilDeed("Stole the ancient artifact");
    }
}

function main() {
    const director = new Director();
    
    const heroBuilder = new HeroBuilder();
    director.constructDreamHero(heroBuilder);
    const hero = heroBuilder.getResult();
    console.log("Hero:");
    console.dir(hero);

    const enemyBuilder = new EnemyBuilder();
    director.constructWorstEnemy(enemyBuilder);
    const enemy = enemyBuilder.getResult();
    console.log("\nEnemy:");
    console.dir(enemy);
}

main();
