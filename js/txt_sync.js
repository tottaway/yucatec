// Based on http://community.village.virginia.edu/etst/
function scrollIntoViewIfNeeded(target) {
    var rect = target.getBoundingClientRect();
    if (rect.bottom > window.innerHeight) {
        target.scrollIntoView(false);
    }
    if (rect.top < 0) {
        target.scrollIntoView();
    } 
} function sync(current_time) {
	for (var i=0; i<ts_tag_array.length; i++) {
        // Somewhat hacky solution: decrease current_time by 0.001 to avoid highlighting before player starts
		if ((current_time-0.001 >= parseFloat(ts_start_time_array[i])/1000.0) && (current_time <= parseFloat(ts_stop_time_array[i])/1000.0)) {
            ts_tag_array[i].setAttribute("id", "current");
            // $('#example, #td').animate({scrollTop:$("#current").offset().top}, 500);
            scrollIntoViewIfNeeded($("#current")[0]);
            ts_tag_array[i].style.backgroundColor = "rgb(209, 200, 225)";
		}
		else {
			ts_tag_array[i].style.backgroundColor = "transparent";
            try { ts_tag_array[i].removeAttribute("id"); }
            catch (err) { }
		}
	}
}


try {
    media = document.querySelectorAll("[data-live='true']")[0];
    media.setAttribute("ontimeupdate", "sync(this.currentTime)");
    media.setAttribute("onclick", "sync(this.currentTime)");
} catch (err) {
    console.log(err);
}


ts_tag_array = document.getElementsByClassName("labeledTimeBlock");
ts_start_time_array = [];
ts_stop_time_array = [];

for (var i = 0; i < ts_tag_array.length; i++) {
    ts_start_time_array[i] = ts_tag_array[i].getAttribute("data-start_time");
    ts_stop_time_array[i] = ts_tag_array[i].getAttribute("data-end_time");
}
// }

// I/P: t, an integer number of milliseconds
// O/P: the player updates to the given time
// Status: untested
function jumpToTime(t) {
  try {
    media = document.querySelectorAll("[data-live='true']")[0];
    media.currentTime = t/1000;
    console.log(media.currentTime);
  }
  catch(err) {
    console.log(err);
    console.log("We think you tried to jump to time before the MEDIA element was created.")
  }
}

$(".timeStamp").click(function() {
    jumpToTime($(this).data('start_time'));
});

// Jump to timestamp:
// Source: http://snydersoft.com/blog/2009/11/14/get-parameters-to-html-page-with-javascript/
$( document ).ready(function() {
    let query_index = document.URL.indexOf("?");
    let startTime = Number(document.URL.substr(query_index+1));
    startTime = startTime + 3 // do not remove (result of hacky solution further up in this file)
    media = document.querySelectorAll("[data-live='true']")[0];
    media.oncanplay = function () {
        this.currentTime = startTime / 1000;
    }
    //console.log(startTime);
    //jumpToTime(startTime);
    //console.log(document.getElementById(startTime));
});
