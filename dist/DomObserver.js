// Author Knighttower
// MIT License
// [2022] [Knighttower] https://github.com/knighttower
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.DomObserver = exports.cleanup = exports.removeOnNodeChange = exports.addOnNodeChange = exports.executeOnNodeChanged = void 0;
    /**
     * @module DomObserver
     * Detect DOM changes
     * @name DomObserver
     * @param {window} selector
     * @param {Function}
     * @return DomObserver
     * @example DomObserver.addOnNodeChange('elementIdentifier', () => { console.log('Node changed') })
     * @example DomObserver.removeOnNodeChange('elementIdentifier')
     */
    /**
     * Holds memory of registered functions
     * @private
     */
    const executeOnNodeChanged = {};
    exports.executeOnNodeChanged = executeOnNodeChanged;
    /**
     * When node change
     * @param {String} id
     * @param {Function} callback Callback when any node changes/ add/deleted/modified
     * @return {Void}
     */
    const addOnNodeChange = (id, callback) => {
        if (callback) {
            executeOnNodeChanged[id] = callback;
        }
    };
    exports.addOnNodeChange = addOnNodeChange;
    /**
     * Remove from node change
     * @param {String} id
     * @return {Void}
     */
    const removeOnNodeChange = (id) => {
        if (id) {
            delete executeOnNodeChanged[id];
        }
    };
    exports.removeOnNodeChange = removeOnNodeChange;
    /**
     * Deep cleanup
     * @return {Void}
     */
    const cleanup = () => {
        Object.keys(executeOnNodeChanged).forEach((key) => delete executeOnNodeChanged[key]);
    };
    exports.cleanup = cleanup;
    /**
     * Observer
     * @private
     * @return {MutationObserver}
     */
    (() => {
        const callback = (mutationList, observer) => {
            for (const mutation of mutationList) {
                if (mutation.type === 'childList') {
                    for (const id in executeOnNodeChanged) {
                        executeOnNodeChanged[id]();
                    }
                }
            }
        };
        const config = {
            childList: true,
            subtree: true,
        };
        const observer = new MutationObserver(callback);
        observer.observe(document.body, config);
    })();
    const DomObserver = {
        executeOnNodeChanged,
        addOnNodeChange,
        removeOnNodeChange,
        cleanup,
    };
    exports.DomObserver = DomObserver;
    exports.default = DomObserver;
});
