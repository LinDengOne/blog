export default {
    data() {
        return {
            scroll_current: null,       // 当前滚动条位置
            scroll_isBottom: false,     //是否触底
            scrollFn: () => {},         //scroll事件
            scroll_direction: null      //滚动方向
        }
    },
    beforeMount() {
        this.scrollFn = this.$throttle(this.handleScroll, 150)
        // this.scrollFn = this.handleScroll
        window.addEventListener('scroll', this.scrollFn)
        this.handleScroll()
    },
    beforeDestroy() {
        window.removeEventListener('scroll', this.scrollFn)
    },
    watch: {
        scroll_current(val, oldVal) {
            if (val === null || val === undefined) {
                return
            }
            if (val - oldVal < 0) {
                this.scroll_direction = 'top'
            } else {
                this.scroll_direction = 'bottom'
            }
        }
    },
    methods: {
        handleScroll () {
            const type = ['scrollTop', 'scrollHeigh', 'clientHeight']
            const [ t, h, windwH] = type.map(i => this.getWin(i))
            this.scroll_current = t
            this.scroll_isBottom = t + windwH >= h-10
        },
        getWin(type) {
            return document.documentElement[type] || document.body[type]
        }
    },

}