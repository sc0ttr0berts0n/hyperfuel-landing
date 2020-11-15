import * as PIXI from 'pixi.js';
import Game from './game';
import Victor = require('victor');

export default class Lines {
    private game: Game;
    private line: Victor[];
    private container = new PIXI.Container();
    private lineEl = new PIXI.Graphics();
    private pointGap = new Victor(20, 50);

    constructor(game: Game) {
        this.game = game;
        this.line = this.initLinePoints();
        this.init();
    }

    private init() {
        this.initLinePoints();
        this.lineEl.x = -this.pointGap.y / 2;
        this.game.graphics.baseLayer.addChild(this.lineEl);
    }

    private initLinePoints() {
        const arr: Victor[] = [];
        let x = 0;
        while (x <= this.game.app.renderer.width) {
            let vecX = x;
            let vecY = this.game.app.renderer.height / 2;
            arr.push(new Victor(vecX, vecY));
            x = x + this.pointGap.x;
        }
        return arr;
    }

    public update(delta: number) {
        this.drawLine(this.lineEl, delta);
    }
    private drawLine(el: PIXI.Graphics, delta: number) {
        // clear and set line style
        el.clear();
        const lineWidth = Math.min(
            this.game.scrollDepth / 25 + 10,
            this.pointGap.y
        );
        el.lineStyle(lineWidth, 0x282228, 1);

        // rendering the sine waves height for each point
        const width = this.game.app.renderer.width;
        const height = this.game.app.renderer.height;
        let x = 0;
        let y = -height / 2 + (this.game.frameCount % this.pointGap.y);
        const mouse = this.game.mouse;
        const maxAmplitude = height / 6;
        const mouseYFloat = ((mouse.y - height / 2) / height) * 2;
        const amplitude = mouseYFloat * maxAmplitude;
        const t = this.game.frameCount / 300;

        while (y <= height * 1.5) {
            while (x <= width + this.pointGap.y * 2) {
                const maxTheta = x * 0.005 + t;
                const currYOff = Math.sin(maxTheta + t) * amplitude;
                if (x === 0) {
                    el.moveTo(x, y + currYOff);
                }
                el.lineTo(x, y + currYOff);
                x = x + this.pointGap.x;
            }
            x = 0;
            y = y + this.pointGap.y;
        }
    }
}
