"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Aircraft = void 0;
class Aircraft {
    constructor(name) {
        this.commandCentre = null;
        this.name = name;
        this.isTakingOff = false;
    }
    setCommandCentre(commandCentre) {
        this.commandCentre = commandCentre;
    }
    land() {
        console.log(`Aircraft ${this.name} is requesting landing.`);
        if (this.commandCentre) {
            this.commandCentre.requestLanding(this);
        }
    }
    takeOff() {
        console.log(`Aircraft ${this.name} is requesting take off.`);
        this.isTakingOff = true;
        if (this.commandCentre) {
            this.commandCentre.requestTakeOff(this);
        }
    }
}
exports.Aircraft = Aircraft;
