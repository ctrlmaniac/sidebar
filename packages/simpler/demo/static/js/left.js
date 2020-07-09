$("document").ready(function () {
  $("#sidebar-left").simplerSidebar({
    align: "left",
    selectors: {
      trigger: "#toggle-sidebar-left",
      quitter: ".quit-sidebar-left",
    },
    animation: {
      easing: "easeOutQuint",
    },
  });
});
