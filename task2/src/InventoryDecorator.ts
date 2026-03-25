import { Hero } from './Hero';

export abstract class InventoryDecorator implements Hero {
    protected hero: Hero;

    constructor(hero: Hero) {
        this.hero = hero;
    }

    public getDescription(): string {
        return this.hero.getDescription();
    }

    public getPower(): number {
        return this.hero.getPower();
    }
}
