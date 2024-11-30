import { App, Editor, MarkdownView, Modal, Notice, Plugin, PluginSettingTab, Setting } from 'obsidian';
import {testCon, JPEG_XL_VIEW, JpegXlView} from './viewclass';

interface JpegXlSettings {
    defaultToFullSize: string;
}

const DEFAULT_SETTINGS: JpegXlSettings = {
    defaultToFullSize: 'true'
}

export default class JpegXlPlugin extends Plugin {
    settings: JpegXlSettings;

    async onload() {
        await this.loadSettings();

        this.registerView(
            JPEG_XL_VIEW,
            (leaf) => new JpegXlView(this.app, leaf, this.manifest.version)
        );
        this.registerExtensions(['jxl'], JPEG_XL_VIEW);


        // This adds a settings tab so the user can configure various aspects of the plugin
        this.addSettingTab(new JpegXlSettingTab(this.app, this));
        console.log(testCon)
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


class JpegXlSettingTab extends PluginSettingTab {
    plugin: JpegXlPlugin;

    constructor(app: App, plugin: JpegXlPlugin) {
        super(app, plugin);
        this.plugin = plugin;
    }

    display(): void {
        const {containerEl} = this;

        containerEl.empty();

        new Setting(containerEl)
            .setName('Default to full-size image')
            .setDesc('Should the image load full size. Clicking the image will toggle between fit and expand.')
            .addText(text => text
                .setPlaceholder('Enter true or false')
                .setValue(this.plugin.settings.defaultToFullSize)
                .onChange(async (value) => {
                    this.plugin.settings.defaultToFullSize = value;
                    await this.plugin.saveSettings();
                }));
    }
}
