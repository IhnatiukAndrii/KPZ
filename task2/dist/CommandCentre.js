"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandCentre = void 0;
class CommandCentre {
    constructor() {
        this.runways = [];
        this.aircrafts = [];
        this.aircraftRunwayMap = new Map();
    }
    registerRunway(runway) {
        this.runways.push(runway);
        runway.setCommandCentre(this);
    }
    registerAircraft(aircraft) {
        this.aircrafts.push(aircraft);
        aircraft.setCommandCentre(this);
    }
    requestLanding(aircraft) {
        console.log(`Command Centre: Checking runways for landing request by ${aircraft.name}.`);
        const freeRunway = this.runways.find(r => !r.isBusy);
        if (freeRunway) {
            console.log(`Command Centre: Aircraft ${aircraft.name} has been cleared to land on runway ${freeRunway.id}.`);
            freeRunway.isBusy = true;
            this.aircraftRunwayMap.set(aircraft, freeRunway);
            freeRunway.highLightRed();
        }
        else {
            console.log(`Command Centre: Could not land ${aircraft.name}, all runways are busy.`);
        }
    }
    requestTakeOff(aircraft) {
        console.log(`Command Centre: Processing take off request by ${aircraft.name}.`);
        const assignedRunway = this.aircraftRunwayMap.get(aircraft);
        if (assignedRunway) {
            assignedRunway.isBusy = false;
            this.aircraftRunwayMap.delete(aircraft);
            assignedRunway.highLightGreen();
            console.log(`Command Centre: Aircraft ${aircraft.name} has taken off from runway ${assignedRunway.id}.`);
        }
        else {
            console.log(`Command Centre: Aircraft ${aircraft.name} is not on any runway.`);
        }
    }
}
exports.CommandCentre = CommandCentre;
