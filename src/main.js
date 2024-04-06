const observeConfig = Object.freeze({ childList: true, subtree: true });

const getDefaultOptions = () => {
  return {
    hideSkipIntroBtn: true,
    showSkipIntroBtnOnOverlay: false,
    hideNextup: true,
    temporarilyDisableOverlay: true,
    showNextupOnOverlay: false,
    hideRating: true,
    shortcutKey: {
      ctrl: false,
      alt: true,
      shift: false,
      charCode: "KeyP",
    },
    shortcutKeyIsEnabled: true,
    scriptVersion: "2.2.2",
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
    ".dv-player-fullscreen .webPlayerContainer video"
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
    hideSkipIntroBtn: "イントロスキップボタンを非表示にする",
    showSkipIntroBtnOnOverlay:
      "オーバーレイ表示が有効な時はイントロスキップボタンを表示する",
    hideNextup: "Next upを非表示にする",
    temporarilyDisableOverlay:
      "非表示ボタンの自動クリック時に5秒間オーバーレイ表示を無効にする",
    showNextupOnOverlay:
      "オーバーレイ表示が有効な時はNext upを表示する (非表示ボタンが無い場合のみ)",
    hideRating: "レーティング(推奨対象年齢)を非表示にする",
    enableShortcutKey:
      "ショートカットキーでオプションダイアログを開けるようにする",
    shortcutKeyForDialog: "オプションダイアログを開くショートカットキー",
    shortcutKeyForDialog_Tooltip: "Ctrl/Altとアルファベットは必須",
    close: "閉じる",
  };
  const enMessages = {
    hideSkipIntroBtn: "Hide skip intro button",
    showSkipIntroBtnOnOverlay:
      "Show skip intro button when overlay display is enabled",
    hideNextup: "Hide next up card",
    temporarilyDisableOverlay:
      "Disable overlay for 5 seconds when auto-clicking hide button",
    showNextupOnOverlay:
      "Show next up card when overlay display is enabled (only if there is no hide button)",
    hideRating: "Hide rating",
    enableShortcutKey: "Enable shortcut key to open the options dialog",
    shortcutKeyForDialog: "Shortcut key to open the options dialog",
    shortcutKeyForDialog_Tooltip: "Ctrl/Alt and alphabets are required",
    close: "Close",
  };
  return /ja|ja-JP/.test(window.navigator.language) ? jaMessages : enMessages;
};

const createOptionDialog = () => {
  if (getOptionDialog()) {
    return;
  }

  const messages = createOptionMessages();
  const options = getOptions();

  const dialogHtmlStr = `
    <dialog class="nextup-ext-opt-dialog">
        <div class="dialog-inner">
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
            <label>
                <input type="checkbox" id="hide-rationg" name="hide-rationg" ${
                  options.hideRating ? "checked" : ""
                } />
                <p>${messages.hideRating}</p>
            </label>
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
            </div>
        </div>
    </dialog>
    `;
  document.body.insertAdjacentHTML("beforeend", dialogHtmlStr);

  const css = [
    ".nextup-ext-opt-dialog {padding: 0; word-break: break-all;}",
    ".dialog-inner {padding: 14px;}",
    ".nextup-ext-opt-dialog label {display: block;}",
    ".nextup-ext-opt-dialog label.indent1 {margin-left: 14px;}",
    ".nextup-ext-opt-dialog label input[type='checkbox'] {float: left;}",
    ".nextup-ext-opt-dialog label p {float: left; margin-bottom: 5px; width: calc(100% - 24px);}",
    ".nextup-ext-opt-dialog ul li {margin-left: 18px;}",
    ".nextup-ext-opt-dialog label input[type='text'] {height: 20px;}",
    ".nextup-ext-opt-dialog .nextup-ext-opt-dialog-btn-wrapper {margin-top: 12px;}",
    ".nextup-ext-opt-dialog div:has(#nextup-ext-opt-dialog-close):not(.dialog-inner) {text-align: center;}",
    "#nextup-ext-opt-dialog-close {border-color: black; border: solid 1px; background-color: #EEE}",
    "#nextup-ext-opt-dialog-close {width: 120px; letter-spacing: 4px;}",
    "#nextup-ext-opt-dialog-close:hover {background-color: #DDD}",
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
        case "hide-rationg":
          saveOptions({ hideRating: e.target.checked });
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

class ElementHider {
  constructor(player) {
    this.player = player;
  }
  createOptionBtn() {
    new MutationObserver((_, _observer) => {
      if (this.player.querySelector(".nextup-ext-opt-btn-container")) {
        return;
      }

      const btnsContainer = this.player.querySelector(
        ".atvwebplayersdk-hideabletopbuttons-container"
      );
      if (!btnsContainer) {
        return;
      }

      _observer.disconnect();

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
        ".atvwebplayersdk-rating-text {display: none !important;}",
        ".atvwebplayersdk-ratingdescriptor-text {display: none !important;}",
      ];
      addStyle(css.join(""), "hideRatingText");
    }

    // Hide the overlays that appear in the top center and top left when viewing ratings.
    new MutationObserver((_, _observer) => {
      const ratingDesc = this.player.querySelector(
        ".atvwebplayersdk-ratingdescriptor-text"
      );
      if (!ratingDesc) {
        return;
      }

      _observer.disconnect();

      const parent = ratingDesc.parentNode.parentNode;
      if (parent.childNodes.length !== 3) {
        return;
      }
      if (
        !Array.from(parent.childNodes).every((child) => child.tagName === "DIV")
      ) {
        return;
      }

      for (const child of parent.childNodes) {
        if (child.querySelector(".atvwebplayersdk-ratingdescriptor-text")) {
          continue;
        }

        if (child.childNodes.length === 0 && child.textContent === "") {
          child.style.display = "none";
          continue;
        }

        if (
          child.childNodes.length === 1 &&
          child.childNodes[0].childNodes.length === 0 &&
          child.childNodes[0].textContent === ""
        ) {
          child.style.display = "none";
          continue;
        }
      }
    }).observe(this.player, observeConfig);
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
      new MutationObserver((_, _observer) => {
        const video = player.querySelector("video");
        if (!video || !video.checkVisibility()) {
          return;
        }

        _observer.disconnect();

        if (isFirstPlayer) {
          isFirstPlayer = false;
          createOptionDialog();
          addEventListenerForShortcutKey(options);
        }

        const hider = new ElementHider(player);
        hider.createOptionBtn();
        hider.hideSkipIntroBtn(options);
        hider.hideNextupCard(options);
        hider.hideRatingText(options);
      }).observe(player, observeConfig);
    });
  }).observe(document, observeConfig);
};

main();
