export default function init(scene) {

    let anims = scene.anims;

    //PORTAL
        anims.create({
            key: "portal",
            frames: anims.generateFrameNumbers("purplePortal", { start: 0, end: 7 }),
            frameRate: 10,
            repeat: -1,
        });
        anims.create({
            key: "portal-spawn",
            frames: anims.generateFrameNumbers("purplePortal", { start: 8, end: 15 }),
            frameRate: 10,
            repeat: 0,
        });
        anims.create({
            key: "portal-disapear",
            frames: anims.generateFrameNumbers("purplePortal", { start: 16, end: 22 }),
            frameRate: 10,
            repeat: 0,
        });

    // ADVENTURER
          anims.create({
            key: "adventurer-idle",
            frames: anims.generateFrameNumbers("adventurerSprites", { start: 0, end: 12 }),
            frameRate: 10,
            repeat: -1,
          });
          anims.create({
            key: "adventurer-walk",
            frames: anims.generateFrameNumbers("adventurerSprites", { start: 15, end: 20 }),
            frameRate: 8,
            repeat: -1
          });
          anims.create({
            key: "adventurer-jump",
            frames: anims.generateFrameNumbers("adventurerSprites", { start: 65, end: 70 }),
            frameRate: 12,
            hideOnComplete: false
          });
          anims.create({
            key: "adventurer-attack-1",
            frames: anims.generateFrameNumbers("adventurerSprites", { start: 26, end: 33 }),
            frameRate: 12,
          });
          anims.create({
            key: "adventurer-attack",
            frames: anims.generateFrameNumbers("adventurerSprites", { start: 52, end: 60 }),
            frameRate: 12,
            repeat: 0
          });
          anims.create({
            key: "adventurer-hurt",
            frames: anims.generateFrameNumbers("adventurerSprites", { start: 78, end: 81 }),
            frameRate: 12,
            hideOnComplete: false,
            repeat: 0
          });
          anims.create({
            key: "adventurer-dead",
            frames: anims.generateFrameNumbers("adventurerSprites", { start: 91, end: 97 }),
            frameRate: 12,
            hideOnComplete: false,
            repeat: 0
          });
    //IMP
        anims.create({
            key: "imp-idle",
            frames: anims.generateFrameNumbers("impSprites", { start: 0, end: 6 }),
            frameRate: 10,
            repeat: -1,
        });
        anims.create({
            key: "imp-walk",
            frames: anims.generateFrameNumbers("impSprites", { start: 8, end: 15 }),
            frameRate: 8,
            repeat: -1
        });
        anims.create({
            key: "imp-attack",
            frames: anims.generateFrameNumbers("impSprites", { start: 16, end: 21 }),
            frameRate: 12,
            hideOnComplete: false
        });
        anims.create({
            key: "imp-hurt",
            frames: anims.generateFrameNumbers("impSprites", { start: 24, end: 27 }),
            frameRate: 12,
        });
        anims.create({
            key: "imp-dead",
            frames: anims.generateFrameNumbers("impSprites", { start: 32, end: 37 }),
            frameRate: 12,
            repeat: 0
        });

}