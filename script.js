var css = document.querySelector("h3");
var color1 = document.querySelector(".color1");
var color2 = document.querySelector(".color2");
var body = document.querySelector("#gradient");
var random = document.querySelector("#random img");

function componentToHex(c) {
  var hex = c.toString(16);
  return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
  return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

function getRandomColor() {
	return rgbToHex(Math.floor(Math.random() * 255), Math.floor(Math.random() * 255), Math.floor(Math.random() * 255));
}

function setGradient() {
	body.setAttribute("style", "background: linear-gradient(to right, " 
	+ color1.value 
	+ ", " 
	+ color2.value 
	+ ");");

	css.textContent = body.getAttribute("style");
}

function setRandomColors() {
	var randomColor1 = getRandomColor();
	var randomColor2 = getRandomColor();

	color1.setAttribute("value", randomColor1);
	color2.setAttribute("value", randomColor2);
	setGradient();
}

var startingColor1 = getRandomColor();
var startingColor2 = getRandomColor();

color1.setAttribute("value", startingColor1);
color2.setAttribute("value", startingColor2);
setGradient();

color1.addEventListener("input", setGradient);
color2.addEventListener("input", setGradient);
random.addEventListener("click", setRandomColors);