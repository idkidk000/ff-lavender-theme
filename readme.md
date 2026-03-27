Trivial Firefox theme with dark/light

Necessary because Firefox ignores Qt / KDE themes

Approximate base themes generated on `https://color.firefox.com/` and merged into a single manifest

### Install Deps

`deno i`

### Usage

To build and install an unsigned `.zip` extension:

- `deno task build`
- `Firefox` -> `Extensions` -> `Manage extensions` -> `Gear` -> `Debug Add-ons` -> `Load Temporary Add-on`

To build and install a signed `.xpi` extension

- Create a developer account on [https://addons.mozilla.org/](https://addons.mozilla.org/) if you don't already have one
- Create a `.env` file containing
  - `WEB_EXT_API_KEY=your key here`
  - `WEB_EXT_API_SECRET=your secret here`
- `deno task sign` (be very patient)
- `Firefox` -> `Extensions` -> `Manage extensions` -> `Install Add-on From File`

If you use Sidebery

- Go into `Settings` -> `Styles editor` and add the CSS below:

```css
@media (prefers-color-scheme: light) {
  #root, #root.root, :root {
    --frame-bg: #f0e4ff;
    --toolbar-bg: #f0e4ff;
  }
}

@media (prefers-color-scheme: dark) {
  #root, #root.root, :root {
    --frame-bg: #1a1225;
    --toolbar-bg: #1a1225;
  }
}
```

### Docs

- [themes](https://extensionworkshop.com/documentation/themes/static-themes/)
- [web-ext](https://extensionworkshop.com/documentation/develop/web-ext-command-reference/)
- [addons.mozilla.org API](https://mozilla.github.io/addons-server/topics/api/)
