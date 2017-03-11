var canvas=document.getElementById('canvas');
var context=canvas.getContext('2d');
var canvasWidth=Math.min(550,$(window).width()-20);
var lastLocation={x:0,y:0}
var lastLineWidth=0;
var minLineWidth=5;
var hugeLine=true;
var maxLineWidth=18;
var isMouseDown=false;
var strokeColor="black";
	canvas.width=canvasWidth;
	canvas.height=canvasWidth;	
function drawMi () {
		context.save();
		context.beginPath();// draw mi
		
		context.setLineDash([2,4]);
		context.moveTo(0,0);
		context.lineTo(canvasWidth,canvasWidth);	
		context.moveTo(canvasWidth,0);
		context.lineTo(0,canvasWidth);
		context.moveTo(0,canvasWidth/2);
		context.lineTo(canvasWidth,canvasWidth/2);
		context.moveTo(canvasWidth/2,0);
		context.lineTo(canvasWidth/2,canvasWidth);
		context.lineWidth=1;
		context.strokeStyle="#737271";
		context.stroke();
		context.restore();
}
	drawMi();
	
function beginDraw (p) {
	isMouseDown=true;
	lastLocation=windowsToCanvas(p.x,p.y);
	lastTime=new Date().getTime();
	
}
function stopDraw () {
	isMouseDown=false;
}

function wordLineWidth (t,s) {
	if (s/t>5) {
		w=10
	} else if(s/t<0.8){
		w=4
	}
	else{
		w=s/t*13/18+5;
	}
	return w;
}

function drawWord (p) {
	var curLocation=windowsToCanvas(p.x,p.y);
	var curTime=new Date().getTime();
	var t=curTime-lastTime;
	var s=(function  ( curLocation,lastLocation ) {
		return Math.sqrt((curLocation.x-lastLocation.x)*(curLocation.x-lastLocation.x)+(curLocation.y-lastLocation.y)*(curLocation.y-lastLocation.y))
	})(curLocation,lastLocation);	
	
	function getLineWidth(){
		if($(".span-select").attr('id')=="huge-span"){
			return 0.5*lastLineWidth+0.5*curLineWidth;
		}else{
			return 3;
		}
	};
	
	var curLineWidth=wordLineWidth(t,s);
//	var drawLineWidth=0.5*lastLineWidth+0.5*curLineWidth;
	
	context.beginPath();
	context.moveTo(lastLocation.x,lastLocation.y);
	context.lineTo(curLocation.x,curLocation.y);
	context.strokeStyle=strokeColor;
	var curWidth=getLineWidth();
	context.lineWidth=curWidth;
	context.lineCap="round";
	context.lineJoin="round";
	context.stroke();
	lastLocation=curLocation;
	lastTime=curTime;
	lastLineWidth=curLineWidth;
}

function windowsToCanvas (x,y) {
	var box=canvas.getBoundingClientRect();
	return {x:Math.round(x-box.left),y:Math.round(y-box.top)};
}



canvas.onmousedown=function  (e) {
	e.preventDefault();	
	beginDraw({x:e.clientX,y:e.clientY});
}
canvas.onmousemove=function  (e) {
	e.preventDefault();
	if(isMouseDown){
		drawWord({x:e.clientX,y:e.clientY});
	}
}
canvas.onmouseout=function  (e) {
	e.preventDefault();
	stopDraw();
}
canvas.onmouseup=function  (e) {
	e.preventDefault();
	stopDraw();
}

canvas.addEventListener('touchstart',function(e){
    e.preventDefault();
    touch = e.touches[0];
    beginDraw( {x: touch.pageX , y: touch.pageY} );
});
canvas.addEventListener('touchmove',function(e){
    e.preventDefault();
    if( isMouseDown ){
        touch = e.touches[0];
        drawWord({x: touch.pageX , y: touch.pageY});
    }
});
canvas.addEventListener('touchend',function(e){
    e.preventDefault();
    stopDraw();
});


$('.mi').css('width',canvasWidth);
$(".color").click(
	function  (e) {
		$(".color").removeClass("ctrl-selected");
		$(this).addClass("ctrl-selected");
		strokeColor=$(this).css("background-color");
	}
)
$(".span").click(
	function  (e) {
		$(".span").removeClass("span-select");
		$(this).addClass("span-select");
	}
)
$('#reset').click(function  (e) {	
		context.clearRect(0,0,canvasWidth,canvasWidth);
		drawMi();	
})
