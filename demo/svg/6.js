var svgNS = "http://www.w3.org/2000/svg";

bind(window, 'load', init);

function init() {
  b1 = new Box(10, 10);
  b2 = new Box(100, 100);
}

function Box(x, y) {

   this.rect = document.createElementNS(svgNS,"rect");
   setAttributes(this.rect, { "width": 200, "height": 50, "x": x,
      "y": y, "rx": 10, "ry": 10,
      'fill': 'rgb(220, 0, 0)',
      'stroke': 'rgb(0, 250, 10)', 'stroke-width': '2'
      });

   bind(this.rect, 'mousedown', function(event) {
     this.dx = this.x.baseVal.value - event.clientX;
     this.dy = this.y.baseVal.value - event.clientY;
     this.onmousemove = function(event) {
        this.x.baseVal.value = event.clientX + this.dx;
        this.y.baseVal.value = event.clientY + this.dy;
     }
   });

   bind(this.rect, 'mouseup', function(event) {
     this.onmousemove = null;
   });
   bind(this.rect, 'mouseout', function(event) {
     this.onmousemove = null;
   });

   el('canvas').appendChild(this.rect);

}

function respondToClick(event) {
  var element = event.target;
  alert(element+' clicked');
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
