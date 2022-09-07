"use strict";
class ModernSidebar {
    constructor(opt) {
        this.selector =
            typeof opt.selector === "undefined" ? "#sidebar" : opt.selector;
        this.align = typeof opt.align === "undefined" ? "left" : opt.align;
        this.top = typeof opt.top === "undefined" ? "56px" : opt.top;
        this.width = typeof opt.width === "undefined" ? "300px" : opt.width;
        this.gap = typeof opt.gap === "undefined" ? 56 : parseInt(opt.gap);
        this.opened = typeof opt.opened === "undefined" ? false : opt.opened;
        this.easing =
            typeof opt.easing === "undefined" ? "ease-in-out" : opt.easing;
        this.zIndex = typeof opt.zIndex === "undefined" ? 3000 : opt.zIndex;
        // other variables
        const position = this.align == "right" ? "left" : "right";
        // Select the elements
        this.sidebar = document.querySelector(this.selector);
        this.triggerer = document.querySelector(opt.triggerer);
        // Add attributes
        this.sidebar.setAttribute("data-status", this.opened ? "open" : "closed");
        // Add z-index
        this.sidebar.style.zIndex = this.zIndex.toString();
        // Add transition
        this.sidebar.style.transition = `${this.align} 500ms ${this.easing}`;
        // Set sidebar position
        this.sidebar.style.position = "fixed";
        this.sidebar.style.top = this.top;
        this.sidebar.style.bottom = "0";
        // Set sidebar width
        this.sidebar.style.width = "100%";
        this.sidebar.style.maxWidth = this.width;
        // Let the mask be displayed when the screen is narrower than the sidebar
        if (window.innerWidth <= parseInt(this.width) + this.gap) {
            this.sidebar.style.width = `${(window.innerWidth - this.gap).toString()}px`;
        }
        // set sidebar width to let the mask to be displayed when screen get narrower
        window.onresize = () => {
            const safeWidth = `${(window.innerWidth - this.gap).toString()}px`;
            if (window.innerWidth <= parseInt(this.width) + this.gap) {
                this.sidebar.style.width = safeWidth;
            }
            else {
                this.sidebar.style.width = "100%";
            }
            // Fix sidebar position
            if (this.sidebar.getAttribute("data-status") == "closed") {
                this.sidebar.style[position] = `-${safeWidth}`;
            }
        };
        // Set sidebar open or closed
        if (this.opened) {
            this.sidebar.style[this.align] = "0px";
        }
        else {
            this.sidebar.style[this.align] = `-${this.sidebar.offsetWidth}px`;
        }
        // Trigger sidebar animation
        this.triggerer.onclick = () => {
            const status = this.sidebar.getAttribute("data-status");
            if (status === "closed") {
                this.open();
            }
            else {
                this.close();
            }
        };
        // Create Mask
        this.mask = document.createElement("div");
        this.mask.setAttribute("data-mask", this.opened ? "open" : "closed");
        this.mask.style.display = "none";
        this.mask.style.background = "rgba(0, 0, 0, 0.8)";
        this.mask.style.zIndex = (this.zIndex - 1).toString();
        this.mask.style.position = "absolute";
        this.mask.style.top = this.top;
        this.mask.style.right = "0";
        this.mask.style.bottom = "0";
        this.mask.style.left = "0";
        this.mask.style.transition = `display 500ms ${this.easing}`;
        document.body.appendChild(this.mask);
        this.mask.onclick = () => this.close();
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
        this.mask.style.display = "block";
    }
    hideMask() {
        this.mask.style.display = "none";
    }
}
