class DomNodeCollection {
    constructor(elements) {
        this.elements = elements;
    }

    html(setHTML) {
        // check if arg is string first?
        if (setHTML) {
            this.elements.forEach(ele => ele.innerHTML = setHTML);
            return this;
        } else {
            return this.elements[0].innerHTML;
        }
    }

    css(propName, val) {
        if (typeof val === 'undefined') {
            const ele = this.elements[0];
            return window.getComputedStyle(ele).getPropertyValue(propName);
        } else {
            if (typeof val === 'number') val = `${parseFloat(val)}px`;
            this.elements.forEach(ele => ele.style[propName] = val);
            return this;
        }
    }

    empty() {
        this.html('');
    }

    append(children) {
        if (typeof children === 'string') {
            console.log('string');
            this.elements.forEach(ele => {
                ele.innerHTML += children.substring();
                console.log(ele);
                // debugger
            })
        } else if (children instanceof HTMLElement) {
            console.log('html');
            this.elements.forEach(ele => ele.innerHTML += children.outerHTML);
        } else if (children instanceof DomNodeCollection) {
            console.log('dom nodes');
            this.elements.forEach(ele => {
                children.elements.forEach(child => ele.appendChild(child.cloneNode(true)));
            });
        }
        return this;
    }

    appendTo(target) {
        const nodes = document.querySelectorAll(target);
        const nodeCollection = new DomNodeCollection(nodes);
        console.log(nodeCollection);
        // console.log(this);
        nodeCollection.append(this);
        return this;
    }

    attr(attrName, val) {
        if (typeof val === 'undefined') {
            return this.elements[0].getAttribute(attrName);
        } else {
            this.elements.forEach(ele => ele.setAttribute(attrName, val));
            return this;
        }
    }

    addClass(className) {
        this.elements.forEach(ele => ele.classList.add(className));
        return this;
    }

    removeClass(className) {
        this.elements.forEach(ele => ele.classList.remove(className));
        return this;
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