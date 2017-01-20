// <----------------- This is for the scrollspy function ----------------->

$(document).ready(function(){
  $('.scrollspy').scrollSpy();
});

// <----------------- End the scrollspy function ----------------->


// <----------------- This is for the progressbar ----------------->

$(document).ready(function(){

var getMax = function(){
    return $(document).height() - $(window).height();
}

var getValue = function(){
    return $(window).scrollTop();
}

if('max' in document.createElement('progress')){
    // Browser supports progress element
    var progressBar = $('progress');

    // Set the Max attr for the first time
    progressBar.attr({ max: getMax() });

    $(document).on('scroll', function(){
        // On scroll only Value attr needs to be calculated
        progressBar.attr({ value: getValue() });
    });

    $(window).resize(function(){
        // On resize, both Max/Value attr needs to be calculated
        progressBar.attr({ max: getMax(), value: getValue() });
    });
}
else {
    var progressBar = $('.progress-bar'),
        max = getMax(),
        value, width;

    var getWidth = function(){
        // Calculate width in percentage
        value = getValue();
        width = (value/max) * 100;
        width = width + '%';
        return width;
    }

    var setWidth = function(){
        progressBar.css({ width: getWidth() });
    }

    $(document).on('scroll', setWidth);
    $(window).on('resize', function(){
        // Need to reset the Max attr
        max = getMax();
        setWidth();
    });
  }
});
$(document).ready(function(){

$('#flat').addClass("active");
$('#progressBar').addClass('flat');

$('#flat').on('click', function(){
  $('#progressBar').removeClass().addClass('flat');
  $('a').removeClass();
  $(this).addClass('active');
  $(this).preventDefault();
});

$('#single').on('click', function(){
  $('#progressBar').removeClass().addClass('single');
  $('a').removeClass();
  $(this).addClass('active');
  $(this).preventDefault();
});

$('#multiple').on('click', function(){
  $('#progressBar').removeClass().addClass('multiple');
  $('a').removeClass();
  $(this).addClass('active');
  $(this).preventDefault();
});

$('#semantic').on('click', function(){
  $('#progressBar').removeClass().addClass('semantic');
  $('a').removeClass();
  $(this).addClass('active');
  $(this).preventDefault();
  alert('hello');
});
$(document).on('scroll', function(){

    var maxAttr = $('#progressBar').attr('max');
    var valueAttr = $('#progressBar').attr('value');
    var percentage = (valueAttr/maxAttr) * 100;

    // if(percentage<49){
    //   document.styleSheets[0].addRule('.semantic', 'color: red');
    //   document.styleSheets[0].addRule('.semantic::-webkit-progress-value', 'background-color: red');
    //   document.styleSheets[0].addRule('.semantic::-moz-progress-bar', 'background-color: red');
    // }
    // else if(percentage<98){
    //   document.styleSheets[0].addRule('.semantic', 'color: orange');
    //   document.styleSheets[0].addRule('.semantic::-webkit-progress-value', 'background-color: orange');
    //   document.styleSheets[0].addRule('.semantic::-moz-progress-bar', 'background-color: orange');
    // }
    // else {
    //   document.styleSheets[0].addRule('.semantic', 'color: green');
    //   document.styleSheets[0].addRule('.semantic::-webkit-progress-value', 'background-color: green');
    //   document.styleSheets[0].addRule('.semantic::-moz-progress-bar', 'background-color: green');
    // }
  });
});

// <----------------- End progress bar ----------------->


// <----------------- Begin scroll skew ----------------->

// Global Variables
var currentDelta = 0; // The global value for the previous delta
var deltaLimit = 80; // Set the limit of the skew here
var returnSpeed = 1.08; // Sets the speed of return

// Calculates scroll speed
var checkScrollSpeed = (function(settings){
    settings = settings || {};
	var lastPos, newPos, timer, delta,
		delay = settings.delay || 20;
	function clear() {
		lastPos = null;
		delta = 0;
	}
	clear();
	return function(){
		newPos = window.scrollY;
		if ( lastPos != null ){ // && newPos < maxScroll
			delta = newPos -  lastPos;
		}
		lastPos = newPos;
		clearTimeout(timer);
		timer = setTimeout(clear, delay);
		updateRate(delta);
		return delta;
	};
  // This function updates the rate with the highest absolute rate
  // with respect to negative and positive values.
  // The final result is modded by the limit to cap the max value.
	function updateRate(deltaValue){
		if (Math.abs(deltaValue) > Math.abs(currentDelta)){
		  	currentDelta = (delta) % deltaLimit;
		}
	}
})();

// This is the decay rate of the skew
window.setInterval(function(){
	currentDelta = (currentDelta/returnSpeed).toFixed(5); // "toFixed" rounds to 5 significant digits
	updateSkew();
}, 10);

// Updates the skew value of the object with the decay rate.
function updateSkew(){
	var $changeSkew = 'skewY('+(currentDelta/20).toFixed(5)+'deg)';
	var $changeTransform = 'translateY('+ (currentDelta*2) +'px)';
	var $change = $changeSkew + ' ' + $changeTransform
	$(".scrollSkew").css('transform', $change);
}

// listen to "scroll" event to trigger effect
window.onscroll = function(){
  checkScrollSpeed();
};

// <----------------- End scroll skew ----------------->


// <----------------- Begin hide header ----------------->

// Hide Header on on scroll down
var didScroll;
var lastScrollTop = 0;
var deltaHeader = 5;
var navbarHeight = $('header').outerHeight();
console.log(navbarHeight);

$(window).scroll(function(event){
    didScroll = true;
});

setInterval(function() {
    if (didScroll) {
        hasScrolled();
        didScroll = false;
    }
}, 250);

function hasScrolled() {
    var st = window.scrollY;
    console.log(st);


    // Make sure they scroll more than deltaHeader
    if(Math.abs(lastScrollTop - st) <= deltaHeader)
        return;

    // If they scrolled down and are past the navbar, add class .nav-up.
    // This is necessary so you never see what is "behind" the navbar.
    if (st > lastScrollTop && st > navbarHeight){
        // Scroll Down
        console.log(didScroll);

        $('header').removeClass('nav-down').addClass('nav-up');
    } else {
        // Scroll Up
        if(st + $(window).height() < $(document).height()) {
            $('header').removeClass('nav-up').addClass('nav-down');
        }
    }

    lastScrollTop = st;
}

// <----------------- End hide header ----------------->
