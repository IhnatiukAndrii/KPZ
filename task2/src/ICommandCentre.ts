import { Aircraft } from './Aircraft';
import { Runway } from './Runway';

export interface ICommandCentre {
    requestLanding(aircraft: Aircraft): void;
    requestTakeOff(aircraft: Aircraft): void;
    registerRunway(runway: Runway): void;
    registerAircraft(aircraft: Aircraft): void;
}
