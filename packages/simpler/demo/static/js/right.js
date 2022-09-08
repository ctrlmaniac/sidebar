$("document").ready(function () {
  $("#sidebar-right").simplerSidebar({
    align: "right",
    toggler: "#toggle-sidebar-right",
    quitter: ".quit-sidebar",
    animation: {
      easing: "easeOutQuint",
    },
  });
});
