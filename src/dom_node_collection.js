class DomNodeCollection {
    constructor(elements) {
        this.elements = elements;
    }

    html(setHTML) {
        // check if arg is string first?
        if (setHTML) {
            this.elements.forEach(ele => ele.innerHTML = setHTML);
        } else {
            return this.elements[0].innerHTML;
        }
    }

    empty() {
        this.elements.forEach(ele => ele.html = '');
    }

    append(content) {
        if (typeof content === 'string') {
            this.elements.forEach(ele => ele.innerHTML += content);
        } else if (content instanceof HTMLElement) {
            this.elements.forEach(ele => ele.innerHTML += content.outerHTML);
        } else if (content instanceof DomNodeCollection) {
            this.elements.forEach(ele => {
                content.elements.forEach(appendEle => ele.innerHTML += appendEle.outerHTML);
            })
        }
    }

    attr(attrName, val) {
        if (val) {
            this.elements.forEach(ele => ele.setAttribute(attrName, val));
        } else {
            return this.elements[0].getAttribute(attrName);
        }
    }

    addClass(className) {
        this.elements.forEach(ele => ele.classList.add(className));
    }

    removeClass(className) {
        this.elements.forEach(ele => ele.classList.remove(className));
    }

    /*
     * TRAVERSAL
     */

    first() {
        return this.elements[0];
    }

    last() {
        return this.elements[this.elements.length - 1];
    }

    children() {
        const allChildren = [];
        this.elements.forEach(ele => allChildren.push(...ele.children));

        return new DomNodeCollection(allChildren);
    }

    parent() {
        const allParents = new Set();
        this.elements.forEach(ele => allParents.add(ele.parentNode));

        return new DomNodeCollection(Array.from(allParents));
    }

    find(selector) {
        const foundEles = [];
        this.elements.forEach(ele => foundEles.push(...ele.querySelectorAll(selector)));

        return new DomNodeCollection(foundEles);
    }

    remove(selector) {
        let eles = selector ? this.find(selector).elements : this.elements;

        eles.forEach(ele => ele.remove());
    }

    /*
     * EVENT HANDLERS
     */

    on(type, cb) {
        this.elements.forEach( ele => {
            if (!ele.hasOwnProperty('eventCallbacks')) {
                ele.eventCallbacks = {};
            }

            ele.addEventListener(type, cb); 
            ele.eventCallbacks[type] = ele.eventCallbacks[type] || [];
            ele.eventCallbacks[type].push(cb);
        });
    }

    off(type) {
        this.elements.forEach( ele => {
            ele.eventCallbacks[type].forEach(cb => {
                ele.removeEventListener(type, cb); 
            });
        });
    }


}

module.exports = DomNodeCollection;