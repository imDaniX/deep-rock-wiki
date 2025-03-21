// ==UserScript==
// @name         deep-rock-wiki
// @namespace    https://github.com/imDaniX
// @version      1.1.0
// @description  Transform https://deeprockgalactic.wiki.gg pages into https://deeprock.wiki link
// @author       imDaniX
// @homepageURL  https://github.com/imDaniX/deep-rock-wiki
// @license      MIT; https://opensource.org/license/mit
// @downloadURL  https://github.com/imDaniX/deep-rock-wiki/raw/master/deep-rock-wiki.user.js
// @updateURL    https://github.com/imDaniX/deep-rock-wiki/raw/master/deep-rock-wiki.user.js
// @match        https://deeprockgalactic.wiki.gg/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=deeprockgalactic.wiki.gg
// ==/UserScript==

const MAIN_DOMAIN = "deeprock.wiki"
const MAIN_PAGE = "/Deep_Rock_Galactic_Wiki";
const SURVIVOR_NAMESPACE = "/Survivor:"
const SURVIVOR_PAGE = SURVIVOR_NAMESPACE + "Main";

(function() {
    'use strict';

    addEventListener("copy", (event) => {
        let location = window.location;
        if (hasSelection() || location.search.includes("action=edit")) return;

        let path = location.pathname.replace("index.php", "").replace("/wiki", "");
        let domain = MAIN_DOMAIN;
        if (path == MAIN_PAGE || path == "/") {
            path = "";
        } else if (path.startsWith(SURVIVOR_NAMESPACE)) {
            domain = "survivor." + domain;
            path = path != SURVIVOR_PAGE
                ? path.replace("Survivor:", "")
                : ""
        }

        path = decodeURI(path + location.search + location.hash).replaceAll(" ", "%20");

        event.clipboardData.setData("text/plain", `https://${domain}${path}`);
        event.preventDefault();
    });
})();

/**
 * https://stackoverflow.com/a/5379408
 */
function hasSelection() {
    let text = "";
    const activeEl = document.activeElement;
    const activeElTagName = activeEl ? activeEl.tagName.toLowerCase() : null;

    if (
      (activeElTagName == "textarea") || (activeElTagName == "input" && /^(?:text|search|password|tel|url)$/i.test(activeEl.type)) &&
      (typeof activeEl.selectionStart == "number")
    ) {
        text = activeEl.value.slice(activeEl.selectionStart, activeEl.selectionEnd);
    } else if (window.getSelection) {
        text = window.getSelection().toString();
    }

    return text && text != "";
}
