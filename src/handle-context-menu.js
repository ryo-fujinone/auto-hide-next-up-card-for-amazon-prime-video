const existsOptDialog = () => {
  return document.documentElement.dataset.nextupExtOptDialogCreated === "true";
};

const switchContextMenuState = () => {
  const mes = {
    type: "context-menu",
    payload: { target: "visible", state: { visible: true } },
  };
  if (existsOptDialog()) {
    chrome.runtime.sendMessage(mes);
  } else {
    mes.payload.state.visible = false;
    chrome.runtime.sendMessage(mes);
  }
};

switchContextMenuState();

new MutationObserver((_, observer) => {
  if (existsOptDialog()) {
    observer.disconnect();
    switchContextMenuState();
  }
}).observe(document.documentElement, {
  attributes: true,
  attributeFilter: ["data-nextup-ext-opt-dialog-created"],
});

document.addEventListener("visibilitychange", () => {
  if (document.visibilityState !== "visible") {
    return;
  }
  switchContextMenuState();
});

chrome.runtime.onMessage.addListener((mes) => {
  const type = mes.type;
  if (type === "open-option-dialog") {
    const optDialog = document.querySelector(".nextup-ext-opt-dialog");
    if (optDialog) {
      optDialog.showModal();
    }
  }
});
