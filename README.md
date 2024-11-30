# obsidian-jpeg-xl

Show JPEG XL (jxl) images in Obsidian

Released under the MIT license.

- Uses jxl-oxide (MIT license)
- Uses lru-cache (ISC license)

### Installing

- Go to the <a href="https://github.com/moltenform/obsidian-jpeg-xl/releases">releases</a> tab.
- Download `main.js`, `manifest.json`, and `styles.css`
- Go to one of your obsidian vaults, and open its `.obsidian` directory.
- Copy `main.js`, `manifest.json`, and `styles.css` into the path `.obsidian/plugins/obsidian-jpeg-xl`
- Re-open the obsidian vault and go to Settings
- Enable Community Plugins if you haven't done so already
- Under Community Plugins enable "JPEG XL".
- You should now be able to open .jxl images!

### Building

In a terminal, get the obsidian-jpeg-xl source code, and then run

- npm install
- npm run build
- Then a file `main.js` should appear.
- Go to one of your obsidian vaults, and open its `.obsidian` directory.
- Copy `main.js`, `manifest.json`, and `src/styles.css` into the path `.obsidian/plugins/obsidian-jpeg-xl`
- Re-open the obsidian vault and go to Settings
- Enable Community Plugins if you haven't done so already
- Under Community Plugins enable "JPEG XL".
- You should now be able to open .jxl images!

