/**
 * LavaLamp - A menu plugin for jQuery with cool hover effects.
 * @requires jQuery v1.1.3.1 or above
 *
 * http//gmarwaha.com/blog/?p=7
 *
 * Copyright (c) 2007 Ganeshji Marwaha (gmarwaha.com)
 * Dual licensed under the MIT and GPL licenses:
 * http//www.opensource.org/licenses/mit-license.php
 * http//www.gnu.org/licenses/gpl.html
 *
 * Version: 0.2.0
 * Requires Jquery 1.2.1 from version 0.2.0 onwards. 
 * For jquery 1.1.x, use version 0.1.0 of lavalamp
 */

(function($){
	$.fn.lavaLamp=function(o){
		o=$.extend({
			fx:"linear",
			speed:500,
			click:function(){}
		},o||{});
	return this.each(function(){
		var me=$(this),noop=function(){},$parent_me=me.parent(),$back=$('<div id="marker" class="back"></div>').appendTo($parent_me),$li=$("> li",this),curr=$("> li.current",this)[0]||$($li[0]).addClass("current")[0];
		$li.not(".back").hover(function(){
			move(this)
			},noop);
		$(this).hover(noop,function(){
			move(curr)
			});
		function setCurr(el){
			$back.css({
				"left":el.offsetLeft+"px",
				"width":el.offsetWidth+"px"
				});
			curr=el
			};
			
		$li.click(function(e){
			setCurr(this);
			return o.click.apply(this,[e,this])
			});
		setCurr(curr);
		function move(el){
			$back.each(function(){
				$(this).dequeue()
				}).animate({
				width:el.offsetWidth,
				left:el.offsetLeft
				},o.speed,o.fx)
			}
		})
}
})(jQuery);

/* ---------------------------------------------------------------------- */
/*	Load Goolge Webfonts
/* ---------------------------------------------------------------------- */

WebFontConfig = {
	google: {
		families: ['Mr+Dafoe::latin','Droid+Serif:400,700,400italic:latin']
		}
};
(function() {
	var wf = document.createElement('script');
	wf.src = ('https:' == document.location.protocol ? 'https' : 'http') +
	'://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
	wf.type = 'text/javascript';
	wf.async = 'true';
	var s = document.getElementsByTagName('body')[0];
	s.appendChild(wf, s);
})();
	  
/* end Load Google Fonts */

/***************************************/
/* DOM READY --> Begin				   */
/***************************************/

jQuery(document).ready(function(){
	
	/* ---------------------------------------------------------------------- */
	/*	Flex Slider
	/* ---------------------------------------------------------------------- */

	(function() {

		if ($('#slider').length) {
			$(window).load(function() {
				$('#slider img').css('visibility','visible').fadeIn();
				$('#slider').flexslider({
					directionNav: true 
				});
			});
		}

	})();

	/* end Flex Slider */
	
	/* ---------------------------------------------------------------------- */
	/*	Elastic Slider
	/* ---------------------------------------------------------------------- */

	(function() {
	
		if($('#ei-slider').length) {
		
			$('#ei-slider').eislideshow({
				animation			: 'center',
				autoplay			: true,
				slideshow_interval	: 3000,
				titlesFactor		: 0
			});		
		}
		
	})();

	/* end Elastic Slider */

	/* ---------------------------------------------------------------------- */
	/*	jCarousel
	/* ---------------------------------------------------------------------- */

	(function() {

		var $carousel = $('.projects-carousel');
		if($carousel.length) {
			var scrollCount;

			if( $(window).width() < 479) {
				scrollCount = 1;
			} else if($(window).width() < 768) {
				scrollCount = 1;
			} else if($(window).width() < 960) {
				scrollCount = 2;
			} else {
				scrollCount = 3;
			}
			$carousel.jcarousel({
				animation : 600,
				easing    : 'easeOutCubic',
				scroll    : scrollCount
			});
		}

	})();

	/* end jCarousel */

	/* ---------------------------------------------------------------------- */
	/*	Main Navigation
	/* ---------------------------------------------------------------------- */

	(function() {

		var	arrowimages = {
			down: 'downarrowclass',
			right: 'rightarrowclass'
		};
		var $mainNav    = $('#navigation').find('> ul'),
		optionsList = '<option value="" selected>Navigation</option>';

		var $headers = $mainNav.find("ul").parent();
		$headers.each(function (i) {
			var $curobj = $(this);
			this.istopheader = $curobj.parents("ul").length == 1 ? true : false;
			$curobj.children("a").append('<span class="' + (this.istopheader ? arrowimages.down : arrowimages.right) +'"></span>');
		});

		$mainNav.lavaLamp({
			fx: "easeOutCubic", 
			speed: 400
		});

		// Navigation Responsive
		$mainNav.find('li').each(function() {
			var $this   = $(this),
			$anchor = $this.children('a'),
			depth   = $this.parents('ul').length - 1,
			dash  = '';

			if(depth) {
				while( depth > 0 ) {
					dash += '--';
					depth--;
				}
			}

			optionsList += '<option value="' + $anchor.attr('href') + '">' + dash + ' ' + $anchor.text() + '</option>';

		}).end()
		.after('<select class="nav-responsive">' + optionsList + '</select>');

		$('.nav-responsive').on('change', function() {
			window.location = $(this).val();
		});

	})();

	/* end Main Navigation */

	/* ---------------------------------------------------------------------- */
	/*	Cycle Latest
	/* ---------------------------------------------------------------------- */
	
	(function() {

		var $latest = $("ul.latest");

		if($latest.length) {
			function onAfter(curr, next, opts, fwd) {
				var index = opts.currSlide;
				//get the height of the current slide
				var $ht = $(this).height();
				//set the container's height to that of the current slide
				$(this).parent().animate({
					height: $ht
				});
			}
			$latest.after('<div class="latest-pager">&nbsp;</div>').cycle({
				fx: 'fade',
				timeout: 8000,
				height: 'auto',
				pause: 1,
				pager: '.latest-pager',
				before: onAfter,
				prev:    '#prev', 
				next:    '#next', 
				cleartypeNoBg: true
			});	

			// Include swipe touch
			if(Modernizr.touch) {

				function swipe(e, dir) {

					var $latest = $(e.currentTarget);

					$latest.data('dir', '')

					if(dir === 'left') {
						$latest.cycle('next');
					}

					if(dir === 'right') {
						$latest.data('dir', 'prev')
						$latest.cycle('prev');
					}
				}

				$latest.swipe({
					swipeLeft       : swipe,
					swipeRight      : swipe,
					allowPageScroll : 'auto'
				});

			}
		}
	
	})();

	/* end Cycle */
	
	/* ---------------------------------------------------------------------- */
	/*	Cycle Testimonials
	/* ---------------------------------------------------------------------- */
	
	(function() {

		var $quotes = $("ul.quoteBox");

		if($quotes.length) {

			// Run slider when all images are fully loaded
			$(window).load(function() {

				$quotes.each(function(i) {
					var $this = $(this);

					$this.cycle({
						before: function(curr, next, opts) {
							var $this = $(this);
							$this.parent().stop().animate({
								height: $this.height()
								}, opts.speed);
						},
						containerResize : false,
						easing          : 'easeInOutExpo',
						fx              : 'fade',
						fit             : true,
						next            : '.quote-next',
						pause           : true,
						prev            : '.quote-prev',
						slideExpr       : 'li',
						slideResize     : true,
						speed           : 600,
						timeout         : 4000,
						width           : '100%'
					});
				});

			});

			// Include swipe touch
			if(Modernizr.touch) {

				function swipe(e, dir) {

					var $quotes = $(e.currentTarget);

					$quotes.data('dir', '')

					if(dir === 'left') {
						$quotes.cycle('next');
					}

					if(dir === 'right') {
						$quotes.data('dir', 'prev')
						$quotes.cycle('prev');
					}

				}

				$quotes.swipe({
					swipeLeft       : swipe,
					swipeRight      : swipe,
					allowPageScroll : 'auto'
				});

			}
		}
	
	})();

	/* end Cycle */

	/* ---------------------------------------------------------------------- */
	/*	Flickr Initialization
	/* ---------------------------------------------------------------------- */
	
	jQuery('ul#flickr-badge').jflickrfeed({
		limit: 6,
		qstrings: {
			id: '76745153@N04'
		},
		itemTemplate: '<li><a href="http//www.flickr.com/photos/76745153@N04"><img src="{{image_s}}" alt="{{title}}" /></a></li>'
	});

	/* end Flickr --> End */
	
	/* ---------------------------------------------------------------------- */
	/*	Fit Videos
	/* ---------------------------------------------------------------------- */

	(function() {

		$('.container').each(function(){
			var target  = [
			"iframe[src^='http//www.youtube.com']",
			"iframe[src^='http//player.vimeo.com']",
			"object",
			"embed"
			],
			$allVideos = $(this).find(target.join(','));

			$allVideos.each(function(){
				var $this = $(this);
				if (this.tagName.toLowerCase() == 'embed' && $this.parent('object').length || $this.parent('.liquid-video-wrapper').length) {
					return;
				} 
				var height = this.tagName.toLowerCase() == 'object' ? $this.attr('height') : $this.height(),
				aspectRatio = height / $this.width();
				if(!$this.attr('id')){
					var $ID =  Math.floor(Math.random()*9999999);
					$this.attr('id', $ID);
				}
				$this.wrap('<div class="liquid-video-wrapper"></div>').parent('.liquid-video-wrapper').css('padding-top', (aspectRatio * 100)+"%");
				$this.removeAttr('height').removeAttr('width');
			});
		});
	
	})();

	/* end Fit Videos */
	
	/* ---------------------------------------------------------------------- */
	/*	VideoJS
	/* ---------------------------------------------------------------------- */

	(function() {

		var $player = $('.video-js');

		if($player.length) {

			function adjustPlayer() {
			
				$player.each(function( i ) {

					var $this        = $(this)
						playerWidth  = $this.parent().width(),
						playerHeight = playerWidth / ( $this.children('.vjs-tech').data('aspect-ratio') || 1.78 );

					if( playerWidth <= 300 ) {
						$this.addClass('vjs-player-width-300');
					} else {
						$this.removeClass('vjs-player-width-300');
					}

					if( playerWidth <= 250 ) {
						$this.addClass('vjs-player-width-250');
					} else {
						$this.removeClass('vjs-player-width-250');
					}

					$this.css({
						'height' : playerHeight,
						'width'  : playerWidth
					})
					.attr('height', playerHeight )
					.attr('width', playerWidth );

				});

			}

			adjustPlayer();

			$(window).on('resize', function() {

				var timer = window.setTimeout( function() {
					window.clearTimeout( timer );
					adjustPlayer();
				}, 30 );

			});

		}

	})();

	/* end VideoJS */
	
	/* ---------------------------------------------------------------------- */
	/*	AudioPlayerV1
	/* ---------------------------------------------------------------------- */

	(function() {

		var $player = $('.AudioPlayerV1');

		if($player.length) {

			$player.each(function(i) {

				var $this = $(this);

				$this.prev('audio').hide().end()
					 .wrap('<div class="entry-audio" />');

			});

			function adjustPlayer(resize){
			
				$player.each(function(i) {

					var $this            = $(this),
						$lis             = $this.children('li'),
						$progressBar     = $this.children('li.APV1_container'),
						playerWidth      = $this.parent().width(),
						lisWidth         = 0;

					if(!resize)
						$this.prev('audio').hide()

					if(playerWidth <= 300 ) {
						$this.addClass('APV1_player_width_300');
					} else {
						$this.removeClass('APV1_player_width_300');
					}

					if( playerWidth <= 250 ) {
						$this.addClass('APV1_player_width_250');
					} else {
						$this.removeClass('APV1_player_width_250');
					}

					if( playerWidth <= 200) {
						$this.addClass('APV1_player_width_200');
					} else {
						$this.removeClass('APV1_player_width_200');
					}

					$lis.each(function() {

						var $li = $(this);
						lisWidth += $li.width();

					});

					$this.width($this.parent().width());
					$progressBar.width(playerWidth - (lisWidth - $progressBar.width()));
					
				});

			}

			adjustPlayer();

			$(window).on('resize', function() {

				var timer = window.setTimeout(function() {
					window.clearTimeout( timer );
					adjustPlayer(resize = true);
				}, 30);

			});

		}

	})();

	/* end AudioPlayerV1 */

	/* ---------------------------------------------------------------------- */
	/*	Google Maps
	/* ---------------------------------------------------------------------- */

	(function() {
		
		if($('#map').length) {
			$('#map').gMap({ 
				address: 'New York, USA',
				zoom: 13,
				markers: [
				{
					'address' : 'Madison ST, New York'
				}
				]
			});  
		}
		
	})();

	/* end Google Maps */


	/* ---------------------------------------------------------------------- */
	/*	Top and Bottom Holder
	/* ---------------------------------------------------------------------- */
	
	var marker = $('#marker'), $tpanel = $('#header-top > .container');
	
	$('#more').click(function(e){
		
		var $target = $(e.target);
		
		if($target.hasClass('hide')) {
			$tpanel.animate({
				opacity: '0'
			},200)
		}
		
		$tpanel.slideToggle(600, function(){
			$target.toggleClass('hide');
			
			if($(this).css('display') == 'block') {
				marker.animate({opacity : 0});
				$(this).animate({
					opacity:'1'
				},200);
				
			} else {
				marker.animate({opacity : 1});
				$(this).animate({
					opacity:'0'
				},200);
				
			}
		});
		
		e.preventDefault();
	});
	/* ---------------------------------------------------------------------- */
	/*	Bottom Toogle Panel
	/* ---------------------------------------------------------------------- */
	
	(function(){
		
		var $panel = $(".panel");
			
		$('#footer-more').click(function(e) {
			
			var $target = $(e.target);
			
			if($target.hasClass('hide')) {
				$panel.animate({
					opacity: '0'
				},200)
			}
			
			var $pos = $(window).scrollTop();
			$panelHeight = $('.panel').outerHeight(true);
			
			$panel.slideToggle(600, function(){
				$target.toggleClass('hide');
				if($(this).css('display') == 'block') {
					$(this).animate({
						opacity:'1'
					},200);
				} else {
					$(this).animate({
						opacity:'0'
					},200);
				}
			}   
			)
				
			$('html, body').animate({
				scrollTop : $pos + $panelHeight
				}, 1000);
			e.preventDefault();
		});

	})();

	/* end and Bottom Holder  */
	
	/* ---------------------------------------------------------------------- */
	/*	Min-height
	/* ---------------------------------------------------------------------- */

	(function() {

		$('.content-wrapper')
		.css('min-height', $(window).outerHeight(true) 
			- $('#header').outerHeight(true) 
			- $('#footer').outerHeight(true) - 4);

	})();

	/* end Min-height */

	/* ---------------------------------------------------------------------- */
	/*	Accordion Content
	/* ---------------------------------------------------------------------- */

	(function() {

		if($('.acc-container').length) {

			var $container = $('.acc-container'),
			$trigger   = $('.acc-trigger');

			$container.hide();
			$trigger.first().addClass('active').next().show();

			var fullWidth = $container.outerWidth(true);
			$trigger.css('width', fullWidth);
			$container.css('width', fullWidth);

			$trigger.on('click', function(e) {
				if( $(this).next().is(':hidden') ) {
					$trigger.removeClass('active').next().slideUp(300);
					$(this).toggleClass('active').next().slideDown(300);
				}
				e.preventDefault();
			});

			// Resize
			$(window).on('resize', function() {
				fullWidth = $container.outerWidth(true)
				$trigger.css('width', $trigger.parent().width() );
				$container.css('width', $container.parent().width() );
			});
		}
			
	})();

	/* end Accordion Content */
	
	/* ---------------------------------------------------------------------- */
	/*	Contact Form
	/* ---------------------------------------------------------------------- */
	
	
	(function() {
			
		if($('#contactform').length) {
				
			var $form = $('#contactform'),
			$loader = '<img src="images/loader.gif" height="11" width="16" alt="Loading..." />';
			$form.append('<div class="hidden" id="contact_form_responce">');
					
			var $response = $('#contact_form_responce');
			$response.append('<blockquote></blockquote>');
					
			$form.submit(function(e){
					   
				$response.find('blockquote').html($loader);

				var data = {
					action: "contact_form_request",
					values: $("#contactform").serialize()
				};
				
				//send data to server
				$.post("php/contact-send.php", data, function(response) {
					
					response = $.parseJSON(response);
					
					$(".wrong-data").removeClass("wrong-data");
					$response.find('img').remove();
					
					if(response.is_errors){
						
						$response.find('blockquote').removeClass().addClass("error");
						$.each(response.info,function(input_name, input_label) {
							
							$("[name="+input_name+"]").addClass("wrong-data");
							$response.find('blockquote').append('Please enter correctly "'+input_label+'"!'+ '</br>');
						});
						
					} else {
						
						$response.find('blockquote').removeClass().addClass('success');
						
						if(response.info == 'success'){
							
							$response.find('blockquote').append('Your email has been sent!');
							$form.find('input:not(input[type="submit"], button), textarea, select').val('').attr( 'checked', false );
							$response.delay(2000).hide(400);
							return false;
						}

						if(response.info == 'server_fail'){
							$response.find('blockquote').append('Server failed. Send later!');
						}
					}
					
					// Scroll to bottom of the form to show respond message
					var bottomPosition = $form.offset().top + $form.outerHeight() - $(window).height();
					
					if( $(document).scrollTop() < bottomPosition)
						$('html, body').animate({
							scrollTop : bottomPosition
						});

					$response.show(450);

				});
				
				e.preventDefault();
				
			});				
				
		}
			
	})();

	/* end Contact Form */

	/* ---------------------------------------------------------------------- */
	/*	Content Tabs
	/* ---------------------------------------------------------------------- */

	(function() {
		
		if($('.content-tabs').length || $('.aside-tabs').length) {
		
			var $contentTabs  = $('.content-tabs'),
			$asideTabs	  = $('.aside-tabs');

			$.fn.tabs = function($obj) {
				$tabsNavLis = $obj.find('.tabs-nav').children('li'),
				$tabContent = $obj.find('.tab-content');

				$tabsNavLis.first().addClass('active').show();
				$tabContent.first().show();

				$obj.find('ul.tabs-nav li').on('click', function(e) {
					var $this = $(this);

					$obj.find('ul.tabs-nav li').removeClass('active');
					$this.addClass('active');
					$obj.find('.tab-content').hide(); //Hide all tab content
					$($this.find('a').attr('href')).fadeIn();

					e.preventDefault();
				});
			}

			$contentTabs.tabs($contentTabs);
			$asideTabs.tabs($asideTabs);
		}
		
	})();

	/* end Content Tabs */

	/* ---------------------------------------------------------------------- */
	/*	Content Toggle
	/* ---------------------------------------------------------------------- */
	
	(function() {
		
		if($('.toggle-container').length) {	
			$(".toggle-container").hide(); //Hide (Collapse) the toggle containers on load
			//Switch the "Open" and "Close" state per click then slide up/down (depending on open/close state)
			$(".trigger").click(function(){
				$(this).toggleClass("active").next().slideToggle("slow");
				return false; //Prevent the browser jump to the link anchor
			});
		}
		
	})();
	
	/* end Content Toggle */
	
	/* ---------------------------------------------------------------------- */
	/*	Placeholder
	/* ---------------------------------------------------------------------- */

	(function() {
		
		$.fn.placeholder = function() {
			if(typeof document.createElement("input").placeholder == 'undefined') {
				$('[placeholder]').focus(function() {
					var input = $(this);
					if (input.val() == input.attr('placeholder')) {
						input.val('');
						input.removeClass('placeholder');
					}
				}).blur(function() {
					var input = $(this);
					if (input.val() == '' || input.val() == input.attr('placeholder')) {
						input.addClass('placeholder');
						input.val(input.attr('placeholder'));
					}
				}).blur().parents('form').submit(function() {
					$(this).find('[placeholder]').each(function() {
						var input = $(this);
						if (input.val() == input.attr('placeholder')) {
							input.val('');
						}
					})
				});
			}
		}
	
		$.fn.placeholder();
	
	})();

	/* end Placeholder */

	/* ---------------------------------------------------------------------- */
	/*	Back to Top
	/* ---------------------------------------------------------------------- */

	(function() {

		var extend = {
			button      : '#back-top',
			text        : '返回顶部',
			min         : 200,
			fadeIn      : 400,
			fadeOut     : 400,
			speed		: 800,
			easing		: 'easeOutQuint'
		}
	
		$('body').append('<a href="#" id="' + extend.button.substring(1) + '" title="' + extend.text + '">' + extend.text + '</a>');

		$(window).scroll(function() {
			var pos = $(window).scrollTop();

			if (pos > extend.min) 
				$(extend.button).fadeIn(extend.fadeIn);
			else 
				$(extend.button).fadeOut (extend.fadeOut);
		});
		
		$(extend.button).click(function(e){
			$('html, body').animate({
				scrollTop : 0
			}, extend.speed, extend.easing);
			e.preventDefault();
		});

	})();

	/* end Back to Top */
	
	/* ---------------------------------------------------------------------- */
	/*	Fancybox
	/* ---------------------------------------------------------------------- */
	
	(function() {
	
		if($('.single-image').length || $('a.video').length) {
			(function() {
				$('.single-image, .video').fancybox({
					'titlePosition' : 'over',
					'transitionIn'  : 'fade',
					'transitionOut' : 'fade'
				}).each(function() {
					$(this).append('<span class="curtain">&nbsp;</span>');
				});		
			})()
		}
	
		if($('a.video').length) {
			(function() {
				$('a.video').on('click',function() {
					$.fancybox({
						'type' : 'iframe',
						'href' : this.href.replace(new RegExp('watch\\?v=', 'i'), 'embed/') + '&autoplay=1',
						'overlayShow' : true,
						'centerOnScroll' : true,
						'speedIn' : 100,
						'speedOut' : 50,
						'width' : 640,
						'height' : 480
					});
					return false;
				});
			})()
		}

		/* end fancybox --> End */

		// Hover effects Portfolio filter

		$.fn.slideShow = function() {
			this.animate({
				marginLeft : 'show',
				marginRight : 'show',
				paddingLeft : 'show',
				paddingRight : 'show',
				width : 'show' 
			}
			)
			};

		$.fn.slideHide = function() {
			this.animate( {
				marginLeft : 'hide',
				marginRight : 'hide',
				paddingLeft : 'hide',
				paddingRight : 'hide',
				width : 'hide' 
			}
			)
			};
		
	})();

	/* ------------------------------------------------------------------- */
	/*	Portfolio														 
	/* ------------------------------------------------------------------- */

	(function() {

		var $cont = $('#portfolio-items');
		var $container = $('.container');

		if($cont.length) {

			var $itemsFilter = $('#portfolio-filter'),
			mouseOver;

			// Copy categories to item classes
			$('article', $cont).each(function(i) {
				var $this = $(this);
				$this.addClass($this.attr('data-categories'));
			});

			// Run Isotope when all images are fully loaded
			$(window).on('load', function() {
				
				$cont.isotope({
					itemSelector : 'article',
					layoutMode   : 'fitRows'

				});

			});

			// Filter projects
			$itemsFilter.on('click', 'a', function(e) {
				var $this         = $(this),
				currentOption = $this.attr('data-categories');

				$itemsFilter.find('a').removeClass('active');
				$this.addClass('active');

				if(currentOption) {
					if(currentOption !== '*') currentOption = currentOption.replace(currentOption, '.' + currentOption)
					
					$cont.isotope({
						filter : currentOption
					});
				}

				e.preventDefault();
			});

			$itemsFilter.find('a').first().addClass('active');
			$itemsFilter.find('a').not('.active').hide();

			$itemsFilter.on('mouseenter', function() {
				var $this = $(this);

				clearTimeout(mouseOver);

				mouseOver = setTimeout( function() {
					$this.find('li a').stop(true,true).slideShow(300);
				}, 100);
			}).on('mouseleave', function() {
				clearTimeout(mouseOver);
				if($container.width() == 420 || $container.width() == 300) return false;
				$(this).find('li a').not('.active').stop(true,true).slideHide(150);
			});

		}

	})();

	/* end Portfolio  */
	
	/* ---------------------------------------------------------------------- */
	/*	Image Gallery Slider
	/* ---------------------------------------------------------------------- */

	(function() {

		var $slider = $('.image-gallery-slider ul');

		if($slider.length) {

			// Run slider when all images are fully loaded
			$(window).load(function() {

				$slider.each(function(i) {
					var $this = $(this);
					
					$this.css('height', $this.find('li:first img').height())
					.after('<div class="image-gallery-slider-nav"> <a class="prev">Prev</a> <a class="next">Next</a> </div>')
					.cycle({
						before: function(curr, next, opts) {
							var $this = $(this);
							$this.parent().stop().animate({
								height: $this.height()
								}, opts.speed);
						},
						containerResize : false,
						easing          : 'easeInOutExpo',
						fx              : 'scrollRight',
						fit             : true,
						next            : '.next',
						pause           : true,
						prev            : '.prev',
						slideExpr       : 'li',
						slideResize     : true,
						speed           : 600,
						timeout         : 0,
						width           : '100%'
					});

				});

				// Pause on nav hover
				$('.image-gallery-slider-nav a').on('mouseenter', function() {
					$(this).parent().prev().cycle('pause');
				}).on('mouseleave', function() {
					$(this).parent().prev().cycle('resume');
				});

			});

			// Resize
			$(window).on('resize', function() {
				$slider.css('height', $slider.find('li:visible img').height());
			});

			// Include swipe touch
			if(Modernizr.touch) {

				function swipe(e, dir) {

					var $slider = $(e.currentTarget);

					$slider.data('dir', '')

					if(dir === 'left') {
						$slider.cycle('next');
					}

					if(dir === 'right') {
						$slider.data('dir', 'prev')
						$slider.cycle('prev');
					}

				}

				$slider.swipe({
					swipeLeft       : swipe,
					swipeRight      : swipe,
					allowPageScroll : 'auto'
				});

			}
		}
		
	})();
	
	/* end Image Gallery Slider  */
	
	/* ---------------------------------------------------------------------- */
	/*	Twitter
	/* ---------------------------------------------------------------------- */
	
	(function(){
		
		if($('.tweet').length) {
			$(".tweet").tweet({
				username: "fanfbmltemplate",
				page: 1,
				avatar_size: 40,
				count: 4,
				loading_text: "loading ..."
			}).bind("loaded", function() {
				var ul = $(this).find(".tweet_list");
			});		
		}
			
	})();
	
/* end Twitter */

/***************************************/
});/* DOM READY --> End				   */
/***************************************/

/* ---------------------------------------------------------------------- */
/*	Flickr
/* ---------------------------------------------------------------------- */

(function () {
	$.fn.jflickrfeed = function (settings, callback) {
		settings = $.extend(true, {
			flickrbase: 'http//api.flickr.com/services/feeds/',
			feedapi: 'photos_public.gne',
			limit: 20,
			qstrings: {
				lang: 'en-us',
				format: 'json',
				jsoncallback: '?'
			},
			cleanDescription: true,
			useTemplate: true,
			itemTemplate: '',
			itemCallback: function () {}
		}, settings);
		var url = settings.flickrbase + settings.feedapi + '?';
		var first = true;
		for (var key in settings.qstrings) {
			if (!first) url += '&';
			url += key + '=' + settings.qstrings[key];
			first = false;
		}
		return $(this).each(function () {
			var $container = $(this);
			var container = this;
			$.getJSON(url, function (data) {
				$.each(data.items, function (i, item) {
					if (i < settings.limit) {
						if (settings.cleanDescription) {
							var regex = /<p>(.*?)<\/p>/g;
							var input = item.description;
							if (regex.test(input)) {
								item.description = input.match(regex)[2]
								if (item.description != undefined) item.description = item.description.replace('<p>', '').replace('</p>', '');
							}
						}
						item['image_s'] = item.media.m.replace('_m', '_s');
						item['image_t'] = item.media.m.replace('_m', '_t');
						item['image_m'] = item.media.m.replace('_m', '_m');
						item['image'] = item.media.m.replace('_m', '');
						item['image_b'] = item.media.m.replace('_m', '_b');
						delete item.media;
						if (settings.useTemplate) {
							var template = settings.itemTemplate;
							for (var key in item) {
								var rgx = new RegExp('{{' + key + '}}', 'g');
								template = template.replace(rgx, item[key]);
							}
							$container.append(template)
						}
						settings.itemCallback.call(container, item);
					}
				});
				if ($.isFunction(callback)) {
					callback.call(container, data);
				}
			});
		});
	}
})();

/* ---------------------------------------------------------------------- */
/*	jQuery Cookie
/* ---------------------------------------------------------------------- */

jQuery.cookie = function (name, value, options) {
	if (typeof value != 'undefined') {
		options = options || {};
		if (value === null) {
			value = '';
			options.expires = -1
		}
		var expires = '';
		if (options.expires && (typeof options.expires == 'number' || options.expires.toUTCString)) {
			var date;
			if (typeof options.expires == 'number') {
				date = new Date();
				date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000))
			} else {
				date = options.expires
			}
			expires = '; expires=' + date.toUTCString()
		}
		var path = options.path ? '; path=' + (options.path) : '';
		var domain = options.domain ? '; domain=' + (options.domain) : '';
		var secure = options.secure ? '; secure' : '';
		document.cookie = [name, '=', encodeURIComponent(value), expires, path, domain, secure].join('')
	} else {
		var cookieValue = null;
		if (document.cookie && document.cookie != '') {
			var cookies = document.cookie.split(';');
			for (var i = 0; i < cookies.length; i++) {
				var cookie = jQuery.trim(cookies[i]);
				if (cookie.substring(0, name.length + 1) == (name + '=')) {
					cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
					break
				}
			}
		}
		return cookieValue
	}
};
