'use strict';

var DEBUG = window.adbYtDebug || false;

var adbYtLog = function(msg) {
    if (console && DEBUG) {
        console.warn(msg);
    }
};

var isOpera = !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;
var isChrome = !!window.chrome && !isOpera;
var player = document.querySelector('#player');

function skipVideoAd() {

    if (document.getElementsByClassName('videoAdUi').length > 0) {
        adbYtLog('skiping video ad');
        document.getElementsByClassName('video-stream html5-main-video')[0].src = '';
    }
}

function hideOverlayAd() {

    var overlayAdContainer = document.getElementsByClassName('ad-container ad-container-single-media-element-annotations')[0];
    if (overlayAdContainer && overlayAdContainer.style.display !== 'none') {
        adbYtLog('hide overlay ad');
        overlayAdContainer.style.display = 'none';
    }
}

function clearAds() {
    skipVideoAd();
    hideOverlayAd();
}

function DOMSTlistener(e) {

    adbYtLog('DOM event listener triggered');

    if (e.target.innerHTML.length > 0) {
        clearAds();
    }
}

function init() {

    var videoAdContainer = document.getElementsByClassName('video-ads')[0];

    if (videoAdContainer) {

        adbYtLog('inited');
        player.removeEventListener('DOMSubtreeModified', init);
        videoAdContainer.addEventListener('DOMSubtreeModified', DOMSTlistener);
    }
}


if (/https?:\/\/(\w*.)?youtube.com/i.test(window.location.href.toLowerCase())) {

    if (isChrome) {

        player.addEventListener('DOMSubtreeModified', init);
    } else {
        clearAds();
    }
}
