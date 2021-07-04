exports.install = function(Vue, option) {
        Vue.prototype.$throttle = (fn, delay) => {
            let flag = true
            return function(...args) {
                if(flag) {
                    flag = false;
                    setTimeout(() => {
                        fn.apply(this, args);
                        flag = true
                    }, delay);
                }
            }
        }
    }

