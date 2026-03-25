import { Shape } from './Shape';
import { Renderer } from './Renderer';

export class Circle extends Shape {
    constructor(renderer: Renderer) {
        super(renderer);
    }

    public draw(): void {
        this.renderer.renderShape("Circle");
    }
}
