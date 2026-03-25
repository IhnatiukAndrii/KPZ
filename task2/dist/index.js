"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CommandCentre_1 = require("./CommandCentre");
const Runway_1 = require("./Runway");
const Aircraft_1 = require("./Aircraft");
function main() {
    const commandCentre = new CommandCentre_1.CommandCentre();
    const runway1 = new Runway_1.Runway("RWY-1");
    const runway2 = new Runway_1.Runway("RWY-2");
    commandCentre.registerRunway(runway1);
    commandCentre.registerRunway(runway2);
    const aircraft1 = new Aircraft_1.Aircraft("Boeing-737");
    const aircraft2 = new Aircraft_1.Aircraft("Airbus-A320");
    const aircraft3 = new Aircraft_1.Aircraft("Cessna-172");
    commandCentre.registerAircraft(aircraft1);
    commandCentre.registerAircraft(aircraft2);
    commandCentre.registerAircraft(aircraft3);
    console.log("--- Initial Landings ---");
    aircraft1.land();
    console.log("");
    aircraft2.land();
    console.log("");
    aircraft3.land();
    console.log("\n--- Takeoff and Freeing Runway ---");
    aircraft1.takeOff();
    console.log("\n--- Final Landing ---");
    aircraft3.land();
}
main();
