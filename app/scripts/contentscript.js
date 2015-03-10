'use strict';

var DEBUG = window.adbYtDebug || false;
DEBUG = true;

var adbYtLog = function(msg) {
    if (console && DEBUG) {
        console.warn(msg);
    }
};

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
    clearAds();
}


var MutationObserver = (function() {
    var prefixes = ['WebKit', 'Moz', 'O', 'Ms', ''];
    for (var i = 0; i < prefixes.length; i++) {
        if (prefixes[i] + 'MutationObserver' in window) {
            return window[prefixes[i] + 'MutationObserver'];
        }
    }
    return false;
}());

var moviePlayer = document.querySelector('.html5-main-video');

var createObserver = function() {
    

    // create an observer instance
    var observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            adbYtLog("test");

            if (mutation.attributeName === 'src' && document.getElementsByClassName('videoAdUi').length > 0) {
                mutation.target.setAttribute('src', '');
            }
            // clearAds();
            return;
        });
    });

    // configuration of the observer:
    var config = {
        attributes: true,
        childList: false,
        characterData: false
    };

    // pass in the target node, as well as the observer options
    observer.observe(moviePlayer, config);
};

function init() {

    clearAds();

    if (MutationObserver) {

        adbYtLog('init: using MutationObserver');
        createObserver();
    } else {

        adbYtLog('init: using Mutation Events');
        moviePlayer.addEventListener('DOMSubtreeModified', DOMSTlistener);
    }
}

if (/https?:\/\/(\w*.)?youtube.com/i.test(window.location.href.toLowerCase())) {

    if (moviePlayer) {

        adbYtLog('has moviePlayer');
        init();
    } else {

        // todo: fallback if movePlayer is not avail
    }
}
