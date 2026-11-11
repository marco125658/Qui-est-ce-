/**
 * confetti.js — pluie de confettis (canvas) pour le pop-up d'anniversaire.
 * Utilisation : Confetti.start() puis Confetti.stop().
 * Réglages : CONFETTI_COUNT (quantité), CONFETTI_COLORS (couleurs).
 */

const Confetti = (function () {
    const CONFETTI_COUNT = 140;
    const CONFETTI_COLORS = ["#FF1717", "#38B6FF", "#FFFFFF", "#FFD400"];

    let canvas = null;
    let ctx = null;
    let pieces = [];
    let frameId = null;

    function random(min, max) {
        return min + Math.random() * (max - min);
    }

    function createPiece(startAbove) {
        return {
            x: random(0, window.innerWidth),
            y: startAbove ? random(-window.innerHeight, 0) : random(0, window.innerHeight),
            size: random(7, 14),
            speed: random(1.5, 4),
            sway: random(0.5, 2),
            phase: random(0, Math.PI * 2),
            angle: random(0, Math.PI * 2),
            spin: random(-0.15, 0.15),
            color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)]
        };
    }

    function resize() {
        const ratio = window.devicePixelRatio || 1;
        canvas.width = window.innerWidth * ratio;
        canvas.height = window.innerHeight * ratio;
        ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    }

    function draw() {
        ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

        pieces.forEach(function (p) {
            p.y += p.speed;
            p.phase += 0.04;
            p.x += Math.sin(p.phase) * p.sway;
            p.angle += p.spin;

            if (p.y > window.innerHeight + 20) {
                p.y = -20;
                p.x = random(0, window.innerWidth);
            }

            ctx.save();
            ctx.translate(p.x, p.y);
            ctx.rotate(p.angle);
            ctx.fillStyle = p.color;
            ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
            ctx.restore();
        });

        frameId = requestAnimationFrame(draw);
    }

    function start() {
        if (canvas || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

        canvas = document.createElement("canvas");
        canvas.className = "confetti-canvas";
        canvas.setAttribute("aria-hidden", "true");
        document.body.appendChild(canvas);
        ctx = canvas.getContext("2d");

        resize();
        window.addEventListener("resize", resize);
        pieces = [];
        for (let i = 0; i < CONFETTI_COUNT; i++) {
            pieces.push(createPiece(true));
        }
        draw();
    }

    function stop() {
        if (!canvas) return;
        cancelAnimationFrame(frameId);
        window.removeEventListener("resize", resize);
        canvas.remove();
        canvas = null;
        ctx = null;
        pieces = [];
    }

    return { start: start, stop: stop };
})();
