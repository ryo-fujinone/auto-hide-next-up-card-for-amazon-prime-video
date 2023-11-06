const observeConfig = { childList: true, subtree: true };

let addStyle = (css) => {
    const style = document.createElement("style");
    style.textContent = css;
    document.head.appendChild(style);
};

const saveDefaultOptions = () => {
    const defaultOption = {
        hideNextup: true,
        temporarilyDisableOverlay: true,
        hideRating: true,
    };
    const jsonStr = JSON.stringify(defaultOption);
    localStorage.setItem("nextup-ext", jsonStr);
};

const getOptions = () => {
    let jsonStr = localStorage.getItem("nextup-ext");
    if (!jsonStr) {
        saveDefaultOptions();
        jsonStr = localStorage.getItem("nextup-ext");
    }
    return JSON.parse(jsonStr);
};

const saveOptions = (key, value) => {
    const options = getOptions();
    const newOptions = {
        ...options,
        [key]: value,
    };
    console.log(newOptions);
    const jsonStr = JSON.stringify(newOptions);
    localStorage.setItem("nextup-ext", jsonStr);
};

const createOptionMessages = () => {
    const jaMessages = {
        hideNextup: "Next upを非表示にする",
        temporarilyDisableOverlay:
            "非表示ボタンの自動クリック時に5秒間オーバーレイ表示を無効にする",
        hideRating: "レーティング(推奨対象年齢)を非表示にする",
    };
    const enMessages = {
        hideNextup: "Hide next up card",
        temporarilyDisableOverlay:
            "Disable overlay for 5 seconds when auto-clicking hide button",
        hideRating: "Hide rating",
    };
    return /ja|ja-JP/.test(window.navigator.language) ? jaMessages : enMessages;
};

const getOptionDialog = () => document.querySelector(".nextup-ext-opt-dialog");

const createOptionDialog = () => {
    if (getOptionDialog()) return;

    const messages = createOptionMessages();
    const options = getOptions();

    const dialogHtmlStr = `
        <dialog class="nextup-ext-opt-dialog">
           <label>
              <input type="checkbox" id="hide-nextup" name="hide-nextup" ${
                  options.hideNextup ? "checked" : ""
              } />
              <p>${messages.hideNextup}</p>
           </label>
           <label>
              <input type="checkbox" id="temporarily-disable-overlay" name="temporarily-disable-overlay" ${
                  options.temporarilyDisableOverlay ? "checked" : ""
              } />
              <p>${messages.temporarilyDisableOverlay}</p>
           </label>
           <label>
              <input type="checkbox" id="hide-rationg" name="hide-rationg" ${
                  options.hideRating ? "checked" : ""
              } />
              <p>${messages.hideRating}</p>
           </label>
           <div>
              <button id="nextup-ext-opt-dialog-close">閉じる</button>
           </div>
        </dialog>
        `;
    document.body.insertAdjacentHTML("beforeend", dialogHtmlStr);

    const css = [
        ".nextup-ext-opt-dialog {width: 370px;}",
        ".nextup-ext-opt-dialog label {display: inline;}",
        ".nextup-ext-opt-dialog label input {float: left;}",
        ".nextup-ext-opt-dialog label p {float: left; margin-bottom: 5px; width: calc(100% - 24px);}",
        ".nextup-ext-opt-dialog label:last-of-type p {margin-bottom: 12px;}",
        ".nextup-ext-opt-dialog div:has(#nextup-ext-opt-dialog-close) {text-align: center;}",
        "#nextup-ext-opt-dialog-close {border-color: black; border: solid 1px; background-color: #EEE}",
        "#nextup-ext-opt-dialog-close:hover {background-color: #DDD}",
    ];
    addStyle(css.join(""));

    const optDialog = getOptionDialog();
    optDialog.addEventListener(
        "click",
        (e) => {
            const idName = e.target.id;
            if (idName === "") return;

            switch (idName) {
                case "hide-nextup":
                    saveOptions("hideNextup", e.target.checked);
                    break;
                case "temporarily-disable-overlay":
                    saveOptions("temporarilyDisableOverlay", e.target.checked);
                    break;
                case "hide-rationg":
                    saveOptions("hideRating", e.target.checked);
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

const openOptionDialog = () => {
    createOptionDialog();
    const optDialog = getOptionDialog();
    optDialog.showModal();
};

const openOptionDialogWithKeyboard = () => {
    new MutationObserver((_, _observer) => {
        const webPlayerContainer = document.querySelector(
            ".webPlayerContainer"
        );
        if (!webPlayerContainer) return;

        _observer.disconnect();

        createOptionDialog();
        document.body.addEventListener("keydown", (e) => {
            if (e.altKey && e.code === "KeyP") {
                const optDialog = getOptionDialog();
                if (optDialog.hasAttribute("open")) {
                    optDialog.close();
                } else {
                    optDialog.showModal();
                }
            }
        });
    }).observe(document, observeConfig);
};

const createOptionBtn = () => {
    new MutationObserver((_, _observer) => {
        if (document.querySelector(".nextup-ext-opt-btn-container")) return;

        const btnsContainer = document.querySelector(
            ".atvwebplayersdk-hideabletopbuttons-container"
        );
        if (!btnsContainer) return;

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
            openOptionDialog();
        });
    }).observe(document, observeConfig);
};

const temporarilyDisableOverlay = (delay = "5000") => {
    const overlaysWrapper = document.querySelector(
        ".atvwebplayersdk-overlays-wrapper"
    );
    if (!overlaysWrapper) return;
    overlaysWrapper.style.display = "none";
    setTimeout(() => {
        overlaysWrapper.style.display = "";
    }, delay);
};

const autoHideNextup = () => {
    let options = getOptions();
    if (!options.hideNextup) return;
    new MutationObserver((_, outerObserver) => {
        const wrapper = document.querySelector(
            ".atvwebplayersdk-nextupcard-wrapper"
        );
        if (!wrapper) return;

        outerObserver.disconnect();

        new MutationObserver((_) => {
            wrapper.style.display = "none";
            const hideButton = wrapper.querySelector(
                ".atvwebplayersdk-nextupcardhide-button"
            );
            if (hideButton) {
                // Temporarily disable the overlay because it will be displayed by executing click().
                if (options.temporarilyDisableOverlay)
                    temporarilyDisableOverlay("5000");
                hideButton.click();
            }
        }).observe(wrapper, observeConfig);
    }).observe(document, observeConfig);
};

const hideRatingText = () => {
    let options = getOptions();
    if (!options.hideRating) return;
    const css = [
        ".atvwebplayersdk-rating-text {display: none;}",
        ".atvwebplayersdk-ratingdescriptor-text {display: none;}",
    ];
    addStyle(css.join(""));

    // Hide the overlays that appear in the top center and top left when viewing ratings.
    new MutationObserver((_, _observer) => {
        const ratingDesc = document.querySelector(
            ".atvwebplayersdk-ratingdescriptor-text"
        );
        if (!ratingDesc) return;

        _observer.disconnect();

        const parent = ratingDesc.parentNode.parentNode;
        if (parent.childNodes.length !== 3) return;
        if (
            !Array.from(parent.childNodes).every(
                (child) => child.tagName === "DIV"
            )
        )
            return;

        for (const child of parent.childNodes) {
            if (child.querySelector(".atvwebplayersdk-ratingdescriptor-text"))
                continue;
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
    }).observe(document, observeConfig);
};

if (!localStorage.getItem("nextup-ext")) saveDefaultOptions();
createOptionBtn();
openOptionDialogWithKeyboard();

autoHideNextup();
hideRatingText();
