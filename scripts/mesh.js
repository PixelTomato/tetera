import { Vector3 } from "./vectors.js";

class Mesh {
    constructor(path) {
        this.vertices = [];
        this.indices = [];
        this.colors = [];

        if (path) this.load(path);
    }

    load(path) {
        fetch(path)
            .then(r => r.text())
            .then(data => {
                const parsed = data.split("\n");

                for (let i = 0; i < parsed.length; i++) {
                    const line = parsed[i].split(" ");

                    switch (line[0]) {
                        case "v":
                            this.vertices.push(new Vector3(line[1], line[2], line[3]));
                            break;
                        case "f":
                            for (let a = 1; a < line.length - 1; a++) {
                                const face = line[a].split("/");

                                const index = face[0] - 1;
                                const uv = face[1];
                                const normal = face[2];

                                this.indices.push(index);
                            }
                            break;
                    }
                }
            });
    }

    append(mesh) {
        this.vertices.push(mesh.vertices);
        this.indices.push(mesh.indices);
        this.colors.push(mesh.colors);
    }
}

export { Mesh };