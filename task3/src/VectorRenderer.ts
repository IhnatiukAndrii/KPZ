import { Renderer } from './Renderer';

export class VectorRenderer implements Renderer {
    public renderShape(shapeName: string): void {
        console.log(`Drawing ${shapeName} as lines`);
    }
}
