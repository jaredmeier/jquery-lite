const domNode = require("./dom_node_collection.js");

const docQueue = [];

window.$l = (arg) => {
    if (typeof arg === 'string') {
        if (arg[0] === "<") {
            let html = new DOMParser().parseFromString(arg, 'text/html');
            return new domNode(Array.from(html.body.childNodes));
        } else {
            const nodes = document.querySelectorAll(arg);
            return new domNode(Array.from(nodes));
        }
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

    // from jQuery docs: `data: Data to be sent to the server. It is converted to a query string, if not already a string. It's appended to the url for GET-requests.`
    if (options.method === 'GET') {
        options.url += toQuery(options.data);
    }

    return new Promise((resolve, reject) => {
        req.open(options.method, options.url);

        req.onload = () => {
            if (req.readyState === 4) {
                if (req.status === 200) {
                    options.success(JSON.parse(req.response));
                    resolve(JSON.parse(req.response));
                } else {
                    options.error(JSON.parse(req.response));
                    reject(JSON.parse(req.response));
                }
            }
        }

        req.onerror = () => {
            console.log('An error occurred');
            reject();
        }

        req.send(JSON.stringify(options.data));
    })
}

runDocQueue = () => {
    docQueue.forEach(fn => fn());
}

$l.extend = (merger, ...others) => {
    others.forEach(other => {
        for (let prop in other) {
            merger[prop] = other[prop];
        }
    })

    return merger;
}

toQuery = (data) => {
    query = '?';

    for (let key in data) {
        query += `${key}=${data[key]}&`;
    }

    return query;
}

// module.exports = {
//     w
// }


// $l.ajax({
//     type: 'GET',
//     url: "http://dummy.restapiexample.com/api/v1/employees"
// }).then( data => console.log(data)).catch(error => console.log(error));