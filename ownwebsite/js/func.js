
	function drawClock () {
		var now=new Date();
    	var h=now.getHours();
   		var m=now.getMinutes();
   		var s=now.getSeconds();
		var hpointer=document.getElementsByClassName('hours')[0];
		hpointer.style.transform='rotate('+((h%12)*30-90)+'deg)';
		var mpointer=document.getElementsByClassName('minutes')[0];
		mpointer.style.transform='rotate('+(m*6-90)+'deg)';
		var spointer=document.getElementsByClassName('seconds')[0];
		spointer.style.transform='rotate('+(s*6-90)+'deg)';
		h1=h<10?'0'+h:h;
    	m1=m<10?'0'+m:m;
    	s1=s<10?'0'+s:s;
    	var timeNum=document.getElementById("showTime");
		timeNum.innerHTML=h1+':'+m1+':'+s1;
	}   
	drawClock();
	window.setInterval(drawClock,500);    	
// Clock

