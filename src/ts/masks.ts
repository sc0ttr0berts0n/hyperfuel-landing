import * as PIXI from 'pixi.js';
import Game from './game';
import Victor = require('victor');

export default class Masks {
    private game: Game;
    public pos: number;
    public el = new PIXI.Graphics();
    public stageMaxSize: number;
    public stageSize: number;
    public stagePaddingPercent = 0.25;
    public stagePadding: number;
    public stage = new PIXI.Container();
    public upperLeftMask = new PIXI.Sprite(PIXI.Texture.WHITE);
    public lowerRightMask = new PIXI.Sprite(PIXI.Texture.WHITE);
    public upperRightMask = new PIXI.Sprite(PIXI.Texture.WHITE);
    public lowerLeftMask = new PIXI.Sprite(PIXI.Texture.WHITE);

    constructor(game: Game) {
        this.game = game;
        this.stageMaxSize = Math.min(
            this.game.app.renderer.width,
            this.game.app.renderer.height
        );
        this.stagePadding = this.stageMaxSize * this.stagePaddingPercent;
        this.stageSize = this.stageMaxSize - this.stagePadding * 2;
        this.init();
    }

    init() {
        this.game.graphics.maskLayer.addChild(this.stage);
        this.game.graphics.maskLayer.addChild(this.upperLeftMask);
        this.game.graphics.maskLayer.addChild(this.lowerRightMask);
        this.game.graphics.maskLayer.addChild(this.upperRightMask);
        this.game.graphics.maskLayer.addChild(this.lowerLeftMask);
        this.initUpperLeftMask();
        this.initLowerRightMask();
        this.initUpperRightMask();
        this.initLowerLeftMask();
    }

    initStage() {
        // this.el.beginFill(0xcccccc);
        // this.el.drawRect(0, 0, this.stageSize, this.stageSize);
        // this.el.endFill();
        this.stage.addChild(this.el);
        this.stage.position.set(
            this.game.app.renderer.width / 2 - this.stageSize / 2,
            this.game.app.renderer.height / 2 - this.stageSize / 2
        );
    }
    initUpperLeftMask() {
        const mask = this.upperLeftMask;
        mask.scale.set(this.stageMaxSize, this.stageMaxSize);
        mask.x = this.stagePadding + this.stageSize * 0.57579;
        mask.y = this.stagePadding;
        mask.anchor.set(0.5, 1);
        mask.rotation = 0;
    }
    initLowerRightMask() {
        const mask = this.lowerRightMask;
        mask.scale.set(this.stageMaxSize, this.stageMaxSize);
        mask.x = this.stagePadding + this.stageSize * 0.33054;
        mask.y = this.stagePadding + this.stageSize;
        mask.anchor.set(0.5, 0);
        mask.rotation = 0;
    }

    initUpperRightMask() {
        const mask = this.upperRightMask;
        mask.width = this.stageMaxSize * 2;
        mask.height = this.stageMaxSize * 2;
        mask.anchor.set(0, 1);
        mask.x = this.stagePadding + this.stageSize * 0.46076;
        mask.y = this.stagePadding + this.stageSize * 0.46901;
        mask.skew.x = 0;
    }
    initLowerLeftMask() {
        const mask = this.lowerLeftMask;
        mask.width = this.stageMaxSize * 2;
        mask.height = this.stageMaxSize * 2;
        mask.anchor.set(1, 0);
        mask.x = this.stagePadding + this.stageSize * 0.4229177;
        mask.y = this.stagePadding + this.stageSize * 0.6233318;
        mask.skew.x = 0;
    }

    update() {
        if (!this.game.animationComplete) {
            const p = this.game.animationProgress;
            this.upperLeftMask.rotation = p * -0.842994;
            this.lowerRightMask.rotation = p * -0.78574723;
            this.upperRightMask.skew.x = p * -0.24137904;
            this.lowerLeftMask.skew.x = p * -0.24137904;
        }
    }
}
