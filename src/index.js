import Phaser from "phaser";
import UIPlugin from './rex-ui/templates/ui/ui-plugin.js';
import Scene1 from './scenes/scene1';

const config = {
  type: Phaser.AUTO,
  parent: "phaser-example",
  width: 1024,
  height: 576,
  scene: Scene1,
  plugins: {
    scene: [{
        key: 'rexUI',
        plugin: UIPlugin,
        mapping: 'rexUI'
    },
    ]
},
physics: {
  default: 'arcade',
  arcade: {
    debug: false
  }
}
};

const game = new Phaser.Game(config);


