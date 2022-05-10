/* eslint-disable import/extensions */
import create from './utils/create.js';

export default class Key {
  constructor({ small, shift, code }) {
    this.code = code;
    this.small = small;
    this.shift = shift;
    this.isFnKey = Boolean(small.match(/Ctrl|arr|Alt|Shift|Tab|Back|Del|Enter|Caps|Win|rec|snd|turn|en|ru/));
    this.isMysic = Boolean(small.match(/Shift|Caps|Enter|Back|Del/));

    if (shift && shift.match(/[^a-zA-Zа-яА-ЯёЁ0-9]/)) {
      this.sub = create('div', 'sub', this.shift);
    } else {
      this.sub = create('div', 'sub', '');
    }

    this.letter = create('div', 'letter', small);
    switch (small) {
      case 'Shift':
        this.audio = create('audio', 'sound', '', null,
          ['src', 'media/Clap_shift.wav'],
          ['key', this.code]);
        break;
      case 'Enter':
        this.audio = create('audio', 'sound', '', null,
          ['src', 'media/Clap_enter.wav'],
          ['key', this.code]);
        break;
      case 'Capslock':
        this.audio = create('audio', 'sound', '', null,
          ['src', 'media/Caps.mp3'],
          ['key', this.code]);
        break;
      case 'Backspace':
        this.audio = create('audio', 'sound', '', null,
          ['src', 'media/Clap_backsp.mp3'],
          ['key', this.code]);
        break;
      case 'Delete':
        this.audio = create('audio', 'sound', '', null,
          ['src', 'media/delete.WAV'],
          ['key', this.code]);
        break;
      default:
        this.audio = create('audio', 'sound', '', null,
          ['src', 'media/Clap_eng.wav'],
          ['key', this.code]);
        break;
    }

    this.div = create('div', 'keyboard__key', [this.sub, this.letter, this.audio], null, ['code', this.code],
      this.isFnKey ? ['fn', 'true'] : ['fn', 'false']);
  }
}
