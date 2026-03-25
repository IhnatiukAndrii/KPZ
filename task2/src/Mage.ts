import { Hero } from './Hero';

export class Mage implements Hero {
    public getDescription(): string { return "Mage"; }
    public getPower(): number { return 70; }
}
