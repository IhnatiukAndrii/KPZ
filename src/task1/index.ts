import { WebSite, MobileApp, ManagerCall } from "./creators";

function main() {
    const webSite = new WebSite();
    const webSiteSubscription = webSite.purchaseSubscription();
    console.log(webSiteSubscription);

    const mobileApp = new MobileApp();
    const mobileAppSubscription = mobileApp.purchaseSubscription();
    console.log(mobileAppSubscription);

    const managerCall = new ManagerCall();
    const managerCallSubscription = managerCall.purchaseSubscription();
    console.log(managerCallSubscription);
}

main();
