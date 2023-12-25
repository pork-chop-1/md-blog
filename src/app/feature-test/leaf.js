// https://codepen.io/soju22/pen/NJdEpg

let width, height, cx, cy;
const svg = document.getElementById('svg'),
  svgGroup = document.getElementById('svg-group'),
  overlay = document.getElementById('overlay');

const line = d3.line().curve(d3.curveBasis);

const colors = chroma.scale(['#91B43C', '#C86B28', '#FFC501', '#CB2228']);//.mode('lch');

function init() {

  const inputHandler = new InputHandler({
    elt: overlay,
    onInputStart(e) {
      this.x0 = this.x; this.y0 = this.y;
      this.path = new DrawPath(svgGroup, chroma.random().hex());
      this.path.points = [[this.x, this.y], [this.x, this.y]];
    },
    onInputMove(e) {
      this.rad = Math.atan2(this.x0 - this.x, this.y - this.y0);
      const points = this.path.points;
      const dx = this.x - this.x0;
      const dy = this.y - this.y0;
      if (dx * dx + dy * dy > 100) {
        points.push([this.x0 = this.x, this.y0 = this.y]);
      }
      else {
        points[points.length - 1] = [this.x, this.y];
      }
      this.path.updatePathD();
    },
    onInputEnd(e) {
      if (this.rad) {
        let w = 10 + rnd(10);
        let h = w + rnd(w * 2);
        let fill = chroma(this.path.stroke).set('hsl.l', 0.2 + rnd(0.4)).hex();
      }
    },
    updateInputCoords(e) {
      this.x = this.currX - cx;
      this.y = this.currY - cy;
    },
  });
}

class DrawPath {
  constructor(parent, stroke) {
    this.parent = parent;
    this.points = [];
    this.stroke = stroke;
    this.create();
  }
  create() {
    this.path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    this.path.style.stroke = this.stroke;
    this.parent.appendChild(this.path);
  }
  pathD() {
    return line(this.points);
  }
  updatePathD() {
    this.path.setAttributeNS(null, 'd', this.pathD());
  }
}

function rColor(steps) {

}

/**
  * input handler
  */
class InputHandler {
  constructor(conf) {
    conf.elt.addEventListener('mousedown', e => this.onMouseDown(e));
    conf.elt.addEventListener('mousemove', e => this.onMouseMove(e), false);
    conf.elt.addEventListener('mouseup', e => this.onMouseEnd(e));
    conf.elt.addEventListener('mouseleave', e => this.onMouseEnd(e));

    this.onInputStart = conf.onInputStart;
    this.onInputMove = conf.onInputMove;
    this.onInputEnd = conf.onInputEnd;
    this.updateInputCoords = conf.updateInputCoords;
  }
  /**
    * mouse events
    */
  onMouseDown(e) {
    if (e.which == 1) {
      this.mouseDown = true;
      this.updateMouseCoords(e);
      this.onInputStart(e);
    }
  }
  onMouseMove(e) {
    if (this.mouseDown) {
      this.prevX = this.currX;
      this.prevY = this.currY;
      this.updateMouseCoords(e);
      this.onInputMove(e);
    }
  }
  onMouseEnd(e) {
    if (this.mouseDown) {
      this.mouseDown = false;
      this.onInputEnd(e);
    }
  }
  updateMouseCoords(e) {
    var clientRect = e.target.getBoundingClientRect();
    this.currX = e.clientX - clientRect.left;
    this.currY = e.clientY - clientRect.top;
    this.updateInputCoords(e);
  }
}


function rnd(max, negative) {
  return negative ? Math.random() * 2 * max - max : Math.random() * max;
}

init();
