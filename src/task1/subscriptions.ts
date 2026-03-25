export interface Subscription {
    monthlyFee: number;
    minPeriod: number;
    channels: string[];
    features: string[];
}

export class DomesticSubscription implements Subscription {
    monthlyFee = 100;
    minPeriod = 1;
    channels = ["1+1", "ICTV", "Novy Kanal"];
    features = ["HD quality"];
}

export class EducationalSubscription implements Subscription {
    monthlyFee = 50;
    minPeriod = 6;
    channels = ["Discovery", "National Geographic", "History"];
    features = ["Documentary library", "No ads"];
}

export class PremiumSubscription implements Subscription {
    monthlyFee = 300;
    minPeriod = 12;
    channels = ["HBO", "Netflix Original", "Sports"];
    features = ["4K quality", "Exclusive content", "Multiple devices"];
}
