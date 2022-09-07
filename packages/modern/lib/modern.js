"use strict";
class ModernSidebar {
    constructor(sidebar) {
        this.sidebar = sidebar;
    }
    init() {
        const sidebar = document.querySelector(this.sidebar);
        console.log(sidebar);
    }
}
