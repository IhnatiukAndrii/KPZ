import { InventoryDecorator } from './InventoryDecorator';

export class Artifact extends InventoryDecorator {
    public getDescription(): string {
        return this.hero.getDescription() + " wielding an ancient artifact";
    }

    public getPower(): number {
        return this.hero.getPower() + 30;
    }
}
