// NAV MENU STYLES
$(function(){
	$("#nav LI A").mouseover(function(){
		id_var = $(this).parent().attr('id');
		$("#nav LI.current").stop().animate({width: '75px', opacity:0.75},200,'swing');
		$(this).parent().stop().animate({width: '95px', opacity:1},200,'swing');
		$("H1").fadeOut(100,function(){
			$(this).removeClass().addClass(id_var).fadeIn(100);
		});
	}).mouseout(function(){
		$(this).parent().stop().animate({width: '75px', opacity:0.75},200,'swing');
	}).mousedown(function(){
		$(this).parent().css('width','92px');
	}).mouseup(function(){
		$(this).parent().css('width','95px');
	});
	$("#nav UL").mouseleave(function(){
		$("#nav LI.current").stop().animate({width: '95px', opacity:1},200,'swing');
		$("H1").fadeOut(100,function(){
			$(this).removeClass().fadeIn(100);
		});
	});
	
});

// Image preloading function
(function($) {
  var cache = [];
  // Arguments are image paths relative to the current page.
  $.preLoadImages = function() {
    var args_len = arguments.length;
    for (var i = args_len; i--;) {
      var cacheImage = document.createElement('img');
      cacheImage.src = arguments[i];
      cache.push(cacheImage);
    }
  }
})(jQuery)