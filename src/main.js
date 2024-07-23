const observeConfig = Object.freeze({ childList: true, subtree: true });

const getDefaultOptions = () => {
  return {
    hideSkipIntroBtn: true,
    showSkipIntroBtnOnOverlay: false,
    hideNextup: true,
    temporarilyDisableOverlay: true,
    showNextupOnOverlay: false,
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
    scriptVersion: "2.4.1",
  };
};

const getScriptInfo = () => {
  // user script
  /**
   * When using optional chaining with window.GM_info in tampermonkey,
   * it sometimes became undefined for some reason, so I implemented it using try-catch.
   */
  try {
    const gmVer = window.GM_info.script.version;
    if (typeof gmVer === "string") {
      return {
        scriptType: "user-script",
        scriptVersion: gmVer,
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
    showNextupOnOverlay:
      "オーバーレイ表示が有効な時はNext upを表示する（非表示ボタンが無い場合のみ）",
    preventsTransitionsToRecommendedVideos:
      "動画終了時にサジェストされたコンテンツに遷移するのを防ぐ（自動再生が有効な場合）",
    preventsTransitionsToRecommendedVideos_Tooltip:
      "動画終了時の次のエピソードへの遷移に影響はありません",
    hideRating: "レーティングを非表示にする",
    preventsDarkening: "オーバーレイ表示が有効な時に暗くならないようにする",
    addOutlinesForTextsAndIcons: "文字とアイコンを黒で縁取りする",
    moveCenterButtonsToBottom:
      "実験的: 中央のボタン（再生/停止、戻る、進む）を下部に移動する",
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
    showNextupOnOverlay:
      "Show next up card when overlay display is enabled (only if there is no hide button)",
    preventsTransitionsToRecommendedVideos:
      "Prevent transition to suggested content when video ends (if autoplay is enabled)",
    preventsTransitionsToRecommendedVideos_Tooltip:
      "There is no impact on the transition to the next episode when the video ends.",
    hideRating: "Hide rating",
    preventsDarkening: "Prevents darkening when overlay display is enabled",
    addOutlinesForTextsAndIcons: "Add outlines for texts and icons",
    moveCenterButtonsToBottom:
      "Experimental: Move the center buttons(Play/Pause, Back and Forward) to the bottom",
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
                <input type="checkbox" id="show-nextup" name="show-nextup" ${
                  options.showNextupOnOverlay ? "checked" : ""
                } />
                <p>${messages.showNextupOnOverlay}</p>
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

  const css = [
    ".nextup-ext-opt-dialog {padding: 0; word-break: break-all;}",
    ".dialog-inner {padding: 14px;}",
    ".nextup-ext-opt-dialog-note {text-align: center; color: green; margin-bottom: 10px; font-weight: 700;}",
    ".nextup-ext-opt-dialog label {display: block;}",
    ".nextup-ext-opt-dialog label.indent1 {margin-left: 14px;}",
    ".nextup-ext-opt-dialog label input[type='checkbox'] {float: left;}",
    ".nextup-ext-opt-dialog label p {float: left; margin-bottom: 5px; width: calc(100% - 24px);}",
    ".nextup-ext-opt-dialog ul li {margin-left: 18px;}",
    ".nextup-ext-opt-dialog label input[type='text'] {height: 20px;}",
    ".nextup-ext-opt-dialog .nextup-ext-opt-dialog-btn-wrapper {margin-top: 12px; position: relative;}",
    ".nextup-ext-opt-dialog div:has(#nextup-ext-opt-dialog-close):not(.dialog-inner) {text-align: center;}",
    "#nextup-ext-opt-dialog-close {border-color: black; border: solid 1px; background-color: #EEE}",
    "#nextup-ext-opt-dialog-close {width: 120px; letter-spacing: 4px;}",
    "#nextup-ext-opt-dialog-close:hover {background-color: #DDD}",
    ".nextup-ext-opt-dialog-version {position: absolute; top: 0px; right: 0px;}",
  ];
  addStyle(css.join(""));

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
        case "show-nextup":
          saveOptions({ showNextupOnOverlay: e.target.checked });
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
  }

  createOptionBtn() {
    new MutationObserver((_, observer) => {
      if (this.player.querySelector(".nextup-ext-opt-btn-container")) {
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
    }).observe(this.player, observeConfig);
  }

  hideSkipIntroBtn(options = getDefaultOptions()) {
    if (!options.hideSkipIntroBtn) {
      return;
    }

    if (!document.querySelector("#hideSkipIntroBtn")) {
      const css = [
        ".atvwebplayersdk-skipelement-button {display: none !important;}",
      ];
      addStyle(css.join(""), "hideSkipIntroBtn");
    }

    if (!options.showSkipIntroBtnOnOverlay) {
      return;
    }
    new MutationObserver((_, outerObserver) => {
      const btnsContainer = this.player.querySelector(
        ".atvwebplayersdk-hideabletopbuttons-container"
      );
      if (!btnsContainer) {
        return;
      }
      outerObserver.disconnect();
      new MutationObserver((_) => {
        const skipIntroBtn = this.player.querySelector(
          ".atvwebplayersdk-skipelement-button"
        );
        if (!skipIntroBtn) {
          return;
        }
        if (btnsContainer.classList.contains("hide")) {
          skipIntroBtn.style.setProperty("display", "none", "important");
        } else {
          skipIntroBtn.style.setProperty("display", "block", "important");
        }
      }).observe(btnsContainer, {
        attributes: true,
      });
    }).observe(this.player, observeConfig);
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
      const css = [
        ".atvwebplayersdk-nextupcard-wrapper {display: none !important;}",
      ];
      addStyle(css.join(""), "hideNextupCard");
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

      if (options.showNextupOnOverlay) {
        new MutationObserver((_, outerObserver2) => {
          const btnsContainer = this.player.querySelector(
            ".atvwebplayersdk-hideabletopbuttons-container"
          );
          if (!btnsContainer) {
            return;
          }
          outerObserver2.disconnect();
          new MutationObserver((_) => {
            const img = wrapper.querySelector("img");
            if (!img || !img.getAttribute("src")) {
              wrapper.style.setProperty("display", "none", "important");
              return;
            }
            if (btnsContainer.classList.contains("hide")) {
              wrapper.style.setProperty("display", "none", "important");
            } else {
              wrapper.style.setProperty("display", "block", "important");
            }
          }).observe(btnsContainer, {
            attributes: true,
          });
        }).observe(this.player, observeConfig);
      }
    }).observe(this.player, observeConfig);
  }

  hideRatingText(options = getDefaultOptions()) {
    if (!options.hideRating) {
      return;
    }
    if (!document.querySelector("#hideRatingText")) {
      const css = [
        ".atvwebplayersdk-regulatory-overlay {display: none !important;}",
      ];
      addStyle(css.join(""), "hideRatingText");
    }
  }

  preventsDarkening(options = getDefaultOptions()) {
    if (!options.preventsDarkening) {
      return;
    }

    if (!document.querySelector("#preventsDarkening")) {
      const css = [
        ".atvwebplayersdk-overlays-container > div.fkpovp9 {display: none !important;}",
      ];
      addStyle(css.join(""), "preventsDarkening");
    }

    if (options.addOutlinesForTextsAndIcons) {
      const cssForText = [
        ".atvwebplayersdk-title-text {-webkit-text-stroke: 0.015em black;}",
        ".atvwebplayersdk-subtitle-text {-webkit-text-stroke: 0.015em black;}",
        ".atvwebplayersdk-timeindicator-text {-webkit-text-stroke: 0.025em black;}",
        ".atvwebplayersdk-timeindicator-text span {opacity: 1; font-weight: normal;}",
        ".atvwebplayersdk-nexttitle-button div:not(:has(img)) {-webkit-text-stroke: 0.025em black;}",
      ];
      addStyle(cssForText.join(""));

      const cssForImg = [
        ".atvwebplayersdk-hideabletopbuttons-container button img, .atvwebplayersdk-playerclose-button img {filter: drop-shadow(0 0 0.015em black) drop-shadow(0 0 0.015em black) drop-shadow(0 0 0.015em black);}",
        ".nextup-ext-opt-btn img {filter: sepia(100%) saturate(2000%) hue-rotate(120deg) drop-shadow(0 0 0.015em black) drop-shadow(0 0 0.015em black) drop-shadow(0 0 0.015em black) !important;}",
        ".atvwebplayersdk-fastseekback-button img, .atvwebplayersdk-playpause-button img, .atvwebplayersdk-fastseekforward-button img {filter: drop-shadow(0 0 0.02em black) drop-shadow(0 0 0.02em black) drop-shadow(0 0 0.02em black);}",
        ".atvwebplayersdk-nexttitle-button img {filter: drop-shadow(0 0 0.02em black) drop-shadow(0 0 0.02em black) drop-shadow(0 0 0.015em black);}",
        ".atvwebplayersdk-hideabletopbuttons-container button + div div, .nextup-ext-opt-btn + div div, .atvwebplayersdk-playerclose-button + div div {-webkit-text-stroke: 0.015em black;}",
      ];
      addStyle(cssForImg.join(""));
    }
  }

  // This feature is experimental.
  // Move the center buttons(Play/Pause, Back and Forward) to the bottom.
  moveCenterButtonsToBottom(options = getDefaultOptions()) {
    if (!options.moveCenterButtonsToBottom) {
      return;
    }

    new MutationObserver((_, observer) => {
      const playPauseButton = this.player.querySelector(
        ".atvwebplayersdk-playpause-button"
      );
      if (!playPauseButton) {
        return;
      }
      observer.disconnect();

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
          // console.log(element);
          // console.log(`width: ${width} -> ${newWidth}`);
          // console.log(`height: ${height} -> ${newHeight}`);
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
    }).observe(this.player, observeConfig);
  }

  preventsTransitionsToRecommendedVideos(options = getDefaultOptions()) {
    if (!options.preventsTransitionsToRecommendedVideos) {
      return;
    }

    // Execute preventsTransitionsToRecommendedVideos method each time the video is opened.
    new MutationObserver((_, observer) => {
      if (this.player.classList.contains("dv-player-fullscreen")) {
        observer.disconnect();
        this.preventsTransitionsToRecommendedVideos(options);
      }
    }).observe(this.player, {
      attributes: true,
    });

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
        console.log(`old [${title}], new [${newTitle}]`);
        if (title !== newTitle) {
          const closeBtn = this.player.querySelector(
            ".atvwebplayersdk-playerclose-button"
          );
          closeBtn.click();
        }
      });
      titleObserver.observe(titleText, observeConfig);
    });

    parentObserver.observe(this.player, observeConfig);

    // Stops parentObserver and titleObserver when the video is closed.
    new MutationObserver((_, observer) => {
      if (!this.player.classList.contains("dv-player-fullscreen")) {
        observer.disconnect();
        parentObserver.disconnect();
        if (titleObserver) {
          titleObserver.disconnect();
        }
        console.log("Video closed.");
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
      new MutationObserver((_, observer) => {
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

        const controller = new ElementController(player);

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
