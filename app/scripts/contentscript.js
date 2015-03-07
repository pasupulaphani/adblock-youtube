'use strict';

var DEBUG = window.adbYtDebug || false;

var adbYtLog = function(msg) {
    if (console && DEBUG) {
        console.warn(msg);
    }
};

var player = document.querySelector('#player');

function skipAds(e) {
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

function init() {

    var videoAdContainer = document.getElementsByClassName('video-ads html5-stop-propagation')[0];

    if (videoAdContainer) {

        adbYtLog('inited');
        player.removeEventListener('DOMSubtreeModified', init);
        videoAdContainer.addEventListener('DOMSubtreeModified', skipAds);
    }
}

player.addEventListener('DOMSubtreeModified', init);
