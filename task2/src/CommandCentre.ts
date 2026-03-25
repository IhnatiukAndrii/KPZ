import { ICommandCentre } from './ICommandCentre';
import { Runway } from './Runway';
import { Aircraft } from './Aircraft';

export class CommandCentre implements ICommandCentre {
    private runways: Runway[] = [];
    private aircrafts: Aircraft[] = [];
    private aircraftRunwayMap: Map<Aircraft, Runway> = new Map();

    public registerRunway(runway: Runway): void {
        this.runways.push(runway);
        runway.setCommandCentre(this);
    }

    public registerAircraft(aircraft: Aircraft): void {
        this.aircrafts.push(aircraft);
        aircraft.setCommandCentre(this);
    }

    public requestLanding(aircraft: Aircraft): void {
        console.log(`Command Centre: Checking runways for landing request by ${aircraft.name}.`);
        const freeRunway = this.runways.find(r => !r.isBusy);
        if (freeRunway) {
            console.log(`Command Centre: Aircraft ${aircraft.name} has been cleared to land on runway ${freeRunway.id}.`);
            freeRunway.isBusy = true;
            this.aircraftRunwayMap.set(aircraft, freeRunway);
            freeRunway.highLightRed();
        } else {
            console.log(`Command Centre: Could not land ${aircraft.name}, all runways are busy.`);
        }
    }

    public requestTakeOff(aircraft: Aircraft): void {
        console.log(`Command Centre: Processing take off request by ${aircraft.name}.`);
        const assignedRunway = this.aircraftRunwayMap.get(aircraft);
        if (assignedRunway) {
            assignedRunway.isBusy = false;
            this.aircraftRunwayMap.delete(aircraft);
            assignedRunway.highLightGreen();
            console.log(`Command Centre: Aircraft ${aircraft.name} has taken off from runway ${assignedRunway.id}.`);
        } else {
            console.log(`Command Centre: Aircraft ${aircraft.name} is not on any runway.`);
        }
    }
}
