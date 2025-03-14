const observeConfig = Object.freeze({ childList: true, subtree: true });

const getDefaultOptions = () => {
  return {
    hideSkipIntroBtn: true,
    showSkipIntroBtnOnOverlay: false,
    hideNextup: true,
    temporarilyDisableOverlay: true,
    preventsDarkeningInConjunctionWithNextup: true,
    showNextupOnOverlay: false,
    hideReactions: true,
    showReactionsOnOverlay: false,
    preventsTransitionsToRecommendedVideos: true,
    hideRating: true,
    preventsDarkening: false,
    addOutlinesForTextsAndIcons: false,
    moveCenterButtonsToBottom: false,
    shortcutKey: {
      ctrl: false,
      alt: true,
      shift: false,
      charCode: "KeyP",
    },
    shortcutKeyIsEnabled: true,
    scriptVersion: "2.5.2",
  };
};

const getScriptInfo = () => {
  // user script
  /**
   * When using optional chaining with window.GM_info in tampermonkey,
   * it sometimes became undefined for some reason, so I implemented it using try-catch.
   */
  try {
    const scriptVer = window.GM_info.script.version;
    if (typeof scriptVer === "string") {
      return {
        scriptType: "user-script",
        scriptVersion: scriptVer,
      };
    }
  } catch (e) {
    // console.log(e);
  }

  // chrome extension
  try {
    const chromeExtVer = chrome?.runtime?.getManifest()?.version;
    if (typeof chromeExtVer === "string") {
      return {
        scriptType: "chrome-extension",
        scriptVersion: chromeExtVer,
      };
    }
  } catch (e) {
    // console.log(e);
  }

  // unknown
  return {
    scriptType: "unknown",
    scriptVersion: getDefaultOptions().scriptVersion,
  };
};

// array of alphabets used to set shortcut keys.
const charObj = {
  _chars: [],
  _codeStrs: [],
  _startCode: "A".charCodeAt(0),
  getChars() {
    if (this._chars.length) {
      return this._chars;
    }
    [...Array(26)].forEach((_, i) => {
      const char = String.fromCharCode(this._startCode + i);
      this._chars.push(char);
    });
    return this._chars;
  },
  getCodeStrs() {
    if (this._codeStrs.length) {
      return this._codeStrs;
    }
    this.getChars().forEach((c) => {
      this._codeStrs.push("Key" + c);
    });
    return this._codeStrs;
  },
};

const addStyle = (css, id) => {
  const style = document.createElement("style");
  if (id) {
    style.setAttribute("id", id);
  }
  style.textContent = css;
  document.head.appendChild(style);
};

const saveDefaultOptions = () => {
  const jsonStr = JSON.stringify(getDefaultOptions());
  localStorage.setItem("nextup-ext", jsonStr);
};

const getOptions = () => {
  const jsonStr = localStorage.getItem("nextup-ext");
  if (!jsonStr) {
    saveDefaultOptions();
    return getDefaultOptions();
  }
  return JSON.parse(jsonStr);
};

const saveOptions = (_newOptions = {}) => {
  const options = getOptions();
  const newOptions = {
    ...options,
    ..._newOptions,
  };
  const jsonStr = JSON.stringify(newOptions);
  localStorage.setItem("nextup-ext", jsonStr);
};

const updateOptionVersion = (scriptInfo) => {
  const options = getOptions();
  if (options.scriptVersion === scriptInfo.scriptVersion) {
    return;
  }

  const defaultOptions = getDefaultOptions();
  const mergedOptions = {
    ...defaultOptions,
    ...options,
    scriptVersion: scriptInfo.scriptVersion,
  };
  const mergedOptionsKeys = Object.keys(mergedOptions);
  const newOptions = mergedOptionsKeys.reduce((obj, key) => {
    if (Object.hasOwn(defaultOptions, key)) {
      obj[key] = mergedOptions[key];
    }
    return obj;
  }, {});
  const jsonStr = JSON.stringify(newOptions);
  localStorage.setItem("nextup-ext", jsonStr);
};

const getOptionDialog = () => {
  return document.querySelector(".nextup-ext-opt-dialog");
};

const getShortcutKeyInput = () => {
  return document.querySelector("#shortcutkey-for-dialog");
};

const getVisibleVideo = () => {
  return document.querySelector(
    ".dv-player-fullscreen .rendererContainer video"
  );
};

const playVideo = () => {
  const video = getVisibleVideo();
  if (!video) {
    return;
  }
  if (video.paused) {
    video.play();
  }
};

const pauseVideo = () => {
  const video = getVisibleVideo();
  if (!video) {
    return;
  }
  if (!video.paused) {
    video.pause();
  }
};

const worksWithDialog = {
  clickedOutSide: null,
  _clickedOutSide: function (e) {
    if (e.target.classList.contains("nextup-ext-opt-dialog")) {
      e.target.close();
      this.whenClosed();
    }
  },
  setShortcutKeyVal: function () {
    const options = getOptions();
    let shortcutKeyStrs = [];
    if (options.shortcutKey.ctrl) {
      shortcutKeyStrs.push("Ctrl");
    }
    if (options.shortcutKey.alt) {
      shortcutKeyStrs.push("Alt");
    }
    if (options.shortcutKey.shift) {
      shortcutKeyStrs.push("Shift");
    }
    const codeStrs = charObj.getCodeStrs();
    const chars = charObj.getChars();
    const char = chars[codeStrs.indexOf(options.shortcutKey.charCode)];
    if (char) {
      shortcutKeyStrs.push(char);
    } else {
      shortcutKeyStrs = ["Alt", "P"];
      saveOptions({ shortcutKey: getDefaultOptions().shortcutKey });
    }

    if (!this.changeShortcutKeyVal) {
      this.changeShortcutKeyVal = this._changeShortcutKeyVal.bind(this);
    }
    const shortcutKeyStr = shortcutKeyStrs.join(" + ");
    const shortcutKeyInput = getShortcutKeyInput();
    if (shortcutKeyInput) {
      shortcutKeyInput.value = shortcutKeyStr;
      shortcutKeyInput.addEventListener("keydown", this.changeShortcutKeyVal);
    }
  },
  changeShortcutKeyVal: null,
  _changeShortcutKeyVal: function (e) {
    if (e.code === "Tab" || e.code === "Escape" || e.code === "F5") {
      return;
    }
    const codeStrs = charObj.getCodeStrs();
    if (codeStrs.indexOf(e.code) === -1 || (!e.ctrlKey && !e.altKey)) {
      e.preventDefault();
      return;
    }

    const newShortcutKeyOptions = getDefaultOptions().shortcutKey;
    let shortcutKeyStrs = [];
    if (e.ctrlKey) {
      shortcutKeyStrs.push("Ctrl");
    }
    newShortcutKeyOptions.ctrl = e.ctrlKey;
    if (e.altKey) {
      shortcutKeyStrs.push("Alt");
    }
    newShortcutKeyOptions.alt = e.altKey;
    if (e.shiftKey) {
      shortcutKeyStrs.push("Shift");
    }
    newShortcutKeyOptions.shift = e.shiftKey;
    const chars = charObj.getChars();
    const char = chars[codeStrs.indexOf(e.code)];
    shortcutKeyStrs.push(char);
    newShortcutKeyOptions.charCode = e.code;

    const shortcutKeyStr = shortcutKeyStrs.join(" + ");
    const shortcutKeyInput = getShortcutKeyInput();
    shortcutKeyInput.value = shortcutKeyStr;

    saveOptions({ shortcutKey: newShortcutKeyOptions });
  },
  whenOpening: function () {
    pauseVideo();
    this.setShortcutKeyVal();
    if (!this.clickedOutSide) {
      this.clickedOutSide = this._clickedOutSide.bind(this);
    }
    document.addEventListener("click", this.clickedOutSide);
  },
  whenClosed: function () {
    const shortcutKeyInput = getShortcutKeyInput();
    if (shortcutKeyInput) {
      shortcutKeyInput.removeEventListener(
        "keydown",
        this.changeShortcutKeyVal
      );
    }
    document.removeEventListener("click", this.clickedOutSide);
    playVideo();
  },
};

const createOptionMessages = () => {
  const jaMessages = {
    promptReloadPage: "オプションを変更した場合はページをリロードしてください",
    hideSkipIntroBtn: "イントロスキップボタンを非表示にする",
    showSkipIntroBtnOnOverlay:
      "オーバーレイ表示が有効な時はイントロスキップボタンを表示する",
    hideNextup: "Next upを非表示にする",
    temporarilyDisableOverlay:
      "非表示ボタンの自動クリック時に5秒間オーバーレイ表示を無効にする",
    preventsDarkeningInConjunctionWithNextup:
      "Next upの出現と同時に画面が暗くなるのを防ぐ（非表示ボタンが無い場合のみ）",
    showNextupOnOverlay:
      "オーバーレイ表示が有効な時はNext upを表示する（非表示ボタンが無い場合のみ）",
    hideReactions: "Reactions（好き/好きではない）を非表示にする",
    showReactionsOnOverlay:
      "オーバーレイ表示が有効な時はReactionsを表示する（Next upがDOMに存在する場合のみ）",
    showReactionsOnOverlay_Tooltip:
      "Next upの非表示が有効の場合、非表示ボタンの自動クリックでNext upとReactionsがDOMから削除されます",
    preventsTransitionsToRecommendedVideos:
      "動画終了時にサジェストされたコンテンツに遷移するのを防ぐ（自動再生が有効の場合）",
    preventsTransitionsToRecommendedVideos_Tooltip:
      "動画終了時の次のエピソードへの遷移に影響はありません",
    hideRating: "レーティングを非表示にする",
    preventsDarkening: "オーバーレイ表示が有効な時に暗くならないようにする",
    addOutlinesForTextsAndIcons: "文字とアイコンを黒で縁取りする",
    moveCenterButtonsToBottom:
      "中央のボタン（再生/停止、戻る、進む）を下部に移動する",
    enableShortcutKey:
      "ショートカットキーでオプションダイアログを開けるようにする",
    shortcutKeyForDialog: "オプションダイアログを開くショートカットキー",
    shortcutKeyForDialog_Tooltip: "Ctrl/Altとアルファベットは必須",
    close: "閉じる",
  };
  const enMessages = {
    promptReloadPage: "If you change the options, please reload the page",
    hideSkipIntroBtn: "Hide skip intro button",
    showSkipIntroBtnOnOverlay:
      "Show skip intro button when overlay display is enabled",
    hideNextup: "Hide next up card",
    temporarilyDisableOverlay:
      "Disable overlay for 5 seconds when auto-clicking hide button",
    preventsDarkeningInConjunctionWithNextup:
      "Prevents darkening in conjunction with next up appears (only if there is no hide button)",
    showNextupOnOverlay:
      "Show next up card when overlay display is enabled (only if there is no hide button)",
    hideReactions: "Hide reactions (like/not for me)",
    showReactionsOnOverlay:
      "Show Reactions when overlay display is enabled (only if next up card exists in the DOM.)",
    showReactionsOnOverlay_Tooltip:
      "If hide next up card is enabled, auto-clicking the hide button will remove next up card and reactions from the DOM",
    preventsTransitionsToRecommendedVideos:
      "Prevent transition to suggested content when video ends (if autoplay is enabled)",
    preventsTransitionsToRecommendedVideos_Tooltip:
      "There is no impact on the transition to the next episode when the video ends.",
    hideRating: "Hide rating",
    preventsDarkening: "Prevents darkening when overlay display is enabled",
    addOutlinesForTextsAndIcons: "Add outlines for texts and icons",
    moveCenterButtonsToBottom:
      "Move the center buttons(Play/Pause, Back and Forward) to the bottom",
    enableShortcutKey: "Enable shortcut key to open the options dialog",
    shortcutKeyForDialog: "Shortcut key to open the options dialog",
    shortcutKeyForDialog_Tooltip: "Ctrl/Alt and alphabets are required",
    close: "Close",
  };
  return /ja|ja-JP/.test(window.navigator.language) ? jaMessages : enMessages;
};

const createOptionDialog = (scriptVersion) => {
  if (getOptionDialog()) {
    return;
  }

  const messages = createOptionMessages();
  const options = getOptions();

  const dialogHtmlStr = `
    <dialog class="nextup-ext-opt-dialog">
        <div class="dialog-inner">
            <div class="nextup-ext-opt-dialog-note">
              <p>${messages.promptReloadPage}</p>            
            </div>
            <label>
                <input type="checkbox" id="hide-skip-intro-btn" name="hide-skip-intro-btn" ${
                  options.hideSkipIntroBtn ? "checked" : ""
                } />
                <p>${messages.hideSkipIntroBtn}</p>
            </label>
            <label class="indent1">
                <input type="checkbox" id="show-skip-intro-btn" name="show-skip-intro-btn" ${
                  options.showSkipIntroBtnOnOverlay ? "checked" : ""
                } />
                <p>${messages.showSkipIntroBtnOnOverlay}</p>
            </label>
            <label>
                <input type="checkbox" id="hide-nextup" name="hide-nextup" ${
                  options.hideNextup ? "checked" : ""
                } />
                <p>${messages.hideNextup}</p>
            </label>
            <label class="indent1">
                <input type="checkbox" id="temporarily-disable-overlay" name="temporarily-disable-overlay" ${
                  options.temporarilyDisableOverlay ? "checked" : ""
                } />
                <p>${messages.temporarilyDisableOverlay}</p>
            </label>
            <label class="indent1">
                <input type="checkbox" id="prevents-darkening-in-conjunction-with-nextup" name="prevents-darkening-in-conjunction-with-nextup" ${
                  options.preventsDarkeningInConjunctionWithNextup
                    ? "checked"
                    : ""
                } />
                <p>${messages.preventsDarkeningInConjunctionWithNextup}</p>
            </label>
            <label class="indent1">
                <input type="checkbox" id="show-nextup" name="show-nextup" ${
                  options.showNextupOnOverlay ? "checked" : ""
                } />
                <p>${messages.showNextupOnOverlay}</p>
            </label>
            <label>
                <input type="checkbox" id="hide-reactions" name="hide-reactions" ${
                  options.hideReactions ? "checked" : ""
                } />
                <p>${messages.hideReactions}</p>
            </label>
            <label class="indent1" title="${
              messages.showReactionsOnOverlay_Tooltip
            }">
                <input type="checkbox" id="show-reactions" name="show-reactions" ${
                  options.showReactionsOnOverlay ? "checked" : ""
                } />
                <p>${messages.showReactionsOnOverlay}</p>
            </label>
            <label title=${
              messages.preventsTransitionsToRecommendedVideos_Tooltip
            }>
                <input type="checkbox" id="prevents-transitions-to-recommended-videos" name="prevents-transitions-to-recommended-videos" ${
                  options.preventsTransitionsToRecommendedVideos
                    ? "checked"
                    : ""
                } />
                <p>${messages.preventsTransitionsToRecommendedVideos}</p>
            </label>
            <label>
                <input type="checkbox" id="hide-rationg" name="hide-rationg" ${
                  options.hideRating ? "checked" : ""
                } />
                <p>${messages.hideRating}</p>
            </label>
            <label>
                <input type="checkbox" id="prevents-darkening" name="prevents-darkening" ${
                  options.preventsDarkening ? "checked" : ""
                } />
                <p>${messages.preventsDarkening}</p>
            </label>
            <label class="indent1">
                <input type="checkbox" id="add-outlines-for-texts-and-icons" name="add-outlines-for-texts-and-icons" ${
                  options.addOutlinesForTextsAndIcons ? "checked" : ""
                } />
                <p>${messages.addOutlinesForTextsAndIcons}</p>
            </label>
            <label>
                <input type="checkbox" id="move-center-buttons-to-bottom" name="move-center-buttons-to-bottom" ${
                  options.moveCenterButtonsToBottom ? "checked" : ""
                } />
                <p>${messages.moveCenterButtonsToBottom}</p>
            </label>
            <label>
                <input type="checkbox" id="enable-shortcutkey" name="enable-shortcutkey" ${
                  options.shortcutKeyIsEnabled ? "checked" : ""
                } />
                <p>${messages.enableShortcutKey}</p>
            </label>
            <ul>
                <li>
                    <label title="${messages.shortcutKeyForDialog_Tooltip}">
                        <span style="margin-right: 4px;">${
                          messages.shortcutKeyForDialog
                        }</span>
                        <input type="text" id="shortcutkey-for-dialog" name="shortcutkey-for-dialog" />
                    </label>
                </li>
            </ul>
            <div class="nextup-ext-opt-dialog-btn-wrapper">
                <button id="nextup-ext-opt-dialog-close">${
                  messages.close
                }</button>
                <div class="nextup-ext-opt-dialog-version"><span>v${scriptVersion}</span></div>
            </div>
        </div>
    </dialog>
    `;
  document.body.insertAdjacentHTML("beforeend", dialogHtmlStr);

  const css = `
    .nextup-ext-opt-dialog {
      padding: 0;
      word-break: break-all;
    }
    .dialog-inner {
      padding: 14px;
    }
    .nextup-ext-opt-dialog-note {
      text-align: center;
      color: green;
      margin-bottom: 10px;
      font-weight: 700;
    }
    .nextup-ext-opt-dialog label:has(input[type='checkbox']){
      display: flex;
    }
    .nextup-ext-opt-dialog label.indent1 {
      margin-left: 14px;
    }
    .nextup-ext-opt-dialog label p {
      margin-bottom: 5px;
      width: calc(100% - 24px);
    }
    .nextup-ext-opt-dialog ul li {
      margin-left: 18px;
    }
    .nextup-ext-opt-dialog label input[type='text'] {
      height: 20px;
    }
    .nextup-ext-opt-dialog .nextup-ext-opt-dialog-btn-wrapper {
      margin-top: 12px;
      position: relative;
    }
    .nextup-ext-opt-dialog div:has(#nextup-ext-opt-dialog-close):not(.dialog-inner) {
      text-align: center;
    }
    #nextup-ext-opt-dialog-close {
      border-color: black;
      border: solid 1px;
      background-color: #EEE
    }
    #nextup-ext-opt-dialog-close {
      width: 120px;
      letter-spacing: 4px;
    }
    #nextup-ext-opt-dialog-close:hover {
      background-color: #DDD
    }
    .nextup-ext-opt-dialog-version {
      position: absolute;
      bottom: 0px;
      right: 0px;
    }
  `;
  addStyle(css);

  const optDialog = getOptionDialog();

  //  Adjust width of options dialog.
  optDialog.style.setProperty("visibility", "hidden", "important");
  optDialog.toggleAttribute("open");
  let maxWidth = 650;
  if (optDialog.offsetWidth > 500) {
    maxWidth = optDialog.offsetWidth + 14;
  }
  optDialog.style.maxWidth = maxWidth + "px";
  optDialog.style.width = "100%";
  optDialog.toggleAttribute("open");
  optDialog.style.setProperty("visibility", "");

  optDialog.addEventListener(
    "click",
    (e) => {
      const idName = e.target.id;
      if (idName === "") {
        return;
      }

      switch (idName) {
        case "hide-skip-intro-btn":
          saveOptions({ hideSkipIntroBtn: e.target.checked });
          break;
        case "show-skip-intro-btn":
          saveOptions({ showSkipIntroBtnOnOverlay: e.target.checked });
          break;
        case "hide-nextup":
          saveOptions({ hideNextup: e.target.checked });
          break;
        case "temporarily-disable-overlay":
          saveOptions({ temporarilyDisableOverlay: e.target.checked });
          break;
        case "prevents-darkening-in-conjunction-with-nextup":
          saveOptions({
            preventsDarkeningInConjunctionWithNextup: e.target.checked,
          });
          break;
        case "show-nextup":
          saveOptions({ showNextupOnOverlay: e.target.checked });
          break;
        case "hide-reactions":
          saveOptions({ hideReactions: e.target.checked });
          break;
        case "show-reactions":
          saveOptions({ showReactionsOnOverlay: e.target.checked });
          break;
        case "prevents-transitions-to-recommended-videos":
          saveOptions({
            preventsTransitionsToRecommendedVideos: e.target.checked,
          });
          break;
        case "hide-rationg":
          saveOptions({ hideRating: e.target.checked });
          break;
        case "prevents-darkening":
          saveOptions({ preventsDarkening: e.target.checked });
          break;
        case "add-outlines-for-texts-and-icons":
          saveOptions({ addOutlinesForTextsAndIcons: e.target.checked });
          break;
        case "move-center-buttons-to-bottom":
          saveOptions({ moveCenterButtonsToBottom: e.target.checked });
          break;
        case "enable-shortcutkey":
          saveOptions({ shortcutKeyIsEnabled: e.target.checked });
          break;
        case "nextup-ext-opt-dialog-close":
          optDialog.close();
          worksWithDialog.whenClosed();
          break;
        default:
          break;
      }
    },
    true
  );
};

const addEventListenerForShortcutKey = (options = getDefaultOptions()) => {
  if (!options.shortcutKeyIsEnabled) {
    return;
  }

  document.body.addEventListener("keydown", (e) => {
    const video = getVisibleVideo();
    if (!video || !video.checkVisibility()) {
      return;
    }

    const shortcutKeyInput = getShortcutKeyInput();
    if (shortcutKeyInput === document.activeElement) {
      return;
    }

    const options = getOptions();
    if (
      e.code === options.shortcutKey.charCode &&
      e.ctrlKey === options.shortcutKey.ctrl &&
      e.altKey === options.shortcutKey.alt &&
      e.shiftKey === options.shortcutKey.shift
    ) {
      const optDialog = getOptionDialog();
      if (optDialog.hasAttribute("open")) {
        optDialog.close();
        worksWithDialog.whenClosed();
      } else {
        worksWithDialog.whenOpening();
        optDialog.showModal();
      }
    }
  });
};

class ElementController {
  constructor(player) {
    this.player = player;
    this.centerOverlaysWrapperIsMarked = false;
  }

  createOptionBtn() {
    new MutationObserver((_, observer) => {
      if (this.player.querySelector(".nextup-ext-opt-btn-container")) {
        observer.disconnect();
        return;
      }

      const btnsContainer = this.player.querySelector(
        ".atvwebplayersdk-hideabletopbuttons-container"
      );
      if (!btnsContainer) {
        return;
      }

      observer.disconnect();

      const optContainer = btnsContainer.querySelector(
        ".atvwebplayersdk-options-wrapper span div:has(.atvwebplayersdk-optionsmenu-button)"
      );
      const clone = optContainer.cloneNode(true);
      clone.classList.add("nextup-ext-opt-btn-container");
      btnsContainer
        .querySelector("div:has(.atvwebplayersdk-options-wrapper)")
        .appendChild(clone);

      const cloneOptBtn = clone.querySelector(
        ".atvwebplayersdk-optionsmenu-button"
      );
      cloneOptBtn.classList.remove("atvwebplayersdk-optionsmenu-button");
      cloneOptBtn.classList.add("nextup-ext-opt-btn");

      const cloneOptBtnImg = cloneOptBtn.querySelector("img");
      cloneOptBtnImg.style.filter =
        "sepia(100%) saturate(2000%) hue-rotate(120deg)";

      const cloneTooltip = clone.querySelector("button + div div");
      cloneTooltip.textContent = "Option - Auto hide next up card";

      cloneOptBtn.addEventListener("click", (_) => {
        const optDialog = getOptionDialog();
        worksWithDialog.whenOpening();
        optDialog.showModal();
      });
    }).observe(this.player, { ...observeConfig, attributes: true });
  }

  // Preparation for detecting the display state of the overlay.
  markingCenterOverlaysWrapper() {
    if (this.centerOverlaysWrapperIsMarked) {
      return;
    }

    const playPauseButton = this.player.querySelector(
      ".atvwebplayersdk-playpause-button"
    );
    if (!playPauseButton) {
      return;
    }
    try {
      const centerOverlaysWrapper =
        playPauseButton.parentNode.parentNode.parentNode.parentNode;
      centerOverlaysWrapper.dataset.ident = "center-overlays-wrapper";
      this.centerOverlaysWrapperIsMarked = true;
    } catch (e) {
      console.log(e);
    }
  }

  hideSkipIntroBtn(options = getDefaultOptions()) {
    if (!options.hideSkipIntroBtn) {
      return;
    }

    if (!document.querySelector("#hideSkipIntroBtn")) {
      const css = `
        .atvwebplayersdk-skipelement-button {
          display: none !important;
        }
      `;
      addStyle(css, "hideSkipIntroBtn");
    }

    if (!options.showSkipIntroBtnOnOverlay) {
      return;
    }
    const overlaysContainer = this.player.querySelector(
      ".atvwebplayersdk-overlays-container"
    );
    const centerOverlaysWrapper = this.player.querySelector(
      "[data-ident='center-overlays-wrapper']"
    );
    new MutationObserver((_) => {
      // Supports situations where a skip intro button is present immediately after the start or where the seek bar jumps to the OP
      const skipIntroBtn = this.player.querySelector(
        ".atvwebplayersdk-skipelement-button"
      );
      if (!skipIntroBtn) {
        centerOverlaysWrapper.dataset.existsSkipIntroBtn = false;
      } else {
        centerOverlaysWrapper.dataset.existsSkipIntroBtn = true;
      }
    }).observe(overlaysContainer, observeConfig);

    new MutationObserver((_) => {
      const skipIntroBtn = this.player.querySelector(
        ".atvwebplayersdk-skipelement-button"
      );
      if (!skipIntroBtn) {
        return;
      }
      const computedStyle = getComputedStyle(centerOverlaysWrapper);
      if (computedStyle.cursor === "pointer") {
        skipIntroBtn.style.setProperty("display", "block", "important");
      } else {
        skipIntroBtn.style.setProperty("display", "none", "important");
      }
    }).observe(centerOverlaysWrapper, {
      attributes: true,
    });
  }

  preventsDarkeningInConjunctionWithNextup(options = getDefaultOptions()) {
    if (options.preventsDarkening) {
      // If preventsDarkening is enabled, darkening is completely disabled.
      return;
    }
    if (!options.preventsDarkeningInConjunctionWithNextup) {
      return;
    }

    if (!document.querySelector("#preventsDarkeningInConjunctionWithNextup")) {
      const css = `
        .atvwebplayersdk-overlays-container:has(.atvwebplayersdk-nextupcard-show) >.fkpovp9 {
          opacity: 0 !important;
        }
        .atvwebplayersdk-overlays-container:has(.atvwebplayersdk-nextupcard-show):has(.f1icw8u[style='cursor: pointer;']) >.fkpovp9 {
          opacity: 1 !important;
        }
      `;
      addStyle(css, "preventsDarkeningInConjunctionWithNextup");
    }
  }

  temporarilyDisableOverlay(options = getDefaultOptions(), delay = 5000) {
    if (!options.temporarilyDisableOverlay) {
      return;
    }
    const overlaysWrapper = this.player.querySelector(
      ".atvwebplayersdk-overlays-wrapper"
    );
    if (!overlaysWrapper) {
      return;
    }
    overlaysWrapper.style.display = "none";
    setTimeout(() => {
      overlaysWrapper.style.display = "";
    }, delay);
  }

  hideNextupCard(options = getDefaultOptions()) {
    if (!options.hideNextup) {
      return;
    }

    if (!document.querySelector("#hideNextupCard")) {
      const css = `
        .atvwebplayersdk-nextupcard-wrapper {
          display: none !important;
        }
      `;
      addStyle(css, "hideNextupCard");
    }

    new MutationObserver((_, outerObserver) => {
      const wrapper = this.player.querySelector(
        ".atvwebplayersdk-nextupcard-wrapper"
      );
      if (!wrapper) {
        return;
      }
      outerObserver.disconnect();

      new MutationObserver((_) => {
        const hideButton = wrapper.querySelector(
          ".atvwebplayersdk-nextupcardhide-button"
        );
        if (hideButton) {
          // Temporarily disable the overlay because it will be displayed by executing click().
          this.temporarilyDisableOverlay(options, 5000);
          hideButton.click();
        }
      }).observe(wrapper, observeConfig);

      this.preventsDarkeningInConjunctionWithNextup(options);

      if (options.showNextupOnOverlay) {
        const centerOverlaysWrapper = this.player.querySelector(
          "[data-ident='center-overlays-wrapper']"
        );
        new MutationObserver((_) => {
          const img = wrapper.querySelector("img");
          if (!img || !img.getAttribute("src")) {
            centerOverlaysWrapper.dataset.existsNextup = false;
          } else {
            centerOverlaysWrapper.dataset.existsNextup = true;
          }
        }).observe(wrapper, observeConfig);

        new MutationObserver((_) => {
          const img = wrapper.querySelector("img");
          if (!img || !img.getAttribute("src")) {
            wrapper.style.setProperty("display", "none", "important");
            return;
          }
          const computedStyle = getComputedStyle(centerOverlaysWrapper);
          if (computedStyle.cursor === "pointer") {
            wrapper.style.setProperty("display", "block", "important");
          } else {
            wrapper.style.setProperty("display", "none", "important");
          }
        }).observe(centerOverlaysWrapper, {
          attributes: true,
        });
      }
    }).observe(this.player, { ...observeConfig, attributes: true });
  }

  hideReactions(options = getDefaultOptions()) {
    if (!options.hideReactions) {
      return;
    }

    new MutationObserver((_, outerObserver) => {
      const reactionsBtnContainer = this.player.querySelector(
        ".atvwebplayersdk-player-container div:has(> button:nth-child(2):last-child)"
      );
      if (!reactionsBtnContainer) {
        return;
      }
      const btnIcons = reactionsBtnContainer.querySelectorAll(
        "button div[style*='center center no-repeat']"
      );
      if (!btnIcons.length) {
        return;
      }

      // The content may disappear, but the wrapper remains,
      // so the setting of display:none is likely sufficient to do only once.
      outerObserver.disconnect();
      const reactionsWrapper = reactionsBtnContainer.parentNode.parentNode;
      reactionsWrapper.style.display = "none";

      if (!options.showReactionsOnOverlay) {
        return;
      }

      const centerOverlaysWrapper = this.player.querySelector(
        "[data-ident='center-overlays-wrapper']"
      );
      new MutationObserver((_) => {
        const reactionsBtns = reactionsWrapper.querySelectorAll("button");
        if (!reactionsBtns.length) {
          centerOverlaysWrapper.dataset.existsReactions = false;
        } else {
          centerOverlaysWrapper.dataset.existsReactions = true;
        }
      }).observe(reactionsWrapper, observeConfig);

      const changeReactionsStyle = (_) => {
        const reactionsBtns = reactionsWrapper.querySelectorAll("button");
        if (!reactionsBtns.length) {
          reactionsWrapper.style.display = "none";
          return;
        }
        const computedStyle = getComputedStyle(centerOverlaysWrapper);
        if (computedStyle.cursor === "pointer") {
          reactionsWrapper.style.display = "";
        } else {
          reactionsWrapper.style.display = "none";
        }
      };

      changeReactionsStyle();
      new MutationObserver(changeReactionsStyle).observe(
        centerOverlaysWrapper,
        {
          attributes: true,
        }
      );
    }).observe(this.player, observeConfig);
  }

  hideRatingText(options = getDefaultOptions()) {
    if (!options.hideRating) {
      return;
    }
    if (!document.querySelector("#hideRatingText")) {
      const css = `
        .atvwebplayersdk-regulatory-overlay {
          display: none !important;
        }
      `;
      addStyle(css, "hideRatingText");
    }
  }

  preventsDarkening(options = getDefaultOptions()) {
    if (!options.preventsDarkening) {
      return;
    }

    if (!document.querySelector("#preventsDarkening")) {
      const css = `
        .atvwebplayersdk-overlays-container > div.fkpovp9 {
          display: none !important;
          }
        `;
      addStyle(css, "preventsDarkening");
    }

    if (options.addOutlinesForTextsAndIcons) {
      if (!document.querySelector("#addOutlinesForTexts")) {
        const cssForText = `
          .atvwebplayersdk-title-text {
            -webkit-text-stroke: 0.015em black;
          }
          .atvwebplayersdk-subtitle-text {
            -webkit-text-stroke: 0.015em black;
          }
          .atvwebplayersdk-timeindicator-text {
            -webkit-text-stroke: 0.025em black;
          }
          .atvwebplayersdk-timeindicator-text span {
            opacity: 1;
            font-weight: normal;
          }
          .atvwebplayersdk-nexttitle-button div:not(:has(img)) {
            -webkit-text-stroke: 0.025em black;
          }
        `;
        addStyle(cssForText, "addOutlinesForTexts");
      }

      if (!document.querySelector("#addOutlinesForIcons")) {
        const cssForImg = `
          .atvwebplayersdk-hideabletopbuttons-container button img,
          .atvwebplayersdk-playerclose-button img {
            filter: drop-shadow(0 0 0.015em black) drop-shadow(0 0 0.015em black) drop-shadow(0 0 0.015em black);
          }
          .nextup-ext-opt-btn img {
            filter: sepia(100%) saturate(2000%) hue-rotate(120deg) drop-shadow(0 0 0.015em black) drop-shadow(0 0 0.015em black) drop-shadow(0 0 0.015em black) !important;
          }
          .atvwebplayersdk-fastseekback-button img,
          .atvwebplayersdk-playpause-button img,
          .atvwebplayersdk-fastseekforward-button img {
            filter: drop-shadow(0 0 0.02em black) drop-shadow(0 0 0.02em black) drop-shadow(0 0 0.02em black);
          }
          .atvwebplayersdk-nexttitle-button img {
            filter: drop-shadow(0 0 0.02em black) drop-shadow(0 0 0.02em black) drop-shadow(0 0 0.015em black);
          }
          .atvwebplayersdk-hideabletopbuttons-container button + div div,
          .atvwebplayersdk-playerclose-button + div div {
            -webkit-text-stroke: 0.015em black;
          }
        `;
        addStyle(cssForImg, "addOutlinesForIcons");
      }
    }
  }

  // Move the center buttons(Play/Pause, Back and Forward) to the bottom.
  moveCenterButtonsToBottom(options = getDefaultOptions()) {
    if (!options.moveCenterButtonsToBottom) {
      return;
    }

    const playPauseButton = this.player.querySelector(
      ".atvwebplayersdk-playpause-button"
    );

    const container = playPauseButton.parentNode.parentNode.parentNode;
    const computedStyle = window.getComputedStyle(container);
    if (parseFloat(computedStyle.marginTop) > 0) {
      return;
    }

    container.style.position = "absolute";
    container.style.bottom = 0;
    container.style.zIndex = 999;

    const adjustElementSize = (element) => {
      if (element) {
        const elementComputedStyle = window.getComputedStyle(element);
        const width = parseFloat(elementComputedStyle.width);
        const height = parseFloat(elementComputedStyle.height);
        const newWidth = width * 0.65;
        const newHeight = height * 0.65;
        element.style.width = newWidth + "px";
        element.style.height = newHeight + "px";
      }
    };

    const buttons = container.querySelectorAll("button");
    for (const button of buttons) {
      adjustElementSize(button);
    }

    window.addEventListener("resize", () => {
      const buttons = container.querySelectorAll("button");
      for (const button of buttons) {
        button.style.width = "";
        button.style.height = "";
        adjustElementSize(button);
      }
    });
  }

  preventsTransitionsToRecommendedVideos(options = getDefaultOptions()) {
    if (!options.preventsTransitionsToRecommendedVideos) {
      return;
    }

    // The video titles are compared to determine if there has been a transition to a different video.
    // Detection of transitions to another season is not supported.
    let titleObserver;
    const parentObserver = new MutationObserver((_, outerObserver) => {
      const titleText = this.player.querySelector(
        ".atvwebplayersdk-title-text"
      );
      if (!titleText) {
        return;
      }
      const title = titleText.textContent;
      if (!title) {
        return;
      }
      outerObserver.disconnect();

      titleObserver = new MutationObserver((_) => {
        const newTitle = titleText.textContent;
        if (!newTitle) {
          return;
        }
        console.log(`previous [${title}], current [${newTitle}]`);
        if (title !== newTitle) {
          const closeBtn = this.player.querySelector(
            ".atvwebplayersdk-playerclose-button"
          );
          closeBtn.click();
        }
      });
      titleObserver.observe(titleText, observeConfig);
    });

    parentObserver.observe(this.player, { ...observeConfig, attributes: true });

    // Stops parentObserver and titleObserver when the video is closed.
    new MutationObserver((_, outerObserver) => {
      if (!this.player.classList.contains("dv-player-fullscreen")) {
        outerObserver.disconnect();
        console.log("Video closed.");
        parentObserver.disconnect();
        if (titleObserver) {
          titleObserver.disconnect();
        }

        // Execute preventsTransitionsToRecommendedVideos method each time the video is opened.
        new MutationObserver((_, observer) => {
          if (this.player.classList.contains("dv-player-fullscreen")) {
            observer.disconnect();
            console.log("Video opened.");
            this.preventsTransitionsToRecommendedVideos(options);
          }
        }).observe(this.player, {
          attributes: true,
        });
      }
    }).observe(this.player, {
      attributes: true,
    });
  }
}

const main = () => {
  if (!localStorage.getItem("nextup-ext")) {
    saveDefaultOptions();
  }

  const scriptInfo = getScriptInfo();
  updateOptionVersion(scriptInfo);

  const options = getOptions();
  let isFirstPlayer = true;

  new MutationObserver((_) => {
    const players = document.querySelectorAll(
      "[id*='dv-web-player']:not([data-detected-from-ext='true'])"
    );
    players.forEach((player) => {
      player.dataset.detectedFromExt = "true";
      const controller = new ElementController(player);

      new MutationObserver((_, observer) => {
        controller.markingCenterOverlaysWrapper();

        const video = player.querySelector("video");
        if (!video || !video.checkVisibility()) {
          return;
        }

        observer.disconnect();

        if (isFirstPlayer) {
          isFirstPlayer = false;
          createOptionDialog(scriptInfo.scriptVersion);
          addEventListenerForShortcutKey(options);
        }

        controller.markingCenterOverlaysWrapper();

        try {
          controller.createOptionBtn();
        } catch (e) {
          console.log(e);
        }

        try {
          controller.hideSkipIntroBtn(options);
        } catch (e) {
          console.log(e);
        }

        try {
          controller.hideNextupCard(options);
        } catch (e) {
          console.log(e);
        }

        try {
          controller.hideReactions(options);
        } catch (e) {
          console.log(e);
        }

        try {
          controller.hideRatingText(options);
        } catch (e) {
          console.log(e);
        }

        try {
          controller.preventsDarkening(options);
        } catch (e) {
          console.log(e);
        }

        try {
          controller.moveCenterButtonsToBottom(options);
        } catch (e) {
          console.log(e);
        }

        try {
          controller.preventsTransitionsToRecommendedVideos(options);
        } catch (e) {
          console.log(e);
        }
      }).observe(player, observeConfig);
    });
  }).observe(document, observeConfig);
};

main();
