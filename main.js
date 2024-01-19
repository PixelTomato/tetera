import { Vector2, Vector3 } from "./scripts/vectors.js";
import { Canvas } from "./scripts/canvas.js";
import { Input } from "./scripts/input.js";
import { Debug } from "./scripts/debug.js";
import { Mesh } from "./scripts/mesh.js";

const ctx = Canvas.init("canvas");
const fov = Canvas.width / 2;
Input.init();

const icosphereMesh = new Mesh("./models/icosphere.obj");

//icosphereMesh.translate(new Vector3(0, 0, -2));

// TODO: Arrays of scene vertices/indices that meshes are appended to.
// TODO: Transformations done before being appended to scene list.
// TODO: Depth sorting and projection done last before drawing.

function rotateY(point, amt) {
    return new Vector3(
        point.z * Math.sin(amt) + point.x * Math.cos(amt),
        point.y,
        point.z * Math.cos(amt) - point.x * Math.sin(amt),
    );
}

function translate(point, offset) {
    return new Vector3(
        point.x + offset.x,
        point.y + offset.y,
        point.z + offset.z,
    );
}

function project(point) {
    let _point = rotateY(point, performance.now() / 1000);
    _point = translate(_point, new Vector3(0, 0, -2));

    return new Vector2(
        _point.x * fov / _point.z + Canvas.width / 2,
        _point.y * fov / _point.z + Canvas.height / 2,
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

class Face {
    constructor(a, b, c) {
        this.a = a;
        this.b = b;
        this.c = c;
    }

    get center() {
        return new Vector3(
            (this.a.x + this.b.x + this.c.x) / 3,
            (this.a.y + this.b.y + this.c.y) / 3,
            (this.a.z + this.b.z + this.c.z) / 3,
        );
    }
}

function main() {
    const debug = new Debug(ctx);
    debug.start("Frame Time");

    Canvas.clear();

    let scene = new Mesh();
    scene.append(icosphereMesh);

    // Graphics code goes here :)
    ctx.strokeStyle = "white";

    let faces = [];

    for (let i = 0; i < scene.indices.length; i += 3) {
        const a = project(scene.vertices[scene.indices[i]]);
        const b = project(scene.vertices[scene.indices[i + 1]]);
        const c = project(scene.vertices[scene.indices[i + 2]]);

        faces.push([a, b, c]);
    }

    for (let i = 0; i < faces.length; i++) {
        const face = faces[i];
        drawTriangle(face[0], face[1], face[2], true, false);
    }

    debug.end("Frame Time", "ms");
    debug.draw();

    window.requestAnimationFrame(main);
}

main();