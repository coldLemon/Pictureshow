(function ($) {
    $.fn.photomatic = function (options) {
        var settings = $.extend({
            photoElement:'img.photomatic',
            transformer:function (name) {
                 return name.replace(/thumbnail/,'photo');
             },
            firstControl:null,
            previousControl:null,
            playControl:null,
            nextControl:null,
            lastControl:null,
            delay:3000

        },options || {});

        function showPhoto(index){
            /*$(settings.photoElement).attr('src',(settings.transformer(settings.thumbnails$[index].src)));*/
            $('img',settings.photoElement).attr('src',(settings.transformer(settings.thumbnails$[index].src)));
            settings.current=index;
        }
        settings.current=0;
        settings.thumbnails$ = this.filter('img');
        settings.thumbnails$
            /*在每个缩略图元素上记录缩略图的索引*/
            .each(
                function (n) {$(this).data('photomatic-index',n);}
                    )
            .click(function () {
                showPhoto($(this).data('photomatic-index'));
            });
            /*点击事件*/
        $(settings.photoElement)
            .attr('title','click for next photo')
            /*attr主要用来给函数赋值，当然也有取值的用法*/
            .css('cursor','pointer')
            .click(function () {
                showPhoto((settings.current+1)%settings.thumbnails$.length);
            });
        $(settings.nextControl).click(function () {
            showPhoto((settings.current+1)%settings.thumbnails$.length);
        });
        $(settings.previousControl).click(function () {
            showPhoto((settings.current-1)%settings.thumbnails$.length);
        });
        $(settings.firstControl).click(function () {
            showPhoto(0);
        });
        $(settings.lastControl).click(function () {
            showPhoto(settings.thumbnails$.length-1);
        });

        $(settings.playControl).toggle(
            function (event) {
                settings.tick = window.setInterval(
                    function () {
                        $(settings.nextControl).triggerHandler('click');
                    },
                    settings.delay);
                $(event.target).addClass('photomatic-playing');
                $(settings.nextControl).click();
            },
            function (event) {
                window.clearInterval(settings.tick);
                $(event.traget).removeClass('photomatic-playing');
            }

        );
        showPhoto(0);
        return this;
    }
    function fadeIn() {
        
    }


})(jQuery);