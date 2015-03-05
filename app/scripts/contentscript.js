'use strict';

function init() {

    var DEBUG = false;
    var videoAdContainer = document.getElementsByClassName('video-ads html5-stop-propagation')[0];

    function listener(e) {
        if (e.target.innerHTML.length > 0 && document.getElementsByClassName('videoAdUi').length > 0) {
            if (console && DEBUG) {
                console.warn('skiping video ad');
            }
            document.getElementsByClassName('video-stream html5-main-video')[0].src = '';
        }

        var flashAdContainer = document.getElementsByClassName('ad-container ad-container-single-media-element-annotations')[0];
        if (flashAdContainer && flashAdContainer.style.display !== 'none') {
            if (console && DEBUG) {
                console.warn('undisplay overlay ad');
            }
            flashAdContainer.style.display = 'none';
        }
    }

    if (videoAdContainer) {
        videoAdContainer.addEventListener('DOMSubtreeModified', listener);
    }
}

init();
