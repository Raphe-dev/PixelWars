import Adventurer from './adventurer';
import Imp from './imp';

export default class Portal  {
    constructor(scene, x, y, origin, spawnable) {
        this.scene = scene;
        this.origin = origin;
        this.spawnable = spawnable;

        if(this.origin){
            this.sprite = this.scene.spawnedUnitGroup.create(x, y, "purplePortal", 0);
          } else {
            this.sprite = this.scene.spawnedEnemyUnitGroup.create(x, y, "purplePortal", 0);
          }
        this.sprite.parent = this;
        this.sprite.setOrigin(0.2);

        this.sprite.anims.play('portal-spawn');
    }

    update(){
        if(this.sprite.anims.getCurrentKey() == `portal-spawn` && this.sprite.anims.currentFrame.isLast ) {
            this.sprite.anims.play('portal');
        } if(this.sprite.anims.getCurrentKey() == `portal` && this.sprite.anims.currentFrame.isLast ) {
            this.sprite.anims.play('portal-disapear');
            let newx = this.sprite.x;
            this.origin ? newx += 16 : newx -= 16;
            if(this.spawnable == 'adventurer') {
                new Adventurer(this.scene, newx , this.sprite.y, this.origin)
            } else if(this.spawnable == 'imp') {
                new Imp(this.scene, newx, this.sprite.y, this.origin)
            }
            setTimeout(() => {
                this.sprite.destroy();
            },1500)
        }
        
    }
}