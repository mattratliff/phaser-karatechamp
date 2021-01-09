import './index.css';
import './font-loader';

import Phaser from 'phaser';

import LightraysPlugin from '../src/plugins/lightrays/index.js';
import constants from './config/constants';
import PreBoot from './scenes/preboot';
import StartScene from './scenes/start';
import LeaderBoard from './scenes/leaderboard';
// import GameBoard from './scenes/gameboard';
import DojoBoard from './scenes/dojoboard';
// import TrainingBoard from './scenes/trainingboard';
import Sandbox from './scenes/sandbox';
import ChallengeBoard from './scenes/challengeboard';

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
    default: 'arcade',
    arcade: {
      gravity: { y: 400 },
      debug: false
    }
  },
  scene: [PreBoot, StartScene, LeaderBoard, DojoBoard, Sandbox, ChallengeBoard],
  pixelArt: true,
  antialias: false
};

const game = new Phaser.Game(config);

window.game = game;
