import { Hero } from './Hero';

export class Warrior implements Hero {
    public getDescription(): string { return "Warrior"; }
    public getPower(): number { return 100; }
}
