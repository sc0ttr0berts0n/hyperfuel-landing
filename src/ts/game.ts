import * as PIXI from 'pixi.js';
import GraphicAssets from './graphic-assets';
import AudioAssets from './audio-assets';
import { Howl, Howler } from 'howler';
import Lines from './lines';
import LogoText from './logo-text';
import Masks from './masks';
import Victor = require('victor');

export default class Game {
    public canvas: HTMLCanvasElement;
    public app: PIXI.Application;
    public graphics: GraphicAssets;
    public audio: AudioAssets;
    public frameCount: number = 0;
    private lastRestart: number = 0;
    private paused: boolean = false;
    private muted: boolean = false;
    private lines: Lines;
    public masks: Masks;
    private logoText: LogoText;
    public mouse: Victor;
    public lastMouse: Victor;
    public mouseSpeed = 0;
    public mouseClicked = false;
    public scrollDepth = 0;

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
        this.init();
    }

    private init() {
        if (this.graphics.spritesLoaded) {
            this.lines = new Lines(this);
            this.masks = new Masks(this);
            this.logoText = new LogoText(this);
            this.app.ticker.add((delta) => this.update(delta));
            this.graphics.placeAssets();
            document.addEventListener('mousemove', this.getMousePos.bind(this));
            document.addEventListener('scroll', this.onScroll.bind(this));
            document.addEventListener('mousedown', this.onClick.bind(this));
            document.addEventListener('mouseup', this.onClick.bind(this));
            document.addEventListener('touchstart', this.onClick.bind(this));
            document.addEventListener('touchend', this.onClick.bind(this));
            this.canvas.dataset.loaded = 'true';
        } else {
            setTimeout(() => {
                this.init();
                console.log('loop');
            }, 200);
        }
    }

    private update(delta: number) {
        if (!this.paused && this.graphics.spritesLoaded) {
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
    onClick(e: Event) {
        if (e.type === 'mousedown' || e.type === 'touchstart') {
            this.mouseClicked = true;
        } else if (e.type === 'mouseup' || e.type === 'touchend') {
            this.mouseClicked = false;
        }
    }
    onScroll() {
        this.scrollDepth = window.scrollY;
    }
}
