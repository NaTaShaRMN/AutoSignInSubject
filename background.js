function showPageAction( tabId, changeInfo, tab ) {
    if (~tab.url.indexOf('dangkyhoc.vnu.edu.vn/dang-ky-mon-hoc')) {
		chrome.pageAction.show(tabId);
}
};
chrome.tabs.onUpdated.addListener(showPageAction);
chrome.pageAction.onClicked.addListener(function() {
    chrome.tabs.create({
        url: "https://duclvz.github.io/AutoDKMH"
    })
});