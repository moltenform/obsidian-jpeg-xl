import { decodeFromArrayBuffer } from "./decoder";
import { App, TextFileView, FileView, WorkspaceLeaf } from "obsidian";
import {  TFile } from "obsidian";
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
            <span class="jpegXlPluginLoader" id="jpegXlPluginSpinner"></span>
            <p style="display:none" class="jpegXlPluginMessage"></p>
            <img class="jpegXlPluginMainImage" src="img/aaatest.jxl" alt="JXL Image" class="jpegXlPluginAdaptToPage" style="display:none">
    `

    let mainImg = this.contentEl.getElementsByClassName('jpegXlPluginMainImage')[0] as any
    let currentlyShowingAll = false
    mainImg.addEventListener('click', () => {
        currentlyShowingAll = !currentlyShowingAll;
        if (currentlyShowingAll) {
            mainImg.className = 'jpegXlPluginFullImageSize'
        } else {
            mainImg.className = 'jpegXlPluginAdaptToPage'
        }
    })

        try {
            const url = await getDecodedDataByTFile(file, this.settings);
            (this.contentEl.getElementsByClassName('jpegXlPluginLoader')[0] as any).style.display = 'none';
            (this.contentEl.getElementsByClassName('jpegXlPluginMainImage')[0] as any).style.display = '';
            (this.contentEl.getElementsByClassName('jpegXlPluginMainImage')[0] as any).src = url;
            (this.contentEl.getElementsByClassName('jpegXlPluginMessage')[0] as any).style.display = 'none';
        } catch (e) {
            (this.contentEl.getElementsByClassName('jpegXlPluginLoader')[0] as any).style.display = 'none';
            (this.contentEl.getElementsByClassName('jpegXlPluginMainImage')[0] as any).style.display = 'none';
            (this.contentEl.getElementsByClassName('jpegXlPluginMessage')[0] as any).style.display = '';
            (this.contentEl.getElementsByClassName('jpegXlPluginMessage')[0] as any).innerText = e.toString();
        }

        await super.onLoadFile(file);
    }

    getViewType() {
        return JPEG_XL_VIEW;
    }
}
