(function($) {
    $.fn.productGallery = function(options) {
        var def = {
                json: undefined,
            },
            cfg = $.extend(true, def, options),
            json = cfg.json,
            $wrap = $(this);

        $.getJSON(json, function(data) {
            var alt, url, des, cop, num, i, product,
                arr = $.map(data, function(el) {
                    return el;
                });

            for (i = 0; i < arr.length; i++) {
                alt = arr[i].title;
                url = arr[i].picture;
                des = arr[i].description;
                cop = arr[i].copyright;
                num = [i];

                $wrap.append($('<div class="product" data-product-no="' + num + '">').append('<div class="product-picture"><img src="' + url + '" alt="' + alt + '" /></div>', '<div class="product-title"><p>' + alt + '</hp></div>'));
            }

            product = $('.product').each(function() {
                return this;
            });

            //Open description.
            product.click(function() {
                var closeButton,
                    productNo = $(this).data('product-no'),
                    classes = ['product-file', 'product-file-nav', 'product-file-content', 'product-file-content-wrap', 'product-file-title', 'product-file-picture', 'product-file-description', 'product-file-close'],
                    clicked = arr[productNo],
                    thisTitle = clicked.title,
                    thisPicture = clicked.picture,
                    thisDescription = clicked.description,
                    file = '<div class="' + classes[0] + '"/>',
                    nav = '<div class="' + classes[1] + '"><span class="' + classes[7] + ' glyphicon glyphicon-remove"></span></div>',
                    content = '<div class="' + classes[2] + '">',
                    wrapContent = '<div class="' + classes[3] + '">',
                    ttle = '<div class="' + classes[4] + '"><h3>' + thisTitle + '</h3></div>',
                    pic = '<div class="' + classes[5] + '"><img src="' + thisPicture + '" alt="' + thisTitle + '" /></div>',
                    descr = '<div class="' + classes[6] + '"><div><p>' + thisDescription + '</p></div></div>';

                $wrap.append($(file).append($(nav), $(content).append($(wrapContent).append(ttle, pic, descr))));

                $('body, html').css('overflow', 'hidden');

                closeButton = $('.product-file-close');

                $('.product-file-close').click(function() {
                    $('.product-file').remove();

                    $('body,html').css('overflow', 'auto');
                });

            });
        });
        return this;
    };
})(jQuery);
