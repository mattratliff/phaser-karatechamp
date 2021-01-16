import Phaser from 'phaser';

export default class AnimationManager {
    constructor(anims) {
        this.anims = anims;
    }

    addAnimations(){
        this.anims.create(
            { key: 'frontkick', 
              frames: this.anims.generateFrameNames('player', { prefix: 'kick', start:1, end: 12, zeroPad: 2 }),
              frameRate: 10, 
              repeatDelay: 200,
              repeat: 0 
          });
  
          this.anims.create(
              { key: 'roundhousekick', 
                  frames: this.anims.generateFrameNames('player', { prefix: 'roundhouse', start:1, end: 12, zeroPad: 2 }),
                  frameRate: 10, 
                  repeatDelay: 200,
                  repeat: 0 
              });
    
          this.anims.create(
              { key: 'spinningheal', 
                  frames: this.anims.generateFrameNames('player', { prefix: 'spinningheal', start:1, end: 11, zeroPad: 2 }),
                  frameRate: 10, 
                  repeatDelay: 200,
                  repeat: 0 
              });
  
          this.anims.create(
              { key: 'forward', 
                frames: this.anims.generateFrameNames('player', { prefix: 'forward', start:1, end: 3, zeroPad: 2 }),
                frameRate: 10, 
                repeat: 0 
            });
  
          this.anims.create(
              { key: 'backward', 
                frames: this.anims.generateFrameNames('player', { prefix: 'forward', start:1, end: 3, zeroPad: 2 }),
                frameRate: 10, 
                repeat: 0 
            });
  
            this.anims.create(
              { key: 'jump', 
                frames: this.anims.generateFrameNames('player', { prefix: 'jump', start:1, end: 11, zeroPad: 2 }),
                frameRate: 12, 
                repeat: 0 
            });
  
            this.anims.create(
              { key: 'squat', 
                frames: this.anims.generateFrameNames('player', { prefix: 'squat', start:1, end: 5, zeroPad: 2 }),
                frameRate: 10, 
                repeat: 0 
            });
  
            this.anims.create(
              { key: 'standup', 
                frames: this.anims.generateFrameNames('player', { prefix: 'standup', start:1, end: 4, zeroPad: 2 }),
                frameRate: 10, 
                repeat: 0 
            });
  
            this.anims.create(
              { key: 'lowkick', 
                frames: this.anims.generateFrameNames('player', { prefix: 'lowkick', start:1, end: 9, zeroPad: 2 }),
                frameRate: 10, 
                repeat: 0 
            });
  
            this.anims.create(
              { key: 'flyingside', 
                frames: this.anims.generateFrameNames('player', { prefix: 'flyingside', start:1, end: 13, zeroPad: 2 }),
                frameRate: 12, 
                repeat: 0 
            });
  
            this.anims.create(
              { key: 'backflip', 
                frames: this.anims.generateFrameNames('player', { prefix: 'backflip', start:1, end: 10, zeroPad: 2 }),
                frameRate: 8, 
                repeat: 0 
            });
  
            this.anims.create(
              { key: 'frontsweep', 
                frames: this.anims.generateFrameNames('player', { prefix: 'frontsweep', start:1, end: 9, zeroPad: 2 }),
                frameRate: 8, 
                repeat: 0 
            });
            
            this.anims.create(
              { key: 'backkick', 
                frames: this.anims.generateFrameNames('player', { prefix: 'backkick', start:1, end: 10, zeroPad: 2 }),
                frameRate: 8, 
                repeat: 0 
            });
  
            this.anims.create(
              { key: 'highblock', 
                frames: this.anims.generateFrameNames('player', { prefix: 'highblock', start:1, end: 9, zeroPad: 2 }),
                frameRate: 10, 
                repeat: 0 
            });
  
            this.anims.create(
              { key: 'middleblock', 
                frames: this.anims.generateFrameNames('player', { prefix: 'middleblock', start:1, end: 9, zeroPad: 2 }),
                frameRate: 10, 
                repeat: 0 
            });
  
            this.anims.create(
              { key: 'lowblock', 
                frames: this.anims.generateFrameNames('player', { prefix: 'lowblock', start:1, end: 11, zeroPad: 2 }),
                frameRate: 10, 
                repeat: 0 
            });
  
            this.anims.create(
              { key: 'reverse', 
                frames: this.anims.generateFrameNames('player', { prefix: 'reverse', start:1, end: 7, zeroPad: 2 }),
                frameRate: 10, 
                repeat: 0 
            });
  
            this.anims.create(
              { key: 'lungepunch', 
                frames: this.anims.generateFrameNames('player', { prefix: 'lungepunch', start:1, end: 11, zeroPad: 2 }),
                frameRate: 10, 
                repeat: 0 
            });
  
            this.anims.create(
              { key: 'flip', 
                frames: this.anims.generateFrameNames('player', { prefix: 'flip', start:1, end: 12, zeroPad: 2 }),
                frameRate: 10, 
                repeat: 0 
            });

            //RAGDOLL ANIMATIONS
            this.anims.create(
              { key: 'facepunch', 
                frames: this.anims.generateFrameNames('player', { prefix: 'facepunch', start:1, end: 3, zeroPad: 1 }),
                frameRate: 12, 
                repeat: 0 
            });
            this.anims.create(
              { key: 'gutkick', 
                frames: this.anims.generateFrameNames('player', { prefix: 'gutkick', start:1, end: 3, zeroPad: 1 }),
                frameRate: 12, 
                repeat: 0 
            });

            //MISC
            this.anims.create(
              { key: 'win', 
                frames: this.anims.generateFrameNames('player', { prefix: 'win', start:1, end: 2, zeroPad: 1 }),
                frameRate: 4, 
                repeat: 10
            });
        }  
}