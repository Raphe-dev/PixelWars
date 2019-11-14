import DungeonTileset from "../assets/DungeonTileset.png";
import MapJson from "../assets/Arena1.json";

import Anims from '../anims';
import PurplePortalAnimation from '../assets/PurplePortalAnimation.png'
import AdventurerSprites from '../assets/AdventurerSprites.png'
import ImpSprites from '../assets/impSprites.png'

import Portal from '../objects/portal';
import Spawnable from '../objects/spawnable';
import Adventurer from '../objects/adventurer';
import Imp from '../objects/imp';

const COLOR_PRIMARY = 0x292E32;
const COLOR_DARK = 0x464655;
const COLOR_LIGHT = 0x323232;
export default class MyScene extends Phaser.Scene {

    constructor (config) {
        super(config); 
    }

    init(data) {
        this.player = {
            money: 50,
            income: 0,
            maxSpawnedUnits: 20,
            spawnedUnits: 0,
            spawnable: [
                '',
                'adventurer',
                'imp'
            ],
            spells: [],
        }

        this.spawned = [];
        this.spawnedEnemy = [];
    }

    preload() {
        this.load.image('DungeonTileset', DungeonTileset);
        this.load.tilemapTiledJSON('map', MapJson);
        this.load.spritesheet("purplePortal",PurplePortalAnimation,{frameWidth: 64,frameHeight: 64});
        this.load.spritesheet("adventurerSprites",AdventurerSprites,{frameWidth: 32,frameHeight: 32});
        this.load.spritesheet("impSprites",ImpSprites,{frameWidth: 32,frameHeight: 32});
    }
      
    create() {
            let { width, height } = this.sys.game.canvas;
            this.height = height;
        //SIDEBAR
            let characters = [ 'one', 'two', 'three', 'four', 'five', 'six']
            let squareSize = 70;
            let padding = 24;
            let sideBarWidth = width / 16 * 1.5;
            this.rexUI.add.roundRectangle(sideBarWidth / 2, height / 2, sideBarWidth, height, 5, COLOR_PRIMARY);
            //SIDEBAR ITEM
                var i = squareSize / 2 + padding;
                var j = 0;
                for(i, j; i < characters.length * (squareSize + padding); i += squareSize + padding, j++){
                    this.add.text(sideBarWidth / 2, i - squareSize + padding, this.player.spawnable[j] ? this.player.spawnable[j] : 'name', {fontSize : '12px'}).setOrigin(0.5);;
                    this.rexUI.add.roundRectangle(sideBarWidth / 2, i, squareSize, squareSize, 5, COLOR_DARK);
                    if(this.player.spawnable[j]){
                        let name = this.player.spawnable[j] + 'Sprites'
                        let sprite = this.add.sprite(sideBarWidth / 2 + 4, i - 8, name, 0);
                        sprite.scale = 2;
                        sprite.setInteractive().on('pointerup', (pointer, localX, localY, event) => {
                            switch(name) {
                                case 'impSprites':
                                    new Imp(this, 100 , Math.random()*350 + 150)
                                    break;
                                case 'adventurerSprites':
                                    new Adventurer(this, 100 , Math.random()*350 + 150)
                            }
                        });
                        console.log(sprite)

                    }
                }
        //TOP BAR
            let topBarWidth =  width - sideBarWidth;
            this.rexUI.add.roundRectangle(sideBarWidth + topBarWidth/2, 16, topBarWidth, 32, 5, COLOR_PRIMARY);
            
            this.add.text(sideBarWidth + 32, 16, `Money : ${this.player.money}`, {fontSize : '12px'}).setOrigin(0.5);
            this.add.text(sideBarWidth + 32 * 5, 16, `Income : ${this.player.income}`, {fontSize : '12px'}).setOrigin(0.5);;
            this.add.text(sideBarWidth + 32 * 10, 16, `Spawned : ${this.player.spawnedUnits} / ${this.player.maxSpawnedUnits}`, {fontSize : '12px'}).setOrigin(0.5);;
        
        //TILEMAP
            let gameOrigin = sideBarWidth;
            let map = this.make.tilemap({ key: 'map'});
            let tileSet = map.addTilesetImage('DungeonTileset');
            let layerObject = map.createDynamicLayer("LayerObject", tileSet, gameOrigin, 32).setDepth(10000);
            let layerWalls = map.createDynamicLayer("LayerWalls", tileSet, gameOrigin, 32);
            let layerGround = map.createDynamicLayer("LayerGround", tileSet, gameOrigin, 32).setDepth(-1);
            let layerDirt = map.createDynamicLayer("LayerDirt", tileSet, gameOrigin, 32).setDepth(-2);

            layerWalls.setCollisionByExclusion(-1);
            layerObject.setCollision( [ 224, 225, 226, 227 ] )

        //GAME
            Anims(this);
            let cameraWidth = width - sideBarWidth;
            this.spawnedUnitGroup = this.physics.add.group();
            this.spawnedEnemyUnitGroup = this.physics.add.group();
            this.projectileGroup = this.physics.add.group();

            this.physics.add.collider(this.spawnedUnitGroup, this.spawnedEnemyUnitGroup);
            this.physics.add.collider(this.spawnedUnitGroup, layerWalls);
            this.physics.add.collider(this.spawnedUnitGroup, layerObject);
            this.physics.add.collider(this.spawnedEnemyUnitGroup, layerWalls);
            this.physics.add.collider(this.spawnedEnemyUnitGroup, layerObject);
                        
            
        //CAMERA
            this.cameras.main.roundPixels = true;


            for(let i = 0; i < 20; i++) {
                setTimeout(() => {
                    let origin = Math.random(0)
                    if(origin > 0.5) {
                        origin = false;
                    } else {
                        origin = true;
                    }
                    let x = origin ? 190 : 930;
                    let y = 150 + Math.random()*300;
                    let spawn;
                    Math.random() < 0.5 ? spawn = 'adventurer' : spawn = 'imp';
                    new Portal(this, x, y, origin, spawn)
                }, Math.random() * 5000)

            }
    }   
    update(time, delta) {

        //Run spawnable updates
        for(let i = 0; i < this.spawnedUnitGroup.children.entries.length; i++){
            this.spawnedUnitGroup.children.entries[i].parent.update(time, delta);
        }
        for(let i = 0; i < this.spawnedEnemyUnitGroup.children.entries.length; i++){
            this.spawnedEnemyUnitGroup.children.entries[i].parent.update(time, delta);
        }
    }

    spawnUnit(name){
    }
}