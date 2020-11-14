import * as PIXI from 'pixi.js';
import Game from './game';

export default class GraphicAssets {
    private game: Game;

    // layers
    public baseLayer = new PIXI.Container();
    public overlayLayer = new PIXI.Container();

    constructor(game: Game) {
        this.game = game;
    }

    public placeAssets(): void {
        this.game.app.stage.addChild(this.baseLayer);
        this.game.app.stage.addChild(this.overlayLayer);
    }
}
