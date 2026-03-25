import { Hero } from './Hero';

export class Palladin implements Hero {
    public getDescription(): string { return "Palladin"; }
    public getPower(): number { return 85; }
}
