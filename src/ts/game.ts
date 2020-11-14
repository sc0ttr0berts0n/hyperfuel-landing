import * as PIXI from 'pixi.js';
import GraphicAssets from './graphic-assets';
import AudioAssets from './audio-assets';
import { Howl, Howler } from 'howler';
import Lines from './lines';
import Victor = require('victor');

export default class Game {
    private canvas: HTMLCanvasElement;
    public app: PIXI.Application;
    public graphics: GraphicAssets;
    public audio: AudioAssets;
    public frameCount: number = 0;
    private lastRestart: number = 0;
    private paused: boolean = false;
    private muted: boolean = false;
    private lines: Lines;
    public mouse: Victor;
    public lastMouse: Victor;
    public mouseSpeed = 0;

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        this.app = new PIXI.Application({
            view: canvas,
            transparent: true,
            antialias: true,
            resizeTo: canvas,
        });
        this.graphics = new GraphicAssets(this);
        this.audio = new AudioAssets(this);
        this.mouse = new Victor(
            this.app.renderer.width / 2,
            this.app.renderer.height / 3
        );
        this.lastMouse = this.mouse.clone();
        this.lines = new Lines(this);
        this.init();
    }

    private init() {
        this.app.ticker.add((delta) => this.update(delta));
        this.graphics.placeAssets();
        document.addEventListener('mousemove', this.getMousePos.bind(this));
    }

    private update(delta: number) {
        if (!this.paused) {
            this.frameCount++;
            this.lines.update(delta);
        }
    }
    public reinit() {
        this.lastRestart = this.frameCount;
    }
    getMousePos(e: MouseEvent) {
        this.lastMouse = this.mouse.clone();
        this.mouse.x = e.x;
        this.mouse.y = e.y;
        const deltaX = this.lastMouse.x - this.mouse.x;
        const deltaY = this.lastMouse.y - this.mouse.y;
        this.mouseSpeed = Math.sqrt(Math.pow(deltaX, 2) + Math.pow(deltaY, 2));
    }
}
