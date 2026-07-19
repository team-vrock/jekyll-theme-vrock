document.addEventListener('DOMContentLoaded', () => {
    if (typeof GLightbox === 'undefined') return;
    GLightbox({
        selector: '.popup-youtube, .popup-vimeo, .popup-gmaps, .popup-image',
        touchNavigation: true,
        loop: true,
        autoplayVideos: true
    });
});
