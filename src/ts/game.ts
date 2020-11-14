import * as PIXI from 'pixi.js';
import GraphicAssets from './graphic-assets';
import AudioAssets from './audio-assets';
import { Howl, Howler } from 'howler';

export default class Game {
    private canvas: HTMLCanvasElement;
    public app: PIXI.Application;
    public graphics: GraphicAssets;
    public audio: AudioAssets;
    public frameCount: number = 0;
    private lastRestart: number = 0;
    private paused: boolean = false;
    private muted: boolean = false;
    public frameCountText = new PIXI.Text('0', { fontSize: 72 });

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        this.app = new PIXI.Application({
            view: canvas,
            width: window.innerWidth,
            height: window.innerHeight,
            transparent: true,
        });
        this.graphics = new GraphicAssets(this);
        this.audio = new AudioAssets(this);
        this.init();
    }

    private init() {
        this.app.ticker.add((delta) => this.update(delta));
        this.graphics.placeAssets();

        // place framecount in center
        this.graphics.baseLayer.addChild(this.frameCountText);
    }

    private update(delta: number) {
        if (!this.paused) {
            this.frameCount++;

            // place frame count text
            const textPos = {
                x: this.app.renderer.width / 2 - this.frameCountText.width / 2,
                y:
                    this.app.renderer.height / 2 -
                    this.frameCountText.height / 2,
            };
            this.frameCountText.text = this.frameCount.toString();
            this.frameCountText.position.set(textPos.x, textPos.y);
        }
    }
    public reinit() {
        this.lastRestart = this.frameCount;
    }
}
