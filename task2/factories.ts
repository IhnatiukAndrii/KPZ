import {
    Laptop, Netbook, EBook, Smartphone,
    IProneLaptop, IProneNetbook, IProneEBook, IProneSmartphone,
    KiaomiLaptop, KiaomiNetbook, KiaomiEBook, KiaomiSmartphone,
    BalaxyLaptop, BalaxyNetbook, BalaxyEBook, BalaxySmartphone
} from "./devices";

export interface TechFactory {
    createLaptop(): Laptop;
    createNetbook(): Netbook;
    createEBook(): EBook;
    createSmartphone(): Smartphone;
}

export class IProneFactory implements TechFactory {
    createLaptop(): Laptop { return new IProneLaptop(); }
    createNetbook(): Netbook { return new IProneNetbook(); }
    createEBook(): EBook { return new IProneEBook(); }
    createSmartphone(): Smartphone { return new IProneSmartphone(); }
}

export class KiaomiFactory implements TechFactory {
    createLaptop(): Laptop { return new KiaomiLaptop(); }
    createNetbook(): Netbook { return new KiaomiNetbook(); }
    createEBook(): EBook { return new KiaomiEBook(); }
    createSmartphone(): Smartphone { return new KiaomiSmartphone(); }
}

export class BalaxyFactory implements TechFactory {
    createLaptop(): Laptop { return new BalaxyLaptop(); }
    createNetbook(): Netbook { return new BalaxyNetbook(); }
    createEBook(): EBook { return new BalaxyEBook(); }
    createSmartphone(): Smartphone { return new BalaxySmartphone(); }
}
