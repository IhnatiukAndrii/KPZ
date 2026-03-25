export class Authenticator {
    private static instance: Authenticator;

    private constructor() {}

    public static getInstance(): Authenticator {
        if (!Authenticator.instance) {
            Authenticator.instance = new Authenticator();
        }
        return Authenticator.instance;
    }
}

function main() {
    const auth1 = Authenticator.getInstance();
    const auth2 = Authenticator.getInstance();

    console.log(auth1 === auth2);
}

main();
