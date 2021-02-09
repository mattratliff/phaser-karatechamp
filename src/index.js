import './index.css';
import './font-loader';

import Phaser from 'phaser';

import LightraysPlugin from '../src/plugins/lightrays/index.js';
import constants from './config/constants';
import PreBoot from './scenes/preboot';
import StartScene from './scenes/start';
import LeaderBoard from './scenes/leaderboard';
import DojoBoard from './scenes/dojoboard';
import GameBoard from './scenes/gameboard';
import TrainingBoard from './scenes/trainingboard';

import AnimationSandbox from './scenes/sandboxes/animation-sandbox';
import AISandbox from './scenes/sandboxes/ai-sandbox';
import MultiplayerSandbox from './scenes/sandboxes/multiplayer-sandbox';
import VaseBoard from './scenes/VaseBoard';  //vase challenge
import BullBoard from './scenes/BullBoard';  //bull challenge
import BrickBoard from './scenes/brickboard';  //verical breaking
import BrickBoard2 from './scenes/brickboard2';  //horizontal breaking

window.Phaser = Phaser;

const config = {
  type: Phaser.AUTO,
  width: constants.WIDTH,
  height: constants.HEIGHT,
  input: {
    gamepad: true
  },
  plugins: {
    scene: [
      {
        key: 'LightraysPlugin',
        plugin: LightraysPlugin,
        mapping: 'lightrays'
      }
    ]
  },
  physics: {
    default: 'matter'
  //   matter: {
  //     debug: true
  // }
},
  scene: [PreBoot, 
    StartScene, 
    LeaderBoard, 
    DojoBoard, 
    AISandbox, 
    VaseBoard, 
    BullBoard,
    BrickBoard,
    BrickBoard2, 
    AnimationSandbox, 
    MultiplayerSandbox, 
    GameBoard, 
    TrainingBoard],
  pixelArt: true,
  antialias: false
};

const game = new Phaser.Game(config);

window.game = game;
