import { Vector3 } from "./vectors.js";
import { Canvas } from "./canvas.js";

class Transform {
    constructor(point) {
        this.point = point || new Vector3(0, 0, 0);
        this.sin = 1;
        this.cos = 1;
    }

    set(point) {
        this.point.set(point);
        return this;
    }

    setRotation(angle) {
        this.sin = Math.sin(angle);
        this.cos = Math.cos(angle);
    }

    copyRotation(sin, cos) {
        this.sin = sin;
        this.cos = cos;
    }

    rotateX() {
        this.point.setXYZ(
            this.point.x,
            this.point.y = this.point.y * this.cos - this.point.z * this.sin,
            this.point.z = this.point.y * this.sin + this.point.z * this.cos,
        );

        return this;
    }

    rotateY() {
        this.point.setXYZ(
            this.point.z * this.sin + this.point.x * this.cos,
            this.point.y,
            this.point.z * this.cos - this.point.x * this.sin,
        );

        return this;
    }

    rotateZ() {
        this.point.x = this.point.x * this.cos - this.point.y * this.sin;
        this.point.y = this.point.x * this.sin + this.point.y * this.cos;
        return this;
    }

    translate(offset) {
        this.point.x += offset.x;
        this.point.y += offset.y;
        this.point.z += offset.z;
        return this;
    }

    uniformScale(factor) {
        this.point.x *= factor;
        this.point.y *= factor;
        this.point.z *= factor;
        return this;
    }

    scale(factor) {
        this.point.x *= factor.x;
        this.point.y *= factor.y;
        this.point.z *= factor.z;
        return this;
    }

    // project() {
    //     this.point.x = this.point.x * Canvas.fov / this.point.z + Canvas.halfWidth;
    //     this.point.y = this.point.y * Canvas.fov / this.point.z + Canvas.halfHeight;
    //     this.point.z = 0;
    //     return this;
    // }

    get output() {
        return this.point.copy();
    }
}

function rotateX(point, sin, cos) {
    return new Vector3(
        point.x,
        point.y * cos - point.z * sin,
        point.y * sin + point.z * cos,
    );
}

function rotateY(point, sin, cos) {
    return new Vector3(
        point.z * sin + point.x * cos,
        point.y,
        point.z * cos - point.x * sin,
    );
}

function rotateZ(point, sin, cos) {
    return new Vector3(
        point.x * cos - point.y * sin,
        point.x * sin + point.y * cos,
        point.z,
    );
}

function translate(point, offset) {
    return new Vector3(
        point.x + offset.x,
        point.y + offset.y,
        point.z + offset.z,
    );
}

export { Transform, rotateX, rotateY, rotateZ, translate };