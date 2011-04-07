(function( $ ){
	$.fn.Paint = function(args) {
		var draw= false;
		var ctx = this[0].getContext("2d");
		var currentPos = null;
		var onMouseUp = function(){ };
		var obj = this;

		this.startPos = {x:-1,y:-1};
		this.curPos = {x:-1,y:-1};
		this.offsetPos = args.pos;

		var onMouseMove = args.onmove; 
		var onMouseDown = args.ondown;

		ctx.strokeStyle = 'black';

		//set it true on mousedown
		this.mousedown(function(e){ 
			draw=true; 
			obj.startPos = getCanvasMousePos(e, obj.offsetPos);
			onMouseDown(obj.startPos);
		});

		//reset it on mouseup`
		this.mouseup(function(){
			draw=false;
		});

		this.mousemove(function(e) {
			if(draw){
				obj.curPos = getCanvasMousePos(e, obj.offsetPos);
				obj.drawOnCanvas(obj.curPos);
				onMouseMove(obj.curPos);
			}    
		});

		this.drawOnCanvas = function(currentPos){

			ctx.save()
			ctx.beginPath();
			ctx.lineWidth = 5;
			ctx.lineCap = "round";
			ctx.moveTo(obj.startPos.x, obj.startPos.y);
			ctx.lineTo(currentPos.x, currentPos.y);
			ctx.stroke();
			ctx.closePath();
			ctx.restore();

			obj.startPos = currentPos;
		};

		function getCanvasMousePos(e, position) {
			return { x: e.clientX - position.x, y: e.clientY - position.y};
		}
        
       //code for color pallete
		/*$("#clr > div").click(function(){
			ctx.strokeStyle = $(this).css("background-color");
		});*/
     
		//Eraser
		$("#eraser").click(function(){
			ctx.strokeStyle = '#fff';
		});

        //Clear 
		$("#clear").click(function(){
			ctx.fillStyle = "#fff";
			ctx.fillRect(0, 0, canvas.width, canvas.height);
			ctx.strokeStyle = "black";
			ctx.fillStyle = "black";
		});  
		
		return this;
  };
})( jQuery );
