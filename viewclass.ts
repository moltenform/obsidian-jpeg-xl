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
        //~ let fileData = await this.app.vault.readBinary(file);
        //~ console.log(fileData)
        console.log('hi')
        this.contentEl.innerHTML = `
        <span class="loader" id="jpgXlIdSpinner"></span>
        <img id="jpgXlIdMainImage" src="img/aaatest.jxl" alt="JXL Image" class="jpgXlAdaptToPage" style="display:none">`
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
