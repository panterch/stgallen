var svgNS = "http://www.w3.org/2000/svg";
var doc = null;
var canvas = null;

bind(window, 'load', init);

function init() {
  canvas = el("canvas");
  doc = canvas.ownerDocument;
  b1 = new Box(10, 10);
  new Box(100, 100);
  new Box(300, 300);
}

function Box(x, y) {

   this.rect = document.createElementNS(svgNS,"rect");
   setAttributes(this.rect, { "width": 300, "height": 100, "x": x,
      "y": y, "rx": 10, "ry": 10,
      'fill': 'rgb(220, 0, 0)',
      'stroke': 'rgb(0, 250, 10)', 'stroke-width': '2'
      });

   bind(this.rect, 'click', function(evt) {
     new TextField(this);
   });

   el('canvas').appendChild(this.rect);

   
}

function TextField(parent) {
  var width="200"
  var height="25"
  var x = parent.x.baseVal.value + (parent.width.baseVal.value - width)/2
  var y = parent.y.baseVal.value + (parent.height.baseVal.value - height)/2
  this.foreign = document.createElementNS(svgNS, "foreignObject");
  setAttributes(this.foreign, {
    "x": x, "y": y,
    "width": width, 
    "height": height
    });
  this.input = document.createElement("input");
  setAttributes(this.input, { "type": "text",
    "style":"width:"+width+"px; height:"+height+"px; font-size: 15px;" });
  bind(this.input, "keydown", function(evt) {
    if (13 == evt.which) {
      var data = doc.createTextNode(this.value);
      var text = document.createElementNS(svgNS, "text");
      setAttributes(text, {
        "x": x, "y": y,
        "width": width, 
        "height": height,
        "style": "font-size:40;font-family:Arial;font-weight:bold;stroke:white;stroke-width:1;fill:none"
      });
      text.appendChild(data);
      el('canvas').removeChild(this.parentNode);
      el('canvas').appendChild(text);
    };
  });
  this.foreign.appendChild(this.input);
  el('canvas').appendChild(this.foreign); 
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
