class Vector2 {
    constructor(x, y) {
        this.x = x || 0;
        this.y = y || 0;
    }

    static get zero() { return new Vector2(0, 0) };

    static squaredDistance(a, b) {
        return Math.sqrt((b.x - a.x) ** 2 + (b.y - a.y) ** 2);
    }

    static distance(a, b) {
        return Math.sqrt(this.squaredDistance(a, b));
    }

    static add(...vectors) {
        return vectors.reduce((a, b) => new Vector2(a.x + b.x, a.y + b.y), Vector2.zero);
    }

    static subtract(...vectors) {
        return vectors.reduce((a, b) => new Vector2(a.x - b.x, a.y - b.y), Vector2.zero);
    }

    set(a) {
        this.x = a.x;
        this.y = a.y;
    }

    add(...vectors) {
        this.set(Vector2.add(...vectors));
        return this;
    }

    subtract(...vectors) {
        this.set(Vector2.subtract(...vectors));
        return this;
    }

    get magnitude() {
        return Math.sqrt(this.x ** 2 + this.y ** 2);
    }

    toString() {
        return `Vector2(x: {this.x}, y: {this.y})`;
    }
}

class Vector3 {
    constructor(x, y, z) {
        this.x = x || 0;
        this.y = y || 0;
        this.z = z || 0;
    }

    static get zero() { return new Vector3(0, 0, 0) };

    static squaredDistance(a, b) {
        return (b.x - a.x) ** 2 + (b.y - a.y) ** 2 + (b.z - a.z) ** 2;
    }

    static distance(a, b) {
        return Math.sqrt(this.squaredDistance(a, b));
    }

    static add(...vectors) {
        return vectors.reduce((a, b) => new Vector3(a.x + b.x, a.y + b.y, a.z + b.z), Vector3.zero);
    }

    static subtract(...vectors) {
        return vectors.reduce((a, b) => new Vector3(a.x - b.x, a.y - b.y, a.z + b.z), Vector3.zero);
    }

    set(a) {
        this.x = a.x;
        this.y = a.y;
        this.z = a.z;
    }

    add(vector) {
        this.set(Vector3.add(this, vector));
        return this;
    }

    subtract(vector) {
        this.set(Vector3.subtract(this, vector));
        return this;
    }

    get magnitude() {
        return Math.sqrt(this.x ** 2 + this.y ** 2 + this.z ** 2);
    }

    toString() {
        return `Vector3(x: {this.x}, y: {this.y}, z: {this.z})`;
    }
}

export { Vector2, Vector3 };