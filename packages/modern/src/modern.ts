class ModernSidebar {
  sidebar: string;

  constructor(sidebar: string) {
    this.sidebar = sidebar;
  }

  init() {
    const sidebar = document.querySelector(this.sidebar);

    console.log(sidebar);
  }
}
