$("document").ready(function () {
  $("#sidebar-left").simplerSidebar({
    selectors: {
      trigger: "#toggle-sidebar-left",
      quitter: ".quit-sidebar",
    },
    animation: {
      easing: "easeOutQuint",
    },
  });
});
