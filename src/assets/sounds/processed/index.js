import { Howl, Howler } from 'howler';

import sounds_mp3 from './sounds.mp3';
import sounds_webm from './sounds.webm';
const config = {
  src: [sounds_webm, sounds_mp3],
  sprite: {
    Main_Menu: [1000, 90400],
    Dojo_Music: [91700, 7137.3]
  }
};
const sounds = new Howl(config);
export default sounds;
export { Howl, Howler, sounds };
