$("document").ready(function () {
  $("#sidebar-left").simplerSidebar({
    toggler: "#toggle-sidebar-left",
    quitter: ".quit-sidebar",
    animation: {
      easing: "easeOutQuint",
    },
    events: {
      always: function () {
        console.log("EVENT: always");
      },
      onOpen: function () {
        console.log("EVENT: on open");
      },
      afterOpen: function () {
        console.log("EVENT: after open");
      },
      onClose: function () {
        console.log("EVENT: on close");
      },
      afterClose: function () {
        console.log("EVENT: after close");
      },
    },
  });
});
