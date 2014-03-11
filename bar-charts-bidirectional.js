var o = {
	init: function(direction, element, ElementDiagram, MaxValue){
		this.diagram(direction, element, ElementDiagram, MaxValue);
	},
	random: function(l, u){
		return Math.floor((Math.random()*(u-l+1))+l);
	},
	diagram: function(dir, elem, ElemDiagram, mv) {
		
		var originX;
		var originY;
		var barHeight;
		var barWidth;
		var barMargin;
		var maxVal;
		var r;
	
	 	if (dir === "horizontal") {
			originX = 0;
			originY = 15;
			barHeight = 45;
			barMargin = 10;
			maxVal = mv;
			r = Raphael(ElemDiagram, 476, 180);
			
		} else if(dir === "vertical") {
			originX = 100;
			originY = 220;
			barWidth = 110;
			barMargin = 18;
			barHeight = 0;
			maxVal = mv;
			r = Raphael(ElemDiagram, 620, 220);
		}
	 	
		
		elem.find('.stage').each(function(i){
			
			var t = $(this),
				count = 0,
				color = 0,
				value = 0,
				width = 0,
				height =0,
				text = 0,
				percentage = 0,
				speed = 500;
			
			
			if(dir === "horizontal") {
				count = t.find('.percent').val(),
				color = t.find('.color').val(),
				value = parseFloat ( ( ( (count / maxVal) * 100 ) / 100 ) * 100 ),
				width = r.width * (value *.0165),
				text = t.find('.text').text(),
				percentage = Math.round( value * 100 / 100) + '%';
				// create a new rectangle, providing X, Y, width, 
				// and height. Base the fill and stroke on the color
				var z = r.rect(originX, originY, 0, barHeight);
				
				// Color the rectangle nicely
				z.attr({
					fill: color,
					stroke: color,
					'stroke-width':0
				});
				
				 var index = "count" + i;
				$('#labels ul').append('<li>' + text + '</li>');
				elem.find('.Percentage').append('<span class="count-wrap" style="left :' + (width+15) + 'px; top:' + (originY+5) + 'px;"><span class="count">' + count + '</span><br><span class="percent" id="' + index + '">' + percentage +'</span></span>');
				
				z.animate({
					x:originX,
					width:width
				}, speed);
				
				originY = originY + barHeight + barMargin;
				
				z.mouseover(function(){
					this.stop(true, true).animate({ 'x': 5, 'stroke-width': 5, opacity: .75 }, 100, 'easein');
					//if(Raphael.type != 'VML') //solves IE problem
						//this.toFront();
				}).mouseout(function(){
					this.stop(true, true).animate({ x: originX, 'stroke-width': 0, opacity: 1 }, 100, 'easeout')
				});
				
				
				
			} else if(dir === "vertical") {
				count = t.find('.percent').val(),
				color = t.find('.color').val(),
				value = parseFloat ( ( ( (count / maxVal) * 100 ) / 100 ) * 100 ),
				height = r.height * (value *.012),
				text = t.find('.text').text();
				//percentage = Math.round( value * 100 / 100) + '%';
				
				// create a new rectangle, providing X, Y, width, 
				// and width. Base the fill and stroke on the color
				var z = r.rect(originX, originY, barWidth, 0);
				
				// Color the rectangle nicely
				z.attr({
					fill: color,
					stroke: color,
					'stroke-width':0,
					transform : 'r180 ' + originX + ' ' + originY
				});
				
				var left = 0;
				var clength = count.length;
				
				switch(clength) {
					case 1:
						left = originX;
					break;	
					
					case 2:
						left = originX;
					break;
					
					case 3:
						left = originX;
					break;
					
					case 4:
						left = originX;
					break;
				}
				
				var index = "count" + i;
				elem.find('.Percentage').append('<span class="count-wrap" style="bottom :' + (height+5) + 'px; left:' + left + 'px;"><span class="count">' + count + '</span></span>');
				
				z.animate({
					y:originY,
					height:height
				}, speed);
				
				originX = originX + barWidth + barMargin;
				
				z.mouseover(function(){
					this.stop(true, true).animate({ y: 220, 'stroke-width': 5, opacity: .75 }, 100, 'easein');
				}).mouseout(function(){
					this.stop(true, true).animate({ y: originY, 'stroke-width': 0, opacity: 1 }, 100, 'easeout')
				});
			}
			
		});
	}
}
