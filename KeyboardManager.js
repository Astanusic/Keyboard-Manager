export default class KeyboardManager {
  constructor(_options) {
    this.domElement = _options.domElement || window;

    // Save key state
    this.keyCodes = {};
    this.modifiers = {};

    // alias && modifiers
    this.MODIFIERS = ["shift", "ctrl", "alt"];
    this.ALIAS = {
      left: 37,
      up: 38,
      right: 39,
      down: 40,
      space: 32,
      pageup: 33,
      pagedown: 34,
      tab: 9,
      escape: 27,
    };

    this.domElement.addEventListener(
      "keydown",
      this.onKeyChange.bind(this),
      false
    );
    this.domElement.addEventListener(
      "keyup",
      this.onKeyChange.bind(this),
      false
    );
  }
  //   no more listenning the keyboard
  destroy() {
    this.domElement.removeEventListener("keydown", this.onKeyDown, false);
    this.domElement.removeEventListener("keydown", this.onKeyUp, false);
  }

  onKeyChange(e) {
    // console.log('onKeyChange', e, e.key, e.shiftKey, e.ctrlKey, e.altKey)
    const keyCode = e.keyCode;
    const pressed = e.type === "keydown" ? true : false;
    // update keyCodes state && modifiers state
    this.keyCodes[keyCode] = pressed;
    this.modifiers["shift"] = e.shiftKey;
    this.modifiers["ctrl"] = e.ctrlKey;
    this.modifiers["alt"] = e.altKey;
  }

  isPressed(keyDesc) {
    const keys = keyDesc.split("+");
    // keys.forEach((key) => {
    // })
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      let pressed = false;

      if (this.MODIFIERS.indexOf(key) !== -1) {
        pressed = this.modifiers[key];
      } else if (Object.keys(this.ALIAS).indexOf(key) != -1) {
        pressed = this.keyCodes[this.ALIAS[key]];
      } else {
        pressed = this.keyCodes[key.toUpperCase().charCodeAt(0)];
      }
      if (!pressed) return false;
    }
    return true;
  }
}
