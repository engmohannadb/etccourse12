$(document).ready(function() {
	//Menu script
	$('#cssmenu li.active').addClass('open');
	$('#cssmenu li.active').children('ul').slideDown();
		
	$('#cssmenu li.has-sub>a').on('click', function(){
		$(this).removeAttr('href');
		var element = $(this).parent('li');
		if (element.hasClass('open')) {
			element.removeClass('open');
			element.find('li').removeClass('open');
			element.find('ul').slideUp();
		}
		else {
			element.addClass('open');
			element.children('ul').slideDown();
			element.siblings('li').children('ul').slideUp();
			element.siblings('li').removeClass('open');
			element.siblings('li').find('li').removeClass('open');
			element.siblings('li').find('ul').slideUp();
		}
	});

	$('#cssmenu>ul>li.has-sub>a').append('<span class="holder"></span>');
	//End menu script
	
	if($('body').hasClass('presentation')){
		$('#slider').cycle({ 
            fx: 'fade',
			timeout:  0,
            prev:    '#prev', 
            next:    '#next'
        });
	}
	
	$(window).load(function() {
		var maxHeight = ($("#left-col").height() > $("#right-col").height())? $("#left-col").height():$("#right-col").height();
		$("#right-col").css("min-height", maxHeight);
	});
	
	$(".navbar-toggle").click(function(){
		if($("#left-navigation").hasClass('opened')){
			HideLeftNavigation();
		}else{
			ShowLeftNavigation();
		}
		return false;
	});
	
	$("#trans").click(function(){
		HideLeftNavigation();
		return false;
	});
	
	
	
	if($('body').hasClass('lesson-page')){
		var unit = (GetUrlParameter('unit'))? GetUrlParameter('unit')-1:0;console.log(unit);
		var lesson = (GetUrlParameter('lesson'))? GetUrlParameter('lesson')-1:0;console.log(lesson);
		var last = ($("ul.mtree > li:eq("+unit+") > ul > li.lessons > ul li:eq("+lesson+")").hasClass('last'))? 1:0;
		var lessonTitle = $("ul.mtree > li:eq("+unit+") > ul > li.lessons > ul li:eq("+lesson+") a").text();console.log(lessonTitle);
		
		$("ul.mtree > li:eq("+unit+")").addClass('open');
		$("ul.mtree > li:eq("+unit+") > ul").css("display","block");
		
		$("ul.mtree > li:eq("+unit+") > ul > li.lessons").addClass('open');
		$("ul.mtree > li:eq("+unit+") > ul > li.lessons > ul li:eq("+lesson+")").addClass('active');
		$("ul.mtree > li:eq("+unit+") > ul > li.lessons > ul").css("display","block");
		$("h1#main-title").text(lessonTitle);
		
		var lesson_char = "U"+(unit+1)+"L"+(lesson+1)+"";
		$('#content').html('<video id="video-player" autoplay="autoplay" poster="videos/'+lesson_char+'/1.jpg" controls><source src="videos/'+lesson_char+'/1.mp4" type="video/mp4" /><a id="player" class="player" href="videos/'+lesson_char+'/4.flv" style="display:block;width:840px;height:615px;"><img src="videos/'+lesson_char+'/1.jpg" alt="" />		</a><script language="JavaScript">$f("player", "swf/flowplayer-3.2.18.swf");$f("player", "swf/flowplayer-3.2.18.swf", {clip: {onFinish: function(clip) {NextPage();}},onFinish: function() {							NextPage();}});</script></video>');
		
		var video = document.getElementsByTagName('video')[0];
		if(video){
			video.onended = function(e) {
				NextPage();
			};
		}
		
		function NextPage(){
			if(last == 1){
				document.location.href = "unit"+(unit+1)+"-summary.html";
			}else{
				document.location.href = "lessons.html?unit="+(unit+1)+"&lesson="+(lesson+2);
			}
		}
		
	}
	
	function GetUrlParameter(sParam) {
		var sPageURL = decodeURIComponent(window.location.search.substring(1)),
			sURLVariables = sPageURL.split('&'),
			sParameterName,
			i;

		for (i = 0; i < sURLVariables.length; i++) {
			sParameterName = sURLVariables[i].split('=');

			if (sParameterName[0] === sParam) {
				return sParameterName[1] === undefined ? true : sParameterName[1];
			}
		}
	}
	
	function ShowLeftNavigation(){
		$("#left-navigation").removeClass("closed");
		$("#left-navigation").addClass("opened");
		$('#trans').fadeIn(200);
		var maxHeight = $("#right-col").height();
		$("#left-navigation").css({"min-height":($(document).height() - maxHeight), "top": maxHeight});
		$('#left-navigation').stop().animate({
			'left': '0',
			opacity: 1
		}, 400, "easeInQuad");
	}
	
	function HideLeftNavigation(){
		$("#left-navigation").removeClass("opened");
		$("#left-navigation").addClass("closed");
		$('#left-navigation').stop().animate({
			'left': '-100%',
			opacity: 0
		}, 400, "easeInQuad");
		$('#trans').fadeOut(200);
	}
	
});

$(document).ready(function(){
  $('[data-toggle="popover"]').popover();   
});
