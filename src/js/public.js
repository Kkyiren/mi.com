(function() {
    'use strict';

    const ready = callback => {
        // HTML5的 就绪事件
        document.addEventListener('DOMContentLoaded', function fn() {
            document.removeEventListener('DOMContentLoaded', fn); // 就绪事件只需要执行一次 执行结束就删除
            callback();
        });
    }


    const init = (selector, context) => {
        if (typeof selector === 'function') { // 如果传入的是函数 添加就绪事件
            ready(selector); // selector  是一个函数 就绪完成需要执行的函数
            return; // 结束执行
        }
        return new Base(selector, context); // 创建并返回一个对象
    }

    class Base extends Array {
        // 构造函数
        constructor(selector, context) {
            if (selector.nodeType == 1) { // 传入的如果是DOM元素
                super(selector); // 将一个DOM元素 放入数组
            } else {
                // 如果传入了一个上线文对象(DOM对象) 在上下文对象中查找元素
                // node.querySelector()
                let elms = context ? context.querySelectorAll(selector) : document.querySelectorAll(selector); //选择元素
                super(...elms); // 展开被选择的元素 放入数组
            }
        }

        // 功能方法
        on(type, callback) { // 事件监听
            if (typeof type === 'string' && typeof callback === 'function') { // 如果传入的是一个字符串和函数
                this.forEach(elm => { // 遍历数组
                    elm.addEventListener(type, callback); // 为每一个元素添加一个事件
                });
            } else if (typeof type === 'object' && type != null) {
                for (let key in type) { // 遍历对象
                    this.forEach(elm => { // 遍历元素
                        elm.addEventListener(key, type[key]);
                    });
                }
            }
        }

        css(style, value) { // 为被选元素 设置 css 样式
            if (typeof style === 'string' && typeof value === 'string') { // 如果传入的是两个字符串
                this.forEach(elm => { // 为每个被选元素添加行内样式
                    elm.style[style] = value;
                });
            } else if (typeof style === 'object' && style != null) {
                for (let key in style) { // 遍历对象
                    this.forEach(elm => { // 为每一个对象添加行内样式
                        elm.style[key] = style[key]
                    });
                }
            }
            return this;
        }

        addClass(className) {
            this.forEach(elm => {
                elm.classList.add(className);
            });
            return this;
        }

        removeClass(className) {
            this.forEach(elm => {
                elm.classList.remove(className);
            });
            return this;
        }

        // 切换类名 如果存在则删除，不存在则添加
        toggleClass(className) {
            this.forEach(elm => {
                elm.classList.toggle(className);
            });
            return this;
        }

        // 替换类名 使用新的类名替换旧的类名
        replaceClass(oldName, newName) {
            this.forEach(elm => {
                elm.classList.replace(oldName, newName);
            });
            return this;
        }

        // attr
        // 语法:
        // $(selector).attr(attr) 
        // 获得第一个被选元素的属性值

        // $(selector).attr(attr,value)
        // 为所有被选元素设置(添加/修改)属性

        // $(selector).attr(attr,callback)
        // callback 参数
        // old 老的属性值
        // i   索引
        attr(attr, value) {
            if (typeof attr === 'string') {
                switch (typeof value) {
                    case 'undefined':
                        return this[0].getAttribute(attr);
                        break;
                    case 'string':
                        this.forEach(elm => {
                            elm.setAttribute(attr, value);
                        });
                        break;
                    case 'function':
                        this.forEach((elm, i) => {
                            let res = value(elm.getAttribute(attr), i);
                            elm.setAttribute(attr, res);
                        });
                        break;
                }
            }
            return this;
        }

        // 删除所有被选元素的指定属性
        removeAttr(attr) {
            this.forEach(elm => {
                elm.hasAttribute(attr) && elm.removeAttribute(attr);
            });
            return this;
        }

        index(elm) {
            // 数组的 findIndex 查找索引
            // 接收一个布尔表达式的条件
            // 返回符合条件的索引值
            // 如果没有找到符合条件的索引值 -1
            return this.findIndex(val => val == elm);
        }

        tabs(options) {
            let defaults = {
                ev: 'click', // 事件
                active: 'active', // className
                display: 'show' // classNmae
            };

            Object.assign(defaults, options); //合并参数

            // 元素选择
            let btn = $('#' + this[0].id + '>ul>li', this[0]);
            let div = $('#' + this[0].id + '>div[data-type="tabs"]', this[0]);

            // 添加点击事件
            btn.on(defaults.ev, function() {
                let index = btn.index(this);

                btn.removeClass(defaults.active);
                $(this).addClass(defaults.active);

                div.removeClass(defaults.display);
                $(div[index]).addClass(defaults.display);
            });
        }


        html(htmlText) {
            if (typeof htmlText === 'undefined') {
                // 没有传参数 返回第一个元素的html内容
                return this[0].innerHTML;
            } else if (typeof htmlText === 'string') {
                // 如果传入的是字符串  修改所有被选元素的html内容
                this.forEach(elm => {
                    elm.innerHTML = htmlText;
                });
            } else if (typeof htmlText === 'function') {
                this.forEach((elm, i) => {
                    elm.innerHTML = htmlText(elm.innerHTML, i);
                });
            }
        }

        offset() {
            return {
                left: this[0].offsetLeft,
                top: this[0].offsetTop,
                width: this[0].offsetWidth,
                height: this[0].offsetHeight
            }
        }




    }


    window.$$ = init; // init 暴露给全局环境

})();