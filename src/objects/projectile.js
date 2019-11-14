export default class Projectile {
    constructor(scene, x, y, origin, damage){
        let anims = scene.anims;
        let speed = 200;
        this.damage = damage;
        anims.create({
            key: "imp-projectile-start",
            frames: anims.generateFrameNumbers("impSprites", { start: 40, end: 42 }),
            frameRate: 30,
            hideOnComplete: false,
        });
        anims.create({
            key: "imp-projectile-end",
            frames: anims.generateFrameNumbers("impSprites", { start: 43, end: 46 }),
            frameRate: 30,
            hideOnComplete: true,
        });

        this.sprite = scene.projectileGroup.create(x + 8, y + 16, "impSprites", 45);
        let newVelocity = origin ? speed : -speed;
        this.sprite.flipX = !origin;
        this.sprite.body.setVelocityX(newVelocity);
        this.sprite.body.setSize(32, 10);
        this.sprite.anims.play('imp-projectile-start');
        

        if(origin){
            this.targetGroup = scene.spawnedEnemyUnitGroup;
          } else {
            this.targetGroup = scene.spawnedUnitGroup;
          }
        scene.physics.add.overlap(this.sprite, this.targetGroup, this.onMeetSpawn, false, this)

    }

    onMeetSpawn(projectile, spawn) {
            if(projectile.anims.getCurrentKey() !== 'imp-projectile-end'){
                projectile.setVelocityX(0);
                projectile.anims.play('imp-projectile-end');
            }
            if(projectile.anims.getCurrentKey() == 'imp-projectile-end' && projectile.anims.currentFrame.isLast){
                spawn.parent.getHit(this.damage);
                this.sprite.destroy();
            }

    }


}