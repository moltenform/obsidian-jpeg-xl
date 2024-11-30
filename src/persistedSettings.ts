
import { App, Editor, MarkdownView, Modal, Notice, Plugin, PluginSettingTab, Setting } from 'obsidian';

export interface JpegXlViewSettings {
    cacheSizeMb: string
}

export function getCurrentCacheSizeMb(settings: JpegXlViewSettings) {
    const defaultV = 50 * 1024 * 1024 // 50mb
    const cacheSizeMb = parseFloat(settings?.cacheSizeMb)
    const cacheSizeBytes = Number.isFinite(cacheSizeMb) && cacheSizeMb >= 0 ? Math.round(cacheSizeMb * 1024 * 1024) : defaultV
    return cacheSizeBytes
}

interface PluginWithSettings extends Plugin {
    settings: JpegXlViewSettings
    saveSettings(): Promise<void>
}

export class JpegXlSettingTab extends PluginSettingTab {
    plugin: PluginWithSettings;

    constructor(app: App, plugin: PluginWithSettings) {
        super(app, plugin);
        this.plugin = plugin;
    }

    display(): void {
        const {containerEl} = this;

        containerEl.empty();

        new Setting(containerEl)
            .setName('Memory Cache Size')
            .setDesc('How many Mb of memory to cache, large values are recommended so that images load faster. Reload for changes to take effect.')
            .addText(text => text
                .setPlaceholder('')
                .setValue(this.plugin.settings.cacheSizeMb)
                .onChange(async (value) => {
                    this.plugin.settings.cacheSizeMb = value;
                    await this.plugin.saveSettings();
                }));
    }
}