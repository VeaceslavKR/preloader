// common preloader logic
class BasePreloader {
  constructor(rootDiv) {
    this.rootDiv = rootDiv;

    // class specific logic <<<<<

    this.onload();
  }
  onload() {
    this.timerId = setInterval(() => {
      this.step();
      if (this.condition()) {
        clearInterval(this.timerId);
      }
      this.rootDiv.innerHTML = this.render();
    }, 500);
  }
  // abstract methods
  condition() {
    console.log("condition");
  }
  step() {
    console.log("step");
  }
  render() {
    console.log("render");
  }
}

class ProgressPreloader extends BasePreloader {
  constructor(rootDiv) {
    super(rootDiv);
    this.progress = 0; // 0..100
  }

  // Overriding methods
  condition() {
    return this.progress >= 100;
  }
  step() {
    this.progress += 10;
  }
  render() {
    return `[ ${this.progress}% ]`;
  }
}

class CircularPreloader extends BasePreloader {
  constructor(rootDiv) {
    super(rootDiv);
    this.duration = 3000;
    this.frames = ["|", "/", "--", "\\"]; // JS String Character Escaping
    this.onload();
  }

  condition() {
    return this.duration <= 0;
  }
  step() {
    this.duration -= 250;
    let frame = this.frames.shift();
    this.frames.push(frame);
  }
  render() {
    return `[ ${this.frames[0]}]`;
  }
}

///////////////////////////////////////////

let pp1 = new ProgressPreloader(window["prel-1"]);
let pp2 = new CircularPreloader(window["prel-2"]);
