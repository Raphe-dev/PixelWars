export default class Spawnable {

    constructor (scene, x, y, origin = true) {
        this.id = 
        this.origin = origin;
        this.scene = scene;
        this.x = x;
        this.y = y;
        this.range = 0;
        this.speed = 3;
        this.life = 5;
        this.damage = 1;
        this.defense = 0;
        this.cooldown = Math.random(0, 10) * 10;
        this.target = null;
        this.flipX = false;
        this.state = 'idle';
        this.name = '';

        if(this.origin){
          this.sprite = this.scene.spawnedUnitGroup.create(x, y, "adventurerSprites", 0);
          this.targetGroup = this.scene.spawnedEnemyUnitGroup;
          this.group = this.scene.spawnedUnitGroup;
        } else {
          this.sprite = this.scene.spawnedEnemyUnitGroup.create(x, y, "adventurerSprites", 0);
          this.targetGroup = this.scene.spawnedUnitGroup;
          this.group = this.scene.spawnedEnemyUnitGroup;
        }
        this.sprite.flipX = !this.origin;
        this.sprite.parent = this;
      //specific to template sprite
        this.sprite.scaleX = 1.5;
        this.sprite.scaleY = 1.5;
        this.sprite.setOrigin(0.5)
        this.sprite.body.setSize(15,22);
        this.sprite.body.setOffset(10,10);
        this.sprite.body.setImmovable();
    }

    update(time, delta) {
      this.sprite.depth = this.sprite.y - this.sprite.height / 2;

      if(this.state != 'dead'){
        if(!this.target ){
          this.moveForward(delta);
          this.checkForTarget();
        } else {
            if(this.state == 'walk') {
              this.moveToTarget(delta);
            } else  {
              this.attackTarget();
            }
        }
      } else {
        this.sprite.body.velocity.y = 0;
        this.sprite.body.velocity.x = 0;
      }
      if(this.state == 'hurt' && (this.sprite.anims.getCurrentKey() == `${this.name}-hurt`) && this.sprite.anims.currentFrame.isLast ) {
        this.state = 'idle';
      }

      if(this.state != 'dead') {
        if(this.state !== this.sprite.anims.getCurrentKey() ) {
          this.sprite.anims.play(`${this.name}-${this.state}`, true)
        }
      }
    }

    moveForward(delta) {
        this.state = 'walk';
        let newVelocity = this.origin ? this.speed * delta : -this.speed * delta
        if(this.sprite.body.onWall()) {
          if(this.sprite.y < this.scene.height / 2) {
            this.sprite.body.setVelocityY(newVelocity);
          } else {
            this.sprite.body.setVelocityY(-newVelocity);            
          }

        } else {
          this.sprite.body.setVelocityY(0);
          this.sprite.body.setVelocityX(newVelocity);
        }
        
    }

    checkForTarget() {
        let bounds = this.sprite.getBounds();
        bounds.width += this.range;
        bounds.height += this.range;
        bounds.x -= this.range / 2;
        bounds.y -= this.range/ 2;

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

    moveToTarget(delta) {
      var velocity = new Phaser.Math.Vector2();
      let angle = Phaser.Math.Angle.BetweenPoints(this.sprite, this.target);
      this.scene.physics.velocityFromRotation(angle, this.speed * delta, velocity);

      if(this.sprite.y < this.target.y) {
        velocity.y += 20;
      }

      this.sprite.body.setVelocity(velocity.x, velocity.y);

      let bounds = this.sprite.getBounds();
      let targetBounds = this.target.getBounds();
      let range = -32;
      bounds.width += range;
      bounds.height += range;
      bounds.x -= range / 2;
      bounds.y -= range/ 2;
      if(Phaser.Geom.Rectangle.Overlaps(bounds, targetBounds)) {
        this.state = 'attack'
      }
    }

    attackTarget() {
      if(this.target.parent.state == 'dead'){
        this.target = null;
        return;
      }
      if(this.origin && this.sprite.x > this.target.x) {
        this.sprite.body.setVelocityX(-10);
      } else {
        this.sprite.body.velocity.y = 0;
        this.sprite.body.velocity.x = 0;
      }

      if(this.cooldown < 1 && this.state != 'hurt') {
        this.state = 'attack';
        this.target.parent.getHit(this.damage);
        this.cooldown = 80;
      } else {
        if(this.state == 'attack' && this.sprite.anims.currentFrame.isLast) {
          this.state = 'idle'
        }
        this.cooldown -= 1;
      }
    }

    getHit(damage) {
      console.log(damage)
      this.state = 'hurt'
      this.life -= damage - this.defense;
      if(this.life < 1) {
        this.state = 'dead'
        this.sprite.anims.play(`${this.name}-${this.state}`, true)
        setTimeout(() => {
          this.sprite.destroy();
        },1000)
      }
    }
}