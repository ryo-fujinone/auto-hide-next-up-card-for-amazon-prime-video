const observeConfig = Object.freeze({ childList: true, subtree: true });

const getDefaultOptions = () => {
  return {
    skipAds: true,
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
    forceHighestResolution_xhook: false,
    removeAdRelatedData: false,
    enableAutoplay_xhook: false,
    forcePlayNextEpisode_xhook: false,
    scriptVersion: "2.10.0",
  };
};

class ScriptInfo {
  static #info;

  static get() {
    if (this.#info) {
      return this.#info;
    }

    // user script
    try {
      const gmInfo = window.GM_info || GM_info;
      const scriptVer = gmInfo.script.version;
      if (typeof scriptVer === "string") {
        this.#info = {
          scriptType: "user-script",
          scriptVersion: scriptVer,
        };
        return this.#info;
      }
    } catch (e) {
      // console.log(e);
    }

    // chrome/firefox extension
    try {
      const chromeExtVer = chrome?.runtime?.getManifest()?.version;
      if (typeof chromeExtVer === "string") {
        this.#info = {
          scriptType: "chrome-extension",
          scriptVersion: chromeExtVer,
        };
        return this.#info;
      }
    } catch (e) {
      // console.log(e);
    }

    // unknown
    this.#info = {
      scriptType: "unknown",
      scriptVersion: getDefaultOptions().scriptVersion,
    };
    return this.#info;
  }

  static isUserScript() {
    const type = this.get().scriptType;
    return type === "user-script";
  }

  static isChromeExtension() {
    // This is also “true” when using Firefox
    const type = this.get().scriptType;
    return type === "chrome-extension";
  }
}

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

const saveOptionsToChromeStorage = async (newOptions) => {
  await chrome.storage.local.set({ options: newOptions });
};

const getOptionsFromChromeStorage = async () => {
  const result = await chrome.storage.local.get(["options"]);
  return result.options;
};

const saveOptionsToLocalStorage = (newOptions) => {
  const jsonStr = JSON.stringify(newOptions);
  localStorage.setItem("nextup-ext", jsonStr);
};

const getOptionsFromLocalStorage = () => {
  return localStorage.getItem("nextup-ext");
};

const saveDefaultOptions = () => {
  return new Promise(async (resolve) => {
    const newOptions = getDefaultOptions();
    if (ScriptInfo.isChromeExtension()) {
      await saveOptionsToChromeStorage(newOptions);
    } else {
      saveOptionsToLocalStorage(newOptions);
    }
    resolve();
  });
};

const getOptions = () => {
  return new Promise(async (resolve) => {
    if (ScriptInfo.isChromeExtension()) {
      const options = await getOptionsFromChromeStorage();
      if (!options) {
        await saveDefaultOptions();
        resolve(getDefaultOptions());
      } else {
        resolve(options);
      }
    } else {
      const jsonStr = getOptionsFromLocalStorage();
      if (!jsonStr) {
        await saveDefaultOptions();
        resolve(getDefaultOptions());
      } else {
        resolve(JSON.parse(jsonStr));
      }
    }
  });
};

const saveOptions = (_newOptions = {}, shouldReplace = false) => {
  return new Promise(async (resolve) => {
    let newOptions;
    if (shouldReplace) {
      // This pattern is required for the updateOptionVersion function
      newOptions = _newOptions;
    } else {
      // Normal pattern
      const options = await getOptions();
      newOptions = {
        ...options,
        ..._newOptions,
      };
    }

    if (ScriptInfo.isChromeExtension()) {
      await saveOptionsToChromeStorage(newOptions);
    } else {
      saveOptionsToLocalStorage(newOptions);
    }
    resolve();
  });
};

const updateOptionVersion = async (scriptInfo) => {
  const options = await getOptions();
  if (options.scriptVersion === scriptInfo.scriptVersion) {
    // Developers can force updates to option values.
    const key = "nextup-ext-force-update-option-version";
    if (localStorage.getItem(key) !== "true") {
      return;
    }
    console.log(`%c${key}`, "color:yellow; font-weight:bold;");
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

  await saveOptions(newOptions, true);
};

const migrateStorage = async () => {
  if (!ScriptInfo.isChromeExtension()) {
    return;
  }
  if (await getOptionsFromChromeStorage()) {
    // localStorage.removeItem("nextup-ext");
    return;
  }

  const jsonStr = getOptionsFromLocalStorage();
  if (!jsonStr) {
    return;
  }

  const options = JSON.parse(jsonStr);
  await saveOptionsToChromeStorage(options);
  // localStorage.removeItem("nextup-ext");
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
  setShortcutKeyVal: async function () {
    const options = await getOptions();
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
      await saveOptions({ shortcutKey: getDefaultOptions().shortcutKey });
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
  _changeShortcutKeyVal: async function (e) {
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

    await saveOptions({ shortcutKey: newShortcutKeyOptions });
  },
  whenOpening: async function () {
    pauseVideo();
    await this.setShortcutKeyVal();
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
    skipAds: "広告をスキップする",
    skipAds_Tooltip: "本編をスキップしてしまわないように1500ミリ秒分を残します",
    hideSkipIntroBtn: "イントロスキップボタンを非表示にする",
    showSkipIntroBtnOnOverlay:
      "オーバーレイ表示が有効な時はイントロスキップボタンを表示する",
    hideNextup: "Next upを非表示にする",
    temporarilyDisableOverlay:
      "非表示ボタンの自動クリック時に5秒間オーバーレイ表示を無効にする",
    preventsDarkeningInConjunctionWithNextup:
      "Next upの出現と同時に画面が暗くなるのを防ぐ",
    showNextupOnOverlay: "オーバーレイ表示が有効な時はNext upを表示する",
    hideReactions: "Reactions（好き/好きではない）を非表示にする",
    showReactionsOnOverlay: "オーバーレイ表示が有効な時はReactionsを表示する",
    showReactionsOnOverlay_Tooltip:
      "Next upの非表示が有効の場合、非表示ボタンの自動クリックでNext upとReactionsがDOMから削除されます",
    preventsTransitionsToRecommendedVideos:
      "動画終了時にサジェストされたコンテンツに遷移するのを防ぐ",
    preventsTransitionsToRecommendedVideos_Tooltip:
      "動画終了時の次のエピソードへの遷移に影響はありません。\nまた、Next upがクリックされた場合は再生を継続します。",
    hideRating: "レーティングを非表示にする",
    preventsDarkening: "オーバーレイ表示が有効な時に暗くならないようにする",
    addOutlinesForTextsAndIcons: "文字とアイコンを黒で縁取りする",
    moveCenterButtonsToBottom:
      "中央のボタン（再生/停止、戻る、進む）を下部に移動する",
    enableShortcutKey:
      "動画再生中にショートカットキーでオプションダイアログを開けるようにする",
    shortcutKeyForDialog: "オプションダイアログを開くショートカットキー",
    shortcutKeyForDialog_Tooltip: "Ctrl/Altとアルファベットは必須",
    monitorNetworkActivity: "通信の監視・改変",
    forceHighestResolution: "強制的に最高画質で再生する",
    forceHighestResolution_Tooltip: `通信の監視・改変を行うことでプライムビデオの挙動を制御します。
        プライムビデオの挙動に支障をきたす可能性があるため、ご理解の上ご活用ください。\n
        [強制的に最高画質で再生する] は他の監視・改変オプションを有効にする場合にセットで有効にすることを推奨します。
        通信の監視・改変のためにxhookというライブラリを採用していますが、xhookが有効な場合には再生開始から少しの間の先読みの挙動に影響が出る可能性があることが確認されています。
        先読みで最低画質の動画が取得され、少しの間だけそれが再生される場合があるようです。
        [強制的に最高画質で再生する] を有効にすることで最低画質で再生されることを避けることが可能です。`,
    removeAdRelatedData: "広告関連のデータを除去する",
    enableAutoplay: "自動再生のフラグをtrueに変更する",
    enableAutoplay_Tooltip:
      "この機能を使用してもプライムビデオの自動再生の設定は変更されません",
    forcePlayNextEpisode:
      "実験的: 動画終了時に自動的に閉じた場合に次のエピソードを再生する",
    forcePlayNextEpisode_Tooltip: `この機能は自動再生で6回連続で再生した後に動画が閉じてしまう挙動への対処策として使用可能です。
        また、自動再生の代替手段としても機能します。\n
        Chromeの場合、サイトに対して [音声] の権限を許可する必要があります。
        Firefoxの場合、サイトに対して [自動再生] の権限を許可する必要があります。\n
        この機能はサジェストされたコンテンツに遷移した後の次のエピソードの再生をサポートしていません。
        また、動作の安定性のために次のシーズンへの遷移もサポートしていません。\n
        次のエピソードがあるかどうかの判定に1500ミリ秒の待機時間を設定しています。
        最後まで再生して動画が閉じた場合やEscキーの入力で動画を閉じた場合、必要に応じて1500ミリ秒の間は画面を暗くします。`,
    close: "閉じる",
  };
  const enMessages = {
    promptReloadPage: "If you change the options, please reload the page",
    skipAds: "Skip ads",
    skipAds_Tooltip: "Leave 1500 ms for stability of operation",
    hideSkipIntroBtn: "Hide skip intro button",
    showSkipIntroBtnOnOverlay:
      "Show skip intro button when overlay display is enabled",
    hideNextup: "Hide next up card",
    temporarilyDisableOverlay:
      "Disable overlay for 5 seconds when auto-clicking hide button",
    preventsDarkeningInConjunctionWithNextup:
      "Prevents darkening in conjunction with next up appears",
    showNextupOnOverlay: "Show next up card when overlay display is enabled",
    hideReactions: "Hide reactions (like/not for me)",
    showReactionsOnOverlay: "Show Reactions when overlay display is enabled",
    showReactionsOnOverlay_Tooltip:
      "If hide next up card is enabled, auto-clicking the hide button will remove next up card and reactions from the DOM",
    preventsTransitionsToRecommendedVideos:
      "Prevent transition to suggested content when video ends",
    preventsTransitionsToRecommendedVideos_Tooltip:
      "There is no impact on the transition to the next episode when the video ends.\nAlso, if next up card is clicked, playback will continue.",
    hideRating: "Hide rating",
    preventsDarkening: "Prevents darkening when overlay display is enabled",
    addOutlinesForTextsAndIcons: "Add outlines for texts and icons",
    moveCenterButtonsToBottom:
      "Move the center buttons(Play/Pause, Back and Forward) to the bottom",
    enableShortcutKey:
      "Enable shortcut key to open the options dialog during video playback",
    shortcutKeyForDialog: "Shortcut key to open the options dialog",
    shortcutKeyForDialog_Tooltip: "Ctrl/Alt and alphabets are required",
    monitorNetworkActivity: "Monitor and modify network activity",
    forceHighestResolution: "Force playback at highest resolution",
    forceHighestResolution_Tooltip: `Controls Prime Video behavior by monitoring and modifying network activity.
        Please understand that this may interfere with the behavior of Prime Video.\n
        It is recommended that you enable the “Force playback at highest resolution” option when you enable other monitoring and modification options.
        This extension uses a library called xhook to monitor and modify communications, and it has been confirmed that if xhook is enabled, it may affect the preloading behavior for a short period of time after playback begins.
        It seems that in some cases the lowest quality video is retrieved in preload and it plays for a short while.
        It is possible to avoid the playback in the lowest quality by enabling “Force playback at highest resolution”.`,
    removeAdRelatedData: "Remove ad related data",
    enableAutoplay: "Change autoplay flag to true",
    enableAutoplay_Tooltip:
      "Enabling this will not change the autoplay setting for Prime Video",
    forcePlayNextEpisode:
      "Experimental: Play the next episode if the video is automatically closed at the end of the video",
    forcePlayNextEpisode_Tooltip: `This feature can be used as a workaround for the behavior of autoplay that closes the video after 6 consecutive plays.
        It also works as an alternative to autoplay.\n
        For Chrome, you must allow [audio] permissions for the site.
        For Firefox, you must allow the [Autoplay] permission for the site.\n
        This feature does not support playing the next episode after transitioning to the suggested content.
        Also, transitions to the next season are not supported for operational stability.\n
        A wait time of 1500 milliseconds is set to determine if the next episode is available.
        If the video is closed after playing to the end or by entering the Esc key, the screen is darkened for 1500 milliseconds if necessary.`,
    close: "Close",
  };
  return /ja|ja-JP/.test(window.navigator.language) ? jaMessages : enMessages;
};

const createOptionDialog = async (scriptVersion) => {
  if (getOptionDialog()) {
    return;
  }

  const messages = createOptionMessages();
  const options = await getOptions();

  const regexForMultiineTooltips = /^[^\S\r\n]*/gm;

  const dialogHtmlStr = `
    <dialog class="nextup-ext-opt-dialog">
        <div class="dialog-inner">
            <div class="group-title nextup-ext-opt-dialog-note">
              <p>${messages.promptReloadPage}</p>            
            </div>
            <label>
                <input type="checkbox" id="skip-ads" name="skip-ads" ${
                  options.skipAds ? "checked" : ""
                } />
                <p>
                    ${messages.skipAds}
                    <span class="nextup-ext-opt-dialog-tooltip" title="${
                      messages.skipAds_Tooltip
                    }"></span>
                </p>
            </label>
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
            <label class="indent1">
                <input type="checkbox" id="show-reactions" name="show-reactions" ${
                  options.showReactionsOnOverlay ? "checked" : ""
                } />
                <p>
                  ${messages.showReactionsOnOverlay}
                  <span class="nextup-ext-opt-dialog-tooltip" title="${
                    messages.showReactionsOnOverlay_Tooltip
                  }"></span>
                </p>
            </label>
            <label>
                <input type="checkbox" id="prevents-transitions-to-recommended-videos" name="prevents-transitions-to-recommended-videos" ${
                  options.preventsTransitionsToRecommendedVideos
                    ? "checked"
                    : ""
                } />
                <p>
                  ${messages.preventsTransitionsToRecommendedVideos}
                  <span class="nextup-ext-opt-dialog-tooltip" title="${
                    messages.preventsTransitionsToRecommendedVideos_Tooltip
                  }"></span>
                </p>
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
                    <label>
                        <span style="margin-right: 4px;">${
                          messages.shortcutKeyForDialog
                        }</span>
                        <input type="text" id="shortcutkey-for-dialog" name="shortcutkey-for-dialog" />
                        <span class="nextup-ext-opt-dialog-tooltip" title="${
                          messages.shortcutKeyForDialog_Tooltip
                        }"></span>
                    </label>
                </li>
            </ul>
            <div class="nextup-ext-opt-dialog-network-activity-monitoring">
                <div class="group-title">
                    <p>
                        ${messages.monitorNetworkActivity}
                        <span class="nextup-ext-opt-dialog-tooltip" title="${messages.forceHighestResolution_Tooltip.replaceAll(
                          regexForMultiineTooltips,
                          ""
                        )}"></span>
                    </p>
                </div>
                <label>
                    <input type="checkbox" id="force-highest-resolution" name="force-highest-resolution" ${
                      options.forceHighestResolution_xhook ? "checked" : ""
                    } />
                    <p>${messages.forceHighestResolution}</p>
                </label>
                <label>
                    <input type="checkbox" id="remove-ad-related-data" name="remove-ad-related-data" ${
                      options.removeAdRelatedData ? "checked" : ""
                    } />
                    <p>${messages.removeAdRelatedData}</p>
                </label>
                <label>
                    <input type="checkbox" id="enable-autoplay" name="enable-autoplay" ${
                      options.enableAutoplay_xhook ? "checked" : ""
                    } />
                    <p>
                        ${messages.enableAutoplay}
                        <span class="nextup-ext-opt-dialog-tooltip" title="${
                          messages.enableAutoplay_Tooltip
                        }"></span>
                    </p>
                </label>
                <label>
                    <input type="checkbox" id="force-play-next-episode" name="force-play-next-episode" ${
                      options.forcePlayNextEpisode_xhook ? "checked" : ""
                    } />
                    <p>
                        ${messages.forcePlayNextEpisode}
                        <span class="nextup-ext-opt-dialog-tooltip" title="${messages.forcePlayNextEpisode_Tooltip.replaceAll(
                          regexForMultiineTooltips,
                          ""
                        )}"></span>
                    </p>
                </label>
            </div>
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

  document.documentElement.dataset.nextupExtOptDialogCreated = true;

  const css = `
    .nextup-ext-opt-dialog {
      padding: 0;
      word-break: break-all;
    }
    .dialog-inner {
      padding: 14px;
    }
    .group-title {
      text-align: center;
      margin-bottom: 7px;
      font-weight: 700;
    }
    .nextup-ext-opt-dialog-note {
      color: green;
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
    .nextup-ext-opt-dialog-tooltip {
      color: darkviolet;
      text-decoration: underline;
      cursor: help;
      margin-left: 2px;
    }
    .nextup-ext-opt-dialog-tooltip:before {
      content: "\\0028";
    }
    .nextup-ext-opt-dialog-tooltip:after {
      content: "\\0029";
    }

    .nextup-ext-opt-dialog-network-activity-monitoring {
      border-top: 1px dotted;
      margin-top: 10px;
      padding-top: 10px;
      padding-bottom: 10px;
      border-bottom: 1px dotted;
    }
    .nextup-ext-opt-dialog-network-activity-monitoring > .group-title {
      color: darkslateblue;
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

  const tooltipElements = document.querySelectorAll(
    ".nextup-ext-opt-dialog-tooltip"
  );
  for (const elem of tooltipElements) {
    elem.textContent = " ? ";
  }

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

  new MutationObserver(async (_) => {
    if (optDialog.hasAttribute("open")) {
      await worksWithDialog.whenOpening();
    } else {
      worksWithDialog.whenClosed();
    }
  }).observe(optDialog, { attributes: true, attributeFilter: ["open"] });

  optDialog.addEventListener(
    "click",
    async (e) => {
      const idName = e.target.id;
      if (idName === "") {
        return;
      }

      switch (idName) {
        case "skip-ads":
          await saveOptions({ skipAds: e.target.checked });
          break;
        case "hide-skip-intro-btn":
          await saveOptions({ hideSkipIntroBtn: e.target.checked });
          break;
        case "show-skip-intro-btn":
          await saveOptions({ showSkipIntroBtnOnOverlay: e.target.checked });
          break;
        case "hide-nextup":
          await saveOptions({ hideNextup: e.target.checked });
          break;
        case "temporarily-disable-overlay":
          await saveOptions({ temporarilyDisableOverlay: e.target.checked });
          break;
        case "prevents-darkening-in-conjunction-with-nextup":
          await saveOptions({
            preventsDarkeningInConjunctionWithNextup: e.target.checked,
          });
          break;
        case "show-nextup":
          await saveOptions({ showNextupOnOverlay: e.target.checked });
          break;
        case "hide-reactions":
          await saveOptions({ hideReactions: e.target.checked });
          break;
        case "show-reactions":
          await saveOptions({ showReactionsOnOverlay: e.target.checked });
          break;
        case "prevents-transitions-to-recommended-videos":
          await saveOptions({
            preventsTransitionsToRecommendedVideos: e.target.checked,
          });
          break;
        case "hide-rationg":
          await saveOptions({ hideRating: e.target.checked });
          break;
        case "prevents-darkening":
          await saveOptions({ preventsDarkening: e.target.checked });
          break;
        case "add-outlines-for-texts-and-icons":
          await saveOptions({ addOutlinesForTextsAndIcons: e.target.checked });
          break;
        case "move-center-buttons-to-bottom":
          await saveOptions({ moveCenterButtonsToBottom: e.target.checked });
          break;
        case "enable-shortcutkey":
          await saveOptions({ shortcutKeyIsEnabled: e.target.checked });
          break;
        case "force-highest-resolution":
          await saveOptions({ forceHighestResolution_xhook: e.target.checked });
          break;
        case "remove-ad-related-data":
          await saveOptions({ removeAdRelatedData: e.target.checked });
          break;
        case "enable-autoplay":
          await saveOptions({ enableAutoplay_xhook: e.target.checked });
          break;
        case "force-play-next-episode":
          await saveOptions({ forcePlayNextEpisode_xhook: e.target.checked });
          break;
        case "nextup-ext-opt-dialog-close":
          optDialog.close();
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

  document.body.addEventListener("keydown", async (e) => {
    const video = getVisibleVideo();
    if (!video || !video.checkVisibility()) {
      return;
    }

    const shortcutKeyInput = getShortcutKeyInput();
    if (shortcutKeyInput === document.activeElement) {
      return;
    }

    const options = await getOptions();
    if (
      e.code === options.shortcutKey.charCode &&
      e.ctrlKey === options.shortcutKey.ctrl &&
      e.altKey === options.shortcutKey.alt &&
      e.shiftKey === options.shortcutKey.shift
    ) {
      const optDialog = getOptionDialog();
      if (optDialog.hasAttribute("open")) {
        optDialog.close();
      } else {
        optDialog.showModal();
      }
    }
  });
};

const createOptionBtnOnNavbar = () => {
  class OptionBtnOnNavbar {
    constructor() {
      this.isFirstCreate = true;
      this.create = this._create.bind(this);
      this.detectNavbarRemove = this._detectNavbarRemove.bind(this);
    }

    _detectNavbarRemove(mutationRecords, detectNavbarRemove) {
      try {
        let filtered = mutationRecords.filter((m) => m.removedNodes.length > 0);
        if (filtered.length === 0) {
          return;
        }
        filtered = filtered.filter((m) => {
          const nodes = Array.from(m.removedNodes).filter((n) => {
            try {
              if (n.matches("#pv-navigation-bar-wrapper")) {
                return n;
              } else {
                return false;
              }
            } catch (e) {
              return false;
            }
          });
          return nodes.length ? nodes : false;
        });
        if (filtered.length === 0) {
          return;
        }
        detectNavbarRemove.disconnect();
        setTimeout(() => {
          this.create();
        }, 500);
      } catch (e) {}
    }

    disconnect(observer) {
      if (observer) {
        observer.disconnect();
      }
    }

    _create(_, observer) {
      if (document.querySelector("#pv-nav-option-btn-container")) {
        this.disconnect(observer);
        return;
      }

      const accountDropdownContainer = document.querySelector(
        "#pv-nav-container [data-testid='pv-nav-account-dropdown-container']"
      );
      if (!accountDropdownContainer) {
        return;
      }
      const accountDropdownBtn =
        accountDropdownContainer.querySelector("button");
      if (!accountDropdownBtn) {
        return;
      }
      const imgContainer =
        accountDropdownContainer.querySelector("button > span");
      if (!imgContainer) {
        return;
      }
      this.disconnect(observer);

      if (this.isFirstCreate) {
        this.isFirstCreate = false;
        // The navbar may regenerate once after page load.
        // Therefore, monitor the regenerating of Navbar for 10 seconds.
        const detectNavbarRemove = new MutationObserver(
          this.detectNavbarRemove
        );
        detectNavbarRemove.observe(document, observeConfig);
        setTimeout(() => {
          detectNavbarRemove.disconnect();
        }, 10000);
      }

      const liElement = accountDropdownContainer.parentNode;
      const cloneLi = liElement.cloneNode();
      cloneLi.setAttribute("id", "pv-nav-option-btn-container");
      liElement.after(cloneLi);

      const cloneLiStyle = cloneLi.getAttribute("style");
      const cloneLiStyleRegex = /--nav-list-child-index:(\d+)/;
      const cloneLiStyleFound = cloneLiStyle?.match(cloneLiStyleRegex);
      if (cloneLiStyleFound) {
        let idx = parseInt(cloneLiStyleFound[1]);
        idx++;
        const newStyle = cloneLiStyle.replace(
          cloneLiStyleRegex,
          `--nav-list-child-index:${idx}`
        );
        // cloneLi.style = newStyle;
        // Use setAttribute to align style formats.
        cloneLi.setAttribute("style", newStyle);
      }

      const cloneContainer = accountDropdownContainer.cloneNode();
      cloneContainer.removeAttribute("data-testid");
      cloneLi.appendChild(cloneContainer);

      const optBtnElement = document.createElement("button");
      optBtnElement.classList.add(...accountDropdownBtn.classList);
      cloneContainer.appendChild(optBtnElement);
      optBtnElement.style.backgroundColor = "rgba(0, 0, 0, 0)";
      optBtnElement.setAttribute("title", "Option - Auto hide next up card");

      const cloneImgContainer = imgContainer.cloneNode();
      optBtnElement.appendChild(cloneImgContainer);

      const imgDataUrl = [
        "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNSIgaGVpZ2",
        "h0PSIyNSIgZmlsbD0ibm9uZSIgdmlld0JveD0iMCAwIDI1IDI1Ij48cGF0aCBmaWxsPSIjZmZmIiBmaWxsLXJ1bGU9ImV2ZW5vZG",
        "QiIGQ9Ik04LjYgNC45OTRjLS4zMzcuMTY2LS42Ni4zNTMtLjk3LjU2bC0xLjk0Ny0uODEyYTEuNSAxLjUgMCAwIDAtMS44NzcuNj",
        "M0TDEuODIyIDguODEyYTEuNSAxLjUgMCAwIDAgLjM5IDEuOTQzbDEuNjc4IDEuMjhhOC41OTYgOC41OTYgMCAwIDAgMCAxLjExOG",
        "wtMS42NzggMS4yOGExLjUgMS41IDAgMCAwLS4zOSAxLjk0M2wxLjk4NCAzLjQzNmExLjUgMS41IDAgMCAwIDEuODc3LjYzNGwxLj",
        "k0Ny0uODEzYy4zMS4yMDcuNjMzLjM5NS45Ny41NmwuMjY5IDIuMDkyYTEuNSAxLjUgMCAwIDAgMS40ODggMS4zMDloMy45NjdhMS",
        "41IDEuNSAwIDAgMCAxLjQ4OC0xLjMwOWwuMjY5LTIuMDkxYy4zMzYtLjE2Ni42Ni0uMzU0Ljk3LS41NjFsMS45NDcuODEzYTEuNS",
        "AxLjUgMCAwIDAgMS44NzctLjYzNGwxLjk4My0zLjQzNmExLjUgMS41IDAgMCAwLS4zODktMS45NDNsLTEuNjc4LTEuMjhhOC42My",
        "A4LjYzIDAgMCAwIDAtMS4xMThsMS42NzgtMS4yOGExLjUgMS41IDAgMCAwIC4zOS0xLjk0M2wtMS45ODQtMy40MzZhMS41IDEuNS",
        "AwIDAgMC0xLjg3Ny0uNjM0bC0xLjk0OC44MTNhOC40NTQgOC40NTQgMCAwIDAtLjk2OS0uNTYxbC0uMjctMi4wOTJhMS41IDEuNS",
        "AwIDAgMC0xLjQ4Ny0xLjMwOGgtMy45NjdhMS41IDEuNSAwIDAgMC0xLjQ4OCAxLjMwOGwtLjI3IDIuMDkyem0xLjgzNCAxLjQxNk",
        "E2LjQ4IDYuNDggMCAwIDAgNy45NCA3Ljg1Mkw1LjMxOCA2Ljc1NyAzLjc3NCA5LjQzbDIuMjU4IDEuNzIyYTYuNDkgNi40OSAwID",
        "AgMCAwIDIuODgxbC0yLjI1OCAxLjcyMyAxLjU0NCAyLjY3NCAyLjYyMi0xLjA5NWE2LjQ2MiA2LjQ2MiAwIDAgMCAyLjQ5NCAxLj",
        "Q0MWwuMzYyIDIuODE3aDMuMDg4bC4zNjMtMi44MTdjLjk0LS4yOSAxLjc5LS43ODggMi40OTMtMS40NDFsMi42MjMgMS4wOTUgMS",
        "41NDQtMi42NzQtMi4yNTktMS43MjNhNi40ODkgNi40ODkgMCAwIDAgMC0yLjg4bDIuMjU5LTEuNzIzLTEuNTQ0LTIuNjc0LTIuNj",
        "IzIDEuMDk1YTYuNDYxIDYuNDYxIDAgMCAwLTIuNDkzLTEuNDQxbC0uMzYzLTIuODE3aC0zLjA4OGwtLjM2MiAyLjgxNnptMS45MD",
        "YgMTAuMTg0YTQgNCAwIDEgMCAwLTggNCA0IDAgMCAwIDAgOHptMC0yYTIgMiAwIDEgMCAwLTQgMiAyIDAgMCAwIDAgNHoiIGNsaX",
        "AtcnVsZT0iZXZlbm9kZCIvPjwvc3ZnPg==",
      ].join("");
      const optBtnImgElement = document.createElement("img");
      optBtnImgElement.setAttribute("src", imgDataUrl);
      optBtnImgElement.style.filter =
        "sepia(100%) saturate(2000%) hue-rotate(120deg)";
      cloneImgContainer.appendChild(optBtnImgElement);

      const profileImgElement = accountDropdownBtn.querySelector(
        "[data-testid*='profile']"
      );
      if (profileImgElement) {
        const adjustOptBtnSize = () => {
          const profileComputedStyle =
            window.getComputedStyle(profileImgElement);
          const width = parseFloat(profileComputedStyle.width);
          const height = parseFloat(profileComputedStyle.height);
          optBtnImgElement.style.width = width + "px";
          optBtnImgElement.style.height = height + "px";
        };
        adjustOptBtnSize();
        window.addEventListener("resize", () => {
          optBtnImgElement.style.width = "";
          optBtnImgElement.style.height = "";
          adjustOptBtnSize();
        });
      }

      if (!document.querySelector("#optionBtnOnNavbar")) {
        const css = `
        body:has(.nextup-ext-opt-dialog[open]):not(:has(.dv-player-fullscreen)) {
          overflow: hidden !important;
        }
      `;
        addStyle(css, "optionBtnOnNavbar");
      }

      optBtnElement.addEventListener("click", (_) => {
        const optDialog = getOptionDialog();
        optDialog.showModal();
      });
    }

    main() {
      this._create();
      if (!document.querySelector("#pv-nav-option-btn-container")) {
        new MutationObserver(this.create).observe(document, {
          ...observeConfig,
          attributes: true,
        });
      }
    }
  }

  const optionBtn = new OptionBtnOnNavbar();
  optionBtn.main();
};

const createUserScriptMenu = () => {
  if (!ScriptInfo.isUserScript()) {
    return;
  }
  let name = "Open Options Dialog";
  if (/ja|ja-JP/.test(window.navigator.language)) {
    name = "オプションダイアログを開く";
  }
  GM_registerMenuCommand(
    name,
    () => {
      const optDialog = getOptionDialog();
      if (optDialog && !optDialog.hasAttribute("open")) {
        optDialog.showModal();
      }
    },
    {}
  );
};

// The runXhook function is executed as an inline script.
const runXhook = () => {
  const xhookUrl = document.documentElement.dataset.xhookUrl;
  const options = JSON.parse(document.documentElement.dataset.options);
  delete document.documentElement.dataset.xhookUrl;
  delete document.documentElement.dataset.options;

  const script = document.createElement("script");
  script.src = xhookUrl;

  const metadataResourceArray = [];
  const nextUpV2ResourceArray = [];
  const getVodPlaybackResourcesArray = [];

  let mpdId;

  const isMpd = (request, response) => {
    if (!request.url.match(/\.mpd/)) {
      return false;
    }
    if (response.status !== 200) {
      return;
    }
    if (response.headers?.["content-type"] !== "text/xml") {
      return false;
    }
    return true;
  };

  const isGetSections = (request, response) => {
    if (!request.url.includes("GetSections")) {
      return false;
    }
    if (request.headers?.accept !== "application/json") {
      return false;
    }
    if (response.status !== 200) {
      return false;
    }
    return true;
  };

  const isGetVodPlaybackResources = (request, response) => {
    if (!request.url.includes("GetVodPlaybackResources")) {
      return false;
    }
    if (response.status !== 200) {
      return false;
    }
    if (response.headers?.["content-type"] !== "application/json") {
      return false;
    }
    return true;
  };

  const hasNextUpV2Resource = (request, response) => {
    if (!request.url.includes("playerChromeResources")) {
      return false;
    }
    if (!request.url.includes("nextUpV2")) {
      return false;
    }
    if (response.status !== 200) {
      return false;
    }
    if (response.headers?.["content-type"] !== "application/json") {
      return false;
    }
    return true;
  };

  const hasCatalogMetadataV2Resource = (request, response) => {
    if (!request.url.includes("playerChromeResources")) {
      return false;
    }
    if (!request.url.includes("catalogMetadataV2")) {
      return false;
    }
    if (response.status !== 200) {
      return false;
    }
    if (response.headers?.["content-type"] !== "application/json") {
      return false;
    }
    return true;
  };

  script.addEventListener("load", () => {
    xhook.after(function (request, response) {
      (() => {
        if (!options.forceHighestResolution_xhook) {
          return;
        }
        if (!isMpd(request, response)) {
          return;
        }

        try {
          const mpd = response.text;
          const parser = new DOMParser();
          const dom = parser.parseFromString(mpd, "text/xml");

          const periods = dom.querySelectorAll("Period ");
          if (periods.length === 0) {
            return;
          }

          for (const p of periods) {
            const representations = p.querySelectorAll(
              "AdaptationSet[contentType='video'] > Representation"
            );
            if (representations.length === 0) {
              continue;
            }

            const highestRepresentation = Array.from(representations).reduce(
              (acc, cur) => {
                return parseInt(acc.getAttribute("bandwidth")) >
                  parseInt(cur.getAttribute("bandwidth"))
                  ? acc
                  : cur;
              }
            );

            highestRepresentation.setAttribute("highestRepresentation", "true");
            for (const rep of representations) {
              if (!rep.hasAttribute("highestRepresentation")) {
                rep.remove();
              }
            }
          }

          const newMpd = dom.documentElement.outerHTML;
          response.text = newMpd;
        } catch (e) {
          console.log(e);
        }
      })();

      (() => {
        if (!options.removeAdRelatedData) {
          return;
        }
        if (!isMpd(request, response)) {
          return;
        }

        try {
          const mpd = response.text;
          const parser = new DOMParser();
          const dom = parser.parseFromString(mpd, "text/xml");

          const periods = dom.querySelectorAll("Period");
          if (periods.length === 0) {
            return;
          }

          for (const p of periods) {
            const ad = p.querySelector("SupplementalProperty[value='Ad']");
            if (!ad) {
              continue;
            }
            p.remove();
            console.log("Removed ads (data in mpd)");
          }

          const period = dom.querySelector("Period:has(Role[value='main'])");
          if (!period) {
            return;
          }
          period.removeAttribute("start");

          const newMpd = dom.documentElement.outerHTML;
          response.text = newMpd;
        } catch (e) {
          console.log(e);
        }
      })();

      (() => {
        if (!options.removeAdRelatedData) {
          return;
        }
        if (!isGetVodPlaybackResources(request, response)) {
          return;
        }

        try {
          const data = JSON.parse(response.text);
          const playbackUrls = data.vodPlaybackUrls?.result?.playbackUrls;
          if (!playbackUrls) {
            return;
          }
          if (!playbackUrls.cuepoints) {
            return;
          }
          delete playbackUrls.cuepoints;
          console.log("Removed ads (cuepoints)");
          response.text = JSON.stringify(data);

          /**
           * The following implementation will also work, but it is more reliable to remove the cuepoints themselves.
           */
          // const cuepoints =
          //   data.vodPlaybackUrls?.result?.playbackUrls?.cuepoints;
          // if (!cuepoints) {
          //   return;
          // }
          // const encodedManifest = cuepoints.encodedManifest;
          // if (!encodedManifest) {
          //   return;
          // }

          // const manifest = atob(encodedManifest);
          // const parser = new DOMParser();
          // const dom = parser.parseFromString(manifest, "text/xml");
          // const adSources = dom.querySelectorAll("AdSource");
          // if (adSources.length === 0) {
          //   return;
          // }

          // for (const adSource of adSources) {
          //   adSource.remove();
          // }

          // const newManifest = dom.documentElement.outerHTML;
          // const newEncodedManifest = btoa(newManifest);
          // cuepoints.encodedManifest = newEncodedManifest;
          // response.text = JSON.stringify(data);
        } catch (e) {}
      })();

      (() => {
        if (!options.enableAutoplay_xhook) {
          return;
        }
        const _isGetSections = isGetSections(request, response);
        const _hasNextUpV2Resource = hasNextUpV2Resource(request, response);
        if (!_isGetSections && !_hasNextUpV2Resource) {
          return;
        }

        if (_isGetSections) {
          try {
            const data = JSON.parse(response.text);
            const autoplayConfig =
              data?.sections?.bottom?.collections?.collectionList?.[0]
                ?.autoplayConfig;
            if (!autoplayConfig) {
              return;
            }
            autoplayConfig.autoplayEnabled = true;
            response.text = JSON.stringify(data);
          } catch (e) {
            console.log(e);
          }
        } else if (_hasNextUpV2Resource) {
          try {
            const data = JSON.parse(response.text);
            const autoplayConfig =
              data?.resources?.nextUpV2?.card?.autoPlayConfig;
            if (!autoplayConfig) {
              return;
            }
            autoplayConfig.autoplayEnabled = true;
            response.text = JSON.stringify(data);
          } catch (e) {
            console.log(e);
          }
        }
      })();

      (() => {
        if (!options.forcePlayNextEpisode_xhook) {
          return;
        }
        const url = request.url;
        if (url.includes(".mp4")) {
          const pathname = new window.URL(url).pathname;
          const found = pathname.match(
            /([0-9a-zA-Z-]+)_(video|audio)_\d+\.mp4$/
          );
          if (!found) {
            return;
          }
          mpdId = found[1];
        } else if (hasCatalogMetadataV2Resource(request, response)) {
          const entityId = new window.URL(url).searchParams.get("entityId");
          if (!entityId) {
            return;
          }
          if (metadataResourceArray.find((m) => m.entityId === entityId)) {
            return;
          }

          const data = JSON.parse(response.text);
          metadataResourceArray.push({
            entityId,
            data,
          });
          if (metadataResourceArray > 20) {
            metadataResourceArray.shift();
          }
        } else if (hasNextUpV2Resource(request, response)) {
          const entityId = new window.URL(url).searchParams.get("entityId");
          if (!entityId) {
            return;
          }
          if (nextUpV2ResourceArray.find((n) => n.entityId === entityId)) {
            return;
          }

          const data = JSON.parse(response.text);
          nextUpV2ResourceArray.push({
            entityId,
            data,
          });
          if (nextUpV2ResourceArray > 20) {
            nextUpV2ResourceArray.shift();
          }
        } else if (isGetVodPlaybackResources(request, response)) {
          const titleId = new window.URL(url).searchParams.get("titleId");
          if (!titleId) {
            return;
          }
          if (getVodPlaybackResourcesArray.find((g) => g.titleId === titleId)) {
            return;
          }

          const data = JSON.parse(response.text);
          getVodPlaybackResourcesArray.push({
            titleId,
            data,
          });
          if (getVodPlaybackResourcesArray > 20) {
            getVodPlaybackResourcesArray.shift();
          }
        }
      })();
    });
  });

  document.head.appendChild(script);

  const detectNextEpisodeId = () => {
    if (!options.forcePlayNextEpisode_xhook) {
      return;
    }

    class DetectNextEpisodeId {
      constructor(player, video) {
        this.player = player;
        this.video = video;
        this.detect = this._detect.bind(this);
        this.videoSrcObserver = this.createVideoSrcObserver();
      }

      getSubtitleText() {
        const subtitle = this.player.querySelector(
          ".atvwebplayersdk-subtitle-text"
        );
        if (!subtitle) {
          return;
        }
        const newSubtitleText = subtitle.textContent;
        if (!newSubtitleText) {
          return;
        }
        return newSubtitleText;
      }

      _detect(event) {
        if (!event) {
          return;
        }
        const subtitleText = this.getSubtitleText();
        if (!subtitleText) {
          return;
        }

        const getVodPlaybackResources = getVodPlaybackResourcesArray.find(
          (g) => {
            const playbackUrls = g.data?.vodPlaybackUrls?.result?.playbackUrls;
            if (!playbackUrls) {
              return;
            }
            const urlSets = playbackUrls.urlSets;
            if (!urlSets) {
              return;
            }
            const defaultUrlSetId = playbackUrls.defaultUrlSetId;
            if (!defaultUrlSetId) {
              return;
            }
            const urlSet = urlSets.find((u) => u.urlSetId === defaultUrlSetId);
            if (!urlSet) {
              return;
            }
            const mpdUrl = urlSet.url;
            return mpdUrl?.includes(mpdId);
          }
        );
        if (!getVodPlaybackResources) {
          return;
        }

        const titleId = getVodPlaybackResources.titleId;
        const metadataResource = metadataResourceArray.find(
          (m) => m.entityId === titleId
        );
        if (!metadataResource) {
          return;
        }

        if (
          !subtitleText.includes(
            metadataResource.data.resources?.catalogMetadataV2?.catalog?.title
          )
        ) {
          return;
        }

        const nextUpV2Resource = nextUpV2ResourceArray.find(
          (n) => n.entityId === titleId
        );
        if (!nextUpV2Resource) {
          return;
        }

        const data = nextUpV2Resource.data;
        const carouselItem = data.resources.nextUpV2.card.carouselItems[0];
        if (!carouselItem) {
          return;
        }

        const autoplayConfig = data.resources?.nextUpV2?.card?.autoPlayConfig;
        if (carouselItem.analytics?.slotType !== "NEXT_EPISODE_SLOT") {
          this.player.dataset.nextEpisodeId = "null";
          this.player.dataset.isNotNextEpisode = "true";
        } else if (autoplayConfig?.autoplayCardPreferredImage !== "episode") {
          this.player.dataset.nextEpisodeId = "null";
          this.player.dataset.isNotNextEpisode = "true";
        }

        if (this.player.dataset.nextEpisodeId !== "null") {
          const nextEpisodeId = carouselItem.titleId;
          if (nextEpisodeId) {
            if (!this.player.dataset.nextEpisodeId) {
              this.player.dataset.nextEpisodeId = nextEpisodeId;
            } else if (this.player.dataset.nextEpisodeId !== nextEpisodeId) {
              this.player.dataset.nextEpisodeId = nextEpisodeId;
            }
          }
        }

        this.video.removeEventListener("timeupdate", this.detect);

        // Detection of auto play
        this.videoSrc = this.video.getAttribute("src");
        this.videoSrcObserver.observe(this.video, {
          attributes: true,
          attributeFilter: ["src"],
        });
      }

      createVideoSrcObserver() {
        return new MutationObserver((_, observer) => {
          const newVideoSrc = this.video.getAttribute("src");
          if (this.videoSrc !== newVideoSrc) {
            observer.disconnect();
            this.video.addEventListener("timeupdate", this.detect);
            delete this.player.dataset.nextEpisodeId;
          }
        });
      }

      runVideoOpenCloseObserver() {
        new MutationObserver((_, videoOpenObserver) => {
          if (!this.player.classList.contains("dv-player-fullscreen")) {
            return;
          }
          videoOpenObserver.disconnect();

          this.video.addEventListener("timeupdate", this.detect);

          new MutationObserver((_, videoCloseObserver) => {
            if (this.player.classList.contains("dv-player-fullscreen")) {
              return;
            }
            videoCloseObserver.disconnect();

            this.video.removeEventListener("timeupdate", this.detect);
            this.videoSrcObserver.disconnect();
            delete this.player.dataset.isNotNextEpisode;

            this.runVideoOpenCloseObserver();
          }).observe(this.player, {
            attributes: true,
            attributeFilter: ["class"],
          });
        }).observe(this.player, {
          attributes: true,
          attributeFilter: ["class"],
        });
      }
    }

    const random = window.crypto.randomUUID().replaceAll("-", "");

    new MutationObserver((_) => {
      const players = document.querySelectorAll(
        `[id*='dv-web-player']:not([data-detected-from-ext${random}='true'])`
      );
      players.forEach((player) => {
        player.dataset[`detectedFromExt${random}`] = "true";
        new MutationObserver((_, observer) => {
          const video = player.querySelector("video");
          if (!video) {
            return;
          }
          observer.disconnect();
          const d = new DetectNextEpisodeId(player, video);
          d.runVideoOpenCloseObserver();
        }).observe(player, {
          childList: true,
          subtree: true,
        });
      });
    }).observe(document, { childList: true, subtree: true });
  };

  detectNextEpisodeId();
};

const injectXhook = (options = getDefaultOptions()) => {
  const xhookOptions = [
    options.forceHighestResolution_xhook,
    options.removeAdRelatedData,
    options.enableAutoplay_xhook,
    options.forcePlayNextEpisode_xhook,
  ];
  const shouldInjectXhook = xhookOptions.some((opt) => opt);
  if (!shouldInjectXhook) {
    return;
  }

  const injectScript = (fn) => {
    // https://stackoverflow.com/questions/9515704/access-variables-and-functions-defined-in-page-context-from-an-extension
    // https://github.com/logore/amazon-prime-video-1080p
    if (typeof fn !== "function") {
      return;
    }

    let match = fn.toString().match(/{.*}/s);
    let fnStr = match[0].slice(1, match[0].length - 1);

    document.documentElement.setAttribute("onreset", fnStr);
    document.documentElement.dispatchEvent(new CustomEvent("reset"));
    document.documentElement.removeAttribute("onreset");
  };

  document.documentElement.dataset.options = JSON.stringify(options);

  let xhookUrl = "https://unpkg.com/xhook@latest/dist/xhook.min.js";
  try {
    if (ScriptInfo.isChromeExtension()) {
      xhookUrl = chrome?.runtime?.getURL("xhook.min.js");
    }
  } catch (e) {}
  document.documentElement.dataset.xhookUrl = xhookUrl;
  injectScript(runXhook);
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

  skipAds(options = getDefaultOptions()) {
    if (!options.skipAds) {
      return;
    }

    if (!document.querySelector("#skipAds")) {
      const css = `
        .atvwebplayersdk-ad-timer-countdown {
          display: none !important;
        }
        .atvwebplayersdk-go-ad-free-button {
          display: none !important;
        }
        .atvwebplayersdk-seek-unavailable-text {
          display: none !important;
        }
      `;
      addStyle(css, "skipAds");
    }

    let canSkip = true;
    new MutationObserver((_) => {
      if (!canSkip) {
        return;
      }
      const remainingTimeElem = this.player.querySelector(
        ".atvwebplayersdk-ad-timer-remaining-time"
      );
      if (!remainingTimeElem) {
        return;
      }

      const video = this.player.querySelector("video");
      if (!video?.currentTime) {
        return;
      }

      video.muted = true;
      setTimeout(() => {
        video.muted = false;
      }, 2000);

      const remainingTimeStr = remainingTimeElem.textContent;
      const mached = remainingTimeStr.match(/(\d?\d):{0,2}(\d?\d)/);
      if (!mached) {
        video.muted = false;
        return;
      }

      let adTime = 0;
      const remainingTimeArray = [mached[1], mached[2]];
      for (const [i, timeStr] of remainingTimeArray.entries()) {
        adTime +=
          parseInt(timeStr) * Math.pow(60, remainingTimeArray.length - 1 - i);
      }
      if (adTime <= 1) {
        video.muted = false;
        return;
      }

      canSkip = false;
      adTime -= 1.5;
      console.log(`Skip ${adTime} seconds`);
      video.currentTime += adTime;
      video.muted = false;
      console.log("Skipped ads");

      setTimeout(() => {
        canSkip = true;
      }, 3000);
    }).observe(this.player, { ...observeConfig, characterData: true });
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
          const video = this.player.querySelector("video");
          if (!video) {
            // Temporarily disable the overlay because it will be displayed by executing click().
            this.temporarilyDisableOverlay(options, 5000);
            hideButton.click();
          } else {
            // If you press the hide button on the Next up card that appears 5 seconds before the end of the video,the autoplay seems to be canceled.
            const currentTime = video.currentTime;
            const duration = video.duration;
            if (duration - currentTime >= 6) {
              this.temporarilyDisableOverlay(options, 5000);
              hideButton.click();
            }
          }
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
    let clickedNextup = false;

    const parentObserver = new MutationObserver((_, outerObserver) => {
      const title = this.player.querySelector(".atvwebplayersdk-title-text");
      if (!title) {
        return;
      }
      let titleText = title.textContent;
      if (!titleText) {
        return;
      }
      outerObserver.disconnect();

      titleObserver = new MutationObserver((_) => {
        const newTitleText = title.textContent;
        if (!newTitleText) {
          return;
        }
        console.log(`previous [${titleText}], current [${newTitleText}]`);
        if (clickedNextup) {
          console.log("Next up card was clicked by user");
          const t = title.textContent;
          if (t) {
            titleText = t;
          }
          clickedNextup = false;
          delete this.player.dataset.isNotNextEpisode;
          return;
        }
        const closeBtn = this.player.querySelector(
          ".atvwebplayersdk-playerclose-button"
        );
        if (!closeBtn) {
          return;
        }
        if (titleText !== newTitleText) {
          closeBtn.click();
        } else if (this.player.dataset.isNotNextEpisode === "true") {
          // Season changes can be detected if "forcePlayNextEpisode_xhook" is enabled.
          console.log("Prevented transition to another season");
          closeBtn.click();
        }
      });
      titleObserver.observe(title, observeConfig);
    });

    let nextupButtonObserver = "";
    const nextupWrapperObserver = new MutationObserver((_, outerObserver) => {
      const wrapper = this.player.querySelector(
        ".atvwebplayersdk-nextupcard-wrapper"
      );
      if (!wrapper) {
        return;
      }
      outerObserver.disconnect();

      nextupButtonObserver = new MutationObserver((_) => {
        const nextupButton = this.player.querySelector(
          ".atvwebplayersdk-nextupcard-button"
        );
        if (!nextupButton) {
          return;
        }
        // nextupButton will disappear, so there is no need to remove the event listener.
        nextupButton.addEventListener("click", (e) => {
          clickedNextup = true;
          setTimeout(() => {
            clickedNextup = false;
          }, 5000);
        });
      });
      nextupButtonObserver.observe(wrapper, observeConfig);
    });

    parentObserver.observe(this.player, { ...observeConfig, attributes: true });
    nextupWrapperObserver.observe(this.player, {
      ...observeConfig,
      attributes: true,
    });

    // Stops parentObserver and titleObserver when the video is closed.
    new MutationObserver((_, outerObserver) => {
      if (!this.player.classList.contains("dv-player-fullscreen")) {
        outerObserver.disconnect();
        console.log("Video closed.");
        parentObserver.disconnect();
        if (titleObserver) {
          titleObserver.disconnect();
        }
        nextupWrapperObserver.disconnect();
        if (nextupButtonObserver) {
          nextupButtonObserver.disconnect();
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
          attributeFilter: ["class"],
        });
      }
    }).observe(this.player, {
      attributes: true,
      attributeFilter: ["class"],
    });
  }

  forcePlayNextEpisode(options = getDefaultOptions()) {
    if (!options.forcePlayNextEpisode_xhook) {
      return;
    }

    let titleText = null;
    let titleChanged = false;
    let subtitleText = null;
    const subtitleSet = new Set();
    let existsNextEpisode = false;

    let closeBtn;
    let videoClosedByUser = false;

    const getTitleText = () => {
      const title = this.player.querySelector(".atvwebplayersdk-title-text");
      if (!title) {
        return;
      }
      const newTitleText = title.textContent;
      if (!newTitleText) {
        return;
      }
      return newTitleText;
    };

    const getSubtitleText = () => {
      const subtitle = this.player.querySelector(
        ".atvwebplayersdk-subtitle-text"
      );
      if (!subtitle) {
        return;
      }
      const newSubtitleText = subtitle.textContent;
      if (!newSubtitleText) {
        return;
      }
      return newSubtitleText;
    };

    const titleObserver = new MutationObserver((_, observer) => {
      const newTitleText = getTitleText();
      if (!newTitleText) {
        return;
      }
      if (!titleText) {
        titleText = newTitleText;
      } else if (titleText !== newTitleText) {
        titleChanged = true;
        observer.disconnect();
      }
    });

    const videoInfoObserver = new MutationObserver((_) => {
      if (!this.player.classList.contains("dv-player-fullscreen")) {
        return;
      }
      const nextTitleBtn = this.player.querySelector(
        ".atvwebplayersdk-nexttitle-button"
      );
      if (!nextTitleBtn) {
        const newSubtitleText = getSubtitleText();
        if (!newSubtitleText) {
          subtitleText = null;
          existsNextEpisode = false;
        } else if (newSubtitleText !== subtitleText) {
          subtitleText = newSubtitleText;
          subtitleSet.add(newSubtitleText);
          existsNextEpisode = false;
        }
        return;
      }

      const newSubtitleText = getSubtitleText();
      if (!newSubtitleText) {
        return;
      }

      subtitleText = newSubtitleText;
      subtitleSet.add(newSubtitleText);
      existsNextEpisode = true;
    });

    const infobarObserver = new MutationObserver((_, observer) => {
      const infobarContainer = this.player.querySelector(
        ".atvwebplayersdk-infobar-container"
      );
      if (!infobarContainer) {
        return;
      }

      observer.disconnect();

      titleObserver.observe(this.player, {
        ...observeConfig,
        attributes: true,
      });

      videoInfoObserver.observe(infobarContainer, {
        ...observeConfig,
        attributes: true,
      });
    });

    infobarObserver.observe(this.player, {
      ...observeConfig,
      attributes: true,
    });

    const playNextEpisode = () => {
      // This ID is obtained using xhook
      const nextEpisodeId = this.player.dataset.nextEpisodeId;
      delete this.player.dataset.nextEpisodeId;

      if (titleChanged) {
        console.log("Title changed");
        return;
      }
      if (!subtitleText || !existsNextEpisode) {
        console.log("No next episode");
        return;
      }
      if (videoClosedByUser) {
        // close button
        console.log("Video closed by user");
        return;
      }

      // Temporarily darkens the page.
      document.body.style.filter = "brightness(0)";
      setTimeout(() => {
        document.body.style.filter = "";
      }, 2000);

      setTimeout(() => {
        if (videoClosedByUser) {
          // Esc key
          console.log("Video closed by user");
        } else {
          const movePage = () => {
            if (nextEpisodeId && nextEpisodeId !== "null") {
              // If the dv-web-player does not have the next episode preloaded.
              console.log("Play next episode");
              const origin = window.location.origin;
              let url = `${origin}/gp/video/detail/${nextEpisodeId}/?autoplay=1&t=0&play-next-episode`;
              console.log(url);
              const volumeKey = "atvwebplayersdk_volume";
              const volumeStr = localStorage.getItem(volumeKey);
              const volume = parseFloat(volumeStr);
              if (!Number.isNaN(volume)) {
                url = `${url}&volume=${volumeStr}`;
              }
              localStorage.setItem(volumeKey, "0");
              setTimeout(() => {
                window.location.href = url;
              }, 200);
            } else {
              console.log(
                "Either the last episode has already been played or a problem may have occurred."
              );
            }
          };

          const newSubtitleText = getSubtitleText();
          console.log("Target episode", `[${newSubtitleText}]`);
          if (!newSubtitleText) {
            // This pattern if played from a page other than the individual pages of the series
            movePage();
          } else if (!subtitleSet.has(newSubtitleText)) {
            // Expected normal pattern
            const video = this.player.querySelector("video");
            if (!video.hasAttribute("src")) {
              movePage();
            } else {
              console.log("Play next episode");
              this.player.classList.add("dv-player-fullscreen");
              setTimeout(() => {
                playVideo();
              }, 500);
            }
          } else {
            // If for some reason the video player information is not updated.
            // This pattern sometimes occurs
            movePage();
          }
        }
        document.body.style.filter = "";
      }, 1500);
    };

    const closeBtnClicked = (e) => {
      if (!e) {
        return;
      }
      videoClosedByUser = true;
    };

    const closeBtnObserver = new MutationObserver((_, observer) => {
      const _closeBtn = this.player.querySelector(
        ".atvwebplayersdk-playerclose-button"
      );
      if (!_closeBtn) {
        return;
      }
      closeBtn = _closeBtn;
      closeBtn.addEventListener("click", closeBtnClicked);
    });

    closeBtnObserver.observe(this.player, {
      ...observeConfig,
      attributes: true,
    });

    const escPressed = (e) => {
      if (!e) {
        return;
      }
      if (e.key !== "Escape") {
        return;
      }
      setTimeout(() => {
        videoClosedByUser = !this.player.classList.contains(
          "dv-player-fullscreen"
        );
      }, 500);
    };

    document.body.addEventListener("keydown", escPressed);

    new MutationObserver((_, outerObserver) => {
      if (!this.player.classList.contains("dv-player-fullscreen")) {
        outerObserver.disconnect();
        infobarObserver.disconnect();
        titleObserver.disconnect();
        videoInfoObserver.disconnect();

        closeBtnObserver.disconnect();
        closeBtn.removeEventListener("click", closeBtnClicked);
        setTimeout(() => {
          document.body.removeEventListener("keydown", escPressed);
        }, 800);

        playNextEpisode();

        new MutationObserver((_, observer) => {
          if (this.player.classList.contains("dv-player-fullscreen")) {
            observer.disconnect();
            this.forcePlayNextEpisode(options);
          }
        }).observe(this.player, {
          attributes: true,
          attributeFilter: ["class"],
        });
      }
    }).observe(this.player, {
      attributes: true,
      attributeFilter: ["class"],
    });
  }
}

const restoreVolume = (video, url) => {
  const searchParams = new URL(url).searchParams;
  if (
    searchParams.has("autoplay") &&
    searchParams.has("play-next-episode") &&
    searchParams.has("volume")
  ) {
    const volumeStr = searchParams.get("volume");
    const volume = parseFloat(volumeStr);
    if (!Number.isNaN(volume)) {
      video.volume = volume;
      localStorage.setItem("atvwebplayersdk_volume", volume);
      console.log("Volume restored", volumeStr);
    }
  }
};

const main = async () => {
  try {
    await migrateStorage();
  } catch (e) {
    console.log(e);
  }

  const scriptInfo = ScriptInfo.get();
  await updateOptionVersion(scriptInfo);

  const options = await getOptions();
  const url = window.location.href;
  let canRunXhook = true;
  let isFirstPlayer = true;
  let canRestoreVolume = true;

  new MutationObserver((_) => {
    const players = document.querySelectorAll(
      "[id*='dv-web-player']:not([data-detected-from-ext='true'])"
    );
    players.forEach(async (player) => {
      player.dataset.detectedFromExt = "true";

      if (canRunXhook) {
        canRunXhook = false;
        try {
          injectXhook(options);
        } catch (e) {
          console.log(e);
        }
      }

      const controller = new ElementController(player);

      try {
        controller.createOptionBtn();
      } catch (e) {
        console.log(e);
      }

      if (isFirstPlayer) {
        isFirstPlayer = false;
        try {
          createOptionBtnOnNavbar();
        } catch (e) {
          console.log(e);
        }

        try {
          await createOptionDialog(scriptInfo.scriptVersion);
        } catch (e) {
          console.log(e);
        }

        try {
          createUserScriptMenu();
        } catch (e) {
          console.log(e);
        }

        // The shortcut keys for opening the dialog will only work if the video is open.
        addEventListenerForShortcutKey(options);
      }

      new MutationObserver((_, observer) => {
        controller.markingCenterOverlaysWrapper();

        const video = player.querySelector("video");
        if (!video || !video.checkVisibility()) {
          return;
        }

        observer.disconnect();

        controller.markingCenterOverlaysWrapper();

        if (canRestoreVolume) {
          canRestoreVolume = false;
          try {
            // If autoplay is forced, restore volume as needed.
            restoreVolume(video, url);
          } catch (e) {
            console.log(e);
          }
        }

        try {
          controller.skipAds(options);
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

        try {
          controller.forcePlayNextEpisode(options);
        } catch (e) {
          console.log(e);
        }
      }).observe(player, observeConfig);
    });
  }).observe(document, observeConfig);
};

main();
