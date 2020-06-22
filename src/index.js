const domNode = require("./dom_node_collection.js"); 

const docQueue = [];

window.$l = (arg) => {
    if (typeof arg === 'string') {
        const nodes = document.querySelectorAll(arg);
        const nodesArray = Array.from(nodes);
        return new domNode(nodesArray);
    } else if (arg instanceof HTMLElement) {
        return new domNode(arg);
    } else if (typeof arg === 'function') {
        if (document.readyState === 'loading') {
            if (!docQueue.length) document.addEventListener('DOMContentLoaded', runDocQueue);
            docQueue.push(arg);
        } else {
            arg();
        }
    }
}

function runDocQueue() {
    docQueue.forEach(fn => fn());
}