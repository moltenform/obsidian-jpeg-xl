import { App, Editor, MarkdownView, Modal, Notice, Plugin, PluginSettingTab, Setting } from 'obsidian';
import { JpegXlSettingTab, JpegXlViewSettings } from './persistedSettings';
import { JPEG_XL_VIEW, JpegXlView} from './jpegXlView';


const DEFAULT_SETTINGS: JpegXlViewSettings = {
    cacheSizeMb: 'default'
}

export default class JpegXlPlugin extends Plugin {
    settings: JpegXlViewSettings;

    async onload() {
        await this.loadSettings();

        this.registerView(
            JPEG_XL_VIEW,
            (leaf) => new JpegXlView(this.app, leaf, this.manifest.version, this.settings)
        );
        this.registerExtensions(['jxl'], JPEG_XL_VIEW);

        // adds a settings tab
        this.addSettingTab(new JpegXlSettingTab(this.app, this));
    }

    onunload() {
    }

    async loadSettings() {
        this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
    }

    async saveSettings() {
        await this.saveData(this.settings);
    }
}



