function clamp(value, a, b) { return Math.min(Math.max(value, a), b) };

function random(a, b) { return Math.random() * (a - b) + b }

export { clamp, random }