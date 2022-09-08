# `vanilla-sidebar`

**vanilla-sidebar** is a simple sidebar or side nav that aims to have to dependencies. In fact it is written in plain vanilla javascript!

[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lerna.js.org/)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)

## Install

**vanilla-sidebar** is available as a npm package

```shell
// with npm
npm install @ctrlmaniac/vanilla-sidebar

// with yarn
yarn add @ctrlmaniac/vanilla-sidebar
```

## Usage

Follow these steps

### 1. Prepare your template

In order to make **vanilla-sidebar** work you will need to add at least two html elements in your template:

- an app bar
- the sidebar

The first element you will need is an app bar. An app bar, or a toolbar, is a bar positioned fixed at the top of your template. It must include a button or a simple element that will trigger the opening and closing of the sidebar:

```html
<html>
  <head>
    <!-- other tags -->
    <script
      src="https://code.jquery.com/jquery-3.5.1.min.js"
      integrity="sha256-9/aliU8dGd2tb6OSsuzixeV4y/faTqgFtohetphbbj0="
      crossorigin="anonymous"
    ></script>
    <script
      src="https://code.jquery.com/ui/1.12.1/jquery-ui.min.js"
      integrity="sha256-VazP97ZCwtekAsvgPBSUwPFKdrwD3unUfSGVYrahUqU="
      crossorigin="anonymous"
    ></script>
  </head>
  <body>
    <div class="appbar">
      <div class="menu-icon" id="toggle-sidebar"></div>
    </div>
    <!-- appbar -->

    <!-- body content -->

    <!-- sidebar -->
    <div class="sidebar" id="main-sidebar"></div>
  </body>
</html>
```

### 2. Include and configure `vanilla-sidebar`

```html
<html>
  <head>
    <!-- other tags -->
  </head>
  <body>
    <div class="appbar">
      <div class="menu-icon" id="toggle-sidebar"></div>
    </div>
    <!-- appbar -->

    <!-- body content -->

    <!-- sidebar -->
    <div class="sidebar" id="main-sidebar"></div>
    <script src="/path-to/vanilla-sidebar.js"></script>

    <!-- customize vanilla-sidebar -->
    <script>
      var sidebar = new VanillaSidebar({
          selector: "#main-sidebar"
          triggerer: "#toggle-sidebar"
      })
    </script>
  </body>
</html>
```

## Options

```typescript
selector: string;
triggerer: string;
align: "right" | "left";
top: string;
width: string;
gap: string;
opened: boolean;
easing: string;
zIndex: number;
```
