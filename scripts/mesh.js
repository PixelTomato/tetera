import { readFile } from "./file.js";
import { Vector3 } from "./vectors.js";

class Mesh {
    constructor(path) {
        this.vertices = [];
        this.indices = [];
        this.colors = [];

        if (typeof (path) == "string") this.load(path);
    }

    load(path) {
        const data = readFile(path);

        const parsed = data.split("\n");

        for (let i = 0; i < parsed.length; i++) {
            const line = parsed[i].split(" ");

            switch (line[0]) {
                case "v":
                    this.vertices.push(new Vector3(
                        parseFloat(line[1]),
                        parseFloat(line[2]),
                        parseFloat(line[3]),
                    ));
                    break;
                case "f":
                    for (let a = 1; a < line.length; a++) {
                        const face = line[a].split("/");

                        const index = face[0] - 1;
                        const uv = face[1];
                        const normal = face[2];

                        this.indices.push(index);
                    }
                    break;
            }
        }
    }

    set(mesh) {
        this.vertices = mesh.vertices;
        this.indices = mesh.indices;
        this.colors = mesh.colors;
    }

    append(mesh) {
        this.vertices.push(...mesh.vertices);
        this.indices.push(...mesh.indices);
        this.colors.push(...mesh.colors);
    }

    translate(offset) {
        for (let i = 0; i < this.vertices.length; i++) {
            this.vertices[i].add(offset);
        }
    }
}

export { Mesh };