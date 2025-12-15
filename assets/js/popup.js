document.addEventListener('DOMContentLoaded', () => {
    const lightbox = GLightbox({
        selector: '.popup-youtube, .popup-vimeo, .popup-gmaps, .popup-image',
        touchNavigation: true,
        loop: true,
        autoplayVideos: true
    });
});