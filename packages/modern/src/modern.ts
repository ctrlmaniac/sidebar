interface options {
  selector: string;
  triggerer: string;
  align: "right" | "left";
  top: string;
  width: string;
  gap: string;
  open: boolean;
  easing: string;
  zIndex: number;
}

class ModernSidebar {
  sidebar: HTMLElement;
  selector: string;
  triggerer: HTMLElement;
  align: any; // must be fixed
  top: string;
  width: string;
  gap: number;
  open: boolean;
  easing: string;
  zIndex: number;

  constructor(opt: options) {
    this.selector =
      typeof opt.selector === "undefined" ? "#sidebar" : opt.selector;
    this.align = typeof opt.align === "undefined" ? "left" : opt.align;
    this.top = typeof opt.top === "undefined" ? "56px" : opt.top;
    this.width = typeof opt.width === "undefined" ? "300px" : opt.width;
    this.gap = typeof opt.gap === "undefined" ? 56 : parseInt(opt.gap);
    this.open = typeof opt.open === "undefined" ? false : opt.open;
    this.easing =
      typeof opt.easing === "undefined" ? "ease-in-out" : opt.easing;
    this.zIndex = typeof opt.zIndex === "undefined" ? 3000 : opt.zIndex;

    // other variables
    const position = this.align == "right" ? "left" : "right";

    // Select the elements
    this.sidebar = document.querySelector(this.selector)!;
    this.triggerer = document.querySelector(opt.triggerer)!;

    // Add attributes
    this.sidebar.setAttribute("data-status", this.open ? "open" : "closed");

    // Add z-index
    this.sidebar.style.zIndex = this.zIndex.toString();

    // Add transition
    this.sidebar.style.transition = `${this.align} 500ms ${
      opt.easing || this.easing
    }`;

    // Set sidebar position
    this.sidebar.style.position = "fixed";
    this.sidebar.style.top = this.top;
    this.sidebar.style.bottom = "0";

    // Set sidebar width
    this.sidebar.style.width = "100%";
    this.sidebar.style.maxWidth = this.width;

    // Let the mask be displayed when the screen is narrower than the sidebar
    if (window.innerWidth <= parseInt(this.width) + this.gap) {
      this.sidebar.style.width = `${(
        window.innerWidth - this.gap
      ).toString()}px`;
    }

    // set sidebar width to let the mask to be displayed when screen get narrower
    window.onresize = () => {
      const safeWidth = `${(window.innerWidth - this.gap).toString()}px`;

      if (window.innerWidth <= parseInt(this.width) + this.gap) {
        this.sidebar.style.width = safeWidth;
      } else {
        this.sidebar.style.width = "100%";
      }

      // Fix sidebar position
      if (this.sidebar.getAttribute("data-status") == "closed") {
        this.sidebar.style[position] = `-${safeWidth}`;
      }
    };

    // Set sidebar open or closed
    if (this.open) {
      this.sidebar.style[this.align] = "0px";
    } else {
      this.sidebar.style[this.align] = `-${this.sidebar.offsetWidth}px`;
    }

    // Trigger sidebar animation
    this.triggerer.onclick = () => {
      const status: string = this.sidebar.getAttribute("data-status")!;

      if (status === "closed") {
        this.triggerOpen();
      } else {
        this.triggerClose();
      }
    };

    // Create Mask
    const mask = document.createElement("div");
    mask.setAttribute("data-mask", this.open ? "open" : "closed");
    mask.style.display = "none";
    mask.style.background = "rgba(0, 0, 0, 0.8)";
    mask.style.zIndex = (this.zIndex - 1).toString();
    mask.style.width = "100%";
    mask.style.height = "100%";
    document.body.appendChild(mask);
  }

  setAttribute() {
    const status: string = this.sidebar.getAttribute("data-status")!;

    if (status === "closed") {
      this.sidebar.setAttribute("data-status", "opened");
    } else {
      this.sidebar.setAttribute("data-status", "closed");
    }
  }

  triggerOpen() {
    this.sidebar.style[this.align] = "0px";
    const status: string = this.sidebar.getAttribute("data-status")!;
    this.setAttribute();
  }

  triggerClose() {
    this.sidebar.style[this.align] = `-${this.sidebar.offsetWidth}px`;
    const status: string = this.sidebar.getAttribute("data-status")!;
    this.setAttribute();
  }
}
