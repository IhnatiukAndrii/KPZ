"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Runway = void 0;
class Runway {
    constructor(id) {
        this.commandCentre = null;
        this.id = id;
        this.isBusy = false;
    }
    setCommandCentre(commandCentre) {
        this.commandCentre = commandCentre;
    }
    highLightRed() {
        console.log(`Runway ${this.id} is busy!`);
    }
    highLightGreen() {
        console.log(`Runway ${this.id} is free!`);
    }
}
exports.Runway = Runway;
