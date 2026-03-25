import { CommandCentre } from './CommandCentre';
import { Runway } from './Runway';
import { Aircraft } from './Aircraft';

function main() {
    const commandCentre = new CommandCentre();

    const runway1 = new Runway("RWY-1");
    const runway2 = new Runway("RWY-2");
    
    commandCentre.registerRunway(runway1);
    commandCentre.registerRunway(runway2);

    const aircraft1 = new Aircraft("Boeing-737");
    const aircraft2 = new Aircraft("Airbus-A320");
    const aircraft3 = new Aircraft("Cessna-172");

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
