'use strict'

let obj = {
    name: 'Tom',
    subs: [5, 6, 7]
}

function observe(obj) {
    if (!obj || typeof obj !== 'object') {
        return;
    }
    Object.keys(obj).forEach(key => defineReactive(obj, key, obj[key]));

}

function defineReactive(obj, key, val) {
    let dep = new Dep();
    observe(val);
    Object.defineProperty(obj, key, {
        enumerable: true,
        configurable: true,
        get: () => {
            Dep.target && dep.addDep(Dep.target);
            return val;
        },
        set: newVal => {
            if (val == newVal) return;
            val = newVal;
            dep.notify();
        }
    })
};

// observe(obj);



class Vue {
    constructor(options) {
        observe(options)
    }
}

let vm = new Vue(obj);


class Dep {
    constructor() {
        this.subs = [];
    }
    addSubs(sub) {
        this.subs.push(sub)
    }
    notify() {
        this.subs.forEach(sub => sub.updata())
    }
}