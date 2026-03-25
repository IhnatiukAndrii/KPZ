export interface Laptop {
    name: string;
}

export interface Netbook {
    name: string;
}

export interface EBook {
    name: string;
}

export interface Smartphone {
    name: string;
}

export class IProneLaptop implements Laptop {
    name = "IProne Laptop";
}
export class KiaomiLaptop implements Laptop {
    name = "Kiaomi Laptop";
}
export class BalaxyLaptop implements Laptop {
    name = "Balaxy Laptop";
}

export class IProneNetbook implements Netbook {
    name = "IProne Netbook";
}
export class KiaomiNetbook implements Netbook {
    name = "Kiaomi Netbook";
}
export class BalaxyNetbook implements Netbook {
    name = "Balaxy Netbook";
}

export class IProneEBook implements EBook {
    name = "IProne EBook";
}
export class KiaomiEBook implements EBook {
    name = "Kiaomi EBook";
}
export class BalaxyEBook implements EBook {
    name = "Balaxy EBook";
}

export class IProneSmartphone implements Smartphone {
    name = "IProne Smartphone";
}
export class KiaomiSmartphone implements Smartphone {
    name = "Kiaomi Smartphone";
}
export class BalaxySmartphone implements Smartphone {
    name = "Balaxy Smartphone";
}
