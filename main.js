import { Vector2, Vector3 } from "./scripts/vectors.js";
import { Transform } from "./scripts/transforms.js";
import { Canvas } from "./scripts/canvas.js";
import { Input } from "./scripts/input.js";
import { Debug } from "./scripts/debug.js";
import { Mesh } from "./scripts/mesh.js";

const ctx = Canvas.init("canvas");
Input.init();

const icosphereMesh = new Mesh("./models/suzanne.obj");

const transform = new Transform();

let rot = Math.sin(performance.now() / 500) / 8;

function transforms(point, sin, cos) {
    transform.copyRotation(sin, cos);

    return transform
        .set(point)
        .rotateY()
        .translate(new Vector3(0, sin / 5, -3))
        .output
}

function project(point) {
    return new Vector2(
        point.x * Canvas.fov / point.z + Canvas.halfWidth,
        point.y * Canvas.fov / point.z + Canvas.halfHeight,
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

    get normal() {
        const s1 = Vector3.subtract(this.a, this.b);
        const s2 = Vector3.subtract(this.b, this.c);

        return Vector3.dotProduct(s1, s2);

        //return Vector3.dotProduct(Vector3.crossProduct(s1, s2), new Vector3(0, 0, 0));
    }
}

function main() {
    const debug = new Debug(ctx);
    debug.start("Frame Time");

    Canvas.clear();

    // Create the scene and append mesh vertices
    debug.start("Scene Creation");
    let scene = new Mesh();
    scene.append(icosphereMesh);
    debug.end("Scene Creation", "ms");

    // Graphics code goes here :)
    ctx.strokeStyle = "white";

    let faces = [];

    // Bundle vertices into triangular faces
    rot = Math.sin(performance.now() / 500) / 8;
    const amt = performance.now() / 500 / 3;
    const sin = Math.sin(amt);
    const cos = Math.cos(amt);

    debug.start("Transforms");
    for (let i = 0; i < scene.indices.length; i += 3) {
        faces.push(new Face(
            transforms(scene.vertices[scene.indices[i]], sin, cos),
            transforms(scene.vertices[scene.indices[i + 1]], sin, cos),
            transforms(scene.vertices[scene.indices[i + 2]], sin, cos),
        ));
    }
    debug.end("Transforms", "ms");

    // Apply a simple depth sort
    debug.start("Depth Sort");
    faces.sort((a, b) => Vector3.squaredDistance(b.center, Vector3.zero) - Vector3.squaredDistance(a.center, Vector3.zero));
    debug.end("Depth Sort", "ms");

    // Project face vertices to screenspace
    debug.start("Projection");
    for (let i = 0; i < faces.length; i++) {
        const face = faces[i];
        faces[i] = [
            project(face.a),
            project(face.b),
            project(face.c),
            face.normal
        ];
    }
    debug.end("Projection", "ms");

    // Draw faces in furthest-first order
    debug.start("Render Pass");
    for (let i = 0; i < faces.length; i++) {
        const face = faces[i];

        ctx.fillStyle = `hsl(218.54deg, 79.19%, ${66.08 - face[3] * 1.4}%)`;
        ctx.strokeStyle = ctx.fillStyle;

        drawTriangle(face[0], face[1], face[2], true, true);
    }
    debug.end("Render Pass", "ms");

    debug.end("Frame Time", "ms");

    debug.draw();

    window.requestAnimationFrame(main);
}

main();