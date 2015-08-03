/**
 * @author Dhruv Chand
 */

//MatLib - Math Plotting Library

function addFunctions(c, width, height) {
	var prevx = 0, prevy = 0;
	//Remember position

	c.quiver = function(startx, starty, x, y, text) {
		var endx = startx + x;
		var endy = starty + y;
		this.line(startx, starty, endx, endy);
		var x_ = 0.7 * (endx - startx);

		var y_ = 0.7 * (endy - starty);
		this.line2(endx, endy, (x_ - endx + startx) * cos(20) - (y_ - endy + starty) * sin(20), (y_ - endy + starty) * cos(20) + (x_ - endx + startx) * sin(20));
		this.line2(endx, endy, (x_ - endx + startx) * cos(-20) - (y_ - endy + starty) * sin(-20), (y_ - endy + starty) * cos(-20) + (x_ - endx + startx) * sin(-20));
		prevx = endx;
		prevy = endy;

		if (text != undefined) {
			label(this, text, endx, endy);
		}
	}

	c.quiver2 = function(startx, starty, endx, endy, text) {
		this.line(startx, starty, endx, endy);
		var x_ = 0.7 * (endx - startx);
		var y_ = 0.7 * (endy - starty);
		this.line2(endx, endy, (x_ - endx + startx) * cos(20) - (y_ - endy + starty) * sin(20), (y_ - endy + starty) * cos(20) + (x_ - endx + startx) * sin(20));
		this.line2(endx, endy, (x_ - endx + startx) * cos(-20) - (y_ - endy + starty) * sin(-20), (y_ - endy + starty) * cos(-20) + (x_ - endx + startx) * sin(-20));
		prevx = endx;
		prevy = endy;
		if (text != undefined) {
			label(this, text, endx, endy);
		}
	}

	c.quiver3 = function(x, y, text) {
		
		this.quiver(prevx,prevy,x,y,text);
		
		/*
		var endx = prevx + x;
		var endy = prevy + y;
		this.line(prevx, prevy, endx, endy);
		var x_ = 0.7 * (endx - prevx);
		var y_ = 0.7 * (endy - prevy);
		this.line2(endx, endy, (x_ - endx + prevx) * cos(20) - (y_ - endy + prevy) * sin(20), (y_ - endy + prevy) * cos(20) + (x_ - endx + prevx) * sin(20));
		this.line2(endx, endy, (x_ - endx + prevx) * cos(-20) - (y_ - endy + prevy) * sin(-20), (y_ - endy + prevy) * cos(-20) + (x_ - endx + prevx) * sin(-20));
		prevx = endx;
		prevy = endy;
		if (text != undefined) {
			label(this, text, endx, endy);
		}
		
		*/
	}

	c.line = function(startx, starty, endx, endy, text) {
		this.beginPath();
		this.moveTo(startx, starty);
		this.lineTo(endx, endy);
		this.stroke();
		if (text != undefined) {
			label(this, text, endx, endy);
		}
		prevx=endx;
		prevy=endy;
	}

	c.line2 = function(startx, starty, x, y, text) {
		this.beginPath();
		this.moveTo(startx, starty);
		this.lineTo(startx + x, starty + y);
		this.stroke();
		if (text != undefined) {
			label(this, text, startx + x, starty + y);
		}
		prevx=startx + x;
		prevy = starty+y;
	}

	c.line3 = function(x,y,text)
	{
		this.beginPath();
		this.moveTo(prevx, prevy);
		this.lineTo(prevx + x, prevy + y);
		this.stroke();
		if (text != undefined) {
			label(this, text, prevx + x, prevy + y);
		}
		prevx=prevx + x;
		prevy =prevy+y;
	}
    c.circle = function(x,y,rad,fill)
    {
        this.color(fill);
        this.beginPath();
        this.moveTo(x,y);
        this.arc(x,y, rad/c.sc,0,2*Math.PI,false);
        if(fill!=undefined){
            this.fillStyle = fill;
            this.fill();
        }
        this.stroke();
            
    }
	c.clear = function() {
		this.translate(-width / 2, -height / 2);
		this.fillStyle = "#FFFFFF";
		this.fillRect(-100 * width, -100 * height, 10000 * width, 10000 * height);
		this.translate(width / 2, height / 2);
	}

	c.color = function(x) {
		this.strokeStyle = x;
		this.fillStyle = x;
	}
c.putTextS =  function(text,x,y)
	{
	c.scale(1/c.sc, -1/c.sc);
	c.fillText(text, x *c.sc,-1*y*c.sc);
	c.scale(1*c.sc, -1*c.sc);
	}
	

	c.putText =  function(text,x,y)
	{
	c.scale(1/c.sc, -1/c.sc);
	c.fillText(text, x ,-1*y);
	c.scale(1*c.sc, -1*c.sc);
	}
	
	
	c.setDash = function(dash)
	{	
	if(dash!=undefined){
		if(c.setLineDash!=undefined){
	c.setLineDash([dash/c.sc]);
		}
		else
		{
	 c.mozDash =([dash/c.sc]);
		}
	}
	else{
		if(c.setLineDash!=undefined){
	c.setLineDash([]);
		}
		else
		{
	 c.mozDash =([]);
		}
	}
		
	}

	
	c.sc = 1;
	return c;

}


function resize(c, width, height) {
	c.height = height;
	c.width = width;
	c.getContext("2d").translate(width / 2, height / 2);
}

function label(c, text, x, y) {
    c.fontFamily="Comic Sans";
	c.scale(1/c.sc, -1/c.sc);
	c.fillText(text, x > 0 ? x*c.sc + 10 : x*c.sc - 10, y < 0 ? -1 * y*c.sc + 10 : -1 * y*c.sc - 10);
	c.scale(1*c.sc, -1*c.sc);
}

function cos(x) {
	return Math.cos(x * 3.14 / (180))
}
function sin(x) {
	return Math.sin(x * 3.14 / (180))
}




function rad2deg(x) {
	return x * 180 / 3.1415;
}

function deg2rad(x) {
	return x * 3.1415 / 180;
}


function getMax(ar){
	
	var m = Math.abs(ar[0]);
	for(var i =1;i<ar.length;i++)
	{
		if(Math.abs(ar[i])>m)
			m=ar[i];
	}
	return m;
}

function magn(x,y)
{
return Math.sqrt(x*x+y*y);	
}


function circcirc(x0, y0, r0, x1, y1, r1) {
        var a, dx, dy, d, h, rx, ry;
        var x2, y2;

         
        dx = x1 - x0;
        dy = y1 - y0;

        d = Math.sqrt((dy*dy) + (dx*dx));

        if (d > (r0 + r1)) {
            return false;
        }
        if (d < Math.abs(r0 - r1)) {
            return false;
        }


        a = ((r0*r0) - (r1*r1) + (d*d)) / (2.0 * d) ;

        x2 = x0 + (dx * a/d);
        y2 = y0 + (dy * a/d);

        h = Math.sqrt((r0*r0) - (a*a));

        rx = -dy * (h/d);
        ry = dx * (h/d);

        var xi = x2 + rx;
        var xi_prime = x2 - rx;
        var yi = y2 + ry;
        var yi_prime = y2 - ry;

        return [xi, xi_prime, yi, yi_prime];
    }
	
	function sign(x)
	{
	return	x>=0?1:-1;
	}
	
	function addControl(mn,mx,def,stp,varname,units,fn)
	{
		$("#controls-1").append(varname);
		$("#controls-1").append('= <input type ="number" id="label-'+varname +'"></input>');
		$("#controls-1").append(units);
		$("#controls-1").append("<br/>");
		$("#controls-1").append('<div id="val-'+varname +'"></div>');
	
			$('#val-'+varname).slider({
				max : mx,
				min : mn,
				value : def,
				step : stp,
				slide : function(e, ui) {
					$('#label-'+varname).val(ui.value);
					refresh();
				}
			});
			$('#label-'+varname).spinner({
				max : mx,
				min : mn,
				value : def,
				step : stp,
				spin : function(e, ui) {
					$('#val-'+varname).slider("value", ui.value);
					refresh();
				},
				change : function(e, ui) {
					$('#val-'+varname).slider("value", ui.value);
					refresh();
				}
			});
	}