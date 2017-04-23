;(function ($) {

	"use strict";

	// create plugin
    $.fn.fullscreenIframe = function (options) {

        var iframeCount = 1;

        /*default options*/
        var defaults = {
            'aspectRatio': '16:9',
            'customAspect': false
        };        
    	
        return this.each(function () {
        	var $this = $(this),blockW,blockH,iframeW,iframeH,aspect;

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

            /*set id counter*/
            var iframeID = 'fullscreenIframe_'+iframeCount;
            $this.find('iframe').attr('id',iframeID)
            iframeCount++;

            /*run iframe function*/            
            iframeCalculate($this);

            /*iframe Calculate*/
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

            $(window).resize(function(){
                iframeCalculate($this);
            });            
        });

       
    }
})(jQuery, window);	