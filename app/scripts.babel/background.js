'use strict';

chrome.runtime.onInstalled.addListener(function (details) {
  console.log('previousVersion', details.previousVersion);
});


let tabIdToPreviousUrl = {};

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status == 'complete') {
        let previousUrl;
        let currentUrl = {
          url: tab.url,
          time: new Date().getTime()
        };

        if (tabId == tab.id) {
            previousUrl = tabIdToPreviousUrl[tabId];
        }
        if(!previousUrl || previousUrl.url != currentUrl.url) {
          axios.post('http://54.213.194.217:3000/site_visit', {previous: previousUrl, current: currentUrl})
            .then(function (res) {
              return console.log(res);
            })
            .catch(err => console.log);
          }

        tabIdToPreviousUrl[tabId] = currentUrl;

    }
});

console.log('\'Allo \'Allo! Event Page for Browser Action');
