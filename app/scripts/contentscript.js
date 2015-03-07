'use strict';

function init() {

    var DEBUG = window.adbYtDebug || false;
    DEBUG =true;

    var adbYtLog = function (msg) {
        if (console && DEBUG) {
            console.warn(msg);
        }
    };
    adbYtLog('inited');

    var videoAdContainer = document.getElementsByClassName('video-ads html5-stop-propagation')[0];

    function listener(e) {
        adbYtLog('listener triggered');

        if (e.target.innerHTML.length > 0 && document.getElementsByClassName('videoAdUi').length > 0) {
            adbYtLog('skiping video ad');
            document.getElementsByClassName('video-stream html5-main-video')[0].src = '';
        }

        var flashAdContainer = document.getElementsByClassName('ad-container ad-container-single-media-element-annotations')[0];
        if (flashAdContainer && flashAdContainer.style.display !== 'none') {
            adbYtLog('undisplay overlay ad');
            flashAdContainer.style.display = 'none';
        }
    }

    if (videoAdContainer) {
        videoAdContainer.addEventListener('DOMSubtreeModified', listener);
    } else {
        // wait for the url
    }
}

init();
