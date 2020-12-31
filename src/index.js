import './index.css';
import './font-loader';

import Phaser from 'phaser';

import LightraysPlugin from '../src/plugins/lightrays/index.js';
import constants from './config/constants';
import CustomPipeline from './rendering-pipelines/CustomPipeline';
import PreBoot from './scenes/preboot';
import StartScene from './scenes/start';
import LeaderBoard from './scenes/leaderboard';
import GameBoard from './scenes/gameboard';
import DojoBoard from './scenes/dojoboard';

window.Phaser = Phaser;

const config = {
  type: Phaser.AUTO,
  width: constants.WIDTH,
  height: constants.HEIGHT,
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
  scene: [PreBoot, StartScene, LeaderBoard, GameBoard, DojoBoard],
  pixelArt: true,
  antialias: false,
  callbacks: {
    postBoot: game => {
      game.renderer.addPipeline('Custom', new CustomPipeline(game));
    }
  }
};

const game = new Phaser.Game(config);

window.game = game;
