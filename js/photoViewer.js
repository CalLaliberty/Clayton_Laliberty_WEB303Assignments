(function ($) {
    $.fn.customPhotoViewer = function () {
        return this.each(function () {
            var $imgViewer = $(this);
            var $photoBox = $imgViewer.find('.photo-box');
            var $thumbnails = $imgViewer.find('.thumbnail-anchor');

            $thumbnails.on({
                mouseover: function (){
                    $(this).find('img').css({
                        'filter': 'opacity(50%)'
                    });
                },
                mouseout: function() {
                    $(this).find('img').css({
                        'filter': 'opacity(100%)'
                    });
                },
                click: function(e) {
                    e.preventDefault();
                    var imageUrl = $(this).attr('href');
                    var $mainImage = $photoBox.find('img');
                    
                    $mainImage.attr('src', imageUrl);
                    $photoBox.removeClass('is-loading');
                    var $activeImg = $(this).find('img');
                    $activeImg.addClass('active');
                }
            })
        });
    };
}(jQuery));
