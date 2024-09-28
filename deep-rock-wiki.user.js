// ==UserScript==
// @name         deep-rock-wiki
// @namespace    https://github.com/imDaniX
// @version      1.0.1
// @description  Transform https://deeprockgalactic.wiki.gg pages into https://deeprock.wiki link
// @author       imDaniX
// @homepageURL  https://github.com/imDaniX/deep-rock-wiki
// @license      MIT; https://opensource.org/license/mit
// @downloadURL  https://github.com/imDaniX/deep-rock-wiki/raw/master/deep-rock-wiki.user.js
// @updateURL    https://github.com/imDaniX/deep-rock-wiki/raw/master/deep-rock-wiki.user.js
// @match        https://deeprockgalactic.wiki.gg/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=deeprockgalactic.wiki.gg
// ==/UserScript==

(function() {
    'use strict';

    addEventListener("copy", (event) => {
        let selection = window.getSelection();
        if (!selection || selection.toString() == "") {
            let path = window.location.pathname.replace("/wiki", "");
            event.clipboardData.setData("text/plain", "https://deeprock.wiki" + (path == "/Deep_Rock_Galactic_Wiki" ? "" : path));
            event.preventDefault();
        }
    });
})();
