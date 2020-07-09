$("document").ready(function () {
  $("#sidebar-left").simplerSidebar({
    selectors: {
      trigger: "#toggle-sidebar-left",
      quitter: ".quit-sidebar-left",
    },
    animation: {
      easing: "easeOutQuint",
    },
  });
});
