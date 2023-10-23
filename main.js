const config = { childList: true, subtree: true };

const observer = new MutationObserver((_, outerObserver) => {
    const wrapper = document.querySelector(
        ".atvwebplayersdk-nextupcard-wrapper"
    );
    if (!wrapper) return;

    // The wrapper will not be regenerated even if you move to the next episode or close and reopen the video.
    outerObserver.disconnect();

    new MutationObserver((_) => {
        wrapper.style.display = "none";
        const hideButton = wrapper.querySelector(
            ".atvwebplayersdk-nextupcardhide-button"
        );
        if (hideButton) {
            hideButton.click();
        }
    }).observe(wrapper, config);
});

observer.observe(document, config);
