import Spawnable from './spawnable'
import Projectile from './projectile'

export default class Adventurer extends Spawnable {
    constructor(scene, x, y, origin = true) {
        super(scene, x, y, origin);
          this.name = 'imp';
          this.range = 250;
          this.speed = 5;
          this.sprite.body.setSize(15, 15);
          this.sprite.body.setOffset(8, 16);
          this.sprite.setOrigin(0.3);

    }

    checkForTarget() {
      let bounds = this.sprite.getBounds();
      bounds.width += this.range;
      bounds.height += this.range / 6;
      bounds.x -= this.range / 2;
      bounds.y -= (this.range / 6 ) / 2;

      let targetBounds, entry;
      for(let i = 0; i < this.targetGroup.children.entries.length; i++){
        entry = this.targetGroup.children.entries[i]
        if(entry.parent.state !== 'dead') {
          targetBounds = entry.getBounds();
          if(Phaser.Geom.Rectangle.Overlaps(bounds, targetBounds)) {
            this.target = entry;
          }
        }
      }
    }

    moveToTarget(){
        if(Math.round(this.sprite.y) != Math.round(this.target.y)) {
          this.sprite.body.velocity.x = 0;
          this.sprite.y < this.target.y ? this.sprite.y += 1  : this.sprite.y -= 1;
        } else {
          this.state = 'attack';
        }
    }

    attackTarget() {
      if(this.target.parent.state == 'dead'){
          this.target = null;
          return;
        }
          this.sprite.body.velocity.y = 0;
          this.sprite.body.velocity.x = 0;
        
      if(this.sprite.y - 16 > this.target.y || this.sprite.y + 16 < this.target.y){
        this.state = 'walk'
        return;
      }

      if(this.cooldown < 1 && this.state != 'hurt') {
        this.state = 'attack';
        new Projectile(this.scene, this.sprite.x, this.sprite.y, this.origin, this.damage);
        this.cooldown = 100;
      } else {
        if(this.state == 'attack' && this.sprite.anims.currentFrame.isLast) {
          this.state = 'idle';
        }
        this.cooldown -= 1;
      }
    }
}