// http://paulirish.com/2011/requestanimationframe-for-smart-animating/
// http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating
// requestAnimationFrame polyfill by Erik Möller
// fixes from Paul Irish and Tino Zijdel
( function () {
	var lastTime = 0;
	var vendors = [ 'ms', 'moz', 'webkit', 'o' ];
	for ( var x = 0; x < vendors.length && !window.requestAnimationFrame; ++ x ) {
		window.requestAnimationFrame = window[ vendors[ x ] + 'RequestAnimationFrame' ];
		window.cancelAnimationFrame = window[ vendors[ x ] + 'CancelAnimationFrame' ] || window[ vendors[ x ] + 'CancelRequestAnimationFrame' ];
	}

	if ( !window.requestAnimationFrame ) {
		window.requestAnimationFrame = function ( callback, element ) {
			var currTime = Date.now(), timeToCall = Math.max( 0, 16 - ( currTime - lastTime ) );
			var id = window.setTimeout( function() { callback( currTime + timeToCall ); }, timeToCall );
			lastTime = currTime + timeToCall;
			return id;
		};
	}

	if ( !window.cancelAnimationFrame ) {
		window.cancelAnimationFrame = function ( id ) { clearTimeout( id ); };
	}
}() );


$(document).ready(function() {
	app = {
		d: 128,
		z: 4,
		n: 0
	};
	app.canvas = $("#canvas")[0];
	app.canvas.width = app.canvas.height = app.d*app.z;
	app.ctx = app.canvas.getContext("2d");
	app.ctx.fillStyle = "black";

	$("#container").css({
		width: (app.d*app.z)+"px",
		margin: "auto"
	});

	requestAnimationFrame(frame);
});

function frame() {
	requestAnimationFrame(frame);
	app.ctx.clearRect(0,0,app.d*app.z,app.d*app.z);

	for( var y=0; y<app.d; y++ )
		for( var x=0; x<app.d; x++ )
			if( (x ^ y) < app.n )
				app.ctx.fillRect(x*app.z,y*app.z,app.z,app.z);
	
	app.n = (app.n + 1) % app.d;
}
