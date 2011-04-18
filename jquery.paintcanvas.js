(function( $ ){
	$.fn.PaintCanvas = function(options) {
		
		this.settings = {
			startPos : {x:-1,y:-1},
			curPos : {x:-1,y:-1},
			offsetPos : { x: 0, y: 0 },
			onMouseMove : function() { },
			onMouseDown: function() { },
			onMouseUp: function() { },
		}

		var obj = this;

		return this.each(function() {

			var draw = false;
			var ctx = obj[0].getContext("2d");

			ctx.strokeStyle = 'black';

			if ( options ) {
				$.extend( obj.settings, options );
			}

			// -- Evented methods
			obj.mousedown(function(e){ 
				draw=true; 
				obj.settings.startPos = getCanvasMousePos(e, obj.settings.offsetPos);
				obj.settings.onMouseDown(obj.settings.startPos);
			});

			obj.mouseup(function(){
				draw=false;
				obj.settings.onMouseUp(obj.settings.curPos);
			});

			obj.mousemove(function(e) {
				if(draw){
					obj.settings.curPos = getCanvasMousePos(e, obj.settings.offsetPos);
					obj.DrawOnCanvas(obj.settings.curPos);
					obj.settings.onMouseMove(obj.settings.curPos);
				}    
			});

			// -- Public Functions that are not based on events
			obj.DrawOnCanvas = (function(currentPos){

				ctx.save()
				ctx.beginPath();
				ctx.lineWidth = 5;
				ctx.lineCap = "round";
				ctx.moveTo(obj.settings.startPos.x, obj.settings.startPos.y);
				ctx.lineTo(currentPos.x, currentPos.y);
				ctx.stroke();
				ctx.closePath();
				ctx.restore();

				obj.settings.startPos = currentPos;
			}); 

			obj.ClearScreen = (function(){
				ctx.fillStyle = "#fff";
				ctx.fillRect(0, 0, canvas.width, canvas.height);
				ctx.strokeStyle = "black";
				ctx.fillStyle = "black";
			});

			obj.SetColor = (function(color){
				ctx.strokeStyle = color;
			});

			obj.SetEraser = (function(){
				ctx.strokeStyle = obj.css("background-color");

			});

			// Private method to get mouse position
			function getCanvasMousePos(e, position) {
				return { x: e.clientX - position.x, y: e.clientY - position.y};
			}			
		});
  };
})( jQuery );
