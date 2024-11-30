# obsidian-jpeg-xl

Show JPEG XL (jxl) images in Obsidian

Released under the MIT license.

- Uses jxl-oxide (MIT license)
- Uses lru-cache (ISC license)

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

