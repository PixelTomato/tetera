import { clamp } from "./math.js";

class Debug {
    constructor(ctx) {
        this.ctx = ctx;
        this.lines = [];
        this.timers = {};
    }

    addLine(name, value, unit) {
        this.lines.push([name, value, unit]);
    }

    draw() {
        this.ctx.fillStyle = "cornflowerblue";
        this.ctx.font = "12px monospace"

        let y = 0;

        this.lines.forEach(line => {
            const name = line[0];
            const value = isNaN(line[1]) ? line[1] : line[1].toFixed(2);
            const unit = line[2] || "";
            this.ctx.fillText(`${name} - ${value} ${unit}`, 2, y += 12);
        });
    }

    start(name) {
        this.timers[name] = performance.now();
    }

    end(name, unit) {
        const time = performance.now() - this.timers[name];
        this.addLine(name, time, unit);

        return time;
    }

    drawProfiler(x, y, stat) {
        this.ctx.fillStyle = "white";
        this.ctx.strokeStyle = "white";

        this.ctx.strokeRect(x, y, 200, 50);

        this.ctx.beginPath();
        this.ctx.moveTo(x, y + 18);
        this.ctx.lineTo(x + 200, y + 18);
        this.ctx.stroke();

        for (let i = 1; i < 100; i++) {
            const time = clamp(stat[100 - i], 0, 24.75);
            const g = 320 - time * 10;
            this.ctx.strokeStyle = `rgb(${255 - g}, ${g}, 0)`;
            this.ctx.beginPath();
            this.ctx.moveTo(x + i * 2, y + 50);
            this.ctx.lineTo(x + i * 2, y + 50 - time * 2);
            this.ctx.stroke();
        }
    }
}

export { Debug };