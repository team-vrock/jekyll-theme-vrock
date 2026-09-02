document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.back-to-top').forEach((link) => {
        link.addEventListener('click', (event) => {
            if (window.location.pathname === '/' || window.location.pathname === '') {
                event.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        });
    });

    if (typeof SweetScroll === 'undefined') return;
    const scroller = new SweetScroll(
        {
            trigger: '[data-scroll]',       // Selector for trigger (must be a valid css selector)
            header: '[data-scroll-header]', // Selector or Element for fixed header (Selector of must be a valid css selector)
            duration: 1000,                 // Specifies animation duration in integer
            easing: 'easeOutQuint',         // Specifies the pattern of easing
            offset: 0,                      // Specifies the value to offset the scroll position in pixels
            vertical: true,                 // Enable the vertical scroll
            horizontal: false,              // Enable the horizontal scroll
            cancellable: true,              // When fired wheel or touchstart events to stop scrolling
            updateURL: false,               // Update the URL hash on after scroll (true | false | 'push' | 'replace')
            preventDefault: true,           // Cancels the container element click event
            stopPropagation: true,          // Prevents further propagation of the container element click event in the bubbling phase
            quickMode: false,               // Instantly scroll to the destination! (It's recommended to use it with `easeOutExpo`)
          
            // Callbacks
            before: null,
            after: null,
            cancel: null,
            complete: null,
            step: null,
          }
    );
    void scroller;
  }, false);
