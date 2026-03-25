import { ICommandCentre } from './ICommandCentre';

export class Aircraft {
    public name: string;
    public isTakingOff: boolean;
    private commandCentre: ICommandCentre | null = null;

    constructor(name: string) {
        this.name = name;
        this.isTakingOff = false;
    }

    public setCommandCentre(commandCentre: ICommandCentre): void {
        this.commandCentre = commandCentre;
    }

    public land(): void {
        console.log(`Aircraft ${this.name} is requesting landing.`);
        if (this.commandCentre) {
            this.commandCentre.requestLanding(this);
        }
    }

    public takeOff(): void {
        console.log(`Aircraft ${this.name} is requesting take off.`);
        this.isTakingOff = true;
        if (this.commandCentre) {
            this.commandCentre.requestTakeOff(this);
        }
    }
}
