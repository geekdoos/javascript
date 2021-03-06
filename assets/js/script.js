$(document).ready(function(){

	$('#submitBnt').click(function(e){
		e.preventDefault();
		var intervals = data = [];

		var start 	= $('#start').val().split(':');
		var end 	= $('#end').val().split(':');
		var workTime = parseInt($('#wt').val());
		var pause = parseInt($('#pause').val());
		var nextTime;
		start = parseInt(start[0] * 60) + parseInt(start[1]);
		end = parseInt(end[0] * 60) + parseInt(end[1]);
		
		if (start < end) {
			var total = end - start;
			var min = 00;
			
			for (var i = 0; i < (total / workTime); i++) {
				nextTime = start + workTime;
				if (nextTime >= end) {
					min = 0;
				}
				intervals[i] = formateTime((start * 60) + (min * 60)) +' - '+ formateTime((nextTime * 60) + (min * 60)) + '<br />';
				seconds = ((nextTime * 60) + pause) * 60 ;
				data = secondsTimeSpanToHMS(seconds);

				start = data[0];
				min = data[1];
			}
			$('#result').html(intervals);
		}else{
			alert('the first hour must be less than second hour :p ');
		}
		
	});

});

function secondsTimeSpanToHMS(s) {
    var h = Math.floor(s/3600); //Get whole hours
    s -= h*3600;
    var m = Math.floor(s/60); //Get remaining minutes
    s -= m*60;
    return [h, m, s]; //zero padding on minutes and seconds
}

function formateTime(s) {
    var h = Math.floor(s/3600); //Get whole hours
    s -= h*3600;
    var m = Math.floor(s/60); //Get remaining minutes
    s -= m*60;
    return h+':'+m; //zero padding on minutes and seconds
}