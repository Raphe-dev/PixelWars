import Spawnable from './spawnable'

export default class Adventurer extends Spawnable {
    constructor(scene, x, y, origin = true) {
        super(scene, x, y, origin);
        this.name = 'adventurer';
        this.range = 32;
        this.sprite.setOrigin(0.15);

    }
}