/*
**  Microkernel -- Microkernel for Server Applications
**  Copyright (c) 2018-2018 Dr. Ralf S. Engelschall <rse@engelschall.com>
**
**  Permission is hereby granted, free of charge, to any person obtaining
**  a copy of this software and associated documentation files (the
**  "Software"), to deal in the Software without restriction, including
**  without limitation the rights to use, copy, modify, merge, publish,
**  distribute, sublicense, and/or sell copies of the Software, and to
**  permit persons to whom the Software is furnished to do so, subject to
**  the following conditions:
**
**  The above copyright notice and this permission notice shall be included
**  in all copies or substantial portions of the Software.
**
**  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
**  EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
**  MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
**  IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
**  CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
**  TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
**  SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

/*  external requirement  */
const CLS = require("continuation-local-storage")

/*  the Microkernel extension procedure  */
const Extension = (kernel) => {
    /*  create a continuation-local-storage (CLS) namespace  */
    const ns = CLS.createNamespace("microkernel")
    kernel.rs("cls", ns)

    /*  provide wrapper services for lazy creation of new CLS contexts  */
    kernel.register("cls-bind-fn", (fn) => {
        return ns.bind(fn)
    })
    kernel.register("cls-bind-ee", (ee) => {
        return ns.bindEmitter(ee)
    })

    /*  provide wrapper services for immediate creation of new CLS contexts  */
    kernel.register("cls-run", (cb) => {
        return ns.run((ctx) => cb(ctx))
    })
    kernel.register("cls-call", (cb) => {
        return ns.runAndReturn((ctx) => cb(ctx))
    })

    /*  provide wrapper service for creation of CLS context  */
    kernel.register("cls-create", () => {
        return ns.createContext()
    })

    /*  provide wrapper services for accessing the currently active CLS context  */
    kernel.register("cls-active", () => {
        return ns.active
    })
    kernel.register("cls-get", (key) => {
        return ns.get(key)
    })
    kernel.register("cls-set", (key, val) => {
        return ns.set(key, val)
    })
}

/*  export the Microkernel extension  */
module.exports = Extension

