// Author Knighttower
// MIT License
// [2022] [Knighttower] https://github.com/knighttower

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
const executeOnNodeChanged: { [key: string]: () => void } = {};

/**
 * When node change
 * @param {String} id
 * @param {Function} callback Callback when any node changes/ add/deleted/modified
 * @return {Void}
 */
const addOnNodeChange = (id: string, callback: () => void): void => {
    if (callback) {
        executeOnNodeChanged[id] = callback;
    }
};

/**
 * Remove from node change
 * @param {String} id
 * @return {Void}
 */
const removeOnNodeChange = (id: string): void => {
    if (id) {
        delete executeOnNodeChanged[id];
    }
};

/**
 * Deep cleanup
 * @return {Void}
 */
const cleanup = (): void => {
    Object.keys(executeOnNodeChanged).forEach((key) => delete executeOnNodeChanged[key]);
};

/**
 * Observer
 * @private
 * @return {MutationObserver}
 */
(() => {
    const callback = (mutationList: MutationRecord[], observer: MutationObserver) => {
        for (const mutation of mutationList) {
            if (mutation.type === 'childList') {
                for (const id in executeOnNodeChanged) {
                    executeOnNodeChanged[id]();
                }
            }
        }
    };
    const config: MutationObserverInit = {
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

export { executeOnNodeChanged, addOnNodeChange, removeOnNodeChange, cleanup, DomObserver };
export default DomObserver;
