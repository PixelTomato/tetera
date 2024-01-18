import { Vector2, Vector3 } from "./scripts/vectors.js";
import { Canvas } from "./scripts/canvas.js";
import { Input } from "./scripts/input.js";
import { Debug } from "./scripts/debug.js";
import { Mesh } from "./scripts/mesh.js";
import { random } from "./scripts/math.js";

const ctx = Canvas.init("canvas");
Input.init();

const icosphereMesh = new Mesh("./models/icosphere.obj");

// TODO: Arrays of scene vertices/indices that meshes are appended to.
// TODO: Transformations done before being appended to scene list.
// TODO: Depth sorting and projection done last before drawing.

function project(point) {
    return new Vector2(
        point.x * 400 / point.z + Canvas.width / 2,
        point.y * 400 / point.z + Canvas.height / 2,
    );
}

function drawTriangle(a, b, c, stroke, fill) {
    ctx.beginPath();
    ctx.moveTo(a.x, a.y);
    ctx.lineTo(b.x, b.y);
    ctx.lineTo(c.x, c.y);
    ctx.lineTo(a.x, a.y);
    if (fill) ctx.fill();
    if (stroke) ctx.stroke();
}

function bounds(a) {
    return (a.x > 0 && a.x < Canvas.width) && (a.y > 0 && a.y < Canvas.height);
}

function main() {
    const debug = new Debug(ctx);
    debug.start("Frame Time");

    Canvas.clear();

    let scene = new Mesh();
    scene.append(icosphereMesh);

    // Graphics code goes here :)
    ctx.strokeStyle = "white";

    for (let i = 0; i < scene.indices.length - 3; i += 3) {
        const a = project(scene.vertices[scene.indices[i]]);
        const b = project(scene.vertices[scene.indices[i + 1]]);
        const c = project(scene.vertices[scene.indices[i + 2]]);

        drawTriangle(a, b, c, true, false);
    }

    debug.end("Frame Time", "ms");
    debug.draw();

    window.requestAnimationFrame(main);
}

main();