Raphael.fn.ProgressChart = function (cx, cy, radius, PercentCompleted, bgcolor, progrescolor, StrokeWidth, pcontainer) {
		var paper = this;
		
		paper.customAttributes.arc = function(xloc, yloc, value, total, R) {
			var alpha = 360 / total * value,
				a = (90 - alpha) * Math.PI / 180,
				x = xloc + R * Math.cos(a),
				y = yloc - R * Math.sin(a),
				path;
			if (total == value) {
				path = [
					["M", xloc, yloc - R],
					["A", R, R, 0, 1, 1, xloc - 0.01, yloc - R]
				];
			} else {
				path = [
					["M", xloc, yloc - R],
					["A", R, R, 0, +(alpha > 180), 1, x, y]
				];
			}
			return {
				path: path
			};
		};
		
		/*
		paper.customAttributes.arc = function (centerX, centerY, startAngle, endAngle, arcEdge) {
		  var radians = Math.PI / 180,
		  largeArc = +(endAngle - startAngle > 180),
		  // calculate the start and end points for both inner and outer edges of the arc segment
		  // the -90s are about starting the angle measurement from the top get rid of these if this doesn't suit your needs
		  outerX1 = centerX + arcEdge * Math.cos((startAngle-90) * radians),
		  outerY1 = centerY + arcEdge * Math.sin((startAngle-90) * radians),
		  outerX2 = centerX + arcEdge * Math.cos((endAngle-90) * radians),
		  outerY2 = centerY + arcEdge * Math.sin((endAngle-90) * radians);
		  
		  // build the path array
		  var path = [
			["M", outerX1, outerY1], //move to the start point
			["A", arcEdge, arcEdge, 0, largeArc, 1, outerX2, outerY2] //draw the outer edge of the arc
		  ];                   
		  return {path: path};
		};
		*/
				
		 
		//var text = paper.text(120, 120, '0%').attr({'font-size':20, 'font-family': 'Helvetica Neue", Helvetica, Arial, sans-serif', 'font-weight': 'bold'});
		var background = paper.circle(cx, cy, radius).attr({ stroke: bgcolor, "stroke-width": StrokeWidth }),
			circle = paper.path().attr({ stroke: progrescolor, "stroke-width": (StrokeWidth+1),  arc: [cx, cy, 0, 100, radius] }),
			count = 0,
			perc = PercentCompleted,
			total = 100,
			//percentage = -(perc / total) * 360,
			percentage = (perc / total) * total,
			animdur = 200,
			delay = (percentage / (animdur / 10)),
			stdur = 0; // Set Timeout Duration
			text = paper.text(cx, cy, perc+'%').attr({'font-size':20, 'font-family': 'Helvetica Neue", Helvetica, Arial, sans-serif', 'font-weight': 'bold', opacity : 0});

		AnimateProgress(count, perc, pcontainer);
		
		circle.mouseover(function () {
			circle.stop().animate({transform: "s1.1 1.1 " + cx + " " + cy}, 150, "easin");
			text.stop().animate({opacity : 1}, 150)
		}).mouseout(function () {
			circle.stop().animate({transform: ""}, 150, "easeout");
			text.stop().animate({opacity : 0}, 150)
		});
		
		function AnimateProgress(c, p, elm){
			if (c <= p ) {
				setTimeout( function(){
					/* Set Timeout Duration */
					$(elm).text(c+"%");
					c++;
					
					AnimateProgress(c, p, pcontainer);
					
					circle.animate({
						arc: [cx, cy, p, total, radius], 
					}, animdur, "linear");
					
					 stdur = (percentage/delay); 
					 
				}, stdur) // end function: Set Timout
			} //end if
			
		} // end function:  Animate Progress
		
		
	} // end function: Progress Chart
