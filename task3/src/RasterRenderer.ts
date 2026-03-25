import { Renderer } from './Renderer';

export class RasterRenderer implements Renderer {
    public renderShape(shapeName: string): void {
        console.log(`Drawing ${shapeName} as pixels`);
    }
}
