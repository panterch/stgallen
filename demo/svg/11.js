var svgNS = "http://www.w3.org/2000/svg";
xlink_ns = "http://www.w3.org/1999/xlink";

var doc = null;
var canvas = null;

bind(window, 'load', init);

function init() {
  canvas = el("canvas");
  doc = canvas.ownerDocument;
  b1 = new Box(100, 100);
  new Box(300, 100);
}

function Box(x, y) {

   this.use = doc.createElementNS(svgNS, "use");
   this.use.setAttributeNS(xlink_ns, "href", "#box");
   this.use.setAttribute("x", x);
   this.use.setAttribute("y", y);

   bind(this.use, 'mousedown', function(event) {
     this.dx = this.x.baseVal.value - event.clientX;
     this.dy = this.y.baseVal.value - event.clientY;
     this.onmousemove = function(event) {
        this.x.baseVal.value = event.clientX + this.dx;
        this.y.baseVal.value = event.clientY + this.dy;
     }
   });
   bind(this.use, 'mouseup', function(event) {
     this.onmousemove = null;
   });
   bind(this.use, 'mouseout', function(event) {
     this.onmousemove = null;
   });
   canvas.appendChild(this.use);

}


function el(id) {
  return document.getElementById(id);
}

function bind(element, type, f) {
  element.addEventListener(type, f, false);
}

function setAttributes(element, attrs) {
    for (var key in attrs) {
      element.setAttribute(key, attrs[key]);
    }
}
