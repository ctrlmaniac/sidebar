$("document").ready(function () {
  $("#sidebar-left").simplerSidebar({
    toggler: "#toggle-sidebar-left",
    quitter: ".quit-sidebar",
    animation: {
      easing: "easeOutQuint",
    },
  });
});
