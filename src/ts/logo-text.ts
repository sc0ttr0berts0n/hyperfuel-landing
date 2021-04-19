import * as PIXI from 'pixi.js';
import Game from './game';
import Victor = require('victor');

export default class LogoText {
    private game: Game;
    public pos: number;
    public el: PIXI.Sprite;

    constructor(game: Game) {
        this.game = game;
        this.el = this.game.graphics.sprites.logoText;
        this.init();
    }

    init() {
        this.game.graphics.logoLayer.addChild(this.el);

        const stage = this.game.masks.stage;
        const stageSize = this.game.masks.stageSize;

        this.el.x = this.game.masks.stagePadding + stageSize * 0.4919532;
        this.el.y = this.game.masks.stagePadding + stageSize * 0.1874499;
        this.el.width = stageSize * 0.4855876;
        this.el.height = stageSize * 0.2636863;
    }
}
