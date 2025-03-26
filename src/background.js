chrome.runtime.onInstalled.addListener(function () {
  chrome.contextMenus.create({
    id: "auto-hide-next-up",
    title: "Auto hide next up card",
    documentUrlPatterns: [
      "https://*.amazon.co.jp/*",
      "https://*.amazon.com/*",
      "https://*.amazon.ae/*",
      "https://*.amazon.co.uk/*",
      "https://*.amazon.it/*",
      "https://*.amazon.in/*",
      "https://*.amazon.eg/*",
      "https://*.amazon.com.au/*",
      "https://*.amazon.nl/*",
      "https://*.amazon.ca/*",
      "https://*.amazon.sa/*",
      "https://*.amazon.sg/*",
      "https://*.amazon.se/*",
      "https://*.amazon.es/*",
      "https://*.amazon.de/*",
      "https://*.amazon.com.tr/*",
      "https://*.amazon.com.br/*",
      "https://*.amazon.fr/*",
      "https://*.amazon.com.be/*",
      "https://*.amazon.pl/*",
      "https://*.amazon.com.mx/*",
      "https://*.amazon.cn/*",
      "https://*.primevideo.com/*",
    ],
  });
  chrome.contextMenus.create({
    parentId: "auto-hide-next-up",
    id: "open-option-dialog",
    title: chrome.i18n.getMessage("openOptionDialog"),
  });
});

chrome.runtime.onMessage.addListener((mes) => {
  const type = mes.type;
  if (type === "context-menu") {
    console.log();
    const target = mes.payload.target;
    if (target === "visible") {
      chrome.contextMenus.update("auto-hide-next-up", mes.payload.state);
    }
  }
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "open-option-dialog") {
    chrome.tabs.sendMessage(tab.id, { type: info.menuItemId });
  }
});
