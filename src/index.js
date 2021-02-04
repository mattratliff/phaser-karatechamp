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
import PhysicsSandbox from './scenes/sandboxes/physics-sandbox';
import AISandbox from './scenes/sandboxes/ai-sandbox';
import MultiplayerSandbox from './scenes/sandboxes/multiplayer-sandbox';
import ChallengeBoard1 from './scenes/challengeboard1';  //vase challenge
import ChallengeBoard1b from './scenes/challengeboard1b';  //vase challenge
import ChallengeBoard2 from './scenes/challengeboard2';  //bull challenge
import BrickBoard from './scenes/brickboard';  //bull challenge

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
    ChallengeBoard1, 
    ChallengeBoard1b, 
    ChallengeBoard2,
    BrickBoard, 
    PhysicsSandbox, 
    AnimationSandbox, 
    MultiplayerSandbox, 
    GameBoard, 
    TrainingBoard],
  pixelArt: true,
  antialias: false
};

const game = new Phaser.Game(config);

window.game = game;
