import * as PIXI from 'pixi.js';
import Game from './game';
import Victor = require('victor');

export default class Lines {
    private game: Game;
    private line: Victor[];
    private container = new PIXI.Container();
    private lineEl = new PIXI.Graphics();
    private purpleEl = new PIXI.Graphics();
    private pointGap = new Victor(10, 30);

    constructor(game: Game) {
        this.game = game;
        this.line = this.initLinePoints();
        this.init();
    }

    private init() {
        this.initLinePoints();
        this.lineEl.x = -this.pointGap.y / 2;
        this.game.graphics.baseLayer.addChild(this.lineEl);
        this.game.graphics.baseLayer.addChild(this.purpleEl);
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
            this.game.scrollDepth / 25 + 8,
            this.pointGap.y
        );
        const lineColor = this.game.mouseClicked ? 0xffffff : 0xffffff;
        el.lineStyle(lineWidth, lineColor, 1);

        // rendering the sine waves height for each point
        const width = this.game.app.renderer.width;
        const height = this.game.app.renderer.height;
        let x = 0;
        let y = height / 2 + this.pointGap.y / 2;
        const mouse = this.game.mouse;
        const maxAmplitude = this.pointGap.y * 2;
        const mouseYFloat = ((mouse.y - height / 2) / height) * 2;
        const amplitude = mouseYFloat * maxAmplitude;
        const t = this.game.frameCount / 50;

        let firstLine = true;

        while (y <= height * 1.5) {
            if (firstLine) {
                el.beginFill(0x4f4b5a);
                el.moveTo(width + this.pointGap.y, -lineWidth);
                el.lineTo(width, -lineWidth);
                el.lineTo(-this.pointGap.x, -lineWidth);
            } else {
            }
            while (x <= width + this.pointGap.y * 2) {
                const theta = x * 0.005 + t;
                const currYOff = Math.sin(theta) * amplitude;
                if (x === 0 && !firstLine) {
                    el.moveTo(x, y + currYOff);
                }
                if (!this.game.mouseClicked) {
                    el.lineTo(x, y + currYOff);
                } else {
                    // const rand = (Math.random() * this.pointGap.y) / 2;
                    const wiggles =
                        (Math.sin((theta * this.pointGap.y) / 4) *
                            this.pointGap.y) /
                        4;
                    el.lineTo(
                        x,
                        y +
                            (-this.game.frameCount % this.pointGap.y) * 2 +
                            -currYOff +
                            wiggles
                    );
                }
                x = x + this.pointGap.x;
            }
            if (firstLine) {
                el.endFill();
            }
            firstLine = false;
            x = 0;
            y = y + this.pointGap.y;
        }
    }
}
