const OBSERVER_CONFIG = Object.freeze({ childList: true, subtree: true });
const OPTION_BTN_IMG_DATA_URL = [
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

const getDefaultOptions = () => {
  return {
    _scriptVersion: "2.16.2",
    _schemaVersion: null,
    skipAds: true,
    hideSkipIntroBtn: true,
    showSkipIntroBtnOnOverlay: false,
    hideNextup: true,
    temporarilyDisableOverlay: true,
    preventsDarkeningInConjunctionWithNextup: true,
    showNextupOnOverlay: false,
    clickHideButtonForAllNextup: false,
    clickNextupBeforeVideoEnds: false,
    hideReactions: true,
    showReactionsOnOverlay: false,
    hideRecommendations: true,
    showRecommendationsOnOverlay: false,
    hideRating: true,
    preventsDarkening: false,
    addOutlinesForTextsAndIcons: false,
    addShadowsToSeekBar: false,
    moveCenterButtonsToBottom: false,
    addVideoControllerToBottomLeft: false,
    hideXRay: false,
    hideTitle: false,
    hideEpisodeTitle: false,
    hideVariousButtonsInTopRight: false,
    hideSeekBar: false,
    hidePlaybackTime: false,
    hideCenterButtons: false,
    hideNextEpisodeButton: false,
    tweakHideSkipIntroButton: false,
    tweakShowVideoResolutionInfo: false,
    useOnLiveTv: false,
    shortcuts: {
      openOptionsDialog: {
        enabled: true,
        binding: {
          ctrlKey: false,
          altKey: true,
          shiftKey: false,
          metaKey: false,
          code: "KeyP",
        },
      },
      temporarilyShowHidden: {
        userDefinedBindingEnabled: false,
        binding: {
          ctrlKey: false,
          altKey: true,
          shiftKey: false,
          metaKey: false,
          code: "KeyS",
        },
      },
    },
    forceHighestResolution_xhook: false,
    forceHighestResolutionLenient_xhook: false,
    showVideoResolution_xhook: false,
    removeAdRelatedData: false,
    enableAutoplay_xhook: false,
    removeNextupTimecodes_xhook: false,
    disableRecommendations_xhook: false,
    disableReactions_xhook: false,
    forcePlayNextEpisode_xhook: false,
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
      scriptVersion: getDefaultOptions()._scriptVersion,
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

const isApplePlatform = () => {
  const key = "nextup-ext-on-apple-platform";
  const isApplePlatformStr = localStorage.getItem(key);
  if (isApplePlatformStr) {
    if (isApplePlatformStr === "true") {
      // console.log(`%c${key}`, "color:yellow; font-weight:bold;");
      return true;
    } else if (isApplePlatformStr === "false") {
      return false;
    }
  }

  const uad = navigator.userAgentData;
  if (uad?.platform) return /mac|ios/i.test(uad.platform);

  const p = navigator.platform || "";
  if (/Mac|iPhone|iPad|iPod/i.test(p)) return true;

  return /Macintosh|Mac OS X|iPhone|iPad|iPod/i.test(navigator.userAgent);
};

const sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

const addStyle = (css, id) => {
  const style = document.createElement("style");
  if (id) {
    style.id = id;
  }
  style.textContent = css;
  document.head.appendChild(style);
  return style;
};

const upsertStyle = (css, id) => {
  let style = document.getElementById(id);
  if (!style) {
    style = document.createElement("style");
    style.id = id;
    document.head.appendChild(style);
  }
  if (style.textContent !== css) {
    style.textContent = css;
  }
  return style;
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
      // This pattern is required for the OptionsSchemaManager.ensureOptionsUpToDate()
      newOptions = _newOptions;
    } else {
      // Normal pattern
      const options = await getOptions();
      newOptions = deepMergeDefaults(options, _newOptions);
    }

    if (ScriptInfo.isChromeExtension()) {
      await saveOptionsToChromeStorage(newOptions);
    } else {
      saveOptionsToLocalStorage(newOptions);
    }
    resolve();
  });
};

const deepMergeDefaults = (defaults = {}, target = {}) => {
  if (target === undefined || target === null) {
    return structuredClone(defaults);
  }

  // If either is not an object, returns target
  const isObj = (val) => val && typeof val === "object";
  if (!isObj(defaults) || !isObj(target)) {
    return target;
  }

  // If either is an array, returns target
  if (Array.isArray(defaults) || Array.isArray(target)) {
    return target;
  }

  const out = structuredClone(defaults);

  // Recursively merge keys in 'defaults'
  for (const key of Object.keys(defaults)) {
    if (key in target) {
      out[key] = deepMergeDefaults(defaults[key], target[key]);
    }
  }

  // Keeps values ​​for additional keys not in 'defaults'.
  for (const key of Object.keys(target)) {
    if (!(key in out)) {
      out[key] = target[key];
    }
  }

  return out;
};

class OptionsSchemaManager {
  // To migrate values, add items (methods).
  // migrations.length is _schemaVersion. Do not remove items from the code.
  static #migrations = [
    null,
    (stored) => {
      const out = structuredClone(stored ?? {});
      const defaultOptions = getDefaultOptions();
      out.shortcuts ??= defaultOptions.shortcuts;

      const bool1 = "shortcutKeyIsEnabled" in out;
      const bool2 = Object.hasOwn(
        out.shortcuts?.openOptionsDialog ?? {},
        "enabled"
      );
      if (!bool1 || !bool2) {
        return out;
      }

      const openOptionsDialog = out.shortcuts.openOptionsDialog;
      openOptionsDialog.enabled = out.shortcutKeyIsEnabled;

      const bool3 = "shortcutKey" in out;
      const bool4 = Object.hasOwn(openOptionsDialog, "binding");
      if (!bool3 || !bool4) {
        return out;
      }

      const bool5 = ["ctrl", "alt", "shift", "charCode"].every(
        (label) => label in out.shortcutKey
      );
      if (!bool5) {
        return out;
      }

      const binding = openOptionsDialog.binding;
      binding.ctrlKey = out.shortcutKey.ctrl;
      binding.altKey = out.shortcutKey.alt;
      binding.shiftKey = out.shortcutKey.shift;
      binding.code = out.shortcutKey.charCode;

      delete out.shortcutKey;
      delete out.shortcutKeyIsEnabled;

      return out;
    },
    (stored) => {
      const out = structuredClone(stored ?? {});
      const defaultOptions = getDefaultOptions();

      const bool1 = "clickNextupBeforeVideoEnds" in defaultOptions;
      if (!bool1) {
        return out;
      }

      const bool2 = "enableAutoplay_xhook" in out;
      const bool3 = "forcePlayNextEpisode_xhook" in out;
      if (!bool2 || !bool3) {
        return out;
      }

      const bool4 = out.enableAutoplay_xhook;
      const bool5 = out.forcePlayNextEpisode_xhook;
      if (bool4 && !bool5) {
        out.clickNextupBeforeVideoEnds = true;
      }

      return out;
    },
  ];

  static #upgradeOptionsSchema(stored, forceUpgradeSchema = false) {
    let s = structuredClone(stored ?? {});
    let v = Number.isInteger(s._schemaVersion) ? s._schemaVersion : 1;
    if (!Number.isInteger(s._schemaVersion) || forceUpgradeSchema) {
      v = 1;
      s._schemaVersion = 1;
    }
    if (v > this.#migrations.length) {
      v = 1;
      s._schemaVersion = 1;
    }

    for (let cur = v; cur < this.#migrations.length; cur++) {
      const migrate = this.#migrations[cur];
      if (typeof migrate !== "function") {
        throw new Error(`Missing migration v${cur} -> v${cur + 1}`);
      }
      s = migrate(s);
      s._schemaVersion = cur + 1;
    }

    return s;
  }

  static async #saveIfChanged(origOptions, newOptions) {
    const hasChanged =
      JSON.stringify(origOptions) !== JSON.stringify(newOptions);
    if (hasChanged) {
      console.log("orig", origOptions);
      console.log("new", newOptions);
      await saveOptions(newOptions, true);
    }
  }

  static async ensureOptionsUpToDate() {
    const options = await getOptions();
    const scriptInfo = ScriptInfo.get();
    if (options._scriptVersion !== scriptInfo.scriptVersion) {
      // When modifying the schema (structure), use this method to migrate values
      const upgraded = this.#upgradeOptionsSchema(options);
      // If value migration is not required, this method handles key addition/removal
      const merged = deepMergeDefaults(getDefaultOptions(), upgraded);

      merged._scriptVersion = scriptInfo.scriptVersion;
      await this.#saveIfChanged(options, merged);
    } else {
      // Developers can force a schema upgrade and deepMerge
      let forceUpgradeSchema = false;
      let forceDeepMerge = false;
      const key1 = "nextup-ext-force-upgrade-options-schema";
      const key1IsEnabled = localStorage.getItem(key1) === "true";
      const key2 = "nextup-ext-force-deep-merge-options";
      const key2IsEnabled = localStorage.getItem(key2) === "true";

      if (!key1IsEnabled && !key2IsEnabled) {
        return;
      }
      if (key1IsEnabled) {
        forceUpgradeSchema = true;
        console.log(`%c${key1}`, "color:yellow; font-weight:bold;");
      }
      if (key2IsEnabled) {
        forceDeepMerge = true;
        console.log(`%c${key2}`, "color:yellow; font-weight:bold;");
      }

      const upgraded = this.#upgradeOptionsSchema(options, forceUpgradeSchema);
      let merged = structuredClone(upgraded);
      if (forceDeepMerge) {
        merged = deepMergeDefaults(getDefaultOptions(), upgraded);
      }

      merged._scriptVersion = scriptInfo.scriptVersion;
      await this.#saveIfChanged(options, merged);
    }
  }
}

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

const getByObjectPath = (obj, path) => {
  const keys = path
    .replace(/\[(\d+)\]/g, ".$1")
    .split(".")
    .filter(Boolean);

  return keys.reduce(
    (acc, cur) => (acc === undefined ? undefined : acc[cur]),
    obj
  );
};

const setByObjectPath = (obj, path, value) => {
  const keys = path
    .replace(/\[(\d+)\]/g, ".$1")
    .split(".")
    .filter(Boolean);

  const clone = structuredClone(obj);
  let cur = clone;
  for (let i = 0; i < keys.length - 1; i++) {
    const k = keys[i];
    const nextIsIndex = /^\d+$/.test(keys[i + 1]);
    if (cur[k] == null || typeof cur[k] !== "object")
      cur[k] = nextIsIndex ? [] : {};
    cur = cur[k];
  }
  cur[keys[keys.length - 1]] = value;
  return clone;
};

const openIDB = (dbName) => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(dbName);

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
};

const listStoreKeys = async (dbName, storeName) => {
  const db = await openIDB(dbName);

  return new Promise((resolve, reject) => {
    const transaction = db.transaction(storeName, "readonly");
    const store = transaction.objectStore(storeName);
    const request = store.getAllKeys();

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
    transaction.onabort = () => reject(transaction.error);
  });
};

const getIDBValue = async (dbName, storeName, key) => {
  const db = await openIDB(dbName);

  return new Promise((resolve, reject) => {
    const transaction = db.transaction(storeName, "readonly");
    const store = transaction.objectStore(storeName);
    const request = store.get(key);

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
    transaction.onabort = () => reject(transaction.error);
  });
};

const getOptionDialog = () => {
  return document.querySelector(".nextup-ext-opt-dialog");
};

const getShortcutKeyInputOpenOptionsDialog = () => {
  return document.querySelector("#shortcutkey-open-options-dialog");
};

const getShortcutKeyInputTemporarilyShowHidden = () => {
  return document.querySelector("#shortcutkey-temporarily-show-hidden");
};

const getVisibleVideo = () => {
  const videos = document.querySelectorAll(".dv-player-fullscreen video");
  if (videos.length === 0) {
    return;
  }
  return Array.from(videos).find((v) => v.checkVisibility());
};

const toggleLegacyPlayAndPause = () => {
  const uiContainer = document.querySelector(
    ".dv-player-fullscreen .webPlayerSDKUiContainer"
  );
  if (uiContainer) {
    uiContainer.dispatchEvent(new KeyboardEvent("keyup", { keyCode: 32 }));
  }
};

const toggleNewUiPlayAndPause = () => {
  const player = document.querySelector(".dv-player-fullscreen");
  if (player) {
    player.dispatchEvent(new KeyboardEvent("keyup", { keyCode: 32 }));
  }
};

const playVideo = () => {
  const videos = document.querySelectorAll(".dv-player-fullscreen video");
  if (videos.length === 0) {
    return;
  }
  if (videos.length === 1) {
    const video = videos[0];
    if (video.paused) {
      video.play();
    }
  } else {
    // for LiveTV
    const video = getVisibleVideo();
    if (!video) {
      return;
    }
    try {
      if (video.paused) {
        const player = document.querySelector(".dv-player-fullscreen");
        const playerVariant = player.dataset.playerVariant;
        if (!playerVariant || playerVariant === "legacy") {
          toggleLegacyPlayAndPause();
        } else if (playerVariant === "new") {
          toggleNewUiPlayAndPause();
        }
      }
    } catch (e) {
      console.log(e);
    }
  }
};

const pauseVideo = () => {
  const videos = document.querySelectorAll(".dv-player-fullscreen video");
  if (videos.length === 0) {
    return;
  }
  if (videos.length === 1) {
    const video = videos[0];
    if (!video.paused) {
      video.pause();
    }
  } else {
    // for LiveTV
    const video = getVisibleVideo();
    if (!video) {
      return;
    }
    try {
      if (!video.paused) {
        const player = document.querySelector(".dv-player-fullscreen");
        const playerVariant = player.dataset.playerVariant;
        if (!playerVariant || playerVariant === "legacy") {
          toggleLegacyPlayAndPause();
        } else if (playerVariant === "new") {
          toggleNewUiPlayAndPause();
        }
      }
    } catch (e) {
      console.log(e);
    }
  }
};

const temporarilyDisableOverlay = (player, delay = 5000) => {
  const playerContainer = player.querySelector(
    ".atvwebplayersdk-player-container"
  );
  if (!playerContainer) {
    return;
  }
  playerContainer.style.display = "none";
  setTimeout(() => {
    playerContainer.style.display = "";
  }, delay);
};

const getPlayerUIGridRoot = (player) => {
  const gridAreas = player.querySelectorAll(
    "div[style*='grid-template-columns'] > div[style*='grid-area']"
  );
  if (gridAreas.length < 2) {
    return;
  }
  return gridAreas[0].parentNode;
};

const getSvgImageButtons = (root) => {
  return [
    ...root.querySelectorAll("button img[src^='data:image/svg+xml']"),
  ].map((img) => ({ img, button: img.closest("button") }));
};

const decodeSvgDataUrl = (dataUrl) => {
  const prefix = "data:image/svg+xml;base64,";
  if (!dataUrl.startsWith(prefix)) {
    return;
  }
  const base64 = dataUrl.slice(prefix.length);
  return atob(base64);
};

const getSvgSignature = (img) => {
  const svg = decodeSvgDataUrl(img.src);
  if (!svg) {
    return;
  }

  const viewBox = svg.match(/viewBox="([^"]+)"/)?.[1] ?? "";
  const pathCount = (svg.match(/<path\b/g) ?? []).length;
  const hasEvenOdd = /fill-rule="evenodd"/.test(svg);
  const d = svg.match(/\sd="([^"]+)"/)?.[1] ?? "";

  return {
    viewBox,
    pathCount,
    hasEvenOdd,
    d,
  };
};

const detectPlayerVariant = (player) => {
  const optionsWrapper = player.querySelector(
    ".atvwebplayersdk-options-wrapper"
  );
  const playpauseButton = player.querySelector(
    ".atvwebplayersdk-playpause-button"
  );
  if (optionsWrapper || playpauseButton) {
    return "legacy";
  }

  // New UI relies heavily on grid layout.
  // Unlike aria-label based markers, this is language-independent.
  // Unlike many overlay controls, these grid-area nodes exist even when overlay is hidden.
  const gridAreas = player.querySelectorAll(
    "div[style*='grid-template-columns'] > div[style*='grid-area']"
  );
  if (gridAreas.length >= 2) {
    return "new";
  }

  const xrayFreshStart = player.querySelector(".xrayQuickView.freshStart");
  const toastWrapper = player.querySelector(".atvwebplayersdk-toast-wrapper");
  if (xrayFreshStart && toastWrapper) {
    return "new";
  }

  return "unknown";
};

class ShortcutKeyManager {
  static #isListenerAdded = false;

  static #generateDisplayString(binding) {
    const isBinding = [
      "ctrlKey",
      "altKey",
      "shiftKey",
      "metaKey",
      "code",
    ].every((key) => key in binding);
    if (!isBinding) {
      return "";
    }

    const parts = [];
    if (isApplePlatform()) {
      if (binding.metaKey) parts.push("Command");
      if (binding.altKey) parts.push("Option");
      if (binding.shiftKey) parts.push("Shift");
    } else {
      if (binding.ctrlKey) parts.push("Ctrl");
      if (binding.altKey) parts.push("Alt");
      if (binding.shiftKey) parts.push("Shift");
    }

    const char = binding.code.replace("Key", "").replace("Digit", "");
    parts.push(char);

    return parts.join(" + ");
  }

  static async #setShortcutKeyVal(key, shortcutKeyData) {
    const { input, bindingPath } = shortcutKeyData[key];
    const options = await getOptions();
    let binding = getByObjectPath(options, bindingPath);
    const displayStr = this.#generateDisplayString(binding);
    if (displayStr) {
      input.value = this.#generateDisplayString(binding);
    } else {
      binding = getByObjectPath(getDefaultOptions(), bindingPath);
      let newOptions = setByObjectPath(options, bindingPath, binding);
      await saveOptions(newOptions);
    }
  }

  static async #changeShortcutKeyVal(key, shortcutKeyData) {
    const { input, bindingPath } = shortcutKeyData[key];
    input.addEventListener("keydown", async (e) => {
      e.preventDefault();
      if (e.repeat) {
        return;
      }

      const code = e.code;
      const isAlpha = /^Key[A-Z]$/.test(code);
      const isDigit = /^Digit[0-9]$/.test(code);
      if (!isAlpha && !isDigit) {
        return;
      }

      const ctrlKey = isApplePlatform() ? false : e.ctrlKey;
      const altKey = e.altKey;
      const shiftKey = e.shiftKey;
      const metaKey = isApplePlatform() ? e.metaKey : false;
      if (!ctrlKey && !metaKey && !altKey && !shiftKey) {
        return;
      }

      const options = await getOptions();
      const oldBinding = getByObjectPath(options, bindingPath);
      const newBinding = {
        ctrlKey,
        altKey,
        shiftKey,
        metaKey,
        code,
      };
      const oldDisplayStr = this.#generateDisplayString(oldBinding);
      const newDisplayStr = this.#generateDisplayString(newBinding);
      if (oldDisplayStr === newDisplayStr) {
        return;
      }

      for (const [_key, data] of Object.entries(shortcutKeyData)) {
        if (key === _key) continue;
        const _binding = getByObjectPath(options, data.bindingPath);
        const _displayStr = this.#generateDisplayString(_binding);
        if (newDisplayStr === _displayStr) {
          return;
        }
      }

      input.value = newDisplayStr;
      let newOptions = setByObjectPath(options, bindingPath, newBinding);
      await saveOptions(newOptions);
    });
  }

  static async init() {
    if (this.#isListenerAdded) {
      return;
    }
    const shortcutKeyData = {
      openOptionsDialog: {
        input: getShortcutKeyInputOpenOptionsDialog(),
        bindingPath: "shortcuts.openOptionsDialog.binding",
      },
      temporarilyShowHidden: {
        input: getShortcutKeyInputTemporarilyShowHidden(),
        bindingPath: "shortcuts.temporarilyShowHidden.binding",
      },
    };

    for (const key of Object.keys(shortcutKeyData)) {
      shortcutKeyData[key].input.readOnly = true;
      await this.#setShortcutKeyVal(key, shortcutKeyData);
      await this.#changeShortcutKeyVal(key, shortcutKeyData);
    }
    this.#isListenerAdded = true;
  }
}

class Dialog {
  static #clickedOutSide = null;
  static #_clickedOutSide(e) {
    if (e.target.classList.contains("nextup-ext-opt-dialog")) {
      e.target.close();
    }
  }

  static async whenOpening() {
    pauseVideo();
    const optDialog = getOptionDialog();
    optDialog.focus();
    if (!this.#clickedOutSide) {
      this.#clickedOutSide = this.#_clickedOutSide.bind(this);
    }
    document.addEventListener("click", this.#clickedOutSide);
    await ShortcutKeyManager.init();
  }

  static whenClosed() {
    document.removeEventListener("click", this.#clickedOutSide);
    playVideo();
  }
}

const createOptionMessages = () => {
  const jaMessages = {
    promptReloadPage: "オプションを変更した場合はページをリロードしてください",
    skipAds: "広告をスキップする",
    skipAds_Tooltip:
      "本編をスキップしてしまわないように1000ミリ秒分を残します。",
    hideSkipIntroBtn: "イントロスキップボタンを非表示にする",
    showSkipIntroBtnOnOverlay:
      "オーバーレイ表示が有効な時はイントロスキップボタンを表示する",
    hideNextup: "Next upを非表示にする",
    temporarilyDisableOverlay:
      "非表示ボタンの自動クリック時に5秒間オーバーレイ表示を無効にする",
    preventsDarkeningInConjunctionWithNextup:
      "Next upの出現と同時に画面が暗くなるのを防ぐ",
    showNextupOnOverlay: "オーバーレイ表示が有効な時はNext upを表示する",
    showNextupOnOverlay_Tooltip:
      "自動再生が無効、或いはNext upの非表示ボタンが自動クリックされない場合に表示されます。",
    clickHideButtonForAllNextup:
      "全てのNext upの非表示ボタンをクリックする（自動再生の完全なキャンセル）",
    clickHideButtonForAllNextup_Tooltip: `通常はこのオプションを有効にする必要はありません。\n
      Next upには「通常のNext up」と「動画終了の数秒前に表示されるNext up」の2つが存在します。
      自動再生が有効な場合はどちらにも非表示ボタンが表示されますが、後者の非表示ボタンはクリックすると自動再生が完全にキャンセルされ、動画が終了すると動画プレイヤーが閉じてしまいます。
      そのため非表示ボタンの自動クリックは通常のNext upでのみ行うようにしていますが、このオプションを使用することでその条件を無視して非表示ボタンを自動クリックさせることが可能です。
      このオプションは念の為に用意しているもので、通常は有効にする必要はありません。`,
    clickNextupBeforeVideoEnds: "動画終了直前にNext upを自動クリックする",
    clickNextupBeforeVideoEnds_Tooltip: `自動再生が有効な場合のNext upのタイマーの挙動に問題があり、自動再生が期待通りに動作しないことがあります。
      このオプションを有効にすると、動画終了の数秒前に表示されるNext upを、動画終了の1秒前に自動クリックします。
      動画を最後まで再生したい場合は、このオプションを有効にせず、「実験的: 動画終了時に自動的に閉じた場合に次のエピソードを再生する」を試してみてください。`,
    hideReactions: "Reactions（好き/好きではない）を非表示にする",
    showReactionsOnOverlay: "オーバーレイ表示が有効な時はReactionsを表示する",
    showReactionsOnOverlay_Tooltip:
      "Next upの非表示が有効の場合、非表示ボタンの自動クリックでNext upとReactionsがDOMから削除されます。",
    showReactionsOnOverlay_Tooltip2:
      "Next upの非表示が有効の場合、動画終了の数秒前に表示されるNext upを除き、「クレジットを観る」ボタンの自動クリックでNext upとReactionsがDOMから削除されます。",
    hideRecommendations: "おすすめの商品を非表示にする",
    hideRecommendations_Tooltip: `Hideボタンの自動クリック時に「非表示ボタンの自動クリック時に5秒間オーバーレイ表示を無効にする」の設定が参照されます。
      ライブ配信のカルーセルについては、この機能では非表示の対象にはしていません。`,
    showRecommendationsOnOverlay:
      "オーバーレイ表示が有効な時はおすすめの商品を表示する",
    hideRating: "レーティング情報を非表示にする",
    preventsDarkening: "オーバーレイ表示が有効な時に暗くならないようにする",
    addOutlinesForTextsAndIcons: "文字とアイコンを黒で縁取りする",
    addShadowsToSeekBar: "シークバーに影をつける",
    moveCenterButtonsToBottom:
      "中央のボタン（再生/停止、戻る、進む）を下部に移動する",
    addVideoControllerToBottomLeft:
      "中央のボタンを非表示にし、左下に同等のボタンを表示する",
    hideXRay: "実験的: X-Rayを非表示にする（提供地域のみ）",
    hideXRay_Tooltip: `X-Rayは一部の地域で提供されている機能です。
      日本のプライムビデオでは通常表示されないため、日本ではこの設定の影響はありません。
      この拡張機能は日本のプライムビデオでのみテストされているため、この機能は実験的です。`,
    hideVariousTextAndButtons: "各種テキストやボタンを非表示にする",
    hideVariousTextAndButtons_Tooltip: `表示用のキーを押しながらマウスを操作している間は、非表示にしている要素が一時的に表示状態になります。
      （デフォルト：WindowsではCtrl/Shiftキー、MacではCommand/Shiftキー）
      表示に使用するキーは変更可能です。右上の各種ボタンについては非表示にしている場合でもクリック可能です。`,
    hideTitle: "タイトルを非表示にする",
    hideEpisodeTitle: "エピソード名を非表示にする",
    hideVariousButtonsInTopRight: "右上の各種ボタンを非表示にする",
    hidePlaybackTime: "再生時間表示を非表示にする",
    hideSeekBar: "シークバーを非表示にする",
    hideCenterButtons: "中央のボタンを非表示にする",
    hideNextEpisodeButton: "次のエピソードボタンを非表示にする",
    tweakHideSkipIntroButton: "イントロスキップボタンの非表示機能を調整する",
    tweakHideSkipIntroButton_Tooltip: `「イントロスキップボタンを非表示にする」が有効になっている場合の挙動を調整します。
      表示用のキーを押しながらマウスを操作している間は、イントロスキップボタンが一時的に表示状態になります。`,
    tweakShowVideoResolutionInfo: "動画の解像度を表示する機能を調整する",
    tweakShowVideoResolutionInfo_Tooltip: `「左下に動画の解像度を表示する」が有効になっている場合の挙動を調整します。
      表示用のキーを押しながらマウスを操作している間は、解像度が一時的に表示状態になります。`,
    changeKeyThatTemporarilyShowHidden: "要素を一時的に表示するキーを変更する",
    changeKeyThatTemporarilyShowHidden_Tooltip: `表示用のキーを押しながらマウスを操作している間は、非表示にしている要素が一時的に表示状態になります。
      この設定が無効の場合は、要素の表示のためにデフォルトのキーが参照されます。
      （デフォルト：WindowsではCtrl/Shiftキー、MacではCommand/Shiftキー）
      キーを変更したい場合はこの設定を有効にしてください。\n
      [修飾キー1つ + 英数字] は必須。
      Windows：Ctrl/Shift/Alt/英数字をサポート
      Mac：Command/Shift/Option/英数字をサポート`,
    useOnLiveTv: "実験的: ライブ配信の再生でこの拡張機能を使用する",
    useOnLiveTv_Tooltip: `ライブ配信の再生でこの拡張機能を動作させたい場合に有効にしてください。
      なおこのオプションが無効でもダイアログを開くためのアイコンは表示されます。\n
      ライブ配信で動作確認が取れている機能は以下です。
      - オーバーレイ表示が有効な時に暗くならないようにする
      - 中央のボタン（再生/停止、戻る、進む）を下部に移動する
      - 各種テキストやボタンを非表示にする`,
    enableOpenOptionsDialog:
      "動画再生中にショートカットキーでオプションダイアログを開けるようにする",
    shortcutKeyForDialog: "オプションダイアログを開くショートカットキー",
    shortcutKeyForDialog_Tooltip: `[修飾キー1つ + 英数字] は必須。
      Windows：Ctrl/Shift/Alt/英数字をサポート
      Mac：Command/Shift/Option/英数字をサポート`,
    monitorNetworkActivity: "通信の監視・改変",
    monitorNetworkActivity_Tooltip: `通信の監視・改変を行うことでプライムビデオの挙動を制御します。
      広告ブロック系の拡張機能との併用は避けることを推奨します。`,
    forceHighestResolution: "強制的に最高画質で再生する",
    forceHighestResolution_Tooltip: `プライムビデオは通信状況やウィンドウサイズなどを基に画質を動的に制御します。
      この機能は、最高画質を強制するために、マニフェスト（MPD）から最高画質以外の情報を除去します。\n
      HD画質（720p/1080p）で再生できるかどうかは、OS・ブラウザ・端末によって変わります。
      ユーザーエージェント要件とWidevine要件があると思われ、両方が満たされない場合、標準画質に制限されるようです。
      WindowsとmacOSの場合、Widevine要件（VMP）を満たすブラウザでのみHD画質で再生可能だと思われます。
      （プライムビデオはChrome、Firefox、Edge、Safari、Operaを公式にサポートし、その他Brave、VivaldiでもHDで再生可能）
      Androidのブラウザを使用する場合、ユーザーエージェントをWindowsかmacOSに偽装することでHD画質で再生できる可能性があります。
      Linuxの場合、HD画質での再生に必要なWidevine要件を満たすことはできません。`,
    forceHighestResolutionLenient:
      "実験的: 最高品質ではない最高解像度での再生を許容する",
    forceHighestResolutionLenient_Tooltip: `「強制的に最高画質で再生する」機能でエラーが発生する場合に有効にすることで、問題が解決する可能性があります。\n
      「強制的に最高画質で再生する」機能では最高解像度の中の最高品質の再生を試みます。
      このオプションを有効にすると、最高品質ではないが最高解像度ではある動画の再生が許容されます。`,
    showVideoResolution: "左下に動画の解像度を表示する",
    removeAdRelatedData: "広告関連のデータを除去する",
    removeAdRelatedData_Tooltip:
      "この機能が有効な時に動画が途中で止まることがある場合は、この機能を無効にしてください。",
    enableAutoplay: "自動再生のフラグをtrueに変更する",
    enableAutoplay_Tooltip: `プライムビデオの設定を変更せずに自動再生を活用するための機能です。
      他の視聴環境の都合で自動再生をオンにしたくない場合に役立ちます。`,
    removeNextupTimecodes: "Next upのタイムコードを除去する",
    removeNextupTimecodes_Tooltip: `通常はこの機能を有効にする必要はありません。\n
      この機能は「通常のNext up」を無効化する機能です。
      「動画終了の数秒前に表示されるNext up」は無効化されません。
      「Next upを非表示にする」機能で問題が発生している場合に、この機能で対処できる可能性があります。\n
      なおこの機能を有効にすると、「おすすめの商品」の表示も無効化されます。
      「おすすめの商品」のみを無効化したい場合はこの機能を有効にせず、「おすすめの商品を無効にする」を有効にしてください。`,
    disableRecommendations: "おすすめの商品を無効にする",
    disableReactions: "Reactions（好き/好きではない）を無効にする",
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
    skipAds_Tooltip: "Leave 1000 ms for stability of operation",
    hideSkipIntroBtn: "Hide skip intro button",
    showSkipIntroBtnOnOverlay:
      "Show skip intro button when overlay display is enabled",
    hideNextup: "Hide next up card",
    temporarilyDisableOverlay:
      "Disable overlay for 5 seconds when auto-clicking hide button",
    preventsDarkeningInConjunctionWithNextup:
      "Prevents darkening in conjunction with next up appears",
    showNextupOnOverlay: "Show next up card when overlay display is enabled",
    showNextupOnOverlay_Tooltip:
      "This works if autoplay is disabled or if the next up card's hide button is not clicked automatically.",
    clickHideButtonForAllNextup:
      "Click the hide button for all next-up-cards (cancel autoplay completely)",
    clickHideButtonForAllNextup_Tooltip: `Normally it is not necessary to enable this option.\n
      There are two types of next up cards: “normal next up” and "next up displayed a few seconds before the end of the video".
      A hide button appears on both when autoplay is enabled, but clicking the latter hide button cancels autoplay completely and closes the video player when the video ends.
      Therefore, the auto-click of the hide button is only done with the normal next up card, but this option can be used to ignore that condition and have the hide button auto-click.
      This option is provided just in case and does not normally need to be enabled.`,
    clickNextupBeforeVideoEnds:
      "Automatically click next up just before the video ends",
    clickNextupBeforeVideoEnds_Tooltip: `There is a problem with the Next up card timer behavior when auto-play is enabled, so auto-play may not work as expected.
      When this option is enabled, the Next up card that appears a few seconds before the video ends will be clicked automatically 1 second before the end of the video.
      If you want to watch the video all the way to the end, leave this option disabled and try "Experimental: Play the next episode if the video is automatically closed at the end of the video" instead.`,
    hideReactions: "Hide reactions (like/not for me)",
    showReactionsOnOverlay: "Show Reactions when overlay display is enabled",
    showReactionsOnOverlay_Tooltip:
      "If hide next up card is enabled, auto-clicking the hide button will remove next up card and reactions from the DOM.",
    showReactionsOnOverlay_Tooltip2:
      "If hide next up card is enabled, auto-clicking the watch credits button will remove next up card and reactions from the DOM.",
    hideRecommendations: "Hide featured items",
    hideRecommendations_Tooltip: `The setting “Disable overlay for 5 seconds when auto-clicking hide button” is referenced when the Hide button in “Featured items” is automatically clicked.
      LiveTV carousels are not targeted for hiding in this feature.`,
    showRecommendationsOnOverlay:
      "Show featured items when overlay display is enabled",
    hideRating: "Hide rating info",
    preventsDarkening: "Prevents darkening when overlay display is enabled",
    addOutlinesForTextsAndIcons: "Add outlines for texts and icons",
    addShadowsToSeekBar: "Add shadows to the seek bar",
    moveCenterButtonsToBottom:
      "Move the center buttons(Play/Pause, Back and Forward) to the bottom",
    addVideoControllerToBottomLeft:
      "Hide the center buttons and show the equivalent buttons in the bottom left",
    hideXRay: "Experimental: Hide X-Ray (available in supported regions)",
    hideXRay_Tooltip: `X-Ray is only available in some regions.
      It is not normally displayed on Prime Video Japan, so this setting has no effect in Japan.
      This extension has only been tested on Prime Video Japan, so this feature is experimental.`,
    hideVariousTextAndButtons: "Hide various text and buttons",
    hideVariousTextAndButtons_Tooltip: `While holding down the show key and moving the mouse, hidden elements will temporarily become visible.
      (Default: Ctrl/Shift on Windows, Command/Shift on Mac)
      You can change the show key. The various buttons in the top right corner are still clickable even when hidden.`,
    hideTitle: "Hide title",
    hideEpisodeTitle: "Hide episode title",
    hideVariousButtonsInTopRight: "Hide various buttons in the top right",
    hideSeekBar: "Hide seek bar",
    hidePlaybackTime: "Hide playback time",
    hideCenterButtons: "Hide center buttons",
    hideNextEpisodeButton: "Hide next episode button",
    tweakHideSkipIntroButton: "Tweak the feature to hide skip intro button",
    tweakHideSkipIntroButton_Tooltip: `Tweaks the behavior when [Hide skip intro button] is enabled.
      While holding down the show key and moving the mouse, the skip intro button will temporarily become visible.`,
    tweakShowVideoResolutionInfo: "Tweak the feature to show video resolution",
    tweakShowVideoResolutionInfo_Tooltip: `Tweaks the behavior when [Show video resolution in bottom left] is enabled.
      While holding down the show key and moving the mouse, the video resolution will temporarily become visible.`,
    changeKeyThatTemporarilyShowHidden:
      "Change the key that temporarily show hidden elements",
    changeKeyThatTemporarilyShowHidden_Tooltip: `While holding down the show key and moving the mouse, hidden elements will temporarily become visible.
      If this setting is disabled, the default key will be referenced to show the element.
      (Default: Ctrl/Shift on Windows, Command/Shift on Mac)
      Enable this setting if you want to change the key.\n
      [One modifier key + alphanumeric] is required.
      Windows: Supports Ctrl/Shift/Alt/alphanumeric
      Mac: Supports Command/Shift/Option/alphanumeric`,
    useOnLiveTv: "Experimental: Use this extension on LiveTV",
    useOnLiveTv_Tooltip: `Enable this option if you want this extension to work with LiveTV.
      Note that even if this option is disabled, the icon to open the dialog will still be displayed.\n
      The following features have been confirmed to work with LiveTV.
      - Prevents darkening when overlay display is enabled
      - Move the center buttons(Play/Pause, Back and Forward) to the bottom
      - Hide various text and buttons`,
    enableOpenOptionsDialog:
      "Enable shortcut key to open the options dialog during video playback",
    shortcutKeyForDialog: "Shortcut key to open the options dialog",
    shortcutKeyForDialog_Tooltip: `[One modifier key + alphanumeric] is required.
      Windows: Supports Ctrl/Shift/Alt/alphanumeric
      Mac: Supports Command/Shift/Option/alphanumeric`,
    monitorNetworkActivity: "Monitor and modify network activity",
    monitorNetworkActivity_Tooltip: `Controls Prime Video behavior by monitoring and modifying network activity.
      It is not recommended to use in conjunction with ad-blocking extensions.`,
    forceHighestResolution: "Force playback at highest resolution",
    forceHighestResolution_Tooltip: `Prime Video dynamically controls video quality based on factors like network conditions and window size.
      This feature removes information other than the highest quality from the manifest (MPD) to enforce the highest possible quality.\n
      Whether HD quality (720p/1080p) playback is possible varies by OS, browser, and device.
      It appears there are user agent requirements and Widevine requirements; if both are not met, playback may be restricted to standard quality.
      For Windows and macOS, HD playback seems only possible in browsers meeting the Widevine requirements (VMP).
      (Prime Video officially supports Chrome, Firefox, Edge, Safari, and Opera; Brave and Vivaldi also support HD playback)
      When using an Android browser, spoofing the user agent to Windows or macOS may enable HD playback.
      Linux cannot meet the Widevine requirements necessary for HD playback.`,
    forceHighestResolutionLenient:
      "Experimental: Allow playback of videos that are not of the highest quality",
    forceHighestResolutionLenient_Tooltip: `Enabling this option when an error occurs while using the “Force playback at highest resolution” feature may resolve the issue. \n
      The “Force playback at highest resolution” feature attempts to play videos at the highest quality within the highest resolution available.
      When this option is enabled, playback of videos that are at the highest resolution but not at the highest quality will be allowed.`,
    showVideoResolution: "Show video resolution in bottom left",
    removeAdRelatedData: "Remove ad related data",
    removeAdRelatedData_Tooltip:
      "If videos sometimes stop in the middle when this feature is enabled, please try disabling this feature.",
    enableAutoplay: "Change autoplay flag to true",
    enableAutoplay_Tooltip: `This feature is for using autoplay without changing Prime Video settings.
      This is useful if you do not want to turn on automatic playback in consideration of other viewing devices.`,
    removeNextupTimecodes: "Remove next up timecodes",
    removeNextupTimecodes_Tooltip: `Normally there is no need to enable this feature.\n
      This feature disables “normal next up”.
      This feature does not disable the next up that appears a few seconds before the end of the video.
      If you are having problems with the “Hide next up card” feature, this may help.\n
      If this feature is enabled, the “featured items” display will also be disabled.
      If you wish to disable “featured items” only, please do not enable this feature and enable “Disable featured items”.`,
    disableRecommendations: "Disable featured items",
    disableReactions: "Disable reactions (like/not for me)",
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

const createOptionDialog = async () => {
  if (getOptionDialog()) {
    return;
  }

  const messages = createOptionMessages();
  const options = await getOptions();

  const regexForMultiineTooltips = /^[^\S\r\n]*/gm;

  const dialogHtmlStr = `
  <dialog class="nextup-ext-opt-dialog"><div class="nextup-ext-opt-dialog-inner">
      <button class="nextup-ext-opt-dialog-close-button">&times;</button>
      <div class="nextup-ext-opt-dialog-tab-wrapper">
          <div class="nextup-ext-opt-dialog-tab nextup-ext-opt-dialog-tab-active" data-target="options">Options</div>
          <div class="nextup-ext-opt-dialog-tab" data-target="about">About</div>
      </div>
      <div class="nextup-ext-opt-dialog-content nextup-ext-opt-dialog-content-active" data-tab-id="options">
          <section>
              <div class="nextup-ext-opt-dialog-notice">
                <p>プライムビデオの新UIでは現在多くの機能が正常に動作しません。必要であれば、Tampermonkey などで新旧UIを切り替えるユーザースクリプトを利用してください。</p>
                <p>Prime Video's new UI currently breaks many features. If needed, please use a user script that switches between the old and new UI with Tampermonkey or a similar userscript manager.</p>
                <a href="https://gist.github.com/ryo-fujinone/ca42fd53d6d49256b21b6317eb385f25" target="_blank">https://gist.github.com/ryo-fujinone/ca42fd53d6d49256b21b6317eb385f25</a>
              </div>

              <div class="group-title nextup-ext-opt-dialog-note">
                <p>${messages.promptReloadPage}</p>
              </div>

              <div class="nextup-ext-opt-dialog-item-container">
                <label>
                    <input type="checkbox" id="skip-ads" name="skip-ads" ${
                      options.skipAds ? "checked" : ""
                    } />
                    <p>${messages.skipAds}</p>
                </label>
                <p class="nextup-ext-opt-dialog-tooltip" title="${
                  messages.skipAds_Tooltip
                }" data-msg-id="skipAds"></p>
              </div>

              <div class="nextup-ext-opt-dialog-item-container">
                  <label>
                      <input type="checkbox" id="hide-skip-intro-btn" name="hide-skip-intro-btn" ${
                        options.hideSkipIntroBtn ? "checked" : ""
                      } />
                      <p>${messages.hideSkipIntroBtn}</p>
                  </label>
              </div>

              <div class="nextup-ext-opt-dialog-item-container">
                  <label class="indent1">
                      <input type="checkbox" id="show-skip-intro-btn" name="show-skip-intro-btn" ${
                        options.showSkipIntroBtnOnOverlay ? "checked" : ""
                      } />
                      <p>${messages.showSkipIntroBtnOnOverlay}</p>
                  </label>
              </div>

              <div class="nextup-ext-opt-dialog-item-container">
                  <label>
                      <input type="checkbox" id="hide-nextup" name="hide-nextup" ${
                        options.hideNextup ? "checked" : ""
                      } />
                      <p>${messages.hideNextup}</p>
                  </label>
              </div>

              <div class="nextup-ext-opt-dialog-item-container">
                  <label class="indent1">
                      <input type="checkbox" id="temporarily-disable-overlay" name="temporarily-disable-overlay" ${
                        options.temporarilyDisableOverlay ? "checked" : ""
                      } />
                      <p>${messages.temporarilyDisableOverlay}</p>
                  </label>
              </div>

              <div class="nextup-ext-opt-dialog-item-container">
                  <label class="indent1">
                      <input type="checkbox" id="prevents-darkening-in-conjunction-with-nextup" name="prevents-darkening-in-conjunction-with-nextup" ${
                        options.preventsDarkeningInConjunctionWithNextup
                          ? "checked"
                          : ""
                      } />
                      <p>${
                        messages.preventsDarkeningInConjunctionWithNextup
                      }</p>
                  </label>
              </div>

              <div class="nextup-ext-opt-dialog-item-container">
                  <label class="indent1">
                      <input type="checkbox" id="show-nextup" name="show-nextup" ${
                        options.showNextupOnOverlay ? "checked" : ""
                      } />
                      <p>${messages.showNextupOnOverlay}</p>
                  </label>
                  <p class="nextup-ext-opt-dialog-tooltip" title="${
                    messages.showNextupOnOverlay_Tooltip
                  }" data-msg-id="showNextupOnOverlay"></p>
              </div>

              <div class="nextup-ext-opt-dialog-item-container">
                  <label class="indent1">
                      <input type="checkbox" id="click-nextup-before-video-ends" name="click-nextup-before-video-ends" ${
                        options.clickNextupBeforeVideoEnds ? "checked" : ""
                      } />
                      <p>${messages.clickNextupBeforeVideoEnds}</p>
                  </label>
                  <p class="nextup-ext-opt-dialog-tooltip" title="${messages.clickNextupBeforeVideoEnds_Tooltip.replaceAll(
                    regexForMultiineTooltips,
                    ""
                  )}" data-msg-id="clickNextupBeforeVideoEnds"></p>
              </div>

              <div class="nextup-ext-opt-dialog-item-container">
                  <label class="indent1">
                      <input type="checkbox" id="click-hide-button-for-all-nextup" name="click-hide-button-for-all-nextup" ${
                        options.clickHideButtonForAllNextup ? "checked" : ""
                      } />
                      <p>${messages.clickHideButtonForAllNextup}</p>
                  </label>
                  <p class="nextup-ext-opt-dialog-tooltip" title="${messages.clickHideButtonForAllNextup_Tooltip.replaceAll(
                    regexForMultiineTooltips,
                    ""
                  )}" data-msg-id="clickHideButtonForAllNextup"></p>
              </div>

              <div class="nextup-ext-opt-dialog-item-container">
                  <label>
                      <input type="checkbox" id="hide-reactions" name="hide-reactions" ${
                        options.hideReactions ? "checked" : ""
                      } />
                      <p>${messages.hideReactions}</p>
                  </label>
              </div>

              <div class="nextup-ext-opt-dialog-item-container">
                  <label class="indent1">
                      <input type="checkbox" id="show-reactions" name="show-reactions" ${
                        options.showReactionsOnOverlay ? "checked" : ""
                      } />
                      <p>${messages.showReactionsOnOverlay}</p>
                  </label>
                  <p class="nextup-ext-opt-dialog-tooltip" title="${
                    messages.showReactionsOnOverlay_Tooltip
                  }" data-msg-id="showReactionsOnOverlay"></p>
                  <p class="nextup-ext-opt-dialog-tooltip" title="${
                    messages.showReactionsOnOverlay_Tooltip2
                  }" data-msg-id="showReactionsOnOverlay"></p>
              </div>

              <div class="nextup-ext-opt-dialog-item-container">
                  <label>
                      <input type="checkbox" id="hide-recommendations" name="hide-recommendations" ${
                        options.hideRecommendations ? "checked" : ""
                      } />
                      <p>${messages.hideRecommendations}</p>
                  </label>
                  <p class="nextup-ext-opt-dialog-tooltip" title="${messages.hideRecommendations_Tooltip.replaceAll(
                    regexForMultiineTooltips,
                    ""
                  )}" data-msg-id="hideRecommendations"></p>
              </div>

              <div class="nextup-ext-opt-dialog-item-container">
                  <label class="indent1">
                      <input type="checkbox" id="show-recommendations-on-overlay" name="show-recommendations-on-overlay" ${
                        options.showRecommendationsOnOverlay ? "checked" : ""
                      } />
                      <p>${messages.showRecommendationsOnOverlay}</p>
                  </label>
              </div>

              <div class="nextup-ext-opt-dialog-item-container">
                  <label>
                      <input type="checkbox" id="hide-rationg" name="hide-rationg" ${
                        options.hideRating ? "checked" : ""
                      } />
                      <p>${messages.hideRating}</p>
                  </label>
              </div>

              <div class="nextup-ext-opt-dialog-item-container">
                  <label>
                      <input type="checkbox" id="prevents-darkening" name="prevents-darkening" ${
                        options.preventsDarkening ? "checked" : ""
                      } />
                      <p>${messages.preventsDarkening}</p>
                  </label>
              </div>

              <div class="nextup-ext-opt-dialog-item-container">
                  <label class="indent1">
                      <input type="checkbox" id="add-outlines-for-texts-and-icons" name="add-outlines-for-texts-and-icons" ${
                        options.addOutlinesForTextsAndIcons ? "checked" : ""
                      } />
                      <p>${messages.addOutlinesForTextsAndIcons}</p>
                  </label>
              </div>

              <div class="nextup-ext-opt-dialog-item-container">
                  <label class="indent1">
                      <input type="checkbox" id="add-shadow-to-seek-bar" name="add-shadow-to-seek-bar" ${
                        options.addShadowsToSeekBar ? "checked" : ""
                      } />
                      <p>${messages.addShadowsToSeekBar}</p>
                  </label>
              </div>

              <div class="nextup-ext-opt-dialog-item-container">
                  <label>
                      <input type="checkbox" id="move-center-buttons-to-bottom" name="move-center-buttons-to-bottom" ${
                        options.moveCenterButtonsToBottom ? "checked" : ""
                      } />
                      <p>${messages.moveCenterButtonsToBottom}</p>
                  </label>
              </div>

              <div class="nextup-ext-opt-dialog-item-container">
                  <label class="indent1">
                      <input type="checkbox" id="add-video-controller-to-bottom-left" name="add-video-controller-to-bottom-left" ${
                        options.addVideoControllerToBottomLeft ? "checked" : ""
                      } />
                      <p>${messages.addVideoControllerToBottomLeft}</p>
                  </label>
              </div>


              <div class="nextup-ext-opt-dialog-item-container">
                  <label>
                      <input type="checkbox" id="hide-xray" name="hide-xray" ${
                        options.hideXRay ? "checked" : ""
                      } />
                      <p>${messages.hideXRay}</p>
                  </label>
                  <p class="nextup-ext-opt-dialog-tooltip" title="${messages.hideXRay_Tooltip.replaceAll(
                    regexForMultiineTooltips,
                    ""
                  )}" data-msg-id="hideXRay"></p>
              </div>
              
              <ul>
                  <li>
                      <div class="nextup-ext-opt-dialog-item-container">
                          <label>
                              <p style="margin-right: 4px;">${
                                messages.hideVariousTextAndButtons
                              }</p>
                          </label>
                          <p class="nextup-ext-opt-dialog-tooltip" title="${messages.hideVariousTextAndButtons_Tooltip.replaceAll(
                            regexForMultiineTooltips,
                            ""
                          )}" data-msg-id="hideVariousTextAndButtons"></p>
                      </div>

                      <ul>
                        <li class="list-style-none ml0">
                          <div class="nextup-ext-opt-dialog-item-container">
                              <label>
                                  <input type="checkbox" id="hide-title" name="hide-title" ${
                                    options.hideTitle ? "checked" : ""
                                  } />
                                  <p>${messages.hideTitle}</p>
                              </label>
                          </div>
                        </li>

                        <li class="list-style-none ml0">
                          <div class="nextup-ext-opt-dialog-item-container">
                              <label>
                                  <input type="checkbox" id="hide-episode-title" name="hide-episode-title" ${
                                    options.hideEpisodeTitle ? "checked" : ""
                                  } />
                                  <p>${messages.hideEpisodeTitle}</p>
                              </label>
                          </div>
                        </li>

                        <li class="list-style-none ml0">
                          <div class="nextup-ext-opt-dialog-item-container">
                              <label>
                                  <input type="checkbox" id="hide-various-buttons-in-top-right" name="hide-various-buttons-in-top-right" ${
                                    options.hideVariousButtonsInTopRight
                                      ? "checked"
                                      : ""
                                  } />
                                  <p>${
                                    messages.hideVariousButtonsInTopRight
                                  }</p>
                              </label>
                          </div>
                        </li>

                        <li class="list-style-none ml0">
                          <div class="nextup-ext-opt-dialog-item-container">
                              <label>
                                  <input type="checkbox" id="hide-seek-bar" name="hide-seek-bar" ${
                                    options.hideSeekBar ? "checked" : ""
                                  } />
                                  <p>${messages.hideSeekBar}</p>
                              </label>
                          </div>
                        </li>

                        <li class="list-style-none ml0">
                          <div class="nextup-ext-opt-dialog-item-container">
                              <label>
                                  <input type="checkbox" id="hide-playback-time" name="hide-playback-time" ${
                                    options.hidePlaybackTime ? "checked" : ""
                                  } />
                                  <p>${messages.hidePlaybackTime}</p>
                              </label>
                          </div>
                        </li>

                        <li class="list-style-none ml0">
                          <div class="nextup-ext-opt-dialog-item-container">
                              <label>
                                  <input type="checkbox" id="hide-center-buttons" name="hide-center-buttons" ${
                                    options.hideCenterButtons ? "checked" : ""
                                  } />
                                  <p>${messages.hideCenterButtons}</p>
                              </label>
                          </div>
                        </li>

                        <li class="list-style-none ml0">
                          <div class="nextup-ext-opt-dialog-item-container">
                              <label>
                                  <input type="checkbox" id="hide-next-episode-button" name="hide-next-episode-button" ${
                                    options.hideNextEpisodeButton
                                      ? "checked"
                                      : ""
                                  } />
                                  <p>${messages.hideNextEpisodeButton}</p>
                              </label>
                          </div>
                        </li>

                        <li class="list-style-none ml0">
                          <div class="nextup-ext-opt-dialog-item-container">
                              <label>
                                  <input type="checkbox" id="tweak-hide-skip-intro-button" name="tweak-hide-skip-intro-button" ${
                                    options.tweakHideSkipIntroButton
                                      ? "checked"
                                      : ""
                                  } />
                                  <p>${messages.tweakHideSkipIntroButton}</p>
                              </label>
                              <p class="nextup-ext-opt-dialog-tooltip" title="${messages.tweakHideSkipIntroButton_Tooltip.replaceAll(
                                regexForMultiineTooltips,
                                ""
                              )}" data-msg-id="tweakHideSkipIntroButton"></p>
                          </div>
                        </li>

                        <li class="list-style-none ml0">
                          <div class="nextup-ext-opt-dialog-item-container">
                              <label>
                                  <input type="checkbox" id="tweak-show-video-resolution-info" name="tweak-show-video-resolution-info" ${
                                    options.tweakShowVideoResolutionInfo
                                      ? "checked"
                                      : ""
                                  } />
                                  <p>${
                                    messages.tweakShowVideoResolutionInfo
                                  }</p>
                              </label>
                              <p class="nextup-ext-opt-dialog-tooltip" title="${messages.tweakShowVideoResolutionInfo_Tooltip.replaceAll(
                                regexForMultiineTooltips,
                                ""
                              )}" data-msg-id="tweakShowVideoResolutionInfo"></p>
                          </div>
                        </li>

                        <li class="list-style-none ml0">
                          <div class="nextup-ext-opt-dialog-item-container">
                              <label>
                                  <input type="checkbox" id="change-key-that-temporarily-show-hidden" name="change-key-that-temporarily-show-hidden" ${
                                    options.shortcuts.temporarilyShowHidden
                                      .userDefinedBindingEnabled
                                      ? "checked"
                                      : ""
                                  } />
                                  <p style="margin-right: 4px;">${
                                    messages.changeKeyThatTemporarilyShowHidden
                                  }</p>
                              </label>
                              <input type="text" id="shortcutkey-temporarily-show-hidden" name="shortcutkey-temporarily-show-hidden" />
                              <p class="nextup-ext-opt-dialog-tooltip" title="${messages.changeKeyThatTemporarilyShowHidden_Tooltip.replaceAll(
                                regexForMultiineTooltips,
                                ""
                              )}" data-msg-id="changeKeyThatTemporarilyShowHidden"></p>
                          </div>
                        </li>
                      </ul>
                  </li>
              </ul>

              <div class="nextup-ext-opt-dialog-item-container">
                  <label>
                      <input type="checkbox" id="use-on-live-tv" name="use-on-live-tv" ${
                        options.useOnLiveTv ? "checked" : ""
                      } />
                      <p>${messages.useOnLiveTv}</p>
                  </label>
                  <p class="nextup-ext-opt-dialog-tooltip" title="${messages.useOnLiveTv_Tooltip.replaceAll(
                    regexForMultiineTooltips,
                    ""
                  )}" data-msg-id="useOnLiveTv"></p>
              </div>

              <div class="nextup-ext-opt-dialog-item-container">
                  <label>
                      <input type="checkbox" id="enable-open-options-dialog" name="enable-open-options-dialog" ${
                        options.shortcuts.openOptionsDialog.enabled
                          ? "checked"
                          : ""
                      } />
                      <p>${messages.enableOpenOptionsDialog}</p>
                  </label>
              </div>

              <ul>
                  <li>
                      <div class="nextup-ext-opt-dialog-item-container">
                          <label>
                              <p style="margin-right: 4px;">${
                                messages.shortcutKeyForDialog
                              }</p>
                              <input type="text" id="shortcutkey-open-options-dialog" name="shortcutkey-open-options-dialog" />
                          </label>
                          <p class="nextup-ext-opt-dialog-tooltip" title="${messages.shortcutKeyForDialog_Tooltip.replaceAll(
                            regexForMultiineTooltips,
                            ""
                          )}" data-msg-id="shortcutKeyForDialog"></p>
                      </div>
                  </li>
              </ul>
          </section>

          <section class="nextup-ext-opt-dialog-network-activity-monitoring">
              <div class="group-title">
                  <p>${messages.monitorNetworkActivity}</p>
                  <p class="nextup-ext-opt-dialog-tooltip" title="${messages.monitorNetworkActivity_Tooltip.replaceAll(
                    regexForMultiineTooltips,
                    ""
                  )}" data-msg-id="monitorNetworkActivity"></p>
              </div>

              <div class="nextup-ext-opt-dialog-item-container">
                  <label>
                      <input type="checkbox" id="force-highest-resolution" name="force-highest-resolution" ${
                        options.forceHighestResolution_xhook ? "checked" : ""
                      } />
                      <p>${messages.forceHighestResolution}</p>
                  </label>
                  <p class="nextup-ext-opt-dialog-tooltip" title="${messages.forceHighestResolution_Tooltip.replaceAll(
                    regexForMultiineTooltips,
                    ""
                  )}" data-msg-id="forceHighestResolution"></p>
              </div>

              <div class="nextup-ext-opt-dialog-item-container">
                  <label class="indent1">
                      <input type="checkbox" id="force-highest-resolution-lenient" name="force-highest-resolution-lenient" ${
                        options.forceHighestResolutionLenient_xhook
                          ? "checked"
                          : ""
                      } />
                      <p>${messages.forceHighestResolutionLenient}</p>
                  </label>
                  <p class="nextup-ext-opt-dialog-tooltip" title="${messages.forceHighestResolutionLenient_Tooltip.replaceAll(
                    regexForMultiineTooltips,
                    ""
                  )}" data-msg-id="forceHighestResolutionLenient"></p>
              </div>

              <div class="nextup-ext-opt-dialog-item-container">
                  <label class="indent1">
                      <input type="checkbox" id="show-video-resolution" name="show-video-resolution" ${
                        options.showVideoResolution_xhook ? "checked" : ""
                      } />
                      <p>${messages.showVideoResolution}</p>
                  </label>
              </div>

              <div class="nextup-ext-opt-dialog-item-container">
                  <label>
                      <input type="checkbox" id="remove-ad-related-data" name="remove-ad-related-data" ${
                        options.removeAdRelatedData ? "checked" : ""
                      } />
                      <p>${messages.removeAdRelatedData}</p>
                  </label>
                  <p class="nextup-ext-opt-dialog-tooltip" title="${
                    messages.removeAdRelatedData_Tooltip
                  }" data-msg-id="removeAdRelatedData"></p>
              </div>

              <div class="nextup-ext-opt-dialog-item-container">
                  <label>
                      <input type="checkbox" id="enable-autoplay" name="enable-autoplay" ${
                        options.enableAutoplay_xhook ? "checked" : ""
                      } />
                      <p>${messages.enableAutoplay}</p>
                  </label>
                  <p class="nextup-ext-opt-dialog-tooltip" title="${messages.enableAutoplay_Tooltip.replaceAll(
                    regexForMultiineTooltips,
                    ""
                  )}" data-msg-id="enableAutoplay"></p>
              </div>

              <div class="nextup-ext-opt-dialog-item-container">
                  <label>
                      <input type="checkbox" id="remove-nextup-timecodes" name="remove-nextup-timecodes" ${
                        options.removeNextupTimecodes_xhook ? "checked" : ""
                      } />
                      <p>${messages.removeNextupTimecodes}</p>
                  </label>
                  <p class="nextup-ext-opt-dialog-tooltip" title="${messages.removeNextupTimecodes_Tooltip.replaceAll(
                    regexForMultiineTooltips,
                    ""
                  )}" data-msg-id="removeNextupTimecodes"></p>
              </div>

              <div class="nextup-ext-opt-dialog-item-container">
                  <label>
                      <input type="checkbox" id="disable-recommendations" name="disable-recommendations" ${
                        options.disableRecommendations_xhook ? "checked" : ""
                      } />
                      <p>${messages.disableRecommendations}</p>
                  </label>
              </div>

              <div class="nextup-ext-opt-dialog-item-container">
                  <label>
                      <input type="checkbox" id="disable-reactions" name="disable-reactions" ${
                        options.disableReactions_xhook ? "checked" : ""
                      } />
                      <p>${messages.disableReactions}</p>
                  </label>
              </div>

              <div class="nextup-ext-opt-dialog-item-container">
                  <label>
                      <input type="checkbox" id="force-play-next-episode" name="force-play-next-episode" ${
                        options.forcePlayNextEpisode_xhook ? "checked" : ""
                      } />
                      <p>${messages.forcePlayNextEpisode}</p>
                  </label>
                  <p class="nextup-ext-opt-dialog-tooltip" title="${messages.forcePlayNextEpisode_Tooltip.replaceAll(
                    regexForMultiineTooltips,
                    ""
                  )}" data-msg-id="forcePlayNextEpisode"></p>
              </div>
          </section>
      </div>

      <div class="nextup-ext-opt-dialog-content nextup-ext-opt-dialog-about" data-tab-id="about">
          <section>
              <div class="group-title">
                <p>Auto hide next up card for Amazon Prime Video</p>
              </div>
              <ul>
                  <li>
                      <a href="https://github.com/ryo-fujinone/auto-hide-next-up-card-for-amazon-prime-video" target="_blank">GitHub</a>
                  </li>
                  <li>
                      <a href="https://ryo-fujinone.net/blog/" target="_blank">Blog</a>
                  </li>
                  <li>
                      <a href="https://x.com/ryo_fujinone" target="_blank">X (@ryo_fujinone)</a>
                  </li>
              </ul>
          </section>
          <section>
              <div class="group-title">
                <p>Credits</p>
              </div>
              <ul>
                  <li>
                      <p>xhook@1.6.2 / Jaime Pillora / MIT</p>
                      <ul>
                          <li>
                              <a href="https://github.com/ryo-fujinone/xhook" target="_blank">forked by ryo-fujinone</a>
                          </li>
                      </ul>
                  </li>
              </ul>
          </section>
      </div>

      <div class="nextup-ext-opt-dialog-version"><span>v${ScriptInfo.get().scriptVersion}</span></div>
  </div></dialog>
  `;

  document.body.insertAdjacentHTML("beforeend", dialogHtmlStr);
  document.documentElement.dataset.nextupExtOptDialogCreated = true;

  const css = `
    .nextup-ext-opt-dialog {
        padding: 0px;
        border: none;
        border-radius: 1em;
        box-shadow: 0px 4px 16px rgb(0 0 0 / 0.8);
        outline: none;
        background-color: #EEE;
    }
    .nextup-ext-opt-dialog-inner {
        padding: 5px 10px 1px 10px;
    }

    .nextup-ext-opt-dialog-notice {
        width: 600px;
        margin-bottom: 10px;
    }
    .nextup-ext-opt-dialog-notice p {
        color: red;
    }

    .nextup-ext-opt-dialog-close-button {
        position: absolute;
        top: 2px;
        right: 2px;
        background: none;
        border: none;
        font-size: 24px;
        cursor: pointer;
        color: #000;
        border-radius: 50%;
        width: 40px;
        height: 40px;
        text-align: center;
    }
    .nextup-ext-opt-dialog-close-button:hover {
        background-color: rgba(0 0 0 / 0.1);
    }

    .nextup-ext-opt-dialog-tab-wrapper {
        display: flex;
        cursor: pointer;
        margin-top: 5px;
    }
    .nextup-ext-opt-dialog-tab {
        padding: 5px 15px;
        background: #f1f1f1;
        border: 1px solid #ccc;
        border-bottom: none;
        margin-right: 5px;
        border-radius: 5px 5px 0 0;
    }
    .nextup-ext-opt-dialog-tab-active {
        background: #fff;
        border-top: 2px solid #ccc;
    }

    .nextup-ext-opt-dialog-content {
        display: none;
        border: 1px solid #ccc;
        border-radius: 0 0 5px 5px;
        margin-top: -1px;
        padding: 15px;
        height: 450px;
        overflow-y: auto;
        overflow-x: hidden;
        word-break: break-all;
        background-color: white;
    }
    .nextup-ext-opt-dialog-content-active {
        display: block;
        border-top: 1px solid #ccc;
    }

    .nextup-ext-opt-dialog .group-title {
        text-align: center;
        margin-bottom: 7px;
        font-weight: 700;
    }
    .nextup-ext-opt-dialog-note {
      color: green;
    }

    .nextup-ext-opt-dialog-item-container {
      display: flex;
    }
    .nextup-ext-opt-dialog label:has(input[type='checkbox']){
        display: flex;
    }
    .nextup-ext-opt-dialog label.indent1 {
        margin-left: 17.2px;
    }
    .nextup-ext-opt-dialog label p {
        margin-bottom: 5px;
        font-weight: 400;
    }
    .nextup-ext-opt-dialog ul li {
        margin-left: 18px;
    }
    .nextup-ext-opt-dialog ul li.ml0 {
        margin-left: 0;
    }
    .nextup-ext-opt-dialog ul li.list-style-none {
        list-style: none;
    }
    .nextup-ext-opt-dialog ul li label:has(#shortcutkey-open-options-dialog){
        display: flex;
    }
    .nextup-ext-opt-dialog .nextup-ext-opt-dialog-item-container input[type='text'] {
        height: 20px;
    }
    .nextup-ext-opt-dialog-network-activity-monitoring {
        border-top: 1px dotted;
        margin-top: 10px;
        padding-top: 10px;
    }
    .nextup-ext-opt-dialog-network-activity-monitoring > .group-title {
        display: flex;
        justify-content: center;
        color: darkslateblue;
    }

    .nextup-ext-opt-dialog-tooltip {
        color: darkviolet;
        text-decoration: underline;
        cursor: help;
        margin-left: 6px;
    }
    .nextup-ext-opt-dialog-tooltip:before {
        content: "\\0028";
    }
    .nextup-ext-opt-dialog-tooltip:after {
        content: "\\0029";
    }

    .nextup-ext-opt-dialog-about .group-title {
        text-align: unset;
    }
    .nextup-ext-opt-dialog-about section {
        margin-bottom: 15px;
    }

    .nextup-ext-opt-dialog-version {
        text-align: right;
        font-size: 12px;
        color: #222;
        padding-top: 1px;
    }
  `;

  addStyle(css);

  setTimeout(() => {
    const optionsWrapper = document.querySelector(
      ".atvwebplayersdk-options-wrapper"
    );
    const playpauseButton = document.querySelector(
      ".atvwebplayersdk-playpause-button"
    );
    if (optionsWrapper || playpauseButton) {
      const notice = document.querySelector(".nextup-ext-opt-dialog-notice");
      if (notice) notice.style.display = "none";
    }
  }, 3000);

  const tooltipElements = document.querySelectorAll(
    ".nextup-ext-opt-dialog-tooltip"
  );
  for (const elem of tooltipElements) {
    elem.textContent = " ? ";
    // If clicked, an alert with the same text as the tooltip is displayed.
    elem.addEventListener("click", (e) => {
      const title = e.target.getAttribute("title");
      if (title) {
        let alertText = title;

        const msgId = e.target.dataset.msgId;
        if (msgId) {
          const msg = messages[msgId];
          if (msg) {
            alertText = `[${msg}]\n\n${alertText}`;
          }
        }

        alert(alertText);
      }
    });
  }

  const optDialog = getOptionDialog();

  //  Adjust width of options dialog.
  optDialog.style.setProperty("visibility", "hidden", "important");
  optDialog.toggleAttribute("open");
  let maxWidth = 600;
  if (optDialog.offsetWidth > maxWidth) {
    maxWidth = optDialog.offsetWidth + 30;
  }
  optDialog.style.maxWidth = maxWidth + "px";
  optDialog.style.width = "100%";
  optDialog.toggleAttribute("open");
  optDialog.style.setProperty("visibility", "");

  // Code to run when the dialog is opened and closed
  new MutationObserver(async (_) => {
    if (optDialog.hasAttribute("open")) {
      await Dialog.whenOpening();
    } else {
      Dialog.whenClosed();
    }
  }).observe(optDialog, { attributes: true, attributeFilter: ["open"] });

  // Close the dialog when the close button is pressed
  const closeBtn = optDialog.querySelector(
    ".nextup-ext-opt-dialog-close-button"
  );
  closeBtn.addEventListener("click", () => {
    optDialog.close();
  });

  // Code for switching tabs
  const tabs = optDialog.querySelectorAll(".nextup-ext-opt-dialog-tab");
  const contents = optDialog.querySelectorAll(".nextup-ext-opt-dialog-content");
  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      tabs.forEach((t) =>
        t.classList.remove("nextup-ext-opt-dialog-tab-active")
      );
      contents.forEach((c) =>
        c.classList.remove("nextup-ext-opt-dialog-content-active")
      );

      tab.classList.add("nextup-ext-opt-dialog-tab-active");
      const targetId = tab.dataset.target;
      const targetContent = optDialog.querySelector(
        `.nextup-ext-opt-dialog-content[data-tab-id=${targetId}]`
      );
      targetContent.classList.add("nextup-ext-opt-dialog-content-active");
    });
  });

  // Save when options are changed
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
        case "click-hide-button-for-all-nextup":
          await saveOptions({ clickHideButtonForAllNextup: e.target.checked });
          break;
        case "click-nextup-before-video-ends":
          await saveOptions({ clickNextupBeforeVideoEnds: e.target.checked });
          break;
        case "hide-reactions":
          await saveOptions({ hideReactions: e.target.checked });
          break;
        case "show-reactions":
          await saveOptions({ showReactionsOnOverlay: e.target.checked });
          break;
        case "hide-recommendations":
          await saveOptions({ hideRecommendations: e.target.checked });
          break;
        case "show-recommendations-on-overlay":
          await saveOptions({ showRecommendationsOnOverlay: e.target.checked });
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
        case "add-shadow-to-seek-bar":
          await saveOptions({ addShadowsToSeekBar: e.target.checked });
          break;
        case "move-center-buttons-to-bottom":
          await saveOptions({ moveCenterButtonsToBottom: e.target.checked });
          break;
        case "add-video-controller-to-bottom-left":
          await saveOptions({
            addVideoControllerToBottomLeft: e.target.checked,
          });
          break;
        case "hide-xray":
          await saveOptions({ hideXRay: e.target.checked });
          break;
        case "hide-title":
          await saveOptions({ hideTitle: e.target.checked });
          break;
        case "hide-episode-title":
          await saveOptions({ hideEpisodeTitle: e.target.checked });
          break;
        case "hide-various-buttons-in-top-right":
          await saveOptions({ hideVariousButtonsInTopRight: e.target.checked });
          break;
        case "hide-seek-bar":
          await saveOptions({ hideSeekBar: e.target.checked });
          break;
        case "hide-playback-time":
          await saveOptions({ hidePlaybackTime: e.target.checked });
          break;
        case "hide-center-buttons":
          await saveOptions({ hideCenterButtons: e.target.checked });
          break;
        case "hide-next-episode-button":
          await saveOptions({ hideNextEpisodeButton: e.target.checked });
          break;
        case "tweak-hide-skip-intro-button":
          await saveOptions({ tweakHideSkipIntroButton: e.target.checked });
          break;
        case "tweak-show-video-resolution-info":
          await saveOptions({ tweakShowVideoResolutionInfo: e.target.checked });
          break;
        case "change-key-that-temporarily-show-hidden":
          await saveOptions({
            shortcuts: {
              temporarilyShowHidden: {
                userDefinedBindingEnabled: e.target.checked,
              },
            },
          });
          break;
        case "use-on-live-tv":
          await saveOptions({ useOnLiveTv: e.target.checked });
          break;
        case "enable-open-options-dialog":
          await saveOptions({
            shortcuts: {
              openOptionsDialog: {
                enabled: e.target.checked,
              },
            },
          });
          break;
        case "force-highest-resolution":
          await saveOptions({ forceHighestResolution_xhook: e.target.checked });
          break;
        case "force-highest-resolution-lenient":
          await saveOptions({
            forceHighestResolutionLenient_xhook: e.target.checked,
          });
          break;
        case "show-video-resolution":
          await saveOptions({ showVideoResolution_xhook: e.target.checked });
          break;
        case "remove-ad-related-data":
          await saveOptions({ removeAdRelatedData: e.target.checked });
          break;
        case "enable-autoplay":
          await saveOptions({ enableAutoplay_xhook: e.target.checked });
          break;
        case "remove-nextup-timecodes":
          await saveOptions({ removeNextupTimecodes_xhook: e.target.checked });
          break;
        case "disable-recommendations":
          await saveOptions({ disableRecommendations_xhook: e.target.checked });
          break;
        case "disable-reactions":
          await saveOptions({ disableReactions_xhook: e.target.checked });
          break;
        case "force-play-next-episode":
          await saveOptions({ forcePlayNextEpisode_xhook: e.target.checked });
          break;
        default:
          break;
      }
    },
    true
  );
};

const adjustOptionDialogByPlayerVariant = (playerVariant) => {
  const optDialog = getOptionDialog();
  if (!optDialog) {
    return;
  }

  const getItemFromItemContainer = (id = "") => {
    return optDialog.querySelector(
      `.nextup-ext-opt-dialog-item-container:has(#${id})`
    );
  };

  const hide = (element) => {
    if (element) {
      element.style.setProperty("display", "none", "important");
    }
  };

  if (playerVariant === "new") {
    const preventsDarkeningNextup = getItemFromItemContainer(
      "prevents-darkening-in-conjunction-with-nextup"
    );
    hide(preventsDarkeningNextup);

    const showNextup = getItemFromItemContainer("show-nextup");
    hide(showNextup);

    const clickHideButtonForAllNextup = getItemFromItemContainer(
      "click-hide-button-for-all-nextup"
    );
    hide(clickHideButtonForAllNextup);

    const temporarilyDisableOverlay = getItemFromItemContainer(
      "temporarily-disable-overlay"
    );
    hide(temporarilyDisableOverlay);

    const hideRecommendations_Tooltip = optDialog.querySelector(
      "p[data-msg-id='hideRecommendations']"
    );
    hide(hideRecommendations_Tooltip);

    const showReactionsOnOverlay_Tooltips = optDialog.querySelectorAll(
      "p[data-msg-id='showReactionsOnOverlay']"
    );
    hide(showReactionsOnOverlay_Tooltips[0]);

    const moveCenterButtonsToBottom = getItemFromItemContainer(
      "move-center-buttons-to-bottom"
    );
    hide(moveCenterButtonsToBottom);

    const addVideoControllerToBottomLeft = getItemFromItemContainer(
      "add-video-controller-to-bottom-left"
    );
    hide(addVideoControllerToBottomLeft);
  } else if (playerVariant === "legacy") {
    const clickNextupBeforeVideoEnds = getItemFromItemContainer(
      "click-nextup-before-video-ends"
    );
    hide(clickNextupBeforeVideoEnds);

    const showReactionsOnOverlay_Tooltips = optDialog.querySelectorAll(
      "p[data-msg-id='showReactionsOnOverlay']"
    );
    hide(showReactionsOnOverlay_Tooltips[1]);
  }
};

const addEventListenerForOpenOptionsDialog = (
  options = getDefaultOptions()
) => {
  if (!options.shortcuts.openOptionsDialog.enabled) {
    return;
  }

  document.body.addEventListener("keydown", async (e) => {
    const video = getVisibleVideo();
    if (!video || !video.checkVisibility()) {
      return;
    }

    const shortcutKeyInput = getShortcutKeyInputOpenOptionsDialog();
    if (shortcutKeyInput === document.activeElement) {
      return;
    }
    if (e.repeat) {
      return;
    }

    const options = await getOptions();
    const binding = options.shortcuts.openOptionsDialog.binding;
    if (
      e.code === binding.code &&
      e.ctrlKey === binding.ctrlKey &&
      e.altKey === binding.altKey &&
      e.shiftKey === binding.shiftKey &&
      e.metaKey === binding.metaKey
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
        "#pv-nav-container [data-testid='pv-nav-account-and-profiles-dropdown-container']"
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
        detectNavbarRemove.observe(document, OBSERVER_CONFIG);
        setTimeout(() => {
          detectNavbarRemove.disconnect();
        }, 10000);
      }

      const liElement = accountDropdownContainer.parentNode;
      const cloneLi = liElement.cloneNode();
      cloneLi.setAttribute("id", "pv-nav-option-btn-container");
      liElement.after(cloneLi);

      const cloneLiStyle = cloneLi.getAttribute("style");
      const cloneLiStyleRegex = /--nav-list-child-index:\s?(\d+);?/;
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

      const optBtnImgElement = document.createElement("img");
      optBtnImgElement.setAttribute("src", OPTION_BTN_IMG_DATA_URL);
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

      if (!document.querySelector("#ext-optionBtnOnNavbar")) {
        const css = `
        body:has(.nextup-ext-opt-dialog[open]):not(:has(.dv-player-fullscreen)) {
          overflow: hidden !important;
        }
      `;
        addStyle(css, "ext-optionBtnOnNavbar");
      }

      // Create buttons for mobile
      let optBtnElement2;
      try {
        const accountDropdownContainer2 = document.querySelector(
          "[data-testid='mobile-nav-wrapper'] [data-testid='pv-nav-account-and-profiles-dropdown-container']"
        );
        const liElement2 = accountDropdownContainer2.parentNode;
        const cloneLi2 = cloneLi.cloneNode(true);
        cloneLi2.setAttribute("id", "pv-nav-option-btn-container");
        liElement2.after(cloneLi2);
        optBtnElement2 = cloneLi2.querySelector("button");
      } catch (e) {
        console.log(e);
      }

      // Add event listeners to both buttons
      [optBtnElement, optBtnElement2].forEach((optBtn) => {
        if (!optBtn) {
          return;
        }
        optBtn.addEventListener("click", (_) => {
          const optDialog = getOptionDialog();
          optDialog.showModal();
        });
      });
    }

    main() {
      this._create();
      if (!document.querySelector("#pv-nav-option-btn-container")) {
        new MutationObserver(this.create).observe(document, {
          ...OBSERVER_CONFIG,
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
  // Greasemonkey must use GM.registerMenuCommand, not GM_registerMenuCommand.
  // Tampermonkey and Violentmonkey can use both functions.
  const registerMenuCommand = GM.registerMenuCommand;
  registerMenuCommand(name, () => {
    const optDialog = getOptionDialog();
    if (optDialog && !optDialog.hasAttribute("open")) {
      optDialog.showModal();
    }
  });
};

// The runXhook function is executed as an inline script.
const runXhook = () => {
  const xhookUrl = document.documentElement.dataset.xhookUrl;
  const options = JSON.parse(document.documentElement.dataset.options);
  delete document.documentElement.dataset.xhookUrl;
  delete document.documentElement.dataset.options;

  const isMpd = (request, response) => {
    if (!request.url.match(/\.mpd/)) {
      return false;
    }
    if (response.status !== 200) {
      return;
    }
    if (response.headers?.["content-type"] !== "text/xml") {
      try {
        const text = response.text;
        const regex = new RegExp("^<MPD.+</MPD>$");
        if (!regex.test(text)) {
          return false;
        }
      } catch (e) {
        return false;
      }
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

  const hasReactionsResource = (request, response) => {
    if (!request.url.includes("playerChromeResources")) {
      return false;
    }
    if (!request.url.includes("reaction")) {
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

  const parseISODuration = (duration) => {
    const hoursMatch = duration.match(/(\d+(\.\d+)?)H/);
    const minutesMatch = duration.match(/(\d+(\.\d+)?)M/);
    const secondsMatch = duration.match(/(\d+(\.\d+)?)S/);

    const hours = parseFloat(hoursMatch ? hoursMatch[1] : 0);
    const minutes = parseFloat(minutesMatch ? minutesMatch[1] : 0);
    const seconds = parseFloat(secondsMatch ? secondsMatch[1] : 0);

    return hours * 3600 + minutes * 60 + seconds;
  };

  const formatISODuration = (totalSeconds) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    const parts = [];
    if (hours > 0) parts.push(`${hours}H`);
    if (minutes > 0) parts.push(`${minutes}M`);

    if (seconds > 0 || parts.length === 0) {
      parts.push(`${seconds.toFixed(3)}S`);
    }

    return `PT${parts.join("")}`;
  };

  const sumDurations = (durations) => {
    const totalSeconds = durations.reduce((acc, duration) => {
      return acc + parseISODuration(duration);
    }, 0);

    return formatISODuration(totalSeconds);
  };

  const addStyle = (css, id) => {
    const style = document.createElement("style");
    if (id) {
      style.setAttribute("id", id);
    }
    style.textContent = css;
    document.head.appendChild(style);
  };

  class XhookAfter {
    static #queue = [];

    static #mpdId;
    static #mp4Url;
    static #metadataResourceArray = [];
    static #nextUpV2ResourceArray = [];
    static #getVodPlaybackResourcesArray = [];
    static #resolutionInfoArray = [];

    static get mpdId() {
      return this.#mpdId;
    }

    static get mp4Url() {
      return this.#mp4Url;
    }

    static get metadataResourceArray() {
      return this.#metadataResourceArray;
    }

    static get nextUpV2ResourceArray() {
      return this.#nextUpV2ResourceArray;
    }

    static get getVodPlaybackResourcesArray() {
      return this.#getVodPlaybackResourcesArray;
    }

    static get resolutionInfoArray() {
      return this.#resolutionInfoArray;
    }

    static #pushMetadataResourceArray(obj = {}) {
      const entityId = obj.entityId;
      if (!entityId) {
        return;
      }
      if (this.#metadataResourceArray.find((m) => m.entityId === entityId)) {
        return;
      }
      this.#metadataResourceArray.push(obj);
      if (this.#metadataResourceArray > 20) {
        this.#metadataResourceArray.shift();
      }
    }

    static #pushNextUpV2ResourceArray(obj = {}) {
      const entityId = obj.entityId;
      if (!entityId) {
        return;
      }
      if (this.#nextUpV2ResourceArray.find((n) => n.entityId === entityId)) {
        return;
      }
      this.#nextUpV2ResourceArray.push(obj);
      if (this.#nextUpV2ResourceArray > 20) {
        this.#nextUpV2ResourceArray.shift();
      }
    }

    static #pushGetVodPlaybackResourcesArray(obj = {}) {
      const titleId = obj.titleId;
      if (!titleId) {
        return;
      }
      if (
        this.#getVodPlaybackResourcesArray.find((g) => g.titleId === titleId)
      ) {
        return;
      }
      this.#getVodPlaybackResourcesArray.push(obj);
      if (this.#getVodPlaybackResourcesArray > 20) {
        this.#getVodPlaybackResourcesArray.shift();
      }
    }

    static #pushResolutionInfoArray(obj = {}) {
      const baseURL = obj.baseURL;
      if (!baseURL) {
        return;
      }
      if (this.#resolutionInfoArray.find((r) => r.baseURL === baseURL)) {
        return;
      }
      this.#resolutionInfoArray.push(obj);
      if (this.#resolutionInfoArray > 40) {
        this.#resolutionInfoArray.shift();
      }
    }

    static forceHighestResolution(request, response) {
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
    }

    static forceHighestResolutionLenient(request, response) {
      // This method attempts to preserve more Representations than forceHighestResolution().
      // - When multiple codecs are mixed, retain a Representation for each codec.
      // - Playback of videos that are at the highest resolution but not at the highest quality will be allowed.
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
          const VideoAdaptationSets = p.querySelectorAll(
            "AdaptationSet[contentType='video']"
          );
          if (VideoAdaptationSets.length === 0) {
            return;
          }

          for (const AdaptationSet of VideoAdaptationSets) {
            // *The following is code for functional testing.*
            // const test = AdaptationSet.querySelector("[id='video=501000']");
            // const clone1 = test.cloneNode(true);
            // clone1.setAttribute("id", "video=501001");
            // clone1.setAttribute("codecs", "test");
            // const clone2 = test.cloneNode(true);
            // clone2.setAttribute("id", "video=5010090");
            // clone2.setAttribute("codecs", "test");
            // clone2.setAttribute("height", "999");
            // AdaptationSet.append(clone1);
            // AdaptationSet.append(clone2);

            const representations = AdaptationSet.querySelectorAll(
              "Representation[codecs][width][height]:has(BaseURL)"
            );
            if (representations.length === 0) {
              continue;
            }

            const codecSet = Array.from(representations).reduce((acc, cur) => {
              const codec = cur.getAttribute("codecs");
              try {
                if (codec) {
                  const mached = codec.match(/^[^\.]+/);
                  if (mached) {
                    acc.add(mached[0]);
                  } else {
                    acc.add(codec);
                  }
                }
              } catch (e) {
                console.log(e);
              }
              return acc;
            }, new Set());
            if (codecSet.size === 0) {
              return;
            }

            for (const codec of codecSet) {
              const targetReps = Array.from(representations).filter((rep) => {
                const targetCodec = rep.getAttribute("codecs");
                return targetCodec?.includes(codec);
              });
              if (targetReps.length === 0) {
                return;
              }
              const highestResolution = targetReps.reduce(
                (acc, cur) => {
                  try {
                    const width = parseInt(cur.getAttribute("width"));
                    const height = parseInt(cur.getAttribute("height"));
                    if (width * height > acc.width * acc.height) {
                      acc.width = width;
                      acc.height = height;
                    }
                  } catch (e) {
                    console.log(e);
                  }
                  return acc;
                },
                {
                  width: 0,
                  height: 0,
                }
              );
              if (highestResolution.width === 0) {
                return;
              }

              for (const rep of targetReps) {
                const width = parseInt(rep.getAttribute("width"));
                const height = parseInt(rep.getAttribute("height"));
                if (
                  !(
                    width === highestResolution.width &&
                    height === highestResolution.height
                  )
                ) {
                  rep.setAttribute("sholudRemove", "true");
                }
              }
            }

            for (const rep of representations) {
              if (rep.hasAttribute("sholudRemove")) {
                rep.remove();
              }
            }
          }
        }

        const newMpd = dom.documentElement.outerHTML;
        response.text = newMpd;
      } catch (e) {
        console.log(e);
      }
    }

    static showVideoResolution(request, response) {
      const url = request.url;
      if (isMpd(request, response)) {
        try {
          const mpd = response.text;
          const parser = new DOMParser();
          const dom = parser.parseFromString(mpd, "text/xml");
          const periods = dom.querySelectorAll("Period:has(ContentProtection)");
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
            for (const rep of representations) {
              const width = rep.getAttribute("width");
              const height = rep.getAttribute("height");
              const baseURL = rep.querySelector("BaseURL");
              if (width && height && baseURL) {
                this.#pushResolutionInfoArray({
                  width,
                  height,
                  baseURL: baseURL.textContent,
                });
              }
            }
          }
        } catch (e) {
          console.log(e);
        }
      } else if (url.includes(".mp4")) {
        const pathname = new window.URL(url).pathname;
        const found = pathname.match(/([0-9a-zA-Z-]+)_video_\d+\.mp4$/);
        if (!found) {
          return;
        }
        this.#mpdId = found[1];
        this.#mp4Url = url;
      } else if (hasCatalogMetadataV2Resource(request, response)) {
        const entityId = new window.URL(url).searchParams.get("entityId");
        if (!entityId) {
          return;
        }

        const data = JSON.parse(response.text);
        this.#pushMetadataResourceArray({
          entityId,
          data,
        });
      } else if (isGetVodPlaybackResources(request, response)) {
        const titleId = new window.URL(url).searchParams.get("titleId");
        if (!titleId) {
          return;
        }

        const data = JSON.parse(response.text);
        this.#pushGetVodPlaybackResourcesArray({
          titleId,
          data,
        });
      }
    }

    static removeAdRelatedDataInMpd(request, response) {
      // Legacy
      // Currently, ads can be removed using removeAdRelatedDataInVodPlaybackResources() and removeAdPlaylist().
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

        let removed = false;
        for (const p of periods) {
          const ad1 = p.querySelector("SupplementalProperty[value='Ad']");
          const ad2 = p.querySelector("SupplementalProperty[value='FadeAd']");
          if (!ad1 && !ad2) {
            continue;
          }
          p.remove();
          removed = true;
          console.log("Removed ads (data in mpd)");
        }
        if (!removed) {
          return;
        }

        const newPeriods = dom.querySelectorAll("Period");
        let sumDuration;
        for (const [i, p] of newPeriods.entries()) {
          const duration = p.getAttribute("duration");
          if (i === 0) {
            sumDuration = duration;
            p.removeAttribute("start");
            continue;
          } else {
            p.setAttribute("start", sumDuration);
            sumDuration = sumDurations([sumDuration, duration]);
          }
        }

        const newMpd = dom.documentElement.outerHTML;
        response.text = newMpd;
      } catch (e) {
        console.log(e);
      }
    }

    static removeAdRelatedDataInVodPlaybackResources(request, response) {
      if (!isGetVodPlaybackResources(request, response)) {
        return;
      }

      try {
        const data = JSON.parse(response.text);
        let removed = false;

        // Legacy
        if (delete data.vodPlaybackUrls?.result?.playbackUrls?.cuepoints) {
          removed = true;
        }

        // Latest
        // Based on uBlock Origin's filters (pauseBehavior, pauseAdsResolution, shouldShowOnScrubBar)
        const playbackUrls =
          data.vodPlaylistedPlaybackUrls?.result?.playbackUrls;
        delete playbackUrls?.pauseBehavior;
        delete playbackUrls?.pauseAdsResolution;
        const intraTitlePlaylist = playbackUrls?.intraTitlePlaylist;
        if (intraTitlePlaylist && Array.isArray(intraTitlePlaylist)) {
          for (const obj of intraTitlePlaylist) {
            if (obj.shouldShowOnScrubBar) {
              delete obj.shouldShowOnScrubBar;
            }
          }
          // Hide ad locations on the seek bar
          // It seems uBlock Origin can remove ad locations on the seek bar using the three filters mentioned above.
          // https://www.reddit.com/r/uBlockOrigin/comments/1n7ujvm/comment/ncdqugr/?force-legacy-sct=1
          // For some technical reason, this script appears to require the following code.
          const newIntraTitlePlaylist = [];
          for (const obj of intraTitlePlaylist) {
            if (obj.type === "Main") {
              newIntraTitlePlaylist.push(obj);
            } else {
              removed = true;
            }
          }
          playbackUrls.intraTitlePlaylist = newIntraTitlePlaylist;
        }

        if (intraTitlePlaylist) {
          if (!document.querySelector("#ext-hideAdResumeMessage")) {
            const css = `
              .atvwebplayersdk-ad-resume-message {
                display: none !important;
              }
            `;
            addStyle(css, "ext-hideAdResumeMessage");
          }
        }

        if (removed) {
          console.log("Removed ads (data in VodPlaybackResources)");
        }
        response.text = JSON.stringify(data);
      } catch (e) {
        console.log(e);
      }
    }

    static removeAdPlaylist(request, response) {
      // This method serves as a fallback in case removeAdRelatedDataInVodPlaybackResources() fails.
      if (!request.url.includes("getVideoAds")) {
        return;
      }
      response.text = JSON.stringify({});
      console.log("Removed ads (AdPlaylist)");
    }

    static enableAutoplay(request, response) {
      const _isGetSections = isGetSections(request, response);
      const _hasNextUpV2Resource = hasNextUpV2Resource(request, response);
      if (!_isGetSections && !_hasNextUpV2Resource) {
        return;
      }

      if (_hasNextUpV2Resource) {
        try {
          /**
           * If isMultiTitleExperience is true, this function does not enable autoplay.
           * (If isMultiTitleExperience is true, nextUpV2.carousel will be used instead of nextUpV2.card.)
           */
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
      } else if (_isGetSections) {
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
      }
    }

    static removeNextupTimecodes(request, response) {
      if (!isGetVodPlaybackResources(request, response)) {
        return;
      }

      try {
        const data = JSON.parse(response.text);
        const transitionTimecodes = data.transitionTimecodes?.result?.events;
        if (!transitionTimecodes) {
          return;
        }

        const filteredTimeCodes = transitionTimecodes.filter((t) => {
          const isNextup = ["END_CREDITS", "NEXT_UP"].includes(t.eventType);
          return !isNextup;
        });
        if (transitionTimecodes.length === filteredTimeCodes.length) {
          return;
        }

        data.transitionTimecodes.result.events = filteredTimeCodes;
        response.text = JSON.stringify(data);
      } catch (e) {
        console.log(e);
      }
    }

    static disableRecommendations(request, response) {
      if (!hasNextUpV2Resource(request, response)) {
        return;
      }

      try {
        const data = JSON.parse(response.text);
        const nextUpV2 = data?.resources?.nextUpV2;
        if (!nextUpV2) {
          return;
        }
        if (!Object.hasOwn(nextUpV2, "isMultiTitleExperience")) {
          return;
        }
        nextUpV2.isMultiTitleExperience = false;
        response.text = JSON.stringify(data);
      } catch (e) {
        console.log(e);
      }
    }

    static disableReactions(request, response) {
      if (!hasReactionsResource(request, response)) {
        return;
      }

      try {
        const data = JSON.parse(response.text);
        const reaction = data?.resources?.reaction;
        if (!reaction) {
          return;
        }
        if (!Object.hasOwn(reaction, "shouldShowReactions")) {
          return;
        }
        reaction.shouldShowReactions = false;
        response.text = JSON.stringify(data);
      } catch (e) {
        console.log(e);
      }
    }

    static forcePlayNextEpisode(request, response) {
      const url = request.url;
      if (url.includes(".mp4")) {
        const pathname = new window.URL(url).pathname;
        const found = pathname.match(/([0-9a-zA-Z-]+)_(video|audio)_\d+\.mp4$/);
        if (!found) {
          return;
        }
        this.#mpdId = found[1];
      } else if (hasCatalogMetadataV2Resource(request, response)) {
        const entityId = new window.URL(url).searchParams.get("entityId");
        if (!entityId) {
          return;
        }

        const data = JSON.parse(response.text);
        this.#pushMetadataResourceArray({
          entityId,
          data,
        });
      } else if (hasNextUpV2Resource(request, response)) {
        const entityId = new window.URL(url).searchParams.get("entityId");
        if (!entityId) {
          return;
        }

        const data = JSON.parse(response.text);
        this.#pushNextUpV2ResourceArray({
          entityId,
          data,
        });
      } else if (isGetVodPlaybackResources(request, response)) {
        const titleId = new window.URL(url).searchParams.get("titleId");
        if (!titleId) {
          return;
        }

        const data = JSON.parse(response.text);
        this.#pushGetVodPlaybackResourcesArray({
          titleId,
          data,
        });
      } else {
      }
    }

    static run(request, response) {
      for (const q of this.#queue) {
        try {
          q.call(this, request, response);
        } catch (e) {
          console.log(e);
        }
      }
    }

    static init(options) {
      if (this.#queue.length) {
        return;
      }

      if (options.forceHighestResolution_xhook) {
        if (!options.forceHighestResolutionLenient_xhook) {
          this.#queue.push(this.forceHighestResolution);
        } else {
          this.#queue.push(this.forceHighestResolutionLenient);
        }
        if (options.showVideoResolution_xhook) {
          this.#queue.push(this.showVideoResolution);
        }
      }
      if (options.removeAdRelatedData) {
        this.#queue.push(this.removeAdRelatedDataInMpd);
        this.#queue.push(this.removeAdRelatedDataInVodPlaybackResources);
        this.#queue.push(this.removeAdPlaylist);
      }
      if (options.enableAutoplay_xhook) {
        this.#queue.push(this.enableAutoplay);
      }
      if (options.removeNextupTimecodes_xhook) {
        this.#queue.push(this.removeNextupTimecodes);
      }
      if (options.disableRecommendations_xhook) {
        this.#queue.push(this.disableRecommendations);
      }
      if (options.disableReactions_xhook) {
        this.#queue.push(this.disableReactions);
      }
      if (options.forcePlayNextEpisode_xhook) {
        this.#queue.push(this.forcePlayNextEpisode);
      }
    }
  }

  XhookAfter.init(options);

  const script = document.createElement("script");
  script.src = xhookUrl;

  script.addEventListener("load", () => {
    xhook.after(function (request, response) {
      /**
       * Although xhook has the feature to modify responses asynchronously, it is not used here.
       * Using that feature on Prime Video often results in an error message on the screen.
       * Error messages are as follows
       * > That shouldn't have happened.
       * > It looks like something went wrong on our side. Let's find you a great video to watch instead.
       */
      XhookAfter.run(request, response);
    });
  });

  document.head.appendChild(script);

  const createPlayerVariantGate = () => {
    const stateMap = new WeakMap();

    const getResolvedVariant = (player) => {
      const variant = player?.dataset?.playerVariant;
      if (variant === "legacy" || variant === "new") {
        return variant;
      }
      return null;
    };

    const ensureState = (player) => {
      let state = stateMap.get(player);
      if (state) {
        return state;
      }

      state = {
        queue: [],
        observer: null,
        resolvedVariant: null,
      };

      state.observer = new MutationObserver(() => {
        const variant = getResolvedVariant(player);
        if (!variant) {
          return;
        }

        state.resolvedVariant = variant;
        state.observer.disconnect();
        state.observer = null;

        const tasks = state.queue.splice(0);
        for (const task of tasks) {
          try {
            task(variant);
          } catch (e) {
            console.log(e);
          }
        }
      });

      state.observer.observe(player, {
        attributes: true,
        attributeFilter: ["data-player-variant"],
      });

      stateMap.set(player, state);
      return state;
    };

    const runWhenReady = (player, task) => {
      const variant = getResolvedVariant(player);
      if (variant) {
        task(variant);
        return;
      }

      const state = ensureState(player);
      state.queue.push(task);

      // Safeguard in case the variant is already resolved right after observation starts.
      const resolved = getResolvedVariant(player);
      if (resolved && !state.resolvedVariant) {
        state.resolvedVariant = resolved;
        if (state.observer) {
          state.observer.disconnect();
          state.observer = null;
        }

        const tasks = state.queue.splice(0);
        for (const fn of tasks) {
          try {
            fn(resolved);
          } catch (e) {
            console.log(e);
          }
        }
      }
    };

    return {
      getResolvedVariant,
      runWhenReady,
    };
  };

  const isVariantLegacy = (playerVariant) => {
    return playerVariant === "legacy";
  };

  const isVariantNew = (playerVariant) => {
    return playerVariant === "new";
  };

  const identificationGetVodPlaybackResources = () => {
    try {
      const getVodPlaybackResources =
        XhookAfter.getVodPlaybackResourcesArray.find((g) => {
          const playbackUrls =
            g.data?.vodPlaylistedPlaybackUrls?.result?.playbackUrls;
          if (!playbackUrls) {
            return;
          }
          const intraTitlePlaylist = playbackUrls.intraTitlePlaylist;
          if (!intraTitlePlaylist) {
            return;
          }
          const mainPlaylist = intraTitlePlaylist.find(
            (pl) => pl.type === "Main" && Array.isArray(pl.urls)
          );
          if (!mainPlaylist) {
            return;
          }
          const mpdUrls = mainPlaylist.urls.map((obj) => obj.url);
          if (mpdUrls.length === 0) {
            return;
          }
          return mpdUrls.some((url) => url.includes(XhookAfter.mpdId));
        });
      return getVodPlaybackResources;
    } catch (e) {
      // console.log(e);
      return;
    }
  };

  const showVideoResolution = () => {
    class ShowVideoResolution {
      constructor(player, video) {
        this.player = player;
        this.video = video;
        this.abortController = null;
        this.mp4Url;
        this.videoInfoBySrc = {};
        this.playerObserver;
      }

      renderLegacy() {
        if (this.mp4Url === XhookAfter.mp4Url) {
          return;
        }

        let targetElement = this.player.querySelector(
          ".nextup-ext-resolution-info"
        );
        if (targetElement) {
          targetElement.textContent = "";
        }

        // mp4 may not have started playing yet when it loads.
        // This can be addressed by verifying using the title name currently playing.
        let titleElement = this.player.querySelector(
          ".atvwebplayersdk-subtitle-text"
        );
        if (!titleElement || !titleElement?.textContent) {
          // For movies, etc., there is no subtitle-text
          // Previously an empty element, as of December 2025, this element does not exist in movies or similar media.
          titleElement = this.player.querySelector(
            ".atvwebplayersdk-title-text"
          );
        }
        if (!titleElement) {
          return;
        }
        const title = titleElement.textContent;
        if (!title) {
          return;
        }

        const getVodPlaybackResources = identificationGetVodPlaybackResources();
        if (!getVodPlaybackResources) {
          return;
        }

        const titleId = getVodPlaybackResources.titleId;
        const metadataResource = XhookAfter.metadataResourceArray.find(
          (m) => m.entityId === titleId
        );
        if (!metadataResource) {
          return;
        }

        // Verify the title name
        if (
          !title.includes(
            metadataResource.data.resources?.catalogMetadataV2?.catalog?.title
          )
        ) {
          return;
        }

        // The following code must be executed after verifying the title name.
        const resolution = XhookAfter.resolutionInfoArray.find((r) => {
          return XhookAfter.mp4Url.includes(r.baseURL);
        });
        if (!resolution) {
          return;
        }

        if (targetElement) {
          const timeindicator = this.player.querySelector(
            ".atvwebplayersdk-timeindicator-text"
          );
          // If an ad is played, the timeindicator is removed/regenerated.
          if (!timeindicator) {
            targetElement.remove();
            targetElement = null;
            return;
          }
        }

        if (!targetElement) {
          try {
            const timeindicator = this.player.querySelector(
              ".atvwebplayersdk-timeindicator-text"
            );
            if (!timeindicator) {
              return;
            }
            targetElement = timeindicator.cloneNode();
            targetElement.classList.remove(
              "atvwebplayersdk-timeindicator-text"
            );
            targetElement.classList.add("nextup-ext-resolution-info");
            timeindicator.parentNode.append(targetElement);
          } catch (e) {
            console.log(e);
            return;
          }
        }

        const width = resolution.width;
        const height = resolution.height;
        const resolutionText = `${width}×${height}`;
        targetElement.textContent = resolutionText;
        this.mp4Url = XhookAfter.mp4Url;
      }

      resolveCurrentResolutionInfoForNewUi(title) {
        if (!title) {
          return;
        }

        const getVodPlaybackResources = identificationGetVodPlaybackResources();
        if (!getVodPlaybackResources) {
          return;
        }

        const titleId = getVodPlaybackResources.titleId;
        const metadataResource = XhookAfter.metadataResourceArray.find(
          (m) => m.entityId === titleId
        );
        if (!metadataResource) {
          return;
        }

        const origTitle =
          metadataResource.data.resources?.catalogMetadataV2?.catalog?.title;
        if (!origTitle || !title.includes(origTitle)) {
          return;
        }

        const resolution = XhookAfter.resolutionInfoArray.find((r) => {
          return XhookAfter.mp4Url.includes(r.baseURL);
        });
        return resolution;
      }

      renderNewUi() {
        const bottomLeftContainer = this.player.querySelector(
          "[data-nextup-ext-role='bottom-left-container']"
        );
        if (!bottomLeftContainer) {
          return;
        }

        const video = this.player.querySelector("video[src]");
        if (!video) {
          return;
        }
        const src = video.src;
        if (!src) {
          return;
        }

        const existingTarget = this.player.querySelector(
          "[data-nextup-ext-role='resolution-info']"
        );
        if (existingTarget) {
          const nextElement = existingTarget.nextElementSibling;
          if (!nextElement) {
            return;
          }
          existingTarget.remove();
        }

        const existsResolution = src in this.videoInfoBySrc;

        let titleElement = this.player.querySelector(
          ".atvwebplayersdk-episode-info"
        );
        if (!titleElement || !titleElement?.textContent) {
          titleElement = this.player.querySelector(
            ".atvwebplayersdk-title-text"
          );
        }

        let title;
        if (titleElement) {
          title = titleElement.textContent;
        }

        let resolution;
        if (existsResolution) {
          const videoInfo = this.videoInfoBySrc[src];
          if (title && videoInfo) {
            if (title === videoInfo.title) {
              // Same title
              resolution = videoInfo.resolution;
            } else {
              // Different title
              // Normally, this case probably won't occur.
              resolution = this.resolveCurrentResolutionInfoForNewUi(title);
            }
          } else {
            // While the rating is displayed
            resolution = videoInfo?.resolution;
          }
        } else {
          if (title) {
            // The first case for each title
            resolution = this.resolveCurrentResolutionInfoForNewUi(title);
          }
        }

        if (!resolution) {
          return;
        }

        try {
          const target = document.createElement("div");
          target.dataset.nextupExtRole = "resolution-info";
          bottomLeftContainer.append(target);

          const width = resolution.width;
          const height = resolution.height;
          const resolutionText = `${width}×${height}`;
          target.textContent = resolutionText;

          if (title) {
            this.videoInfoBySrc[src] = {
              title,
              resolution,
            };
          }
        } catch (e) {
          console.log(e);
        }
      }

      render() {
        if (this.abortController) {
          this.abortController.abort();
        }
        if (this.playerObserver) {
          this.playerObserver.disconnect();
        }

        this.abortController = new AbortController();
        const { signal } = this.abortController;

        const playerVariantGate = createPlayerVariantGate();
        playerVariantGate.runWhenReady(this.player, (playerVariant) => {
          if (isVariantLegacy(playerVariant)) {
            this.video.addEventListener(
              "timeupdate",
              this.renderLegacy.bind(this),
              { signal }
            );
          } else if (isVariantNew(playerVariant)) {
            this.playerObserver = new MutationObserver(() => {
              this.renderNewUi();
            }).observe(this.player, {
              childList: true,
              subtree: true,
              attributes: true,
              attributeFilter: ["class", "style"],
            });
          }
        });
      }

      runVideoOpenCloseObserver() {
        new MutationObserver((_, videoOpenObserver) => {
          if (!this.player.classList.contains("dv-player-fullscreen")) {
            return;
          }
          videoOpenObserver.disconnect();

          this.render();

          new MutationObserver((_, videoCloseObserver) => {
            if (this.player.classList.contains("dv-player-fullscreen")) {
              return;
            }
            videoCloseObserver.disconnect();

            if (this.abortController) {
              this.abortController.abort();
              this.abortController = null;
            }
            if (this.playerObserver) {
              this.playerObserver.disconnect();
              this.playerObserver = null;
            }
            this.mp4Url = null;

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
        `[id^='dv-web-player']:not([data-detected-from-nextup-ext${random}='true'])`
      );
      players.forEach((player) => {
        player.dataset[`detectedFromNextupExt${random}`] = "true";
        new MutationObserver((_, observer) => {
          const video = player.querySelector("video");
          if (!video) {
            return;
          }
          observer.disconnect();
          const s = new ShowVideoResolution(player, video);
          s.runVideoOpenCloseObserver();
        }).observe(player, {
          childList: true,
          subtree: true,
        });
      });
    }).observe(document, { childList: true, subtree: true });
  };

  showVideoResolution();

  const detectNextEpisodeId = () => {
    if (!options.forcePlayNextEpisode_xhook) {
      return;
    }

    class DetectNextEpisodeId {
      constructor(player, video) {
        this.player = player;
        this.video = video;
        this.videoSrcObserver = this.createVideoSrcObserver();
        this.abortController;
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

      getNextEpisodeId(nextUpV2Resource) {
        try {
          if (!nextUpV2Resource || !nextUpV2Resource.data) {
            return;
          }
          const data = nextUpV2Resource.data;
          if (data.resources?.nextUpV2?.carousel) {
            return;
          }

          const carouselItem =
            data.resources?.nextUpV2?.card?.carouselItems?.[0];
          if (!carouselItem) {
            return;
          }
          const autoplayConfig = data.resources?.nextUpV2?.card?.autoPlayConfig;
          if (carouselItem.analytics?.slotType !== "NEXT_EPISODE_SLOT") {
            return;
          } else if (autoplayConfig?.autoplayCardPreferredImage !== "episode") {
            return;
          }

          const nextEpisodeId = carouselItem.titleId;
          return nextEpisodeId;
        } catch (e) {
          console.log(e);
        }
      }

      detectOnLegacy() {
        const subtitleText = this.getSubtitleText();
        if (!subtitleText) {
          return;
        }

        const getVodPlaybackResources = identificationGetVodPlaybackResources();
        if (!getVodPlaybackResources) {
          return;
        }

        const titleId = getVodPlaybackResources.titleId;
        const metadataResource = XhookAfter.metadataResourceArray.find(
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

        const nextUpV2Resource = XhookAfter.nextUpV2ResourceArray.find(
          (n) => n.entityId === titleId
        );
        if (!nextUpV2Resource) {
          return;
        }

        const nextEpisodeId = this.getNextEpisodeId(nextUpV2Resource);
        this.player.dataset.nextEpisodeId = nextEpisodeId
          ? nextEpisodeId
          : "null";

        this.video.removeEventListener("timeupdate", this.detect);

        // Detection of auto play
        this.videoSrc = this.video.getAttribute("src");
        this.videoSrcObserver.observe(this.video, {
          attributes: true,
          attributeFilter: ["src"],
        });
      }

      getVideoInfo() {
        const str = this.player.dataset.nextupExtVideoInfo;
        if (str) {
          return JSON.parse(str);
        }
      }

      detectOnNewUi() {
        const nextEpisodeInfoStr = this.player.dataset.nextupExtNextEpisodeInfo;
        if (nextEpisodeInfoStr) {
          const nextEpisodeInfo = JSON.parse(nextEpisodeInfoStr);
          if (
            this.video?.src === nextEpisodeInfo.videoSrc &&
            nextEpisodeInfo.nextEpisodeId
          ) {
            return;
          } else {
            delete this.player.dataset.nextupExtNextEpisodeInfo;
          }
        }

        const videoInfo = this.getVideoInfo();
        if (!videoInfo) {
          return;
        }
        const episodeTitle = videoInfo.episodeTitle;
        const videoSrc = videoInfo.videoSrc;
        if (!episodeTitle || !videoSrc) {
          return;
        }

        if (this.video?.src !== videoSrc) {
          return;
        }

        const getVodPlaybackResources = identificationGetVodPlaybackResources();
        if (!getVodPlaybackResources) {
          return;
        }

        const titleId = getVodPlaybackResources.titleId;
        const metadataResource = XhookAfter.metadataResourceArray.find(
          (m) => m.entityId === titleId
        );
        if (!metadataResource) {
          return;
        }

        const origTitle =
          metadataResource.data.resources?.catalogMetadataV2?.catalog?.title;
        if (!origTitle || !episodeTitle.includes(origTitle)) {
          return;
        }

        const nextUpV2Resource = XhookAfter.nextUpV2ResourceArray.find(
          (n) => n.entityId === titleId
        );
        if (!nextUpV2Resource) {
          return;
        }

        const nextEpisodeId = this.getNextEpisodeId(nextUpV2Resource);
        if (nextEpisodeId) {
          const newNextEpisodeInfo = {
            nextEpisodeId,
            videoSrc: this.video?.src,
          };
          this.player.dataset.nextupExtNextEpisodeInfo =
            JSON.stringify(newNextEpisodeInfo);
        } else {
          delete this.player.dataset.nextupExtNextEpisodeInfo;
        }
      }

      detect() {
        if (this.abortController) {
          this.abortController.abort();
        }

        this.abortController = new AbortController();
        const { signal } = this.abortController;

        const playerVariantGate = createPlayerVariantGate();
        playerVariantGate.runWhenReady(this.player, (playerVariant) => {
          if (isVariantLegacy(playerVariant)) {
            this.video.addEventListener(
              "timeupdate",
              this.detectOnLegacy.bind(this),
              { signal }
            );
          } else if (isVariantNew(playerVariant)) {
            this.playerObserver = new MutationObserver(() => {
              this.detectOnNewUi();
            }).observe(this.player, {
              childList: true,
              subtree: true,
              attributes: true,
              attributeFilter: ["class", "style"],
            });
          }
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

          this.detect();

          new MutationObserver((_, videoCloseObserver) => {
            if (this.player.classList.contains("dv-player-fullscreen")) {
              return;
            }
            videoCloseObserver.disconnect();

            if (this.abortController) {
              this.abortController.abort();
              this.abortController = null;
            }

            this.videoSrcObserver.disconnect();

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
        `[id^='dv-web-player']:not([data-detected-from-nextup-ext${random}='true'])`
      );
      players.forEach((player) => {
        player.dataset[`detectedFromNextupExt${random}`] = "true";
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
    options.removeNextupTimecodes_xhook,
    options.disableRecommendations_xhook,
    options.disableReactions_xhook,
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

  let xhookUrl;
  if (ScriptInfo.isChromeExtension()) {
    try {
      xhookUrl = chrome?.runtime?.getURL("xhook.min.js");
    } catch (e) {}
  } else if (ScriptInfo.isUserScript()) {
    /**
     * The Chrome Web Store is strict about remote code execution, so CDN URLs are not hardcoded
     * Also, GM_getResourceText/URL is not used because we want to share the way xhook is executed with Chrome's extension edition.
     */
    try {
      const gmInfo = window.GM_info || GM_info;
      const resources = gmInfo.script.resources;
      if (Array.isArray(resources)) {
        // Tampermonkey / Violentmonkey
        const xhookResource = resources.find((r) => r.name === "xhook");
        if (xhookResource.url) {
          xhookUrl = xhookResource.url;
        }
      } else if (typeof resources === "object") {
        // Greasemonkey
        if (Object.hasOwn(resources, "xhook")) {
          xhookUrl = resources.xhook.url;
        }
      }
    } catch (e) {
      console.log(e);
    }
  }
  if (xhookUrl) {
    document.documentElement.dataset.xhookUrl = xhookUrl;
    injectScript(runXhook);
  }
};

class PrimeVideoTextRepository {
  static #dbName = "ScriptStore";
  static #storeName = "ScriptStore";

  static #initPromise = null;
  static #snapshot = {
    skipIntroAriaLabels: ["Skip Intro", "Skip Recap"],
    nextEpisodeAriaLabels: ["Next Episode"],
    closePlayerLabels: ["Close player"],
    subtitlesToggleAriaLabels: [
      "Turn off subtitles",
      "Turn on subtitles",
      "Subtitles unavailable",
    ],
    muteToggleAriaLabels: ["Mute", "Unmute"],
    pictureInPictureToggleAriaLabels: [
      "Enter Picture-in-Picture",
      "Exit Picture-in-Picture",
    ],
    fullscreenToggleAriaLabels: ["Fullscreen", "Exit Fullscreen"],
    settingsAriaLabels: ["Settings"],
    seekbarAriaLabels: ["Seek"],
    playbackToggleAriaLabels: ["Play", "Pause"],
    backwardAriaLabels: ["Skip back 10 seconds"],
    forwardAriaLabels: ["Skip forward 10 seconds"],
    likeAriaLabels: ["Like"],
    dislikeAriaLabels: ["Not for me"],
    nextupTexts: ["Next up"],
    acceptNextupTexts: [`"Next up in {{seconds}}`],
    dismissNextupTexts: ["Watch credits"],
    hideAriaLabels: ["Hide"],
  };
  static #knownAtvWebPlayerUiKeys = [];
  static #listeners = new Set();

  static subscribe = (listener) => {
    this.#listeners.add(listener);

    return () => {
      this.#listeners.delete(listener);
    };
  };

  static #emit() {
    for (const listener of this.#listeners) {
      try {
        listener(this.#snapshot);
      } catch (e) {
        console.log(e);
      }
    }
  }

  static #findAtvWebPlayerUiKeys(keys) {
    return keys.filter((key) => {
      return typeof key === "string" && key.startsWith("ATVWebPlayerUI-");
    });
  }

  static #diffAddedKeys(keys1, keys2) {
    const prevSet = new Set(keys1);
    return keys2.filter((key) => !prevSet.has(key));
  }

  static async #checkForNewAtvWebPlayerUiKeys(knownKeys) {
    const allKeys = await listStoreKeys(this.#dbName, this.#storeName);
    const currentKeys = this.#findAtvWebPlayerUiKeys(allKeys);
    const addedKeys = this.#diffAddedKeys(knownKeys, currentKeys);

    return {
      currentKeys,
      addedKeys,
    };
  }

  static #parseCacheData(cache = {}) {
    if (!cache?.data || typeof cache.data !== "string") {
      return null;
    }

    try {
      return JSON.parse(cache.data);
    } catch (e) {
      console.log(e);
      return null;
    }
  }

  static #filterNonEmptyStrings(texts = []) {
    return texts.filter((text) => {
      return typeof text === "string" && text.trim() !== "";
    });
  }

  static #extractSkipIntroLabelsFromCache(cache = {}) {
    const data = this.#parseCacheData(cache);
    if (!data) {
      return [];
    }
    return this.#filterNonEmptyStrings([data?.skip?.intro, data?.skip?.recap]);
  }

  static #extractNextEpisodeLabelsFromCache(cache = {}) {
    const data = this.#parseCacheData(cache);
    if (!data) {
      return [];
    }
    return this.#filterNonEmptyStrings([data?.nextTitle]);
  }

  static #extractClosePlayerLabelsFromCache(cache = {}) {
    const data = this.#parseCacheData(cache);
    if (!data) {
      return [];
    }
    return this.#filterNonEmptyStrings([data?.closePlayer]);
  }

  static #extractPictureInPictureToggleLabelsFromCache(cache = {}) {
    const data = this.#parseCacheData(cache);
    if (!data) {
      return [];
    }
    return this.#filterNonEmptyStrings([
      data?.pictureInPicture,
      data?.exitPictureInPicture,
    ]);
  }

  static #extractFullscreenToggleLabelsFromCache(cache = {}) {
    const data = this.#parseCacheData(cache);
    if (!data) {
      return [];
    }
    return this.#filterNonEmptyStrings([
      data?.fullscreen,
      data?.exitFullscreen,
    ]);
  }

  static #extractSettingsLabelsFromCache(cache = {}) {
    const data = this.#parseCacheData(cache);
    if (!data) {
      return [];
    }
    return this.#filterNonEmptyStrings([data?.settings]);
  }

  static #extractBackwardLabelsFromCache(cache = {}) {
    const data = this.#parseCacheData(cache);
    if (!data) {
      return [];
    }
    return this.#filterNonEmptyStrings([data?.accessibility?.skip?.backward]);
  }

  static #extractForwardLabelsFromCache(cache = {}) {
    const data = this.#parseCacheData(cache);
    if (!data) {
      return [];
    }
    return this.#filterNonEmptyStrings([data?.accessibility?.skip?.forward]);
  }

  static #extractLikeLabelsFromCache(cache = {}) {
    const data = this.#parseCacheData(cache);
    if (!data) {
      return [];
    }
    return this.#filterNonEmptyStrings([data?.titleReactions?.likeButtonTitle]);
  }

  static #extractDislikeLabelsFromCache(cache = {}) {
    const data = this.#parseCacheData(cache);
    if (!data) {
      return [];
    }
    return this.#filterNonEmptyStrings([
      data?.titleReactions?.dislikeButtonTitle,
    ]);
  }

  static #extractNextupTextsFromCache(cache = {}) {
    const data = this.#parseCacheData(cache);
    if (!data) {
      return [];
    }
    return this.#filterNonEmptyStrings([data?.nextUp]);
  }

  static #extractAcceptNextupTextsFromCache(cache = {}) {
    const data = this.#parseCacheData(cache);
    if (!data) {
      return [];
    }
    return this.#filterNonEmptyStrings([data?.nextUpIn]);
  }

  static #extractDismissNextupTextsFromCache(cache = {}) {
    const data = this.#parseCacheData(cache);
    if (!data) {
      return [];
    }
    return this.#filterNonEmptyStrings([data?.watchCredits]);
  }

  static #extractHideLabelsFromCache(cache = {}) {
    const data = this.#parseCacheData(cache);
    if (!data) {
      return [];
    }
    return this.#filterNonEmptyStrings([data?.hide]);
  }

  static async #updateSnapshotFromCachedPlayerUiTexts(keys) {
    const results = await Promise.allSettled(
      keys.map((key) => getIDBValue(this.#dbName, this.#storeName, key))
    );

    for (const result of results) {
      if (result.status !== "fulfilled") continue;

      const snapshot = this.#snapshot;
      const value = result.value;
      const skipIntroLabels = this.#extractSkipIntroLabelsFromCache(value);
      const nextEpisodeLabels = this.#extractNextEpisodeLabelsFromCache(value);
      const closePlayerLabels = this.#extractClosePlayerLabelsFromCache(value);
      const pictureInPictureToggleLabels =
        this.#extractPictureInPictureToggleLabelsFromCache(value);
      const fullscreenToggleLabels =
        this.#extractFullscreenToggleLabelsFromCache(value);
      const settingsLabels = this.#extractSettingsLabelsFromCache(value);
      const backwardLabels = this.#extractBackwardLabelsFromCache(value);
      const forwardLabels = this.#extractForwardLabelsFromCache(value);
      const likeLabels = this.#extractLikeLabelsFromCache(value);
      const dislikeLabels = this.#extractDislikeLabelsFromCache(value);
      const nextupTexts = this.#extractNextupTextsFromCache(value);
      const acceptNextupTexts = this.#extractAcceptNextupTextsFromCache(value);
      const dismissNextupTexts =
        this.#extractDismissNextupTextsFromCache(value);
      const hideLabels = this.#extractHideLabelsFromCache(value);

      this.#snapshot = {
        ...snapshot,
        skipIntroAriaLabels: [
          ...new Set([...snapshot.skipIntroAriaLabels, ...skipIntroLabels]),
        ],
        nextEpisodeAriaLabels: [
          ...new Set([...snapshot.nextEpisodeAriaLabels, ...nextEpisodeLabels]),
        ],
        closePlayerLabels: [
          ...new Set([...snapshot.closePlayerLabels, ...closePlayerLabels]),
        ],
        pictureInPictureToggleAriaLabels: [
          ...new Set([
            ...snapshot.pictureInPictureToggleAriaLabels,
            ...pictureInPictureToggleLabels,
          ]),
        ],
        fullscreenToggleAriaLabels: [
          ...new Set([
            ...snapshot.fullscreenToggleAriaLabels,
            ...fullscreenToggleLabels,
          ]),
        ],
        settingsAriaLabels: [
          ...new Set([...snapshot.settingsAriaLabels, ...settingsLabels]),
        ],
        backwardAriaLabels: [
          ...new Set([...snapshot.backwardAriaLabels, ...backwardLabels]),
        ],
        forwardAriaLabels: [
          ...new Set([...snapshot.forwardAriaLabels, ...forwardLabels]),
        ],
        likeAriaLabels: [
          ...new Set([...snapshot.likeAriaLabels, ...likeLabels]),
        ],
        dislikeAriaLabels: [
          ...new Set([...snapshot.dislikeAriaLabels, ...dislikeLabels]),
        ],
        nextupTexts: [...new Set([...snapshot.nextupTexts, ...nextupTexts])],
        acceptNextupTexts: [
          ...new Set([...snapshot.acceptNextupTexts, ...acceptNextupTexts]),
        ],
        dismissNextupTexts: [
          ...new Set([...snapshot.dismissNextupTexts, ...dismissNextupTexts]),
        ],
        hideAriaLabels: [
          ...new Set([...snapshot.hideAriaLabels, ...hideLabels]),
        ],
      };
    }

    console.log("PrimeVideo Text Snapshot:", this.#snapshot);
    this.#emit();
  }

  static escapeCssAttrValue = (value) => {
    return String(value).replaceAll("\\", "\\\\").replaceAll('"', '\\"');
  };

  static generateReactionsAriaLabels() {
    return [
      ...new Set([
        ...this.#snapshot.likeAriaLabels,
        ...this.#snapshot.dislikeAriaLabels,
      ]),
    ];
  }

  static generateSkipIntroButtonSelectors(player, overlayVisible = false) {
    return this.#snapshot.skipIntroAriaLabels
      .map((label) => {
        return !overlayVisible
          ? `#${player.id} button[aria-label="${this.escapeCssAttrValue(label)}"]`
          : `#${player.id}[data-nextup-ext-overlay-visible='true'] button[aria-label="${this.escapeCssAttrValue(label)}"]`;
      })
      .join(",\n");
  }

  static generateHoveredSkipIntroButtonSelectors(player) {
    return this.#snapshot.skipIntroAriaLabels
      .map((label) => {
        return `#${player.id} button[aria-label="${this.escapeCssAttrValue(label)}"]:not(:disabled):hover`;
      })
      .join(",\n");
  }

  static generateNextEpisodeButtonSelectors(player) {
    return this.#snapshot.nextEpisodeAriaLabels
      .map((label) => {
        return `#${player.id} button[aria-label="${this.escapeCssAttrValue(label)}"]`;
      })
      .join(",\n");
  }

  static generateHoveredNextEpisodeButtonSelectors(player) {
    return this.#snapshot.nextEpisodeAriaLabels
      .map((label) => {
        return `#${player.id} button[aria-label="${this.escapeCssAttrValue(label)}"]:not(:disabled):hover`;
      })
      .join(",\n");
  }

  static generateCloseButtonSelectors(player) {
    return this.#snapshot.closePlayerLabels
      .map((label) => {
        return `#${player.id} button[aria-label="${this.escapeCssAttrValue(label)}"]`;
      })
      .join(",\n");
  }

  static generateCloseButtonTooltipSelectors(player) {
    return this.#snapshot.closePlayerLabels
      .map((label) => {
        return `#${player.id} button[aria-label="${this.escapeCssAttrValue(label)}"] + .tooltip`;
      })
      .join(",\n");
  }

  static generateSubtitlesButtonSelectors(player) {
    return this.#snapshot.subtitlesToggleAriaLabels
      .map((label) => {
        return `#${player.id} button[aria-label="${this.escapeCssAttrValue(label)}"]`;
      })
      .join(",\n");
  }

  static generateSubtitlesButtonTooltipSelectors(player) {
    return this.#snapshot.subtitlesToggleAriaLabels
      .map((label) => {
        return `#${player.id} button[aria-label="${this.escapeCssAttrValue(label)}"] + .tooltip`;
      })
      .join(",\n");
  }

  static generateMuteToggleButtonSelectors(player) {
    return this.#snapshot.muteToggleAriaLabels
      .map((label) => {
        return `#${player.id} button[aria-label="${this.escapeCssAttrValue(label)}"]`;
      })
      .join(",\n");
  }

  static generateMuteToggleButtonTooltipSelectors(player) {
    return this.#snapshot.muteToggleAriaLabels
      .map((label) => {
        return `#${player.id} button[aria-label="${this.escapeCssAttrValue(label)}"] + .tooltip`;
      })
      .join(",\n");
  }

  static generatePictureInPictureToggleButtonSelectors(player) {
    return this.#snapshot.pictureInPictureToggleAriaLabels
      .map((label) => {
        return `#${player.id} button[aria-label="${this.escapeCssAttrValue(label)}"]`;
      })
      .join(",\n");
  }

  static generatePictureInPictureToggleButtonTooltipSelectors(player) {
    return this.#snapshot.pictureInPictureToggleAriaLabels
      .map((label) => {
        return `#${player.id} button[aria-label="${this.escapeCssAttrValue(label)}"] + .tooltip`;
      })
      .join(",\n");
  }

  static generateFullscreenToggleButtonSelectors(player) {
    return this.#snapshot.fullscreenToggleAriaLabels
      .map((label) => {
        return `#${player.id} button[aria-label="${this.escapeCssAttrValue(label)}"]`;
      })
      .join(",\n");
  }

  static generateFullscreenToggleButtonTooltipSelectors(player) {
    return this.#snapshot.fullscreenToggleAriaLabels
      .map((label) => {
        return `#${player.id} button[aria-label="${this.escapeCssAttrValue(label)}"] + .tooltip`;
      })
      .join(",\n");
  }

  static generateExtOptionButtonSelectors(player) {
    const label = "Option - Auto hide next up card";
    return `#${player.id} button[aria-label="${this.escapeCssAttrValue(label)}"]`;
  }

  static generateExtOptionButtonTooltipSelectors(player) {
    const label = "Option - Auto hide next up card";
    return `#${player.id} button[aria-label="${this.escapeCssAttrValue(label)}"] + .tooltip`;
  }

  static generateSettingsButtonSelectors(player) {
    return this.#snapshot.settingsAriaLabels
      .map((label) => {
        return `#${player.id} button[aria-label="${this.escapeCssAttrValue(label)}"]`;
      })
      .join(",\n");
  }
  static generateSettingsButtonTooltipSelectors(player) {
    return this.#snapshot.settingsAriaLabels
      .map((label) => {
        return `#${player.id} button[aria-label="${this.escapeCssAttrValue(label)}"]  + .tooltip`;
      })
      .join(",\n");
  }

  static generateTimeIndicatorTextSelectors(player) {
    return this.#snapshot.seekbarAriaLabels
      .map((label) => {
        return `#${player.id} .f1yxmn6p > div:has(input[type="range"][aria-label="${this.escapeCssAttrValue(label)}"]) > div:not(:has(input[type="range"]))`;
      })
      .join(",\n");
  }

  static generateSeekBarSelectors(player) {
    return this.#snapshot.seekbarAriaLabels
      .map((label) => {
        return `#${player.id} input[type="range"][aria-label="${this.escapeCssAttrValue(label)}"]`;
      })
      .join(",\n");
  }

  static generateSeekBarPlayedRangeSelectors(player) {
    return this.#snapshot.seekbarAriaLabels
      .map((label) => {
        return `#${player.id} input[type="range"][aria-label="${this.escapeCssAttrValue(label)}"] + span`;
      })
      .join(",\n");
  }

  static generatePlaybackToggleButtonSelectors(player) {
    return this.#snapshot.playbackToggleAriaLabels
      .map((label) => {
        return `#${player.id} button[aria-label="${this.escapeCssAttrValue(label)}"]`;
      })
      .join(",\n");
  }

  static generateHoveredPlaybackToggleButtonIconSelectors(player) {
    return this.#snapshot.playbackToggleAriaLabels
      .map((label) => {
        return `#${player.id} button[aria-label="${this.escapeCssAttrValue(label)}"]:hover img`;
      })
      .join(",\n");
  }

  static generateBackwardButtonSelectors(player) {
    return this.#snapshot.backwardAriaLabels
      .map((label) => {
        return `#${player.id} button[aria-label="${this.escapeCssAttrValue(label)}"]`;
      })
      .join(",\n");
  }

  static generateForwardButtonSelectors(player) {
    return this.#snapshot.forwardAriaLabels
      .map((label) => {
        return `#${player.id} button[aria-label="${this.escapeCssAttrValue(label)}"]`;
      })
      .join(",\n");
  }

  static generateReactionsSelectors(player) {
    return this.generateReactionsAriaLabels()
      .map((label) => {
        return `#${player.id} div[style*="grid-area"] button[aria-label="${this.escapeCssAttrValue(label)}"]`;
      })
      .join(",\n");
  }

  static generateReactionsDescendantSelectors(player) {
    const reactionsAriaLabelPairs = [];
    this.#snapshot.likeAriaLabels.forEach((like) => {
      this.#snapshot.dislikeAriaLabels.forEach((dislike) => {
        reactionsAriaLabelPairs.push([like, dislike]);
      });
    });
    return reactionsAriaLabelPairs
      .map((pair) => {
        return `#${player.id} div[style*="grid-area"]:has(button[aria-label="${pair[0]}"]):has(button[aria-label="${pair[1]}"]) div`;
      })
      .join(",\n");
  }

  static generateReactionsContainerSelectors(player, overlayVisible = false) {
    const reactionsAriaLabelPairs = [];
    this.#snapshot.likeAriaLabels.forEach((like) => {
      this.#snapshot.dislikeAriaLabels.forEach((dislike) => {
        reactionsAriaLabelPairs.push([like, dislike]);
      });
    });
    return reactionsAriaLabelPairs
      .map((pair) => {
        return !overlayVisible
          ? `#${player.id} div[style*="grid-area"]:has(button[aria-label="${pair[0]}"]):has(button[aria-label="${pair[1]}"])`
          : `#${player.id}[data-nextup-ext-overlay-visible='true'] div[style*="grid-area"]:has(button[aria-label="${pair[0]}"]):has(button[aria-label="${pair[1]}"])`;
      })
      .join(",\n");
  }

  static generateHoveredReactionsSelectors(player) {
    return this.generateReactionsAriaLabels()
      .map((label) => {
        return `#${player.id} div[style*="grid-area"] button[aria-label="${this.escapeCssAttrValue(label)}"]:not(:disabled):hover`;
      })
      .join(",\n");
  }

  static generateReactionsIconSelectors(player) {
    return this.generateReactionsAriaLabels()
      .map((label) => {
        return `#${player.id} div[style*="grid-area"] button[aria-label="${this.escapeCssAttrValue(label)}"] img`;
      })
      .join(",\n");
  }

  static generateHoveredReactionsIconSelectors(player) {
    return this.generateReactionsAriaLabels()
      .map((label) => {
        return `#${player.id} div[style*="grid-area"] button[aria-label="${this.escapeCssAttrValue(label)}"]:not(:disabled):hover img`;
      })
      .join(",\n");
  }

  static generateHideButtonSelectors(player) {
    return this.#snapshot.hideAriaLabels
      .map((label) => {
        return `#${player.id} button[aria-label="${this.escapeCssAttrValue(label)}"]`;
      })
      .join(",\n");
  }

  static init() {
    if (this.#initPromise) {
      return this.#initPromise;
    }

    this.#initPromise = (async () => {
      const firstCheck = await this.#checkForNewAtvWebPlayerUiKeys([]);
      this.#knownAtvWebPlayerUiKeys = firstCheck.currentKeys;

      if (this.#knownAtvWebPlayerUiKeys.length > 0) {
        console.log("ATVWebPlayerUI key found:", firstCheck.currentKeys);
        this.#updateSnapshotFromCachedPlayerUiTexts(
          this.#knownAtvWebPlayerUiKeys
        );
      }

      for (let i = 0; i < 15; i++) {
        await sleep(200);

        const { currentKeys, addedKeys } =
          await this.#checkForNewAtvWebPlayerUiKeys(
            this.#knownAtvWebPlayerUiKeys
          );
        if (addedKeys.length > 0) {
          this.#knownAtvWebPlayerUiKeys = currentKeys;
          console.log("ATVWebPlayerUI key increased:", currentKeys);
          this.#updateSnapshotFromCachedPlayerUiTexts(
            this.#knownAtvWebPlayerUiKeys
          );
          break;
        }
      }

      return this.getSnapshot();
    })();

    return this.#initPromise;
  }

  static getSnapshot = () => {
    return structuredClone(this.#snapshot);
  };
}

class NewUiElementLocator {
  static getGridAreaCells(gridRoot) {
    if (!gridRoot) {
      return [];
    }
    return [...gridRoot.querySelectorAll(":scope > div[style*='grid-area']")];
  }

  static findNextUpCardGridArea(gridAreas) {
    for (const gridArea of gridAreas) {
      if (!gridArea.childElementCount) continue;
      if (
        !gridArea.querySelector(
          "button:not([aria-label]) + button:not([aria-label])"
        )
      ) {
        continue;
      }
      if (!gridArea.querySelector("img[src^='http']")) continue;
      const primeVideoTextSnapshot = PrimeVideoTextRepository.getSnapshot();
      const nextupTexts = primeVideoTextSnapshot.nextupTexts;
      const acceptNextupTexts = primeVideoTextSnapshot.acceptNextupTexts
        .map((text) => text.replace("{{seconds}}", ""))
        .concat(nextupTexts);
      const dismissNextupTexts = primeVideoTextSnapshot.dismissNextupTexts;
      const gridAreaOuterHTML = gridArea.outerHTML;
      const isIncluded1 = acceptNextupTexts.some((text) =>
        gridAreaOuterHTML.includes(text)
      );
      const isIncluded2 = dismissNextupTexts.some((text) =>
        gridAreaOuterHTML.includes(text)
      );
      if (isIncluded1 && isIncluded2) {
        return gridArea;
      }
    }
    return;
  }

  static getNextUpElements(player) {
    const gridRoot = getPlayerUIGridRoot(player);
    const gridAreas = this.getGridAreaCells(gridRoot);
    const nextUpCardGridArea = this.findNextUpCardGridArea(gridAreas);
    if (!nextUpCardGridArea) {
      return;
    }

    const textLineWrapper = nextUpCardGridArea.querySelector(
      "div:has(>img) + div:has(div + div)"
    );
    let textLines = [];
    if (textLineWrapper?.childElementCount === 2) {
      textLines = [...textLineWrapper.querySelectorAll("div")];
    }

    const thumbnail = nextUpCardGridArea.querySelector("img");
    const buttons = nextUpCardGridArea.querySelectorAll(
      "button:not([aria-label])"
    );

    return {
      card: nextUpCardGridArea,
      seriesTitle: textLines[0] ?? null,
      episodeTitle: textLines[1] ?? null,
      thumbnail: thumbnail ?? null,
      acceptNextupButton: buttons[0] ?? null,
      dismissNextupButton: buttons[1] ?? null,
    };
  }

  static isHideRecommendationsButton(img) {
    const sig = getSvgSignature(img);
    return (
      sig.viewBox === "0 0 24 24" &&
      sig.pathCount === 1 &&
      !sig.hasEvenOdd &&
      sig.d.includes("M7.41 8.59L12")
    );
  }

  static findExpandedRecommendationsElements(player) {
    const hideButtons = player.querySelectorAll(
      PrimeVideoTextRepository.generateHideButtonSelectors(player)
    );
    if (hideButtons.length === 0 || hideButtons.length >= 2) {
      return {};
    }
    const hideButton = hideButtons[0];
    const img = hideButton.querySelector("img[src^='data:image/svg+xml']");
    if (!img) return {};
    if (!this.isHideRecommendationsButton(img)) return {};

    const container = hideButton.parentNode;
    if (!container) return {};
    const candidateContainer = container.previousElementSibling;
    if (!candidateContainer) return {};
    const candidateButton =
      candidateContainer.querySelector("button[aria-label]");
    if (!candidateButton) return {};
    if (!candidateButton.textContent?.trim()) return {};

    const ariaLabel = candidateButton.getAttribute("aria-label").trim();
    const primeVideoTextSnapshot = PrimeVideoTextRepository.getSnapshot();
    const excludeLabels = Object.keys(primeVideoTextSnapshot)
      .map((key) => {
        return primeVideoTextSnapshot[key];
      })
      .flat();
    const isNotRecommendationsButton = excludeLabels.some(
      (label) => ariaLabel === label
    );
    if (isNotRecommendationsButton) return {};

    const isGridAreaItem = !!candidateButton.closest("div[style*='grid-area']");
    if (isGridAreaItem) return {};

    return {
      recommendationsButton: candidateButton,
      hideRecommendationsButton: hideButton,
    };
  }

  static findOverlayBottomLeftContainer(player) {
    const backwardButton = player.querySelector(
      PrimeVideoTextRepository.generateBackwardButtonSelectors(player)
    );
    if (!backwardButton) return null;
    const centerButtonsContainer = backwardButton.parentNode.parentNode;
    if (!centerButtonsContainer) return null;
    const playbackToggleButton = centerButtonsContainer.querySelector(
      PrimeVideoTextRepository.generatePlaybackToggleButtonSelectors(player)
    );
    const forwardButton = centerButtonsContainer.querySelector(
      PrimeVideoTextRepository.generateForwardButtonSelectors(player)
    );
    if (!playbackToggleButton || !forwardButton) return null;

    const container = centerButtonsContainer.previousElementSibling;
    return container ?? null;
  }

  static findCollapsedRecommendationsButton(player) {
    const candidateContainer = this.findOverlayBottomLeftContainer(player);
    if (!candidateContainer) return null;
    const candidateButton =
      candidateContainer.querySelector("button[aria-label]");
    if (!candidateButton) return null;
    if (!candidateButton.textContent?.trim()) return null;

    const ariaLabel = candidateButton.getAttribute("aria-label").trim();
    const primeVideoTextSnapshot = PrimeVideoTextRepository.getSnapshot();
    const excludeLabels = Object.keys(primeVideoTextSnapshot)
      .map((key) => {
        return primeVideoTextSnapshot[key];
      })
      .flat();
    const isNotRecommendationsButton = excludeLabels.some(
      (label) => ariaLabel === label
    );
    if (isNotRecommendationsButton) return null;

    const isGridAreaItem = !!candidateButton.closest("div[style*='grid-area']");
    if (isGridAreaItem) return null;

    return candidateButton;
  }

  static getRecommendationsElements(player) {
    const recommendationsElements =
      this.findExpandedRecommendationsElements(player);
    if (Object.keys(recommendationsElements).length > 0) {
      return {
        state: "expanded",
        recommendationsButton: recommendationsElements.recommendationsButton,
        hideRecommendationsButton:
          recommendationsElements.hideRecommendationsButton,
      };
    }

    const recommendationsButton =
      this.findCollapsedRecommendationsButton(player);
    if (recommendationsButton) {
      return {
        state: "collapsed",
        recommendationsButton,
        hideRecommendationsButton: null,
      };
    }
  }

  static getOverlayBottomLeftContainer(player) {
    const container = this.findOverlayBottomLeftContainer(player);
    if (!container) return;

    if (container.childElementCount === 0) {
      return container;
    } else {
      const recommendationsButton =
        this.findCollapsedRecommendationsButton(player);
      if (recommendationsButton) {
        return container;
      }
    }
  }
}

class NextupController {
  constructor(player, video, options) {
    this.player = player;
    this.video = video;
    this.options = options;

    this.isSeeking = false;
    this.isPaused = video.paused;
    this.hasEnded = video.ended;

    this.nextupObserver = null;
    this.currentNextUp = null;

    this.hasAutoDismissedPhase1 = false;
    this.hasAutoAcceptedPhase2 = false;

    this.phase1ResetTimer = null;
    this.nearEndTimer = null;

    this.videoSrc = null;
    this.videoSrcObserver = null;

    this.lastSeekSafeCurrentTime = 0;
  }

  safeClick(button) {
    if (button && button.isConnected) {
      try {
        button.click();
        return true;
      } catch (e) {
        console.log(e);
      }
    }
  }

  shouldRunNearEndWatcher() {
    if (!this.options.clickNextupBeforeVideoEnds) {
      return false;
    }

    if (!this.currentNextUp || this.currentNextUp.phase !== 2) {
      return false;
    }

    if (this.hasAutoAcceptedPhase2) {
      return false;
    }

    if (this.isPaused || this.video.paused) {
      return false;
    }

    if (this.isSeeking || this.video.seeking) {
      return false;
    }

    if (this.hasEnded || this.video.ended) {
      return false;
    }

    if (!Number.isFinite(this.video.duration) || this.video.duration <= 0) {
      return false;
    }

    if (!this.currentNextUp.acceptButton?.isConnected) {
      return false;
    }

    const remaining = this.getRemainingTime();
    if (remaining > 4) {
      return false;
    }

    return true;
  }

  updateNearEndWatcher() {
    if (this.shouldRunNearEndWatcher()) {
      this.startNearEndWatcher();
    } else {
      this.stopNearEndWatcher();
    }
  }

  startNearEndWatcher() {
    if (this.nearEndTimer) {
      return;
    }

    this.nearEndTimer = setInterval(() => {
      this.checkNearEndAutoAccept();
    }, 100);
  }

  stopNearEndWatcher() {
    if (this.nearEndTimer) {
      clearInterval(this.nearEndTimer);
      this.nearEndTimer = null;
    }
  }

  stopPhase1ResetTimer() {
    if (this.phase1ResetTimer) {
      clearTimeout(this.phase1ResetTimer);
      this.phase1ResetTimer = null;
    }
  }

  resetPhase1State() {
    this.hasAutoDismissedPhase1 = false;
  }

  resetPhase2State() {
    this.hasAutoAcceptedPhase2 = false;
  }

  getRemainingTime() {
    if (!Number.isFinite(this.video.duration)) {
      return Infinity;
    }

    try {
      return Math.max(0, this.video.duration - this.video.currentTime);
    } catch (e) {
      console.log(e);
      return Infinity;
    }
  }

  getNextUpElements() {
    const root = this.player.querySelector(
      "[data-nextup-ext-role='nextup-card']"
    );
    if (!root) return;
    const acceptButton = root.querySelector(
      "[data-nextup-ext-role='accept-nextup-button']"
    );
    const dismissButton = root.querySelector(
      "[data-nextup-ext-role='dismiss-nextup-button']"
    );
    if (acceptButton && dismissButton) {
      return {
        root,
        acceptButton,
        dismissButton,
      };
    }
  }

  handlePhase1() {
    if (!this.currentNextUp || this.currentNextUp.phase !== 1) {
      return;
    }
    const isSuccess = this.safeClick(this.currentNextUp?.dismissButton);
    if (isSuccess) {
      console.log("Next up - Phase 1: dismissButton clicked");
      this.hasAutoDismissedPhase1 = true;
      this.stopPhase1ResetTimer();
      this.phase1ResetTimer = setTimeout(() => {
        this.resetPhase1State();
      }, 500);
    }
  }

  checkNearEndAutoAccept() {
    if (!this.currentNextUp || this.currentNextUp.phase !== 2) {
      this.stopNearEndWatcher();
      return;
    }

    if (this.hasAutoAcceptedPhase2) {
      this.stopNearEndWatcher();
      return;
    }

    if (this.video.paused || this.video.ended || this.video.seeking) {
      return;
    }

    const remaining = this.getRemainingTime();
    if (remaining <= 1) {
      const isSuccess = this.safeClick(this.currentNextUp.acceptButton);
      if (isSuccess) {
        console.log("Next up - Phase 2: acceptButton clicked");
        this.hasAutoAcceptedPhase2 = true;
        this.stopNearEndWatcher();
      }
    }
  }

  observeNextUp() {
    this.nextupObserver = new MutationObserver(() => {
      const elements = this.getNextUpElements();
      if (!elements || this.hasAutoDismissedPhase1) {
        this.currentNextUp = null;
        this.stopNearEndWatcher();
        return;
      }

      if (this.video?.currentTime <= 1) {
        this.currentNextUp = null;
        this.stopNearEndWatcher();
        return;
      }

      const { root, acceptButton, dismissButton } = elements;
      const remaining = this.getRemainingTime();
      const phase = remaining >= 4 ? 1 : 2;

      this.currentNextUp = {
        phase,
        root,
        acceptButton,
        dismissButton,
      };

      if (phase === 1) {
        this.handlePhase1();
        return;
      }

      this.updateNearEndWatcher();
    });

    this.nextupObserver.observe(this.player, OBSERVER_CONFIG);
  }

  observeVideoSrc() {
    const callback = () => {
      const src = this.video?.src;
      if (this.videoSrc !== src) {
        this.videoSrc = src;
        this.resetPhase1State();
        this.resetPhase2State();
      }
    };
    callback();

    this.videoSrcObserver = new MutationObserver(callback);

    this.videoSrcObserver.observe(this.video, {
      attributes: true,
      attributeFilter: ["src"],
    });
  }

  getAbortControllerKey() {
    return "__nextupExtPlaybackListenerAbortController";
  }

  bindPlaybackListeners() {
    this.unbindPlaybackListeners();

    const controller = new AbortController();
    const { signal } = controller;

    this.video.addEventListener("play", this.handlePlay.bind(this), { signal });
    this.video.addEventListener("pause", this.handlePause.bind(this), {
      signal,
    });
    this.video.addEventListener("seeking", this.handleSeeking.bind(this), {
      signal,
    });
    this.video.addEventListener("seeked", this.handleSeeked.bind(this), {
      signal,
    });
    this.video.addEventListener(
      "timeupdate",
      this.handleTimeUpdate.bind(this),
      { signal }
    );
    this.video.addEventListener("ended", this.handleEnded.bind(this), {
      signal,
    });

    this.video.addEventListener("emptied", this.handleEmptied.bind(this), {
      signal,
    });

    this.video[this.getAbortControllerKey()] = controller;
  }

  unbindPlaybackListeners() {
    const controller = this.video[this.getAbortControllerKey()];
    if (controller) {
      controller.abort();
      delete this.video[this.getAbortControllerKey()];
    }
  }

  handlePlay() {
    this.isPaused = false;
    this.hasEnded = false;
    this.updateNearEndWatcher();
  }

  handlePause() {
    this.isPaused = true;
    this.stopNearEndWatcher();
  }

  handleSeeking() {
    this.isSeeking = true;
    this.stopNearEndWatcher();
  }

  handlePotentialBackwardSeek() {
    const previousTime = this.lastSeekSafeCurrentTime;
    const currentTime = this.video.currentTime;
    if (currentTime + 1 < previousTime) {
      this.resetPhase1State();
      this.resetPhase2State();
    }
    this.lastSeekSafeCurrentTime = currentTime;
  }

  handleSeeked() {
    this.isSeeking = false;
    this.handlePotentialBackwardSeek();
    this.updateNearEndWatcher();
  }

  handleTimeUpdate() {
    this.handlePotentialBackwardSeek();
    this.updateNearEndWatcher();
  }

  handleEnded() {
    this.hasEnded = true;
    this.stopNearEndWatcher();
  }

  handleEmptied() {
    this.resetPhase1State();
    this.resetPhase2State();
    this.stopNearEndWatcher();
  }

  updatePlaybackState() {
    this.isSeeking = this.video.seeking;
    this.isPaused = this.video.paused;
    this.hasEnded = this.video.ended;
    this.lastSeekSafeCurrentTime = this.video.currentTime;
  }

  init() {
    this.destroy();
    this.resetPhase1State();
    this.resetPhase2State();
    this.observeNextUp();
    this.observeVideoSrc();
    this.bindPlaybackListeners();
    this.updatePlaybackState();
  }

  destroy() {
    if (this.nextupObserver) {
      this.nextupObserver.disconnect();
      this.nextupObserver = null;
    }
    if (this.videoSrcObserver) {
      this.videoSrcObserver.disconnect();
      this.videoSrcObserver = null;
    }
    this.stopNearEndWatcher();
    this.stopPhase1ResetTimer();
    this.unbindPlaybackListeners();
  }
}

class ElementController {
  constructor(player) {
    this.player = player;
    this.centerOverlaysWrapperIsMarked = false;
    this.playerVariant = "unknown";
    this.pendingTasks = new Map();
    this.isLiveTvCandidate = false;
  }

  hasResolvedVariant() {
    return this.playerVariant !== "unknown";
  }

  isVariantUnknown() {
    return this.playerVariant === "unknown";
  }

  isVariantLegacy() {
    return this.playerVariant === "legacy";
  }

  isVariantNew() {
    return this.playerVariant === "new";
  }

  startVariantDetection(options = getDefaultOptions()) {
    let canRunPendingTasks = true;
    const afterResolved = () => {
      if (this.isVariantNew()) {
        PrimeVideoTextRepository.init();
        this.observeNewUiOverlayState(options);
      }
      if (canRunPendingTasks) {
        canRunPendingTasks = false;
        this.runPendingTasks();
      }
      adjustOptionDialogByPlayerVariant(this.playerVariant);
      this.player.dataset.playerVariant = this.playerVariant;
    };

    new MutationObserver((_, observer) => {
      if (this.hasResolvedVariant()) {
        observer.disconnect();
        afterResolved();
        return;
      }
      const result = detectPlayerVariant(this.player);
      if (result === "unknown") {
        return;
      }
      console.log("PlayerVariant:", result);
      this.playerVariant = result;
      observer.disconnect();
      afterResolved();
    }).observe(document, {
      ...OBSERVER_CONFIG,
      attributes: true,
    });
  }

  runFeatureWhenVariantResolved(key, task) {
    const runTask = () => {
      try {
        task();
      } catch (e) {
        console.log(e);
      }
    };

    if (this.hasResolvedVariant()) {
      runTask();
      return;
    }

    this.pendingTasks.set(key, runTask);
  }

  runPendingTasks() {
    const tasks = [...this.pendingTasks.values()];
    this.pendingTasks.clear();

    for (const task of tasks) {
      task();
    }
  }

  tempAddElemToPlayer() {
    const div = document.createElement("div");
    this.player.append(div);
    div.remove();
  }

  createOptionBtn() {
    this.runFeatureWhenVariantResolved("createOptionBtn", () => {
      if (this.isVariantLegacy()) {
        this.createLegacyOptionBtn();
      } else if (this.isVariantNew()) {
        this.createNewUiOptionBtn();
      }
    });
  }

  createLegacyOptionBtn() {
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

      new MutationObserver((_, observer2) => {
        if (this.player.querySelector(".nextup-ext-opt-btn-container")) {
          return;
        }
        observer2.disconnect();
        this.createOptionBtn();
      }).observe(btnsContainer, { ...OBSERVER_CONFIG, attributes: true });
    }).observe(this.player, { ...OBSERVER_CONFIG, attributes: true });
    this.tempAddElemToPlayer();
  }

  createNewUiOptionBtn() {
    new MutationObserver((_) => {
      if (this.player.querySelector(".nextup-ext-opt-btn-container")) {
        return;
      }
      const gridRoot = getPlayerUIGridRoot(this.player);
      if (!gridRoot) return;
      const svgImageButtons = getSvgImageButtons(gridRoot);
      if (svgImageButtons.length === 0) return;

      const isKebabMenuIcon = (img) => {
        const sig = getSvgSignature(img);
        return (
          sig.viewBox === "0 0 6 25" &&
          sig.pathCount === 1 &&
          sig.hasEvenOdd &&
          sig.d.includes("M5.5 2.75a2.75") &&
          sig.d.includes("2.75 2.75")
        );
      };

      let kebabMenuIcon;
      for (const item of svgImageButtons) {
        if (isKebabMenuIcon(item.img)) {
          kebabMenuIcon = item;
          item.img.dataset.isKebabMenuIcon = true;
          break;
        }
      }
      if (!kebabMenuIcon) {
        return;
      }

      const kebabMenuIconContainer = kebabMenuIcon.button.parentNode.parentNode;
      if (kebabMenuIconContainer.querySelectorAll("button").length !== 1)
        return;

      const cloneContainer = kebabMenuIconContainer.cloneNode(true);
      cloneContainer.classList.add("nextup-ext-opt-btn-container");
      const cloneButton = cloneContainer.querySelector("button");
      cloneButton.setAttribute("aria-label", "Option - Auto hide next up card");
      for (const cloneImg of cloneButton.querySelectorAll("img")) {
        if (!cloneImg.dataset.isKebabMenuIcon) {
          cloneImg.remove();
        } else {
          cloneImg.setAttribute("src", OPTION_BTN_IMG_DATA_URL);
          cloneImg.style.filter =
            "sepia(100%) saturate(2000%) hue-rotate(120deg)";
        }
      }
      const tooltip = cloneContainer.querySelector(".tooltip div");
      if (tooltip) {
        tooltip.textContent = "Option - Auto hide next up card";
      }
      kebabMenuIconContainer.before(cloneContainer);

      cloneButton.addEventListener("click", (_) => {
        const optDialog = getOptionDialog();
        optDialog.showModal();
      });
    }).observe(this.player, OBSERVER_CONFIG);
  }

  // for LiveTV
  changeOrderOfVideoElements(options = getOptions()) {
    if (!options.useOnLiveTv) {
      return;
    }

    let videoWrapper;

    const videoElementsObserver = new MutationObserver((_) => {
      if (!videoWrapper) {
        return;
      }

      const videos = videoWrapper.querySelectorAll("video");
      if (videos.length !== 2) {
        return;
      }
      if (
        videos[0].style.display !== "none" ||
        videos[1].style.display !== ""
      ) {
        return;
      }
      if (videos[0].hasAttribute("src") || !videos[1].hasAttribute("src")) {
        return;
      }
      videos[0].before(videos[1]);
      this.isLiveTvCandidate = true;
    });

    new MutationObserver((_, observer) => {
      /**
       * at amazon.co.jp
       * .rendererContainer - before 2025/05/03 and after 2025/05/07
       * .atvwebplayersdk-video-surface - existed from 2025/05/03 to 2025/05/07
       */
      const wrapper1 = this.player.querySelector(".rendererContainer");
      const wrapper2 = this.player.querySelector(
        ".atvwebplayersdk-video-surface"
      );
      videoWrapper = wrapper1 ?? wrapper2;
      if (!videoWrapper) {
        return;
      }
      observer.disconnect();
      videoElementsObserver.observe(videoWrapper, {
        ...OBSERVER_CONFIG,
        attributes: true,
      });
    }).observe(this.player, OBSERVER_CONFIG);
  }

  // Preparation for detecting the display state of the overlay.
  markLegacyCenterOverlaysWrapper() {
    if (this.centerOverlaysWrapperIsMarked) {
      return true;
    }

    this.runFeatureWhenVariantResolved(
      "markLegacyCenterOverlaysWrapper",
      () => {
        if (!this.isVariantLegacy()) {
          return false;
        }

        const playPauseButton = this.player.querySelector(
          ".atvwebplayersdk-playpause-button"
        );
        if (!playPauseButton) {
          return false;
        }
        try {
          const centerOverlaysWrapper =
            playPauseButton.parentNode.parentNode.parentNode.parentNode;
          const hasCursorStyle1 =
            centerOverlaysWrapper.style.cssText.includes("cursor: none");
          const hasCursorStyle2 =
            centerOverlaysWrapper.style.cssText.includes("cursor: pointer");
          if (hasCursorStyle1 || hasCursorStyle2) {
            centerOverlaysWrapper.dataset.ident = "center-overlays-wrapper";
          }
          this.centerOverlaysWrapperIsMarked = true;
          return true;
        } catch (e) {
          console.log(e);
          return false;
        }
      }
    );
  }

  markNewUiNextUpElements() {
    this.runFeatureWhenVariantResolved("markNewUiNextUpElements", () => {
      if (!this.isVariantNew()) {
        return;
      }

      let observer;

      const getNextUpElements = () => {
        if (observer) {
          observer.disconnect();
        }

        observer = new MutationObserver(() => {
          if (
            this.player.querySelector("[data-nextup-ext-role='nextup-card']") &&
            this.player.querySelector(
              "[data-nextup-ext-role='accept-nextup-button']"
            )
          ) {
            return;
          }

          const nextUpElements = NewUiElementLocator.getNextUpElements(
            this.player
          );
          if (!nextUpElements) return;

          const {
            card,
            seriesTitle,
            episodeTitle,
            thumbnail,
            acceptNextupButton,
            dismissNextupButton,
          } = nextUpElements;

          if (card) {
            card.dataset.nextupExtRole = "nextup-card";
          }
          if (seriesTitle) {
            seriesTitle.dataset.nextupExtRole = "nextup-series-title";
          }
          if (episodeTitle) {
            episodeTitle.dataset.nextupExtRole = "nextup-episode-title";
          }
          if (thumbnail) {
            thumbnail.dataset.nextupExtRole = "nextup-thumbnail";
          }
          if (acceptNextupButton) {
            acceptNextupButton.dataset.nextupExtRole = "accept-nextup-button";
          }
          if (dismissNextupButton) {
            dismissNextupButton.dataset.nextupExtRole = "dismiss-nextup-button";
          }
        });

        observer.observe(this.player, {
          ...OBSERVER_CONFIG,
          attributes: true,
          attributeFilter: ["class", "style"],
        });
        this.tempAddElemToPlayer();
      };

      getNextUpElements();

      const unsubscribe = PrimeVideoTextRepository.subscribe(() => {
        getNextUpElements();
        unsubscribe();
      });
    });
  }

  markNewUiRecommendationsElements() {
    const callback = () => {
      if (!this.isVariantNew()) {
        return;
      }

      let observer;

      const getRecommendationsElements = () => {
        if (observer) {
          observer.disconnect();
        }

        observer = new MutationObserver(() => {
          if (
            this.player.querySelector(
              "[data-nextup-ext-role='recommendations-button']"
            ) ||
            this.player.querySelector(
              "[data-nextup-ext-role='hide-recommendations-button']"
            ) ||
            this.player.querySelector(
              "[data-nextup-ext-role='expand-recommendations-button']"
            )
          ) {
            return;
          }

          const recommendationsElements =
            NewUiElementLocator.getRecommendationsElements(this.player);
          if (!recommendationsElements) return;

          const { state, recommendationsButton, hideRecommendationsButton } =
            recommendationsElements;
          if (state === "expanded") {
            if (recommendationsButton) {
              recommendationsButton.dataset.nextupExtRole =
                "recommendations-button";
            }
            if (hideRecommendationsButton) {
              hideRecommendationsButton.dataset.nextupExtRole =
                "hide-recommendations-button";
            }
          } else if (state === "collapsed") {
            if (recommendationsButton) {
              recommendationsButton.dataset.nextupExtRole =
                "expand-recommendations-button";
            }
          }
        });

        observer.observe(this.player, {
          ...OBSERVER_CONFIG,
          attributes: true,
          attributeFilter: ["class", "style"],
        });
        this.tempAddElemToPlayer();
      };

      getRecommendationsElements();

      const unsubscribe = PrimeVideoTextRepository.subscribe(() => {
        getRecommendationsElements();
        unsubscribe();
      });
    };

    this.runFeatureWhenVariantResolved(
      "markNewUiRecommendationsElements",
      callback
    );
  }

  markNewUiOverlayBottomLeftContainer(options = getDefaultOptions()) {
    if (!options.showVideoResolution_xhook) {
      return;
    }

    const callback = () => {
      if (!this.isVariantNew()) {
        return;
      }

      let observer;

      const getOverlayBottomLeftContainer = () => {
        if (observer) {
          observer.disconnect();
        }

        observer = new MutationObserver(() => {
          if (
            this.player.querySelector(
              "[data-nextup-ext-role='bottom-left-container']"
            )
          ) {
            return;
          }

          const bottomLeftContainer =
            NewUiElementLocator.getOverlayBottomLeftContainer(this.player);
          if (!bottomLeftContainer) return;

          bottomLeftContainer.dataset.nextupExtRole = "bottom-left-container";
        });

        observer.observe(this.player, {
          ...OBSERVER_CONFIG,
          // attributes: true,
          // attributeFilter: ["class", "style"],
        });
        this.tempAddElemToPlayer();
      };

      getOverlayBottomLeftContainer();

      const unsubscribe = PrimeVideoTextRepository.subscribe(() => {
        getOverlayBottomLeftContainer();
        unsubscribe();
      });
    };

    this.runFeatureWhenVariantResolved(
      "markNewUiOverlayBottomLeftContainer",
      callback
    );
  }

  observeNewUiOverlayState(options = getDefaultOptions()) {
    const showSkipIntroBtnOnOverlay =
      options.hideSkipIntroBtn && options.showSkipIntroBtnOnOverlay;
    const overlayDependentOptions = [showSkipIntroBtnOnOverlay];
    const shouldobserveNewUiOverlayState =
      overlayDependentOptions.some(Boolean);
    if (!shouldobserveNewUiOverlayState) {
      return;
    }

    const updateOverlayState = () => {
      const xrayQuickView = this.player.querySelector(".xrayQuickView");
      if (xrayQuickView && xrayQuickView.classList.contains("show")) {
        this.player.dataset.nextupExtOverlayVisible = "true";
      } else {
        delete this.player.dataset.nextupExtOverlayVisible;
      }
    };

    const observeTarget = getPlayerUIGridRoot(this.player) ?? this.player;
    new MutationObserver(updateOverlayState).observe(observeTarget, {
      ...OBSERVER_CONFIG,
      attributes: true,
      attributeFilter: ["class", "style", "aria-hidden"],
    });

    updateOverlayState();
  }

  markIdentifyLegacyNonDarkeningOverlays() {
    this.runFeatureWhenVariantResolved(
      "markIdentifyLegacyNonDarkeningOverlays",
      () => {
        if (!this.isVariantLegacy()) {
          return;
        }

        const overlays = this.player.querySelectorAll(
          "div:has(>.atvwebplayersdk-regulatory-overlay) > div"
        );
        if (overlays.length === 0) {
          return;
        }
        if (this.player.querySelector("[data-non-darkening-overlay]")) {
          return;
        }

        const selector =
          "div:has(>.atvwebplayersdk-regulatory-overlay) > div:not(:has(>.atvwebplayersdk-loadingspinner-overlay) ~ div):not(:has(>.atvwebplayersdk-loadingspinner-overlay)):has(> div:nth-child(2):last-child)";
        for (const overlay of overlays) {
          if (!overlay.matches(selector)) {
            overlay.dataset.nonDarkeningOverlay = "true";
          }
        }
      }
    );
  }

  skipAds(options = getDefaultOptions()) {
    if (!options.skipAds) {
      return;
    }

    if (!document.querySelector("#ext-skipAds")) {
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
      addStyle(css, "ext-skipAds");
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
      const mached = remainingTimeStr.match(/(\d{1,2}):(\d{2})/);
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
      adTime -= 1;
      console.log(`Skip ${adTime} seconds`);
      video.currentTime += adTime;
      video.muted = false;
      console.log("Skipped ads");

      setTimeout(() => {
        canSkip = true;
      }, 3000);
    }).observe(this.player, { ...OBSERVER_CONFIG, characterData: true });
  }

  hideSkipIntroBtn(options = getDefaultOptions()) {
    if (!options.hideSkipIntroBtn || options.tweakHideSkipIntroButton) {
      return;
    }
    this.runFeatureWhenVariantResolved("hideSkipIntroBtn", () => {
      if (this.isVariantLegacy()) {
        this.hideLegacySkipIntroBtn(options);
      } else if (this.isVariantNew()) {
        this.hideNewUiSkipIntroBtn(options);
      }
    });
  }

  hideLegacySkipIntroBtn(options = getDefaultOptions()) {
    if (!document.querySelector("#ext-hideSkipIntroBtn")) {
      const css = `
        .atvwebplayersdk-skipelement-button {
          display: none !important;
        }
      `;
      addStyle(css, "ext-hideSkipIntroBtn");
    }

    if (!options.showSkipIntroBtnOnOverlay) {
      return;
    }

    if (!this.markLegacyCenterOverlaysWrapper()) {
      return;
    }

    const playerContainer = this.player.querySelector(
      ".atvwebplayersdk-player-container"
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
    }).observe(playerContainer, OBSERVER_CONFIG);

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

  hideNewUiSkipIntroBtn(options = getDefaultOptions()) {
    const renderStyle = () => {
      const hiddenSelectors =
        PrimeVideoTextRepository.generateSkipIntroButtonSelectors(this.player);
      const css = !options.showSkipIntroBtnOnOverlay
        ? `
        ${hiddenSelectors} {
          display: none !important;
        }
      `
        : `
        ${hiddenSelectors} {
          visibility: hidden !important;
        }
        ${PrimeVideoTextRepository.generateSkipIntroButtonSelectors(this.player, true)} {
          visibility: visible !important;
        }
      `;
      upsertStyle(css, `ext-hideNewUiSkipIntroBtn-${this.player.id}`);
    };

    renderStyle();

    const unsubscribe = PrimeVideoTextRepository.subscribe(() => {
      renderStyle();
      unsubscribe();
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

    if (
      !document.querySelector("#ext-preventsDarkeningInConjunctionWithNextup")
    ) {
      /**
       * at amazon.co.jp
       * .fkpovp9 - before 2025/05/16
       * .f1makowq - after 2025/05/16
       * The style that hides .fkpovp9 will be removed in the future
       */
      const css = `
        .atvwebplayersdk-player-container:has(.atvwebplayersdk-nextupcard-show) div:has(>.atvwebplayersdk-regulatory-overlay) > div:not([data-non-darkening-overlay]),
        .atvwebplayersdk-player-container:has(.atvwebplayersdk-nextupcard-show) div:has(>.atvwebplayersdk-regulatory-overlay) > div:not([data-non-darkening-overlay]) > div {
          background: transparent !important;
        }

        .atvwebplayersdk-player-container:has(.atvwebplayersdk-nextupcard-show) .fkpovp9:has(~.atvwebplayersdk-regulatory-overlay) {
          opacity: 0 !important;
        }
        .atvwebplayersdk-player-container:has(.atvwebplayersdk-nextupcard-show):has([data-ident='center-overlays-wrapper'][style*='cursor: pointer;']) .fkpovp9:has(~.atvwebplayersdk-regulatory-overlay) {
          opacity: 1 !important;
        }

        /*
          .f1makowq is generated before the nextup element is generated.
          If the cursor is none, hide .f1makowq because .f1makowq flickers for just a moment before nextup is generated.
        */
        div:has(>.atvwebplayersdk-regulatory-overlay):has([data-ident='center-overlays-wrapper'][style*='cursor: none;']) .f1makowq:has(~.atvwebplayersdk-regulatory-overlay) {
          visibility: hidden;
        }
        .atvwebplayersdk-player-container:has(.atvwebplayersdk-nextupcard-show) .f1makowq:has(~.atvwebplayersdk-regulatory-overlay) {
          opacity: 0 !important;
        }
        .atvwebplayersdk-player-container:has(.atvwebplayersdk-nextupcard-show):has([data-ident='center-overlays-wrapper'][style*='cursor: pointer;']) .f1makowq:has(~.atvwebplayersdk-regulatory-overlay) {
          opacity: 1 !important;
        }

        .atvwebplayersdk-player-container:has(.atvwebplayersdk-nextupcard-show):has([data-ident='center-overlays-wrapper'][style*='cursor: pointer;']) .f1makowq:has(~.atvwebplayersdk-regulatory-overlay) div:nth-child(1) {
          background: linear-gradient(180deg,rgba(0, 0, 0, 0.5) 0%,rgba(0, 0, 0, 0.5) 49.48%,rgba(0, 0, 0, 0) 100%) !important;
        }
        .atvwebplayersdk-player-container:has(.atvwebplayersdk-nextupcard-show):has([data-ident='center-overlays-wrapper'][style*='cursor: pointer;']) .f1makowq:has(~.atvwebplayersdk-regulatory-overlay) div:nth-child(2) {
          background: linear-gradient(180deg,rgba(0, 0, 0, 0) 0.98%,rgba(0, 0, 0, 0.7) 53.49%,rgba(0, 0, 0, 0.5) 100%) !important;
        }
      `;
      addStyle(css, "ext-preventsDarkeningInConjunctionWithNextup");
    }
  }

  temporarilyDisableOverlay(options = getDefaultOptions(), delay = 5000) {
    if (!options.temporarilyDisableOverlay) {
      return;
    }
    temporarilyDisableOverlay(this.player, delay);
  }

  hideNextupCard(options = getDefaultOptions()) {
    if (!options.hideNextup) {
      return;
    }
    this.runFeatureWhenVariantResolved("hideNextupCard", () => {
      if (this.isVariantLegacy()) {
        this.hideLegacyNextupCard(options);
      } else if (this.isVariantNew()) {
        this.hideNewUiNextupCard(options);
      }
    });
  }

  hideLegacyNextupCard(options = getDefaultOptions()) {
    if (!document.querySelector("#ext-hideNextupCard")) {
      const css = `
        .atvwebplayersdk-nextupcard-wrapper {
          display: none !important;
        }
      `;
      addStyle(css, "ext-hideNextupCard");
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
          if (!video || options.clickHideButtonForAllNextup) {
            try {
              this.temporarilyDisableOverlay(options, 5000);
              hideButton.click();
            } catch (e) {
              console.log(e);
            }
          } else {
            // Pressing the hide button on the next up card that appears a few seconds before the end of the video seems to cancel autoplay.
            // To avoid closing the video, the decision to click the hide button is based on the time remaining in the video.
            try {
              const currentTime = video.currentTime;
              const duration = video.duration;
              if (duration - currentTime >= 6) {
                this.temporarilyDisableOverlay(options, 5000);
                hideButton.click();
              }
            } catch (e) {
              console.log(e);
            }
          }
        }
      }).observe(wrapper, OBSERVER_CONFIG);

      this.preventsDarkeningInConjunctionWithNextup(options);

      if (options.showNextupOnOverlay) {
        if (!this.markLegacyCenterOverlaysWrapper()) {
          return;
        }

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
        }).observe(wrapper, OBSERVER_CONFIG);

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
    }).observe(this.player, { ...OBSERVER_CONFIG, attributes: true });
  }

  hideNewUiNextupCard(options = getDefaultOptions()) {
    if (!document.querySelector("#ext-hideNextupCard")) {
      const css = `
        [data-nextup-ext-role="nextup-card"] {
          display: none !important;
        }
      `;
      addStyle(css, "ext-hideNextupCard");
    }

    const video = getVisibleVideo();
    const controller = new NextupController(this.player, video, options);

    const control = () => {
      controller.destroy();
      controller.init();
    };

    control();

    const unsubscribe = PrimeVideoTextRepository.subscribe(() => {
      control();
      unsubscribe();
    });
  }

  hideReactions(options = getDefaultOptions()) {
    if (!options.hideReactions) {
      return;
    }
    this.runFeatureWhenVariantResolved("hideReactions", () => {
      if (this.isVariantLegacy()) {
        this.hideLegacyReactions(options);
      } else if (this.isVariantNew()) {
        this.hideNewUiReactions(options);
      }
    });
  }

  hideLegacyReactions(options = getDefaultOptions()) {
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

      if (!this.markLegacyCenterOverlaysWrapper()) {
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
      }).observe(reactionsWrapper, OBSERVER_CONFIG);

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
    }).observe(this.player, OBSERVER_CONFIG);
  }

  hideNewUiReactions(options = getDefaultOptions()) {
    const renderStyle = () => {
      const hiddenSelectors =
        PrimeVideoTextRepository.generateReactionsContainerSelectors(
          this.player
        );
      const css = !options.showReactionsOnOverlay
        ? `
        ${hiddenSelectors} {
          display: none !important;
        }
      `
        : `
        ${hiddenSelectors} {
          visibility: hidden !important;
        }
        ${PrimeVideoTextRepository.generateReactionsContainerSelectors(this.player, true)} {
          visibility: visible !important;
        }
        `;
      upsertStyle(css, `ext-hideNewUiReactions-${this.player.id}`);
    };

    renderStyle();

    const unsubscribe = PrimeVideoTextRepository.subscribe(() => {
      renderStyle();
      unsubscribe();
    });
  }

  hideRecommendations(options = getDefaultOptions()) {
    if (!options.hideRecommendations) {
      return;
    }
    if (this.isVariantLegacy()) {
      this.hideLegacyRecommendations(options);
    } else if (this.isVariantNew()) {
      this.hideNewUiRecommendations(options);
    }
  }

  hideLegacyRecommendations(options = getDefaultOptions()) {
    if (!options.showRecommendationsOnOverlay) {
      if (!document.querySelector("#ext-hideRecommendations")) {
        const css = `
          [id^='dv-web-player']:not([data-is-jump-live-button-visible='true']) .atvwebplayersdk-BelowFold {
            display: none !important;
          }
        `;
        addStyle(css, "ext-hideRecommendations");
      }
    }

    // To avoid doing anything to 'Recommendations' when watching LiveTV
    const optionsWrapper = this.player.querySelector(
      ".atvwebplayersdk-options-wrapper"
    );
    if (options.useOnLiveTv && optionsWrapper) {
      const checkJumpLiveButtonStyles = () => {
        const jumpLiveButton = this.player.querySelector(
          ".atvwebplayersdk-jumptolive-button"
        );
        if (jumpLiveButton) {
          if (
            getComputedStyle(jumpLiveButton).display === "block" &&
            jumpLiveButton.style.display === ""
          ) {
            this.player.dataset.isJumpLiveButtonVisible = "true";
          } else {
            delete this.player.dataset.isJumpLiveButtonVisible;
          }
        } else {
          delete this.player.dataset.isJumpLiveButtonVisible;
        }
      };
      checkJumpLiveButtonStyles();
      new MutationObserver((_) => {
        checkJumpLiveButtonStyles();
      }).observe(optionsWrapper, { ...OBSERVER_CONFIG, attributes: true });
    }

    // Monitor whether BelowFold has been opened by the user
    let isOpenedByUser = false;
    const hideButtonSelector =
      ".atvwebplayersdk-BelowFold div:not(.atvwebplayersdk-carousel) > button:not([class^=generic-carousel-scroll]):has(span)";
    const stopAutoPlayButtonSelector =
      ".atvwebplayersdk-BelowFold div:not(.atvwebplayersdk-carousel) > button[aria-label]:not([class^=generic-carousel-scroll])";

    this.player.addEventListener("click", (e) => {
      if (
        e.target.closest(hideButtonSelector) ||
        e.target.closest(stopAutoPlayButtonSelector)
      ) {
        isOpenedByUser = false;
        return;
      }

      if (e.target.closest(".generic-carousel-scroll-handles")) {
        isOpenedByUser = true;
        return;
      }

      const belowFold = this.player.querySelector(".atvwebplayersdk-BelowFold");
      if (belowFold) {
        if (getComputedStyle(belowFold).position === "absolute") {
          isOpenedByUser = false;
          return;
        }
      }

      if (e.target.closest(".atvwebplayersdk-BelowFold")) {
        isOpenedByUser = true;
        setTimeout(() => {
          isOpenedByUser = false;
        }, 3000);
      }
    });

    const targetContainer =
      this.player.querySelector(
        "div:has(>.atvwebplayersdk-bottompanel-container)"
      ) ?? this.player;

    new MutationObserver((_) => {
      const hideButton = this.player.querySelector(hideButtonSelector);
      if (!hideButton) {
        return;
      }

      let _isOpenedByUser = isOpenedByUser;
      if (!options.showRecommendationsOnOverlay) {
        _isOpenedByUser = false;
      }

      // If useOnLiveTv is disabled, this will always be false
      const isJumpLiveButtonVisible =
        this.player.dataset.isJumpLiveButtonVisible === "true";

      if (!_isOpenedByUser && !isJumpLiveButtonVisible) {
        try {
          this.temporarilyDisableOverlay(options, 5000);
          const stopAutoPlayButton = this.player.querySelector(
            stopAutoPlayButtonSelector
          );
          if (stopAutoPlayButton) {
            stopAutoPlayButton.click();
          }
          hideButton.click();
        } catch (e) {
          console.log(e);
        }
      }
    }).observe(targetContainer, OBSERVER_CONFIG);
  }

  hideNewUiRecommendations(options = getDefaultOptions()) {
    const expandRecommendationsButtonSelector =
      "[data-nextup-ext-role='expand-recommendations-button']";
    const recommendationsButtonSelector =
      "[data-nextup-ext-role='recommendations-button']";
    const hideRecommendationsButtonSelector =
      "[data-nextup-ext-role='hide-recommendations-button']";
    const stopAutoPlayButtonSelector = "button[aria-label='Stop Autoplay']";
    const forwardButtonSelector =
      PrimeVideoTextRepository.generateForwardButtonSelectors(this.player);

    const renderStyle = () => {
      if (options.showRecommendationsOnOverlay) {
        return;
      }
      const css = `
        [id^='dv-web-player']:not([data-is-live-tv='true']) .atvwebplayersdk-carousel {
          display: none !important;
        }
        [id^='dv-web-player']:not([data-is-live-tv='true']) div.fw1kd31.fgmsvgp.fg426ew:has(.atvwebplayersdk-carousel) {
          display: none !important;
        }
        ${expandRecommendationsButtonSelector} {
          display: none !important;
        }
      `;
      addStyle(css, "ext-hideNewUiRecommendations");
    };

    renderStyle();

    let hideObserver;
    let liveTvVideoObserver;
    let liveTvForwardButtonObserver;
    let abortController;

    const markLiveTV = () => {
      if (!options.useOnLiveTv) {
        return;
      }
      if (!this.isLiveTvCandidate) {
        false;
      }
      if (liveTvVideoObserver) {
        liveTvVideoObserver.disconnect();
      }
      if (liveTvForwardButtonObserver) {
        liveTvForwardButtonObserver.disconnect();
      }

      liveTvVideoObserver = new MutationObserver(() => {
        const videos = this.player.querySelectorAll("video");
        if (videos.length < 2) {
          this.isLiveTvCandidate = false;
        } else {
          this.isLiveTvCandidate = true;
        }
      });

      const target =
        this.player.querySelector(".atvwebplayersdk-video-surface") ??
        this.player;
      liveTvVideoObserver.observe(target, OBSERVER_CONFIG);

      liveTvForwardButtonObserver = new MutationObserver(() => {
        const forwardButton = this.player.querySelector(forwardButtonSelector);
        if (!forwardButton) return;
        const isDisabled = forwardButton.hasAttribute("disabled");
        if (isDisabled) {
          this.player.dataset.isLiveTv = "true";
        } else {
          delete this.player.dataset.isLiveTv;
        }
      });

      liveTvForwardButtonObserver.observe(this.player, OBSERVER_CONFIG);
      this.tempAddElemToPlayer();
    };

    const hide = () => {
      if (hideObserver) {
        hideObserver.disconnect();
      }
      if (abortController) {
        abortController.abort();
        abortController = null;
      }

      abortController = new AbortController();
      const { signal } = abortController;
      let isOpenedByUser = false;

      this.player.addEventListener(
        "click",
        (e) => {
          if (e.target.closest(expandRecommendationsButtonSelector)) {
            isOpenedByUser = true;
            return;
          }

          if (e.target.closest(recommendationsButtonSelector)) {
            isOpenedByUser = true;
            return;
          }

          if (e.target.closest(".generic-carousel-scroll-handles")) {
            isOpenedByUser = true;
            return;
          }

          if (e.target.classList.contains("f1yl09d4")) {
            // A case where the user clicked the collapsed recommendations section at the bottom of the screen instead of the expand button
            isOpenedByUser = true;
            return;
          }

          isOpenedByUser = false;
        },
        { signal }
      );

      hideObserver = new MutationObserver(() => {
        const isLiveTv = this.player.dataset.isLiveTv === "true";
        if (isLiveTv) {
          return;
        }
        const hideButton = this.player.querySelector(
          hideRecommendationsButtonSelector
        );
        if (hideButton && !isOpenedByUser) {
          try {
            const stopAutoPlayButton = this.player.querySelector(
              stopAutoPlayButtonSelector
            );
            if (stopAutoPlayButton) {
              stopAutoPlayButton.click();
              console.log("Recommendations: stopAutoPlayButton clicked");
            }
            hideButton.click();
            console.log("Recommendations: hideButton clicked");
          } catch (e) {
            console.log(e);
          }
        }
      });

      hideObserver.observe(this.player, {
        ...OBSERVER_CONFIG,
        attributes: true,
        attributeFilter: ["data-nextup-ext-role"],
      });
    };

    markLiveTV();
    hide();

    const unsubscribe = PrimeVideoTextRepository.subscribe(() => {
      markLiveTV();
      hide();
      unsubscribe();
    });
  }

  hidePlaybackStartNotices(options = getDefaultOptions()) {
    if (!options.hideRating) {
      return;
    }
    if (!document.querySelector("#ext-hidePlaybackStartNotices")) {
      const css = `
        /* Legacy UI*/
        .atvwebplayersdk-regulatory-overlay {
          display: none !important;
        }
        /* New UI*/
        .atvwebplayersdk-maturity-ratings {
          display: none !important;
        }
        .atvwebplayersdk-photo-sensitivity {
          display: none !important;
        }
      `;
      addStyle(css, "ext-hidePlaybackStartNotices");
    }
  }

  preventsDarkening(options = getDefaultOptions()) {
    if (!options.preventsDarkening) {
      return;
    }
    this.runFeatureWhenVariantResolved("preventsDarkening", () => {
      if (this.isVariantLegacy()) {
        this.preventsLegacyDarkening(options);
      } else if (this.isVariantNew()) {
        this.preventsNewUiDarkening(options);
      }
    });
  }

  preventsLegacyDarkening(options = getDefaultOptions()) {
    if (!document.querySelector("#ext-preventsDarkening")) {
      /**
       * at amazon.co.jp
       * .fkpovp9 - before 2025/05/16
       * .f1makowq - after 2025/05/16
       * The style that hides .fkpovp9 will be removed in the future
       */
      const css = `
        div:has(>.atvwebplayersdk-regulatory-overlay) > div:not([data-non-darkening-overlay]),
        div:has(>.atvwebplayersdk-regulatory-overlay) > div:not([data-non-darkening-overlay]) > div{
          background: transparent !important;
        }
        .fkpovp9:has(~.atvwebplayersdk-regulatory-overlay),
        .f1makowq:has(~.atvwebplayersdk-regulatory-overlay) {
          display: none !important;
        }
        .atvwebplayersdk-BelowFold {
          background: transparent !important;
        }
      `;
      addStyle(css, "ext-preventsDarkening");
    }

    if (options.addOutlinesForTextsAndIcons) {
      if (!document.querySelector("#ext-addOutlinesForTexts")) {
        const cssForText = `
          .atvwebplayersdk-title-text {
            paint-order: stroke fill;
            -webkit-text-stroke: 0.05em black;
            font-weight: bold !important;
            text-shadow: 1px 1px 3px black;
          }
          .atvwebplayersdk-subtitle-text {
            paint-order: stroke fill;
            -webkit-text-stroke: 0.05em black;
            font-weight: bold !important;
            text-shadow: 1px 1px 3px black;
          }
          .atvwebplayersdk-timeindicator-text {
            paint-order: stroke fill;
            -webkit-text-stroke: 0.07em black;
            font-weight: bold !important;
            text-shadow: 1px 1px 2px black;
          }
          .atvwebplayersdk-timeindicator-text span {
            opacity: 1;
            font-weight: bold !important;
            text-shadow: 1px 1px 2px black;
          }
          .atvwebplayersdk-nexttitle-button div:not(:has(img)) {
            paint-order: stroke fill;
            -webkit-text-stroke: 0.07em black;
            font-weight: bold !important;
            text-shadow: 1px 1px 2px black;
          }
          .atvwebplayersdk-hideabletopbuttons-container button + div div,
          .atvwebplayersdk-playerclose-button + div div {
            paint-order: stroke fill;
            -webkit-text-stroke: 0.07em black;
            font-weight: bold !important;
            text-shadow: 1px 1px 2px black;
          }
          /* Next up*/
          .atvwebplayersdk-nextupcard-title, .atvwebplayersdk-nextupcardhide-button {
            paint-order: stroke fill;
            -webkit-text-stroke: 0.07em black;
            font-weight: bold !important;
            text-shadow: 1px 1px 2px black;
          }
          /* Reactions */
          .atvwebplayersdk-player-container div:has(> div > button:nth-child(2):last-child):has(div > button div[style*='center center no-repeat']) div:not([style]):not(:has([style])) {
            paint-order: stroke fill;
            -webkit-text-stroke: 0.07em black;
            font-weight: bold !important;
            text-shadow: 1px 1px 2px black;
          }
          /* Recommendations */
          .atvwebplayersdk-BelowFold span, .atvwebplayersdk-BelowFold div {
            paint-order: stroke fill;
            -webkit-text-stroke: 0.07em black;
            font-weight: bold !important;
            text-shadow: 1px 1px 2px black;
          }
        `;
        addStyle(cssForText, "ext-addOutlinesForTexts");
      }

      if (!document.querySelector("#ext-addOutlinesForIcons")) {
        const cssForImg = `
          .atvwebplayersdk-hideabletopbuttons-container button img,
          .atvwebplayersdk-playerclose-button img {
            filter: drop-shadow(1px 0 0 black) drop-shadow(-1px 0 0 black) drop-shadow(0 1px 0 black) drop-shadow(0 -1px 0 black);
          }
          .nextup-ext-opt-btn img {
            filter: sepia(100%) saturate(2000%) hue-rotate(120deg) drop-shadow(1px 0 0 black) drop-shadow(-1px 0 0 black) drop-shadow(0 1px 0 black) drop-shadow(0 -1px 0 black) !important;
          }
          .atvwebplayersdk-fastseekback-button img,
          .atvwebplayersdk-playpause-button img,
          .atvwebplayersdk-fastseekforward-button img {
            filter: drop-shadow(1px 0 0 black) drop-shadow(-1px 0 0 black) drop-shadow(0 1px 0 black) drop-shadow(0 -1px 0 black);
          }
          .atvwebplayersdk-nexttitle-button img {
            filter: drop-shadow(1px 0 0 black) drop-shadow(-1px 0 0 black) drop-shadow(0 1px 0 black) drop-shadow(0 -1px 0 black);
          }
          .nextup-ext-fastseekback-button img,
          .nextup-ext-playpause-button img,
          .nextup-ext-fastseekforward-button img {
            opacity: 0.8 !important;;
            filter: drop-shadow(1px 0 0 black) drop-shadow(-1px 0 0 black) drop-shadow(0 1px 0 black) drop-shadow(0 -1px 0 black);
          }
        `;
        addStyle(cssForImg, "ext-addOutlinesForIcons");
      }

      if (
        options.forceHighestResolution_xhook &&
        options.showVideoResolution_xhook
      ) {
        if (!document.querySelector("#ext-preventsDarkening_ResolutionInfo")) {
          const cssForResolutionInfo = `
          .nextup-ext-resolution-info {
            paint-order: stroke fill;
            -webkit-text-stroke: 0.07em black;
            font-weight: bold !important;
            text-shadow: 1px 1px 2px black;
          }
        `;
          addStyle(
            cssForResolutionInfo,
            "ext-preventsDarkening_ResolutionInfo"
          );
        }
      }
    }

    if (options.addShadowsToSeekBar) {
      if (!document.querySelector("#ext-addShadowsToSeekBar")) {
        const cssForShadows = `
          .atvwebplayersdk-seekbar-range {
            box-shadow: 2px 2px 6px #888;
          }
          .atvwebplayersdk-seekbar-range + span {
            border-right: 5px solid rgb(85, 85, 85);
          }
          .atvwebplayersdk-progress-bar-handle {
            box-shadow: 0px 0px 5px #222;
          }
        `;
        addStyle(cssForShadows, "ext-addShadowsToSeekBar");
      }
    }
  }

  preventsNewUiDarkening(options = getDefaultOptions()) {
    if (!document.querySelector("#ext-preventsDarkening")) {
      // .feqqns3 - Darkening overlay for the top area
      // .f10znfo1 - Darkening overlay for the bottom area
      // .fe9293t - Darkening overlay for the bottom area when the Recommendations carousel is expanded
      const css = `
        .atvwebplayersdk-player-container .feqqns3,
        .atvwebplayersdk-player-container .f10znfo1,
        .atvwebplayersdk-player-container .fe9293t {
          display: none !important;
        }
      `;
      addStyle(css, "ext-preventsDarkening");
    }

    const addOutlinesForTextsAndIcons = () => {
      if (!options.addOutlinesForTextsAndIcons) {
        return;
      }

      const cssForText = `
          /* timing-info appears at the top of LiveTV */
          .atvwebplayersdk-title-text,
          .atvwebplayersdk-episode-info,
          .atvwebplayersdk-timing-info {
            paint-order: stroke fill;
            -webkit-text-stroke: 0.05em black;
            font-weight: bold !important;
            text-shadow: 1px 1px 3px black;
          }
          ${PrimeVideoTextRepository.generateCloseButtonTooltipSelectors(
            this.player
          )},
          ${PrimeVideoTextRepository.generateSubtitlesButtonTooltipSelectors(this.player)},
          ${PrimeVideoTextRepository.generateMuteToggleButtonTooltipSelectors(this.player)},
          ${PrimeVideoTextRepository.generatePictureInPictureToggleButtonTooltipSelectors(this.player)},
          ${PrimeVideoTextRepository.generateFullscreenToggleButtonTooltipSelectors(this.player)},
          ${PrimeVideoTextRepository.generateExtOptionButtonTooltipSelectors(this.player)},
          ${PrimeVideoTextRepository.generateSettingsButtonTooltipSelectors(this.player)},
          ${PrimeVideoTextRepository.generateTimeIndicatorTextSelectors(this.player)},
          ${PrimeVideoTextRepository.generateNextEpisodeButtonSelectors(this.player)},
          ${PrimeVideoTextRepository.generateSkipIntroButtonSelectors(this.player)},
          ${PrimeVideoTextRepository.generateReactionsDescendantSelectors(this.player)},
          [data-nextup-ext-role="nextup-series-title"],
          [data-nextup-ext-role="nextup-episode-title"],
          [data-nextup-ext-role="accept-nextup-button"],
          [data-nextup-ext-role="dismiss-nextup-button"],
          [data-nextup-ext-role="expand-recommendations-button"],
          [data-nextup-ext-role="hide-recommendations-button"],
          button:has(> .atvweb-inplayback-carousel-card):not(:hover) .atvweb-inplayback-carousel-card-title,
          [data-nextup-ext-role="resolution-info"]
          {
            paint-order: stroke fill;
            -webkit-text-stroke: 0.07em black;
            font-weight: bold !important;
            text-shadow: 1px 1px 2px black;
          }
          ${PrimeVideoTextRepository.generateNextEpisodeButtonSelectors(this.player)},
          ${PrimeVideoTextRepository.generateSkipIntroButtonSelectors(this.player)},
          ${PrimeVideoTextRepository.generateReactionsSelectors(this.player)} {
            background: transparent !important;
          }
          ${PrimeVideoTextRepository.generateHoveredNextEpisodeButtonSelectors(this.player)},
          ${PrimeVideoTextRepository.generateHoveredSkipIntroButtonSelectors(this.player)} {
            color: unset;
            background: transparent !important;
          }
          ${PrimeVideoTextRepository.generateHoveredReactionsSelectors(this.player)} {
            color: unset;
            background: rgba(255, 255, 255, 0.3) !important;
          }
          [data-nextup-ext-role="accept-nextup-button"],
          [data-nextup-ext-role="dismiss-nextup-button"],
          [data-nextup-ext-role="expand-recommendations-button"],
          [data-nextup-ext-role="expand-recommendations-button"]:not(:disabled):hover,
          [data-nextup-ext-role="hide-recommendations-button"],
          [data-nextup-ext-role="hide-recommendations-button"]:not(:disabled):hover {
            color: white !important;
          }
        `;
      upsertStyle(cssForText, `ext-addOutlinesForTexts-${this.player.id}`);

      const cssForImg = `
          ${PrimeVideoTextRepository.generateCloseButtonSelectors(this.player)},
          ${PrimeVideoTextRepository.generateSubtitlesButtonSelectors(this.player)},
          ${PrimeVideoTextRepository.generateMuteToggleButtonSelectors(this.player)},
          ${PrimeVideoTextRepository.generatePictureInPictureToggleButtonSelectors(this.player)},
          ${PrimeVideoTextRepository.generateFullscreenToggleButtonSelectors(this.player)},
          ${PrimeVideoTextRepository.generateSettingsButtonSelectors(this.player)} {
            background: transparent !important;
            filter: drop-shadow(1px 0 0 black) drop-shadow(-1px 0 0 black) drop-shadow(0 1px 0 black) drop-shadow(0 -1px 0 black);
          }
          ${PrimeVideoTextRepository.generateExtOptionButtonSelectors(this.player)} {
            background: transparent !important;
            filter: sepia(100%) saturate(2000%) hue-rotate(120deg) drop-shadow(1px 0 0 black) drop-shadow(-1px 0 0 black) drop-shadow(0 1px 0 black) drop-shadow(0 -1px 0 black) !important;
          }
          ${PrimeVideoTextRepository.generatePlaybackToggleButtonSelectors(this.player)},
          ${PrimeVideoTextRepository.generateBackwardButtonSelectors(this.player)},
          ${PrimeVideoTextRepository.generateForwardButtonSelectors(this.player)} {
            background: transparent !important;
            filter: drop-shadow(1px 0 0 black) drop-shadow(-1px 0 0 black) drop-shadow(0 1px 0 black) drop-shadow(0 -1px 0 black);
          }
          ${PrimeVideoTextRepository.generateHoveredPlaybackToggleButtonIconSelectors(this.player)} {
            filter: unset !important;
          }
          ${PrimeVideoTextRepository.generateReactionsIconSelectors(this.player)},
          ${PrimeVideoTextRepository.generateHoveredReactionsIconSelectors(this.player)} {
            filter: drop-shadow(1px 0 0 black) drop-shadow(-1px 0 0 black) drop-shadow(0 1px 0 black) drop-shadow(0 -1px 0 black);
          }
          /* LiveTV - The separator between episode-info and timing-info */
          .atvwebplayersdk-bullet-separator {
            filter: drop-shadow(1px 0 0 black) drop-shadow(-1px 0 0 black) drop-shadow(0 1px 0 black) drop-shadow(0 -1px 0 black);
          }
        `;
      upsertStyle(cssForImg, `ext-addOutlinesForIcons-${this.player.id}`);
    };

    const addShadowsToSeekBar = () => {
      if (!options.addShadowsToSeekBar) {
        return;
      }
      const cssForShadows = `
        ${PrimeVideoTextRepository.generateSeekBarSelectors(this.player)} {
          box-shadow: 2px 2px 6px #888;
        }
        ${PrimeVideoTextRepository.generateSeekBarPlayedRangeSelectors(this.player)} {
          border-right: 5px solid rgb(85, 85, 85);
        }
        .atvwebplayersdk-progress-bar-handle {
          box-shadow: 0px 0px 5px #222;
        }
      `;
      upsertStyle(cssForShadows, `ext-addShadowsToSeekBar-${this.player.id}`);
    };

    addOutlinesForTextsAndIcons();
    addShadowsToSeekBar();

    const unsubscribe = PrimeVideoTextRepository.subscribe(() => {
      addOutlinesForTextsAndIcons();
      addShadowsToSeekBar();
      unsubscribe();
    });
  }

  moveCenterButtonsToBottom(options = getDefaultOptions()) {
    if (!options.moveCenterButtonsToBottom) {
      return;
    }
    this.runFeatureWhenVariantResolved("moveCenterButtonsToBottom", () => {
      if (this.isVariantLegacy()) {
        this.moveLegacyCenterButtonsToBottom(options);
      }
    });
  }

  moveLegacyCenterButtonsToBottom(options = getDefaultOptions()) {
    if (options.addVideoControllerToBottomLeft) {
      this.addLegacyVideoControllerToBottomLeft(options);
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
        element.style.setProperty("width", newWidth + "px", "important");
        element.style.setProperty("height", newHeight + "px", "important");
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

  addLegacyVideoControllerToBottomLeft(options = getDefaultOptions()) {
    if (!options.addVideoControllerToBottomLeft) {
      return;
    }

    const imgDataUrlStrObj = {
      fastSeekBack: [
        "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2NyIgaGVpZ2",
        "h0PSI2NyIgZmlsbD0ibm9uZSIgdmlld0JveD0iMCAwIDY3IDY3Ij48cGF0aCBmaWxsPSIjZmZmIiBmaWxsLXJ1bGU9ImV2ZW5vZG",
        "QiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZD0iTTMzLjUgMEM1MiAwIDY3IDE1IDY3IDMzLjVTNTIgNjcgMzMuNSA2NyAwIDUyIDAgMz",
        "MuNWMuMDMtMS40IDEuMTctMi41MyAyLjU4LTIuNTMgMS40IDAgMi41NSAxLjEzIDIuNTcgMi41MyAwIDE1LjY1IDEyLjcgMjguMz",
        "UgMjguMzUgMjguMzUgMTUuNjYgMCAyOC4zNS0xMi43IDI4LjM1LTI4LjM1IDAtMTUuNjYtMTIuNjktMjguMzUtMjguMzUtMjguMz",
        "VoLS4wNGMtNyAwLTEzLjc2IDIuNjEtMTguOTQgNy4zLS40Ni40Mi0uOTEuODUtMS4zNCAxLjI5aDYuNThjMS40MiAwIDIuNTcgMS",
        "4xNiAyLjU3IDIuNTggMCAxLjQyLTEuMTUgMi41OC0yLjU3IDIuNThINi4wMWMtMS40MiAwLTIuNTctMS4xNi0yLjU3LTIuNThWMi",
        "41OEMzLjQ0IDEuMTUgNC41OSAwIDYuMDEgMGMxLjQzIDAgMi41OCAxLjE1IDIuNTggMi41OHY4LjUyYy43OC0uODYgMS42MS0xLj",
        "cgMi40Ny0yLjQ3QTMzLjQwNyAzMy40MDcgMCAwIDEgMzMuNDYgMGguMDR6bS40OCA0MS4zNGMtMS42LTIuMjEtMi01LjItMi03Lj",
        "g1IDAtMi42NS40LTUuNjMgMi03LjgzIDEuNDQtMS45NyAzLjQ3LTIuODQgNS44OC0yLjg0IDIuNDEgMCA0LjQyLjg3IDUuODYgMi",
        "44NCAxLjYxIDIuMjEgMi4wMyA1LjE2IDIuMDMgNy44MyAwIDIuNjYtLjQgNS42NC0yIDcuODUtMS40MyAxLjk3LTMuNDcgMi44NC",
        "01Ljg5IDIuODQtMi40MSAwLTQuNDUtLjg2LTUuODgtMi44NHptLTkuNzMtMTIuNzdsLTUgMS41OHYtNC4yMWw1Ljg3LTIuNjVoNC",
        "4yOHYyMC40N2gtNS4xNVYyOC41N3ptMTcuNjEgOS45NmMuNjEtMS4zMy42OC0zLjYuNjgtNS4wNHMtLjA3LTMuNy0uNjgtNS4wMm",
        "MtLjQtLjg2LTEuMDQtMS4yOS0yLTEuMjktLjk1IDAtMS41OS40Mi0xLjk5IDEuMjktLjYxIDEuMzItLjY4IDMuNTgtLjY4IDUuMD",
        "IgMCAxLjQ0LjA3IDMuNzEuNjggNS4wNC40Ljg3IDEuMDQgMS4yOSAxLjk5IDEuMjkuOTYgMCAxLjYtLjQyIDItMS4yOXoiLz48L3",
        "N2Zz4=",
      ].join(""),
      play: [
        "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2NyIgaGVpZ2",
        "h0PSI2NyIgZmlsbD0ibm9uZSIgdmlld0JveD0iMCAwIDY3IDY3Ij48cGF0aCBmaWxsPSIjZmZmIiBkPSJNMjAuMjggOS42NWMtMi",
        "4yMDUtMS4yNjgtNC4wMjYtLjIyOC00LjAyNiAyLjMwN3Y0My44MDVjMCAyLjUzNSAxLjgyIDMuNTc0IDQuMDI3IDIuMzA3bDM4Lj",
        "Q3MS0yMS45MDNhMi41NTYgMi41NTYgMCAwIDAgMS4wOTQtLjkzNSAyLjUxNCAyLjUxNCAwIDAgMCAwLTIuNzQzIDIuNTU2IDIuNT",
        "U2IDAgMCAwLTEuMDkzLS45MzZMMjAuMjggOS42NXoiLz48L3N2Zz4=",
      ].join(""),
      pause: [
        "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2NyIgaGVpZ2",
        "h0PSI2NyIgZmlsbD0ibm9uZSIgdmlld0JveD0iMCAwIDY3IDY3Ij48cGF0aCBmaWxsPSIjZmZmIiBmaWxsLXJ1bGU9ImV2ZW5vZG",
        "QiIGQ9Ik00Ni4zMzIgNS43NzNhNC4xMjUgNC4xMjUgMCAwIDAtNC4xMjUgNC4xMjV2NDYuNzVhNC4xMjcgNC4xMjcgMCAwIDAgNC",
        "4xMjUgNC4xMjUgNC4xMjcgNC4xMjcgMCAwIDAgNC4xMjUtNC4xMjVWOS44OThhNC4xMjUgNC4xMjUgMCAwIDAtNC4xMjUtNC4xMj",
        "V6TTI1LjcwNyA5Ljg5OHY0Ni43NWE0LjEyNSA0LjEyNSAwIDEgMS04LjI1IDBWOS44OThhNC4xMjMgNC4xMjMgMCAwIDEgNC4xMj",
        "UtNC4xMjUgNC4xMjMgNC4xMjMgMCAwIDEgNC4xMjUgNC4xMjV6IiBjbGlwLXJ1bGU9ImV2ZW5vZGQiLz48L3N2Zz4=",
      ].join(""),
      fastSeekForward: [
        "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2NyIgaGVpZ2",
        "h0PSI2NyIgZmlsbD0ibm9uZSIgdmlld0JveD0iMCAwIDY3IDY3Ij48cGF0aCBmaWxsPSIjZmZmIiBmaWxsLXJ1bGU9ImV2ZW5vZG",
        "QiIGQ9Ik0zMy41IDBDMTUgMCAwIDE1IDAgMzMuNVMxNSA2NyAzMy41IDY3IDY3IDUyIDY3IDMzLjVhMi41ODMgMi41ODMgMCAwID",
        "AtMi41OC0yLjUzYy0xLjQgMC0yLjU1IDEuMTMtMi41NyAyLjUzIDAgMTUuNjYtMTIuNjkgMjguMzUtMjguMzUgMjguMzUtMTUuNj",
        "UgMC0yOC4zNS0xMi43LTI4LjM1LTI4LjM1IDAtMTUuNjYgMTIuNy0yOC4zNSAyOC4zNS0yOC4zNSA3LjMgMCAxMy45NiAyLjc2ID",
        "E4Ljk5IDcuMy40Ni40Mi45Ljg1IDEuMzQgMS4yOWgtNi41OWEyLjU4IDIuNTggMCAwIDAgMCA1LjE2aDEzLjc1YzEuNDIgMCAyLj",
        "U3LTEuMTYgMi41Ny0yLjU4VjIuNThjMC0xLjQzLTEuMTUtMi41OC0yLjU3LTIuNTgtMS40MyAwLTIuNTggMS4xNS0yLjU4IDIuNT",
        "h2OC41MmMtLjc4LS44Ny0xLjYxLTEuNy0yLjQ3LTIuNDhBMzMuNDQ2IDMzLjQ0NiAwIDAgMCAzMy41NCAwaC0uMDR6bS40OCA0MS",
        "4zNGMtMS42LTIuMjEtMi01LjItMi03Ljg1IDAtMi42NS40LTUuNjMgMi03LjgzIDEuNDQtMS45NyAzLjQ3LTIuODQgNS44OC0yLj",
        "g0IDIuNDEgMCA0LjQyLjg3IDUuODYgMi44NCAxLjYxIDIuMjEgMi4wMyA1LjE2IDIuMDMgNy44MyAwIDIuNjYtLjQgNS42NC0yID",
        "cuODUtMS40MyAxLjk3LTMuNDcgMi44NC01Ljg5IDIuODQtMi40MSAwLTQuNDUtLjg3LTUuODgtMi44NHptLTkuNzMtMTIuNzdsLT",
        "UgMS41OHYtNC4yMWw1Ljg3LTIuNjVoNC4yOHYyMC40N2gtNS4xNVYyOC41N3ptMTcuNjEgOS45NmMuNjEtMS4zMy42OC0zLjYuNj",
        "gtNS4wNHMtLjA3LTMuNy0uNjgtNS4wMmMtLjQtLjg3LTEuMDQtMS4yOS0yLTEuMjktLjk1IDAtMS41OS40Mi0xLjk5IDEuMjktLj",
        "YxIDEuMzItLjY4IDMuNTgtLjY4IDUuMDIgMCAxLjQ0LjA3IDMuNzEuNjggNS4wNC40Ljg2IDEuMDQgMS4yOCAxLjk5IDEuMjguOT",
        "YgMCAxLjYtLjQyIDItMS4yOHoiLz48L3N2Zz4=",
      ].join(""),
    };

    const buttonObj = {
      fastSeekBack: null,
      playPause: null,
      fastSeekForward: null,
    };

    const addEventListenerForController = () => {
      (() => {
        const fastSeekBackButton = buttonObj.fastSeekBack;
        if (!fastSeekBackButton) {
          return;
        }
        if (fastSeekBackButton.classList.contains("event-listener-added")) {
          return;
        }
        fastSeekBackButton.classList.add("event-listener-added");

        fastSeekBackButton.addEventListener("click", () => {
          const video = getVisibleVideo();
          if (video) {
            video.currentTime = video.currentTime - 10;
          }
        });
      })();

      (() => {
        const playPauseButton = buttonObj.playPause;
        if (!playPauseButton) {
          return;
        }
        if (playPauseButton.classList.contains("event-listener-added")) {
          return;
        }
        playPauseButton.classList.add("event-listener-added");

        playPauseButton.addEventListener("click", () => {
          const video = getVisibleVideo();
          if (!video) {
            return;
          }
          const img = playPauseButton.querySelector("img");
          if (video.paused) {
            video.play();
            img.src = imgDataUrlStrObj.play;
          } else {
            video.pause();
            img.src = imgDataUrlStrObj.pause;
          }
        });

        const video = getVisibleVideo();
        if (video) {
          const img = playPauseButton.querySelector("img");
          video.addEventListener("pause", () => {
            img.src = imgDataUrlStrObj.play;
          });
          video.addEventListener("play", () => {
            img.src = imgDataUrlStrObj.pause;
          });
        }
      })();

      (() => {
        const fastSeekForwardButton = buttonObj.fastSeekForward;
        if (!fastSeekForwardButton) {
          return;
        }
        if (fastSeekForwardButton.classList.contains("event-listener-added")) {
          return;
        }
        fastSeekForwardButton.classList.add("event-listener-added");

        fastSeekForwardButton.addEventListener("click", () => {
          const video = getVisibleVideo();
          if (video) {
            video.currentTime = video.currentTime + 10;
          }
        });
      })();
    };

    const adjustElementSize = (element) => {
      if (!element) {
        return;
      }

      const timeindicator = this.player.querySelector(
        ".atvwebplayersdk-timeindicator-text"
      );
      if (timeindicator) {
        const size = getComputedStyle(timeindicator).fontSize;
        if (parseInt(size) > 5) {
          element.style.setProperty("width", size, "important");
          element.style.setProperty("height", size, "important");
          return;
        }
      }

      const elementComputedStyle = window.getComputedStyle(element);
      const width = parseFloat(elementComputedStyle.width);
      const height = parseFloat(elementComputedStyle.height);
      const newWidth = width * 0.3;
      const newHeight = height * 0.3;
      element.style.setProperty("width", newWidth + "px", "important");
      element.style.setProperty("height", newHeight + "px", "important");
    };

    const addButton = (className, controllerContainer) => {
      if (this.player.getElementsByClassName(className).length) {
        return;
      }

      const newButton = document.createElement("button");
      newButton.classList.add(className);
      const img = document.createElement("img");
      newButton.append(img);
      controllerContainer.append(newButton);

      if (className.includes("fastseekback")) {
        buttonObj.fastSeekBack = newButton;
        img.src = imgDataUrlStrObj.fastSeekBack;
      } else if (className.includes("playpause")) {
        buttonObj.playPause = newButton;
        img.src = imgDataUrlStrObj.pause;
        setTimeout(() => {
          const video = getVisibleVideo();
          if (video.paused) {
            img.src = imgDataUrlStrObj.play;
          } else {
            img.src = imgDataUrlStrObj.pause;
          }
        }, 3000);
      } else if (className.includes("fastseekforward")) {
        buttonObj.fastSeekForward = newButton;
        img.src = imgDataUrlStrObj.fastSeekForward;
      }

      addEventListenerForController();
      const fn = () => {
        newButton.style.width = "";
        newButton.style.height = "";
        adjustElementSize(newButton);
      };
      fn();
      setTimeout(fn, 3000);
    };

    const observer = (_, _observer) => {
      const infoContainer = this.player.querySelector(
        "div:has(> .atvwebplayersdk-timeindicator-text)"
      );
      if (!infoContainer) {
        return;
      }
      if (_observer) {
        _observer.disconnect();
      }

      const controllerContainer = document.createElement("div");
      controllerContainer.classList.add(
        "nextup-ext-video-controller-container"
      );
      controllerContainer.style.display = "flex";
      controllerContainer.style.opacity = 0.8;
      infoContainer.prepend(controllerContainer);

      addButton("nextup-ext-fastseekback-button", controllerContainer);
      addButton("nextup-ext-playpause-button", controllerContainer);
      addButton("nextup-ext-fastseekforward-button", controllerContainer);

      if (!document.querySelector("#ext-hideCenterButtons-2")) {
        const css = `
          .atvwebplayersdk-fastseekback-button {
            visibility: hidden !important;
          }
          .atvwebplayersdk-playpause-button {
            visibility: hidden !important;
          }
          .atvwebplayersdk-fastseekforward-button {
            visibility: hidden !important;
          }
        `;
        addStyle(css, "ext-hideCenterButtons-2");
      }

      new MutationObserver((_, _observer2) => {
        if (
          !this.player.querySelector(".nextup-ext-video-controller-container")
        ) {
          _observer2.disconnect();
          observer();
        }
      }).observe(this.player, OBSERVER_CONFIG);
    };

    new MutationObserver(observer).observe(this.player, OBSERVER_CONFIG);

    window.addEventListener("resize", () => {
      for (const [_, button] of Object.entries(buttonObj)) {
        if (button) {
          button.style.width = "";
          button.style.height = "";
          adjustElementSize(button);
        }
      }
    });
  }

  hideXRay(options = getDefaultOptions()) {
    if (!options.hideXRay) {
      return;
    }
    if (!document.querySelector("#ext-hideXRay")) {
      const css = `
        .xrayQuickView {
          display: none !important;
        }
      `;
      addStyle(css, "ext-hideXRay");
    }
  }

  hideVariousTextAndButtons(options = getDefaultOptions()) {
    const relatedOptions = [
      options.hideTitle,
      options.hideEpisodeTitle,
      options.hideVariousButtonsInTopRight,
      options.hideSeekBar,
      options.hidePlaybackTime,
      options.hideCenterButtons,
      options.hideNextEpisodeButton,
      options.tweakHideSkipIntroButton,
      options.tweakShowVideoResolutionInfo,
    ];
    const shouldRun = relatedOptions.some((opt) => opt);
    if (!shouldRun) {
      return;
    }

    const isEditable = (elem) => {
      if (!elem || !(elem instanceof Element)) {
        return false;
      }
      if (elem.isContentEditable) {
        return true;
      }
      return /^(input|textarea|select)$/i.test(elem.tagName);
    };

    const pressed = {
      ctrlKey: false,
      altKey: false,
      shiftKey: false,
      metaKey: false,
      code: false,
    };
    let shortcutkeyOptions = options.shortcuts.temporarilyShowHidden;

    const resetPressedState = () => {
      pressed.ctrlKey = false;
      pressed.altKey = false;
      pressed.shiftKey = false;
      pressed.metaKey = false;
      pressed.code = false;
    };

    const updatePressedState = async (e, isDown) => {
      pressed.ctrlKey = !!e.ctrlKey;
      pressed.altKey = !!e.altKey;
      pressed.shiftKey = !!e.shiftKey;
      pressed.metaKey = !!e.metaKey;

      shortcutkeyOptions = (await getOptions()).shortcuts.temporarilyShowHidden;
      if (shortcutkeyOptions.userDefinedBindingEnabled) {
        const code = e.code;
        const isAlpha = /^Key[A-Z]$/.test(code);
        const isDigit = /^Digit[0-9]$/.test(code);
        if (!isAlpha && !isDigit) {
          return;
        }
        const binding = shortcutkeyOptions.binding;
        if (code === binding.code) {
          pressed.code = isDown;
        }
      } else {
        pressed.code = false;
      }
    };

    const isShortcutKeyActive = () => {
      if (!shortcutkeyOptions.userDefinedBindingEnabled) {
        if (isApplePlatform()) {
          return pressed.metaKey || pressed.shiftKey ? true : false;
        } else {
          return pressed.ctrlKey || pressed.shiftKey ? true : false;
        }
      }

      const binding = shortcutkeyOptions.binding;

      if (
        pressed.ctrlKey === binding.ctrlKey &&
        pressed.altKey === binding.altKey &&
        pressed.shiftKey === binding.shiftKey &&
        pressed.metaKey === binding.metaKey &&
        pressed.code
      ) {
        return true;
      } else {
        return false;
      }
    };

    const isPlayerOpen = () => {
      const video = getVisibleVideo();
      return video ? true : false;
    };

    window.addEventListener("blur", () => {
      resetPressedState();
    });

    document.addEventListener("visibilitychange", (e) => {
      if (document.visibilityState !== "visible") {
        resetPressedState();
      }
    });

    document.body.addEventListener("keydown", async (e) => {
      if (!isPlayerOpen()) {
        return;
      }
      if (e.repeat || isEditable(e.target)) {
        return;
      }
      await updatePressedState(e, true);
    });

    document.body.addEventListener("keyup", async (e) => {
      if (!isPlayerOpen()) {
        return;
      }
      if (isEditable(e.target)) {
        return;
      }
      await updatePressedState(e, false);
    });

    const show = (elem) => {
      if (!elem || !(elem instanceof Element)) {
        return false;
      }
      elem.classList.add("nextup-ext-temp-show");
    };

    const hide = (elem) => {
      if (!elem || !(elem instanceof Element)) {
        return false;
      }
      elem.classList.remove("nextup-ext-temp-show");
    };

    let hideTimer = null;
    this.player.addEventListener("mousemove", (e) => {
      if (isShortcutKeyActive()) {
        this.player.dataset.nextupExtTempShow = "true";
        if (hideTimer) {
          clearTimeout(hideTimer);
        }
        hideTimer = setTimeout(() => {
          delete this.player.dataset.nextupExtTempShow;
        }, 300);
      } else {
        delete this.player.dataset.nextupExtTempShow;
      }
    });

    const hideTitle = () => {
      if (!options.hideTitle) {
        return;
      }

      if (!document.querySelector("#ext-hideTitle")) {
        const css = `
          .atvwebplayersdk-title-text {
            opacity: 0 !important;
          }
          [data-nextup-ext-temp-show="true"] .atvwebplayersdk-title-text {
            opacity: 1 !important;
          }
        `;
        addStyle(css, "ext-hideTitle");
      }
    };

    const hideEpisodeTitle = () => {
      if (!options.hideEpisodeTitle) {
        return;
      }

      if (!document.querySelector("#ext-hideEpisodeTitle")) {
        const css = `
          .atvwebplayersdk-subtitle-text {
            opacity: 0 !important;
          }
          [data-nextup-ext-temp-show="true"] .atvwebplayersdk-subtitle-text {
            opacity: 1 !important;
          }
        `;
        addStyle(css, "ext-hideEpisodeTitle");
      }
    };

    const hideVariousButtonsInTopRight = () => {
      if (!options.hideVariousButtonsInTopRight) {
        return;
      }

      if (!document.querySelector("#ext-hideVariousButtonsInTopRight")) {
        const css = `
          .atvwebplayersdk-hideabletopbuttons-container {
            opacity: 0 !important;
          }
          .atvwebplayersdk-closebutton-wrapper {
            opacity: 0 !important;
          }
          [data-nextup-ext-temp-show="true"] .atvwebplayersdk-hideabletopbuttons-container {
            opacity: 1 !important;
          }
          [data-nextup-ext-temp-show="true"] .atvwebplayersdk-closebutton-wrapper {
            opacity: 1 !important;
          }
        `;
        addStyle(css, "ext-hideVariousButtonsInTopRight");
      }
    };

    const hideSeekBar = () => {
      if (!options.hideSeekBar) {
        return;
      }

      if (!document.querySelector("#ext-hideSeekBar")) {
        const css = `
          .atvwebplayersdk-seekbar-container {
            visibility: hidden !important;
          }
          [data-nextup-ext-temp-show="true"] .atvwebplayersdk-seekbar-container {
            visibility: visible !important;
          }
        `;
        addStyle(css, "ext-hideSeekBar");
      }
    };

    const hidePlaybackTime = () => {
      if (!options.hidePlaybackTime) {
        return;
      }

      if (!document.querySelector("#ext-hidePlaybackTime")) {
        const css = `
          .atvwebplayersdk-timeindicator-text {
            visibility: hidden !important;
          }
          [data-nextup-ext-temp-show="true"] .atvwebplayersdk-timeindicator-text {
            visibility: visible !important;
          }
        `;
        addStyle(css, "ext-hidePlaybackTime");
      }
    };

    const hideCenterButtons = () => {
      if (!options.hideCenterButtons) {
        return;
      }

      if (!document.querySelector("#ext-hideCenterButtons")) {
        const css1 = `
          .atvwebplayersdk-fastseekback-button {
            visibility: hidden !important;
          }
          .atvwebplayersdk-playpause-button {
            visibility: hidden !important;
          }
          .atvwebplayersdk-fastseekforward-button {
            visibility: hidden !important;
          }
        `;
        addStyle(css1, "ext-hideCenterButtons1");

        if (!options.addVideoControllerToBottomLeft) {
          const css2 = `
            [data-nextup-ext-temp-show="true"] .atvwebplayersdk-fastseekback-button {
              visibility: visible !important;
            }
            [data-nextup-ext-temp-show="true"] .atvwebplayersdk-playpause-button {
              visibility: visible !important;
            }
            [data-nextup-ext-temp-show="true"] .atvwebplayersdk-fastseekforward-button {
              visibility: visible !important;
            }
        `;
          addStyle(css2, "ext-hideCenterButtons2");
        } else {
          const css3 = `
            .nextup-ext-video-controller-container {
              visibility: hidden !important;
            }
            [data-nextup-ext-temp-show="true"] .nextup-ext-video-controller-container {
              visibility: visible !important;
            }
        `;
          addStyle(css3, "ext-hideCenterButtons3");
        }
      }
    };

    const hideNextEpisodeButton = () => {
      if (!options.hideNextEpisodeButton) {
        return;
      }

      if (!document.querySelector("#ext-hideNextEpisodeButton")) {
        const css = `
          .atvwebplayersdk-nexttitle-button {
            visibility: hidden !important;
          }
          [data-nextup-ext-temp-show="true"] .atvwebplayersdk-nexttitle-button {
            visibility: visible !important;
          }
        `;
        addStyle(css, "ext-hideNextEpisodeButton");
      }
    };

    const tweakHideSkipIntroButton = () => {
      if (!options.hideSkipIntroBtn || !options.tweakHideSkipIntroButton) {
        return;
      }

      if (!document.querySelector("#ext-hideSkipIntroButton")) {
        const css = `
          .atvwebplayersdk-skipelement-button {
            visibility: hidden !important;
          }
          [data-nextup-ext-temp-show="true"] .atvwebplayersdk-skipelement-button {
            visibility: visible !important;
          }
        `;
        addStyle(css, "ext-hideSkipIntroButton");
      }
    };

    const tweakShowVideoResolutionInfo = () => {
      if (
        !options.showVideoResolution_xhook ||
        !options.tweakShowVideoResolutionInfo
      ) {
        return;
      }

      if (!document.querySelector("#ext-hideVideoResolutionInfo")) {
        const css = `
          .nextup-ext-resolution-info {
            visibility: hidden !important;
          }
          [data-nextup-ext-temp-show="true"] .nextup-ext-resolution-info {
            visibility: visible !important;
          }
        `;
        addStyle(css, "ext-hideVideoResolutionInfo");
      }
    };

    const fnList = [
      hideTitle,
      hideEpisodeTitle,
      hideVariousButtonsInTopRight,
      hideSeekBar,
      hidePlaybackTime,
      hideCenterButtons,
      hideNextEpisodeButton,
      tweakHideSkipIntroButton,
      tweakShowVideoResolutionInfo,
    ];
    for (const fn of fnList) {
      try {
        fn();
      } catch (e) {
        console.log(e);
      }
    }
  }

  adjustNewUiResolutionInfoStyle(options = getDefaultOptions()) {
    if (!options.showVideoResolution_xhook) {
      return;
    }

    this.runFeatureWhenVariantResolved("adjustNewUiResolutionInfoStyle", () => {
      if (!this.isVariantNew()) {
        return;
      }

      const adjustStyle = () => {
        const optBtnImg = this.player.querySelector(
          ".nextup-ext-opt-btn-container img"
        );
        if (!optBtnImg) return;

        const computedStyle = getComputedStyle(optBtnImg);
        const width = computedStyle.width;
        if (!width) return;

        let num = parseFloat(width);
        if (num === 0 || !Number.isFinite(num)) {
          return;
        }
        if (num < 10) {
          return;
        }

        const fontSize = num - 5 + "px";
        const css = `
          [data-nextup-ext-role="resolution-info"] {
            font-size: ${fontSize}
          }
        `;
        upsertStyle(css, "ext-adjustNewUiResolutionInfoStyle");
      };

      adjustStyle();
      new MutationObserver(adjustStyle).observe(this.player, {
        attributes: true,
        attributeFilter: ["data-nextup-ext-overlay-visible"],
      });

      window.addEventListener("resize", () => {
        adjustStyle();
      });
    });
  }

  forcePlayNextEpisode(options = getDefaultOptions()) {
    if (!options.forcePlayNextEpisode_xhook) {
      return;
    }
    this.runFeatureWhenVariantResolved("forcePlayNextEpisode", () => {
      if (this.isVariantLegacy()) {
        this.forcePlayNextEpisodeLegacy(options);
      } else if (this.isVariantNew()) {
        this.forcePlayNextEpisodeNewUi(options);
      }
    });
  }

  forcePlayNextEpisodeLegacy(options = getDefaultOptions()) {
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
        ...OBSERVER_CONFIG,
        attributes: true,
      });

      videoInfoObserver.observe(infobarContainer, {
        ...OBSERVER_CONFIG,
        attributes: true,
      });
    });

    infobarObserver.observe(this.player, {
      ...OBSERVER_CONFIG,
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
      ...OBSERVER_CONFIG,
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

  forcePlayNextEpisodeNewUi(options = getDefaultOptions()) {
    let titleText = null;
    let episodeTitle = null;
    let videoSrc = null;
    let isTryingToGetVideoInfo = false;
    let videoInfoWatcher;
    let videoClosedByUser = false;

    const getTitleText = () => {
      const title = this.player.querySelector(".atvwebplayersdk-title-text");
      return title?.textContent;
    };

    const getEpisodeTitle = () => {
      const episodeInfo = this.player.querySelector(
        ".atvwebplayersdk-episode-info"
      );
      return episodeInfo?.textContent;
    };

    const getVideoSrc = () => {
      const video = getVisibleVideo();
      return video?.src;
    };

    const getVideoInfo = () => {
      if (!titleText) {
        titleText = getTitleText() ?? null;
      }
      if (!episodeTitle) {
        episodeTitle = getEpisodeTitle() ?? null;
      }
      if (!videoSrc) {
        videoSrc = getVideoSrc();
      }
    };

    const setVideoInfoJsonStr = () => {
      const obj = {
        titleText,
        episodeTitle,
        videoSrc,
      };
      const str = JSON.stringify(obj);
      this.player.dataset.nextupExtVideoInfo = str;
    };

    const dispatchKeyboardEvent = () => {
      const event = new KeyboardEvent("keydown", { keyCode: 9 });
      this.player.dispatchEvent(event);
    };

    const tryDispatchKeyboardEvent = () => {
      if (isTryingToGetVideoInfo) {
        return;
      }
      if (episodeTitle && videoSrc) {
        return;
      }
      if (this.player.dataset.nextupExtOverlayVisible === "true") {
        return;
      }

      dispatchKeyboardEvent();
      temporarilyDisableOverlay(this.player, 3500);

      setTimeout(() => {
        getVideoInfo();
        setVideoInfoJsonStr();
      }, 500);
    };

    const tryGetVideoInfo = (startTime) => {
      videoInfoWatcher = setInterval(() => {
        if (performance.now() - startTime >= 30_000) {
          isTryingToGetVideoInfo = false;
          clearInterval(videoInfoWatcher);
          tryDispatchKeyboardEvent();
          return;
        }
        getVideoInfo();
        setVideoInfoJsonStr();
        if (titleText && episodeTitle && videoSrc) {
          isTryingToGetVideoInfo = false;
          clearInterval(videoInfoWatcher);
        }
      }, 200);
    };
    const startTime = performance.now();
    isTryingToGetVideoInfo = true;
    tryGetVideoInfo(startTime);

    const playNextEpisode = () => {
      if (videoClosedByUser) {
        console.log("forcePlayNextEpisode:", "Video closed by user");
        return;
      }

      const nextEpisodeInfoStr = this.player.dataset.nextupExtNextEpisodeInfo;
      if (!nextEpisodeInfoStr) {
        console.log("forcePlayNextEpisode:", "Next episode not found");
        return;
      }
      delete this.player.dataset.nextupExtNextEpisodeInfo;
      const nextEpisodeInfo = JSON.parse(nextEpisodeInfoStr);
      const nextEpisodeId = nextEpisodeInfo.nextEpisodeId;
      if (!nextEpisodeId || videoSrc !== nextEpisodeInfo.videoSrc) {
        console.log("forcePlayNextEpisode:", "Next episode not found");
        return;
      }

      // Temporarily darkens the page.
      document.body.style.filter = "brightness(0)";
      setTimeout(() => {
        document.body.style.filter = "";
      }, 2000);

      setTimeout(() => {
        document.body.style.filter = "";
        if (videoClosedByUser) {
          console.log("forcePlayNextEpisode:", "Video closed by user");
          return;
        }

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
        window.location.href = url;
      }, 1500);
    };

    const closeButtonClicked = (e) => {
      if (!e) {
        return;
      }
      videoClosedByUser = true;
    };

    const abortController = new AbortController();
    const { signal } = abortController;

    const closeButtonObserver = new MutationObserver(() => {
      const selector = PrimeVideoTextRepository.generateCloseButtonSelectors(
        this.player
      );
      const closeButton = this.player.querySelector(selector);
      if (!closeButton) {
        return;
      }
      closeButton.addEventListener("click", closeButtonClicked, { signal });
    });

    closeButtonObserver.observe(this.player, {
      ...OBSERVER_CONFIG,
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

    document.body.addEventListener("keydown", escPressed, { signal });

    const video = getVisibleVideo();
    let remainingListenerisFinished = false;
    const remainingListener = () => {
      if (titleText || episodeTitle || remainingListenerisFinished) {
        remainingListenerisFinished = true;
        video?.removeEventListener("timeupdate", remainingListener);
        return;
      }

      try {
        if (Number.isNaN(video.duration)) {
          return;
        }
        const remaining = video.duration - video.currentTime;
        if (remaining >= 20) {
          return;
        }
        remainingListenerisFinished = true;

        tryDispatchKeyboardEvent();
        setTimeout(() => {
          video?.removeEventListener("timeupdate", remainingListener);
        }, 500);
      } catch (e) {
        console.log(e);
        remainingListenerisFinished = true;
      }
    };
    video?.addEventListener("timeupdate", remainingListener, { signal });

    new MutationObserver((_, outerObserver) => {
      if (this.player.classList.contains("dv-player-fullscreen")) {
        return;
      }
      outerObserver.disconnect();

      if (videoInfoWatcher) {
        clearInterval(videoInfoWatcher);
      }
      closeButtonObserver.disconnect();
      setTimeout(() => {
        abortController.abort();
      }, 800);

      playNextEpisode();

      new MutationObserver((_, observer) => {
        if (this.player.classList.contains("dv-player-fullscreen")) {
          observer.disconnect();
          delete this.player.dataset.nextupExtVideoInfo;
          this.forcePlayNextEpisodeNewUi(options);
        }
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

  try {
    await OptionsSchemaManager.ensureOptionsUpToDate();
  } catch (e) {
    console.log(e);
  }

  const options = await getOptions();
  const url = window.location.href;
  let canRunXhook = true;
  let isFirstPlayer = true;
  let canRestoreVolume = true;

  new MutationObserver((_) => {
    const players = document.querySelectorAll(
      "[id^='dv-web-player']:not([data-detected-from-nextup-ext='true'])"
    );
    players.forEach(async (player) => {
      player.dataset.detectedFromNextupExt = "true";

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
        controller.startVariantDetection(options);
      } catch (e) {
        console.log(e);
      }

      try {
        controller.changeOrderOfVideoElements(options);
      } catch (e) {
        console.log(e);
      }

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
          await createOptionDialog();
        } catch (e) {
          console.log(e);
        }

        try {
          createUserScriptMenu();
        } catch (e) {
          console.log(e);
        }

        // The shortcut keys for opening the dialog will only work if the video is open.
        addEventListenerForOpenOptionsDialog(options);
      }

      new MutationObserver((_, observer) => {
        controller.markLegacyCenterOverlaysWrapper();

        const video = player.querySelector("video");
        if (!video?.checkVisibility()) {
          return;
        }

        observer.disconnect();

        try {
          controller.markNewUiNextUpElements();
        } catch (e) {
          console.log(e);
        }

        try {
          controller.markNewUiRecommendationsElements();
        } catch (e) {
          console.log(e);
        }

        try {
          controller.markNewUiOverlayBottomLeftContainer(options);
        } catch (e) {
          console.log(e);
        }

        try {
          controller.markIdentifyLegacyNonDarkeningOverlays();
        } catch (e) {
          console.log(e);
        }

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
          controller.hideRecommendations(options);
        } catch (e) {
          console.log(e);
        }

        try {
          controller.hidePlaybackStartNotices(options);
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
          controller.hideXRay(options);
        } catch (e) {
          console.log(e);
        }

        try {
          controller.hideVariousTextAndButtons(options);
        } catch (e) {
          console.log(e);
        }

        try {
          controller.adjustNewUiResolutionInfoStyle(options);
        } catch (e) {
          console.log(e);
        }

        try {
          controller.forcePlayNextEpisode(options);
        } catch (e) {
          console.log(e);
        }
      }).observe(player, OBSERVER_CONFIG);
    });
  }).observe(document, OBSERVER_CONFIG);
};

main();
