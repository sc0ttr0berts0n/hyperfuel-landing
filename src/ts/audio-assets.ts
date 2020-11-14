import { Howl } from 'howler';
import Game from './game';

export default class AudioAssets {
    public game: Game;
    public BGM_MAX_VOLUME = 0.1;
    constructor(game: Game) {
        this.game = game;
    }
    playRandomSoundFromArray(arr: Howl[]) {
        const index = Math.floor(Math.random() * arr.length);
        arr[index].play();
    }
}
