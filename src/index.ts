import { App } from './app';

const app = new App();
const args = process.argv.slice(2);
app.run(args);
