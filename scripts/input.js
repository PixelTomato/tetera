import { Vector2 } from "./vectors.js";

class Input {
    static mouse = {
        position: new Vector2(0, 0),
        clicked: false,
    };

    static mouseX = 0;
    static mouseY = 0;
    static mouseDown = false;

    static init() {
        window.addEventListener("mousemove", event => {
            this.mouse.position.x = this.mouseX = event.clientX;
            this.mouse.position.y = this.mouseY = event.clientY;
        });

        window.addEventListener("mousedown", () => {
            this.mouse.clicked = this.mouseDown = true;
        });

        window.addEventListener("mouseup", () => {
            this.mouse.clicked = this.mouseDown = false;
        });
    }
}

export { Input };