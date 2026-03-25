import { Shape } from './Shape';
import { Renderer } from './Renderer';

export class Square extends Shape {
    constructor(renderer: Renderer) {
        super(renderer);
    }

    public draw(): void {
        this.renderer.renderShape("Square");
    }
}
