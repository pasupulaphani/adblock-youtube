'use strict';

chrome.runtime.onInstalled.addListener(function(details) {
    console.log('previousVersion', details.previousVersion);
});


function checkForValidUrl(tabId, data, tab) {
    if (/https?:\/\/(\w*.)?youtube.com/i.test(tab.url.toLowerCase())) {
        chrome.pageAction.show(tabId);
    }
}

chrome.tabs.onUpdated.addListener(checkForValidUrl);
