import { InventoryDecorator } from './InventoryDecorator';

export class Clothing extends InventoryDecorator {
    public getDescription(): string {
        return this.hero.getDescription() + " in fancy clothes";
    }

    public getPower(): number {
        return this.hero.getPower() + 10;
    }
}
