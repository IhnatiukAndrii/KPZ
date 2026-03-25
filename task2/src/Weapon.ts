import { InventoryDecorator } from './InventoryDecorator';

export class Weapon extends InventoryDecorator {
    public getDescription(): string {
        return this.hero.getDescription() + " with a sharp weapon";
    }

    public getPower(): number {
        return this.hero.getPower() + 50;
    }
}
