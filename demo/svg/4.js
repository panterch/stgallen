var svgNS = "http://www.w3.org/2000/svg";

function drawRect() {

   var newRect = document.createElementNS(svgNS,"rect");
   Element.extend(newRect);
   newRect.setAttribute("width",200);	
   newRect.setAttribute("height",50);		
   newRect.setAttribute("x",70);		
   newRect.setAttribute("y",60);	
   newRect.setAttribute("rx",10);	
   newRect.setAttribute("ry",10);	

   Element.observe(newRect, 'click', respondToClick);

   $('canvas').appendChild(newRect);

}

function respondToClick(event) {
  var element = event.element();
  alert(element+' clicked whicht is '+' pixels witdh');
}
