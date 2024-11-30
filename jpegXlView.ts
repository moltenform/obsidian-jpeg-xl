import { decodeFromArrayBuffer } from "./decoder";
import { App, TextFileView, FileView, WorkspaceLeaf } from "obsidian";
import {  TFile } from "obsidian";
import { JpegXlViewSettings } from "persistedSettings";

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
        console.log('hi1 ' + JSON.stringify(file.vault.getResourcePath(file)))
        //~ let fileData = await this.app.vault.read(file);
        //~ console.log(fileData)
        //~ console.log('hi2')
        this.contentEl.innerHTML = `
            <span class="jpegXlPluginLoader" id="jpegXlPluginSpinner"></span>
            <p style="display:none" class="jpegXlPluginMessage"></p>
    <img class="jpegXlPluginMainImage" src="img/aaatest.jxl" alt="JXL Image" class="jpegXlPluginAdaptToPage" style="display:none">
    `

    let isShowAll = false
    let mainImg = this.contentEl.getElementsByClassName('jpegXlPluginMainImage')[0] as any
    mainImg.addEventListener('click', () => {
        isShowAll = !isShowAll;
        if (isShowAll) {
            mainImg.className = 'jpegXlPluginFullImageSize'
        } else {
            mainImg.className = 'jpegXlPluginAdaptToPage'
        }
    })

        try {
            let fileData = await this.app.vault.readBinary(file);
            console.log('hi3')
            let results = await decodeFromArrayBuffer(fileData)
            if (results.error || !results.png) {
                throw new Error(results.error);
            }

            console.log('hi4');
            var blob = new Blob([results.png], {'type': 'image/png'});
            console.log('hi5');
            var url = URL.createObjectURL(blob);
            console.log('hi6');
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

    //~ private handleSaveState = (state: AppState, isExternal: boolean) => {
        //~ const serialized = serializeAppState(state);
        //~ this.setViewData(serialized, isExternal);
        //~ //Request a save - every 2s
        //~ this.requestSave();
    //~ };
}

interface AppState {
    placeholder: string
}
