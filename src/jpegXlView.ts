import { App, TextFileView, FileView, WorkspaceLeaf } from "obsidian";
import { TFile } from "obsidian";
import { JpegXlViewSettings } from "./persistedSettings";
import { getDecodedDataByTFile } from "./decodedCache";

export const JPEG_XL_VIEW = 'jpeg-xl-view';

export class JpegXlView extends FileView {
    app: App;
    constructor(app: App, leaf: WorkspaceLeaf, private pluginVersion: string, private settings: JpegXlViewSettings) {
        super(leaf);
        this.app = app;
    }

    async onOpen() {
    }

    async onClose() {
    }

    async onLoadFile(file: TFile) {
        this.contentEl.innerHTML = `
            <span class="jpegXlPluginSpinner"></span>
            <p style="display:none" class="jpegXlPluginMessage"></p>
            <img class="jpegXlPluginMainImage jpegXlPluginAdaptToPage" style="display:none">`

        let elSpinner = this.contentEl.getElementsByClassName('jpegXlPluginSpinner')[0] as any
        let elMainImg = this.contentEl.getElementsByClassName('jpegXlPluginMainImage')[0] as any
        let elMsg = this.contentEl.getElementsByClassName('jpegXlPluginMessage')[0] as any
        
        /* The user can toggle between full-screen and full-size by clicking the image,
        however Obsidian limits the horizontal width, and so this feature is currently
        not very useful. */
        let currentlyShowingAll = false
        elMainImg.addEventListener('click', () => {
            currentlyShowingAll = !currentlyShowingAll;
            if (currentlyShowingAll) {
                elMainImg.className = 'jpegXlPluginFullImageSize'
            } else {
                elMainImg.className = 'jpegXlPluginAdaptToPage'
            }
        })

        try {
            const url = await getDecodedDataByTFile(file, this.settings);
            elSpinner.style.display = 'none';
            elMainImg.style.display = '';
            elMainImg.src = url;
            elMsg.style.display = 'none';
        } catch (e) {
            elSpinner.style.display = 'none';
            elMainImg.style.display = 'none';
            elMsg.style.display = '';
            elMsg.innerText = e.toString();
        }

        await super.onLoadFile(file);
    }

    getViewType() {
        return JPEG_XL_VIEW;
    }
}
