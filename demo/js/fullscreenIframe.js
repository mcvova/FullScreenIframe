;(function ($) {

	"use strict";

	// create plugin
    $.fn.fullscreenIframe = function (options) {

        var iframeCount = 1;

        /*default options*/
        var defaults = {
            'aspectRatio': '16:9',
            'customAspect': false,
            'youtube': false,
            'yt_autoplay': true,
            'yt_volume': 0
        };        
    	
        return this.each(function () {
        	var $this = $(this),blockW,blockH,iframeW,iframeH,aspect,player;

            /*default options*/
            var settings = $.extend({}, defaults, options);

            /*calculate iframe aspect*/
            if(settings.customAspect){
                aspect = parseFloat(settings.aspectRatio);
            } else{
                switch (settings.aspectRatio){
                    case '16:9':
                        aspect = 1.777777778;
                        break;
                    case '4:3':
                        aspect = 1.333333333;
                        break;
                    default:
                        aspect = 1.777777778;
                }
            }

            /*apply youtube options*/
            if(settings.youtube){
                youtubeOptions();
            }

            /*set id counter*/
            var iframeID = 'fullscreenIframe_'+iframeCount;
            $this.find('iframe').attr('id',iframeID)
            iframeCount++;

            /*run iframe function*/            
            iframeCalculate($this);

            function iframeCalculate($iframe){
                blockW = $iframe.outerWidth();
                blockH = $iframe.outerHeight();
                iframeW = blockH*aspect;
                iframeH = blockH;

                if(iframeW<blockW){
                    iframeW = blockW;
                    iframeH = blockH*aspect;
                }

                $iframe.addClass('fullscreenIframe').find('iframe').css('width',iframeW).css('height',iframeH).css('margin-top',-iframeH/2).css('margin-left',-iframeW/2);
            }

            function youtubeOptions(){
                var link = $this.find('iframe').attr('src');
                if(link.indexOf('?')<0){
                    link+='?';
                }
                $('body').append('<script src="https://www.youtube.com/iframe_api"></script>')
                window.onYouTubePlayerAPIReady = function() {
                  onYouTubeIframeAPIReady();
                };                
            }

            function onYouTubeIframeAPIReady() {
                player = new YT.Player(iframeID, {
                    events: {
                        'onReady': onPlayerReady,
                        'onStateChange': onPlayerStateChange
                    }
                });
            }
            function onPlayerReady(event) {
                if(settings.yt_autoplay){
                    event.target.playVideo();
                }                
                event.target.setVolume(settings.yt_volume);
            }
            function onPlayerStateChange(event) {
            }
            
            function stopVideo() {
            }                        

            $(window).resize(function(){
                iframeCalculate($this);
            });            
        });

       
    }
})(jQuery, window);	