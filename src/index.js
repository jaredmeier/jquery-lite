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
            // if this is the first function added to queue, set up event listener to run whole queue once doc is loaded
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

$l.extend = (merger, ...others) => {
    others.forEach( other => {
        for (let prop in other) {
            merger[prop] = other[prop];
        }
    })
    return merger;
}

$l.ajax = options => {
    const req = new XMLHttpRequest();
    const defaults = {
        contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
        method: 'GET',
        url: '',
        success: () => { },
        error: () => { },
        data: {},
    };
    // set any defaults for options not passed as argument
    options = $l.extend(defaults, options);
    options.method = options.method.toUpperCase();

    req.open(options.method, options.url);
    req.onload = () => {
        if (req.readyState === 4) {
            if (req.status === 200) {
                options.success(JSON.parse(req.response));
            } else {
                options.error(JSON.parse(req.response));
            }
        }
    }
    req.onerror = () => console.log('An error occurred');
    req.send(JSON.stringify(options.data));
}

// $.ajax({
//     type: 'GET',
//     url: "http://api.openweathermap.org/data/2.5/weather?q=London,uk&appid=bcb83c4b54aee8418983c2aff3073b3b",
//     success(data) {
//         console.log("We have your weather!")
//         console.log(data);
//     },
//     error() {
//         console.error("An error occurred.");
//     },
// });

