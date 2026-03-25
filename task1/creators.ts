import { Subscription, DomesticSubscription, EducationalSubscription, PremiumSubscription } from "./subscriptions";

export abstract class SubscriptionCreator {
    abstract createSubscription(): Subscription;

    purchaseSubscription(): Subscription {
        const subscription = this.createSubscription();
        return subscription;
    }
}

export class WebSite extends SubscriptionCreator {
    createSubscription(): Subscription {
        return new EducationalSubscription();
    }
}

export class MobileApp extends SubscriptionCreator {
    createSubscription(): Subscription {
        return new PremiumSubscription();
    }
}

export class ManagerCall extends SubscriptionCreator {
    createSubscription(): Subscription {
        return new DomesticSubscription();
    }
}
