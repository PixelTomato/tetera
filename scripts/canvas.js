class Canvas {
    static canvas = null;
    static ctx = null;
    static width = null;
    static halfWidth = null;
    static height = null;
    static halfHeight = null;
    static fov = null;

    static resize() {
        this.canvas.width = this.canvas.clientWidth; 
        this.canvas.height = this.canvas.clientHeight;
        Canvas.width = this.canvas.width;
        Canvas.height = this.canvas.height;
        Canvas.halfWidth = Canvas.width / 2;
        Canvas.halfHeight = Canvas.height / 2;
        Canvas.fov = Canvas.width / 2;
    }

    static clear() {
        this.ctx.clearRect(0, 0, this.canvas.clientWidth, this.canvas.clientHeight);
    }

    static init(id) {
        this.canvas = document.getElementById(id);
        this.ctx = this.canvas.getContext("2d");

        window.addEventListener("resize", Canvas.resize);

        this.resize();

        return this.ctx;
    }
}

export { Canvas };