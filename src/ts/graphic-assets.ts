import * as PIXI from 'pixi.js';
import Game from './game';

interface ISpriteCollection {
    logoText?: PIXI.Sprite;
    [key: string]: PIXI.Sprite;
}

export default class GraphicAssets {
    private game: Game;
    private loader = PIXI.Loader.shared;
    public sprites: ISpriteCollection = {};
    public spritesLoaded = false;

    // layers
    public baseLayer = new PIXI.Container();
    public logoLayer = new PIXI.Container();
    public maskLayer = new PIXI.Container();
    public overlayLayer = new PIXI.Container();

    constructor(game: Game) {
        this.game = game;
        this.loadAssets();
    }

    public placeAssets(): void {
        this.game.app.stage.addChild(this.baseLayer);
        this.game.app.stage.addChild(this.maskLayer);
        this.game.app.stage.addChild(this.logoLayer);
        this.game.app.stage.addChild(this.overlayLayer);
    }

    public loadAssets(): void {
        this.loader.add('logoText', '../assets/logo-bolt-text.svg');

        this.loader.load((loader, resources) => {
            this.sprites.logoText = new PIXI.Sprite(resources.logoText.texture);
        });

        this.loader.onComplete.add(() => {
            this.spritesLoaded = true;
        });
    }
}
