/* eslint-disable no-restricted-syntax */
/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
const keyLayout = [
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '0',
  'backspace',
  'q',
  'w',
  'e',
  'r',
  't',
  'y',
  'u',
  'i',
  'o',
  'p',
  '[',
  ']',
  'caps',
  'a',
  's',
  'd',
  'f',
  'g',
  'h',
  'j',
  'k',
  'l',
  ';',
  "'",
  'enter',
  'done',
  'z',
  'x',
  'c',
  'v',
  'b',
  'n',
  'm',
  ',',
  '.',
  '/',
  'shift',
  'space',
];

const Keyboard = {
  elements: {
    main: null,
    keysContainer: null,
    keys: [],
  },

  eventHandlers: {
    oninput: null,
    onclose: null,
  },

  properties: {
    value: '',
    capsLock: false,
    shift: false,
  },
  init() {
    // create main elements
    this.elements.main = document.createElement('div');
    this.elements.keysContainer = document.createElement('div');

    // setup main elements
    this.elements.main.classList.add('keyboard', 'keyboard--hidden');
    this.elements.keysContainer.classList.add('keyboard__keys');
    this.elements.keysContainer.appendChild(this._createKeys(keyLayout));

    this.elements.keys = this.elements.keysContainer.querySelectorAll('.keyboard__key');

    // add to DOM
    this.elements.main.appendChild(this.elements.keysContainer);
    document.body.appendChild(this.elements.main);

    // auto use keyboard

    document.querySelectorAll('.use-keyboard-input').forEach((element) => {
      element.addEventListener('focus', () => {
        this.open(element.value, (currentValue) => {
          element.value = currentValue;
        });
      });
    });
  },

  _createKeys(elem) {
    const fragment = document.createDocumentFragment();
    // creat html for icon

    const creatIconHTML = (iconName) => `<i class="material-icons">${iconName}</i>`;
    elem.forEach((key) => {
      const keyElement = document.createElement('button');
      const insertLineBreak = ['backspace', ']', 'enter', 'shift'].indexOf(key) !== -1;

      // Add classes
      keyElement.setAttribute('type', 'button');
      keyElement.classList.add('keyboard__key');

      switch (key) {
        case 'backspace':
          keyElement.classList.add('keyboard__key--wide');
          keyElement.innerHTML = creatIconHTML('backspace');

          keyElement.addEventListener('click', () => {
            this.properties.value = this.properties.value.substring(
              0,
              this.properties.value.length() - 1,
            );
            this._triggerEvent('oninput');
          });
          break;
        case 'caps':
          keyElement.classList.add(
            'keyboard__key--wide',
            'keyboard__key--activable',
          );
          keyElement.innerHTML = creatIconHTML('keyboard_capslock');
          keyElement.addEventListener('click', () => {
            this._toggleCapsLock();
            keyElement.classList.toggle(
              'keyboard__key--active',
              this.properties.capsLock,
            );
          });

          break;
        case 'enter':
          keyElement.classList.add('keyboard__key--wide');
          keyElement.innerHTML = creatIconHTML('keyboard_return');
          keyElement.addEventListener('click', () => {
            this.properties.value += '\n';
            this._triggerEvent('oninput');
          });
          break;
        case 'space':
          keyElement.classList.add('keyboard__key--extrawide');
          keyElement.innerHTML = creatIconHTML('space_bar');
          keyElement.addEventListener('click', () => {
            this.properties.value += ' ';
            this._triggerEvent('oninput');
          });
          break;
        case 'done':
          keyElement.classList.add('keyboard__key--wide', 'keybord__key--dark');
          keyElement.innerHTML = creatIconHTML('check_circle');
          keyElement.addEventListener('click', () => {
            this.close();
            this._triggerEvent('onclose');
          });
          break;
        case 'shift':
          keyElement.classList.add(
            'keyboard__key--wide',
            'keyboard__key--activable',
          );
          keyElement.innerHTML = creatIconHTML('expand_less');
          keyElement.addEventListener('click', () => {
            this._toggleCapsLock();
            keyElement.classList.toggle(
              'keyboard__key--active',
              this.properties.capsLock,
            );
          });
          break;

        default:
          keyElement.textContent = key.toLowerCase();

          keyElement.addEventListener('click', () => {
            this.properties.value += this.properties.capsLock
              ? key.toUpperCase()
              : key.toLowerCase();
            this._triggerEvent('oninput');
          });
      }

      fragment.appendChild(keyElement);
      if (insertLineBreak) {
        fragment.appendChild(document.createElement('br'));
      }
    });
    return fragment;
  },

  _triggerEvent(handlerName) {
    if (typeof this.eventHandlers[handlerName] === 'function') {
      this.eventHandlers[handlerName](this.properties.value);
    }
  },
  _toggleCapsLock() {
    this.properties.capsLock = !this.properties.capsLock;
    for (const key of this.elements.keys) {
      if (key.childElementCount === 0) {
        key.textContent = this.properties.capsLock
          ? key.textContent.toUpperCase()
          : key.textContent.toLowerCase();
      }
    }
  },
  _toggleShift() {
    this.properties.shift = !this.properties.shift;
    for (const key of this.elements.keys) {
      if (key.childElementCount === 0) {
        key.textContent = this.properties.capsLock
          ? key.textContent.toUpperCase()
          : key.textContent.toLowerCase();
      }
    }
  },

  open(initialValue, oninput, onclose) {
    this.properties.value = initialValue || '';
    this.eventHandlers.oninput = oninput;
    this.eventHandlers.onclose = onclose;
    this.elements.main.classList.remove('keyboard--hidden');
  },

  close() {
    this.properties.value = '';
    this.eventHandlers.oninput = oninput;
    this.eventHandlers.onclose = onclose;
    this.elements.main.classList.add('keyboard--hidden');
  },
};
window.addEventListener('DOMContentLoaded', () => {
  Keyboard.init();
});
