import { decodeFromArrayBuffer } from "./decoder";
import { App, TextFileView, FileView, WorkspaceLeaf } from "obsidian";
import {  TFile } from "obsidian";

export const testCon = 123;
export const JPEG_XL_VIEW = 'jpeg-xl-view';


export class JpegXlView extends FileView {
    private pluginVersion: string;

    app: App;
    data: string;

    constructor(app: App, leaf: WorkspaceLeaf, pluginVersion: string) {
        super(leaf);
        this.app = app;
        this.pluginVersion = pluginVersion;
    }

    async onOpen() {
    }

    async onClose() {
    }

    async onLoadFile(file: TFile) {
        console.log('hi1')
        //~ let fileData = await this.app.vault.read(file);
        //~ console.log(fileData)
        console.log('hi2')
        this.contentEl.innerHTML = `
            <span class="jpegXlPluginLoader" id="jpegXlPluginSpinner"></span>
    <img id="jpegXlPluginMainImage" src="img/aaatest.jxl" alt="JXL Image" class="jpegXlPluginAdaptToPage" style="display:none">
    `

        let fileData = await this.app.vault.readBinary(file);
        console.log('hi3')
        let cool = await decodeFromArrayBuffer(fileData)
        console.log('hi4');
        (this.contentEl.getElementsByClassName('jpegXlPluginLoader')[0] as any).style.display = 'none'
        await super.onLoadFile(file);
        console.log('hi5')
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
