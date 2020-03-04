/************************
******  Kristoffer ******
******    Kuvaja   ******
*************************
******  Front End   *****
******  Projekt 2   *****
************************/

/*********************
******   Paint  ******
**********************/

(function() {
	//Hämta vår paint
	var canvas = document.querySelector('#paint');
	var ctx = canvas.getContext('2d');
	
	var sketch = document.querySelector('#sketch');
	var sketch_style = getComputedStyle(sketch);

	//Säg när du är inne i paint området och eftersom jag använder flex boxar blev det lite extra
	canvas.width = parseInt(sketch_style.getPropertyValue('width'));
	canvas.height = parseInt(sketch_style.getPropertyValue('height'));

	var mouse = {x: 0, y: 0};
	var canvasOffset = offset(canvas); 
	/* Mouse Capturing Work */
	canvas.addEventListener('mousemove', function(e) {
		mouse.x = e.pageX - canvasOffset.left;
		mouse.y = e.pageY - canvasOffset.top;
	}, false);

	//När man ritar blir det såhär, enkelt med en knapp som skulle ändra
	//dessa värden om man vill ha fler färger t.ex.
	ctx.lineWidth = 5;
	ctx.lineJoin = 'round';
	ctx.lineCap = 'round';
	ctx.strokeStyle = 'black';
	 
	//När man trycker så ritar man
	canvas.addEventListener('mousedown', function(e) {
			ctx.beginPath();
			ctx.moveTo(mouse.x, mouse.y);
	 
			canvas.addEventListener('mousemove', onPaint, false);
	}, false);
	 
	canvas.addEventListener('mouseup', function() {
			canvas.removeEventListener('mousemove', onPaint, false);
	}, false);
	 
	var onPaint = function() {
			ctx.lineTo(mouse.x, mouse.y);
			ctx.stroke();
	};
	
}());

//Här hämtar vi positionen för vår canvas
function offset(el) {
    var rect = el.getBoundingClientRect(),
    scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
    scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
}

