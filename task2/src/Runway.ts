import { ICommandCentre } from './ICommandCentre';

export class Runway {
    public id: string;
    public isBusy: boolean;
    private commandCentre: ICommandCentre | null = null;

    constructor(id: string) {
        this.id = id;
        this.isBusy = false;
    }

    public setCommandCentre(commandCentre: ICommandCentre): void {
        this.commandCentre = commandCentre;
    }

    public highLightRed(): void {
        console.log(`Runway ${this.id} is busy!`);
    }

    public highLightGreen(): void {
        console.log(`Runway ${this.id} is free!`);
    }
}
