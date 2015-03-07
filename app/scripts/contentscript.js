'use strict';

function init() {

    var DEBUG = window.adbYtDebug || false;
    DEBUG = true;

    var adbYtLog = function(msg) {
        if (console && DEBUG) {
            console.warn(msg);
        }
    };
    adbYtLog('inited 2');

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
        console.warn("div not found")
    }
}

init();



var MutationObserver = (function() {
    var prefixes = ['WebKit', 'Moz', 'O', 'Ms', '']
    for (var i = 0; i < prefixes.length; i++) {
        if (prefixes[i] + 'MutationObserver' in window) {
            return window[prefixes[i] + 'MutationObserver'];
        }
    }
    return false;
}());

if (MutationObserver) {

    // select the target node
    var target = document.querySelector('.player');
    console.warn(target)
        // create an observer instance
    var observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            console.warn(mutation);
        });
    });

    // configuration of the observer:
    var config = {
        attributes: true,
        childList: true,
        characterData: true
    }

    // pass in the target node, as well as the observer options
    observer.observe(target, config);


} else {
    // Fallback
}
