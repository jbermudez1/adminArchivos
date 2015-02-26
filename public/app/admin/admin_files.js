/*
 *  Document   : appMedia.js
 *  Author     : pixelcave
 *  Description: Custom javascript code used in Media Box page
 */

var Files = function() {
    return {
        init: function() {
            var mediaFilter = $('.media-filter');
            var mediaItems  = $('.media-filter-items');
            var showCategory;

            // When a media filter link is clicked
            mediaFilter.find('a').on('click', function() {
                // Get its data-category value
                showCategory = $(this).data('category');

                // Procceed only if the user clicked on an inactive category
                if ( ! $(this).parent().hasClass('active')) {
                    // Remove active class from all filter links
                    mediaFilter.find('a').parent().removeClass('active');

                    // Add the active class to the clicked link
                    $(this).parent().addClass('active');

                    mediaItems
                        .find('.media-items')
                        .parent()
                        .hide(0, function(){
                            mediaItems
                                .find('[data-category="' + showCategory + '"]')
                                .parent('div')
                                .show(0);
                        });
                }
            });
        }
    };
}();