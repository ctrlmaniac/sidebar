# Migration guide

a guide to migrate from version [2.2.5](https://github.com/ctrlmaniac/sidebar/tree/release-2.2.5) or from version [2.3.2](https://github.com/ctrlmaniac/sidebar/tree/%40ctrlmaniac/simpler-sidebar%402.3.2)

## Update the library

Be really sure to update the library to the newer version! Check the package.json to see if the update has been registered. It it has not, edit the package.json file to provide the new version of `@ctrlmaniac/simpler-sidebar`!

This is really important. If the package won't update, if will break if you upgrade your options

## New options!

In this version, options are more straightforward! Let's see what's changed!

> In this guide I will use the dot notation. Remember that options are a javascript object, so a dot means that you must open the braces { }. Example: `option.one` means `option: { one: "hello" }`

## Options diff

> old option → new option

`selectors.trigger → toggler`

`selectors.quitter → quitter`

`init → open`

`sidebar.width → width`

`events.on.animation.open → events.onOpen`

`events.on.animation.close → events.onClose`

`events.on.animation.both → events.always`

`events.callback.animation.open → events.afterOpen`

`events.callback.animation.close → events.afterClose`

`events.callback.animation.both → events.always`

`events.callback.animation.freezePage → freezePage`

## Full option list

```javascript
{
  quitter: "a", // string (class) - The element that will trigger the closing action
  trigger: "", // string (id) - The element that will trigger the closing and opening action
  attr: "sidebar-main", // string - the data attribute assigned to the elements the library will interact with
  open: false, // bool - initialize sidebar opened or closed
  align: "right", // string - right, left -- the position of the sidebar
  top: 0, // int - the amount in px of the position top of the sidebar
  width: 300, // int - the size in px of the sidebar
  gap: 64, // int - the amount in px ot the gap that will be left when the screen is narrower than the sidebar width
  zIndex: 3000, // int - the z-index of the sidebar element
  freezePage: true, // bool - this option will disallow the scrolling of the page beneath the sidebar when it is opened
  animation: {
    duration: 500, // int - the time in ms of the animation
    easing: "swing", // string - the tipe of easing animation
  },
  mask: {
    // a mask that will cover the content beneath the sidebar when opened
    display: true, // boolean - disable or not the mask element
    css: {
      backgroundColor: "black",
      opacity: 0.5,
      filter: "Alpha(opacity=50)",
    },
  },
  events: {
    onOpen: function () {}, // function - event(s) triggered when sidebar is opening
    afterOpen: function () {}, // function - event(s) triggered after sidebar opened
    onClose: function () {}, // function - event(s) triggered when sidebar is closing
    afterClose: function () {}, // function - event(s) triggered after sidebar is closed
    always: function () {}, // function - event(s) triggered both on and after closing and opening
  },
}
```
