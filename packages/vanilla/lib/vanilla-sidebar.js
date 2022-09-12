"use strict";
class VanillaSidebar {
    constructor(opt) {
        this.selector =
            typeof opt.selector === "undefined" ? "#sidebar" : opt.selector;
        this.quitterSelector =
            typeof opt.quitter == "undefined" ? ".quit-sidebar" : opt.selector;
        this.align = typeof opt.align === "undefined" ? "left" : opt.align;
        this.top = typeof opt.top === "undefined" ? "56px" : opt.top;
        this.width = typeof opt.width === "undefined" ? "300px" : opt.width;
        this.gap = typeof opt.gap === "undefined" ? 56 : parseInt(opt.gap);
        this.opened = typeof opt.opened === "undefined" ? false : opt.opened;
        this.easing =
            typeof opt.easing === "undefined" ? "ease-in-out" : opt.easing;
        this.zIndex = typeof opt.zIndex === "undefined" ? 3000 : opt.zIndex;
        this.hasMask = typeof opt.mask === "undefined" ? true : opt.mask;
        this.animationDuration = "500ms";
        const position = this.align == "right" ? "left" : "right";
        this.sidebar = document.querySelector(this.selector);
        this.triggerer = document.querySelector(opt.triggerer);
        this.quitter = document.querySelectorAll(this.quitterSelector);
        this.sidebar.setAttribute("data-status", this.opened ? "open" : "closed");
        this.sidebar.style.zIndex = this.zIndex.toString();
        this.sidebar.style.transition = `${this.align} ${this.animationDuration} ${this.easing}`;
        this.sidebar.style.position = "fixed";
        this.sidebar.style.top = this.top;
        this.sidebar.style.bottom = "0";
        this.sidebar.style.width = "100%";
        this.sidebar.style.maxWidth = this.width;
        if (window.innerWidth <= parseInt(this.width) + this.gap) {
            this.sidebar.style.width = `${(window.innerWidth - this.gap).toString()}px`;
        }
        window.onresize = () => {
            const safeWidth = `${(window.innerWidth - this.gap).toString()}px`;
            if (window.innerWidth <= parseInt(this.width) + this.gap) {
                this.sidebar.style.width = safeWidth;
            }
            else {
                this.sidebar.style.width = "100%";
            }
            if (this.sidebar.getAttribute("data-status") == "closed") {
                this.sidebar.style[position] = `-${safeWidth}`;
            }
        };
        if (this.opened) {
            this.sidebar.style[this.align] = "0px";
        }
        else {
            this.sidebar.style[this.align] = `-${this.sidebar.offsetWidth}px`;
        }
        this.triggerer.onclick = () => {
            const status = this.sidebar.getAttribute("data-status");
            if (status === "closed") {
                this.open();
            }
            else {
                this.close();
            }
        };
        this.mask = document.createElement("div");
        this.mask.setAttribute("data-mask", this.opened ? "open" : "closed");
        this.mask.style.visibility = "hidden";
        this.mask.style.background = "rgba(0, 0, 0, 0.8)";
        this.mask.style.zIndex = (this.zIndex - 1).toString();
        this.mask.style.position = "absolute";
        this.mask.style.top = this.top;
        this.mask.style.right = "0";
        this.mask.style.bottom = "0";
        this.mask.style.left = "0";
        this.mask.style.transition = `visibility 0s, opacity ${this.animationDuration} ${this.easing}`;
        this.mask.style.opacity = "0";
        if (this.hasMask) {
            document.body.appendChild(this.mask);
            this.mask.onclick = () => this.close();
        }
        this.quitter.forEach((el) => {
            el.addEventListener("click", () => {
                this.close();
            });
        });
    }
    setAttribute() {
        const status = this.sidebar.getAttribute("data-status");
        if (status === "closed") {
            this.sidebar.setAttribute("data-status", "opened");
        }
        else {
            this.sidebar.setAttribute("data-status", "closed");
        }
    }
    open() {
        this.sidebar.style[this.align] = "0px";
        const status = this.sidebar.getAttribute("data-status");
        this.setAttribute();
        this.showMask();
    }
    close() {
        this.sidebar.style[this.align] = `-${this.sidebar.offsetWidth}px`;
        const status = this.sidebar.getAttribute("data-status");
        this.setAttribute();
        this.hideMask();
    }
    showMask() {
        this.mask.style.opacity = "1";
        this.mask.style.visibility = "visible";
    }
    hideMask() {
        this.mask.style.opacity = "0";
        this.mask.style.visibility = "hidden";
    }
}
