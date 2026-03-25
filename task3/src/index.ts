import { Circle } from './Circle';
import { Square } from './Square';
import { Triangle } from './Triangle';
import { VectorRenderer } from './VectorRenderer';
import { RasterRenderer } from './RasterRenderer';

function main() {
    const vectorRenderer = new VectorRenderer();
    const rasterRenderer = new RasterRenderer();

    console.log("--- Vector Renderings ---");
    const circleVector = new Circle(vectorRenderer);
    const squareVector = new Square(vectorRenderer);
    const triangleVector = new Triangle(vectorRenderer);

    circleVector.draw();
    squareVector.draw();
    triangleVector.draw();

    console.log("\n--- Raster Renderings ---");
    const circleRaster = new Circle(rasterRenderer);
    const squareRaster = new Square(rasterRenderer);
    const triangleRaster = new Triangle(rasterRenderer);

    circleRaster.draw();
    squareRaster.draw();
    triangleRaster.draw();
}

main();
