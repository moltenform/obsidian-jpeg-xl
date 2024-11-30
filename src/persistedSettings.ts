
import { App, Editor, MarkdownView, Modal, Notice, Plugin, PluginSettingTab, Setting } from 'obsidian';

/**
 * It's a string so that we can show the string 'Default' as an initial value.
 * If I showed 100Mb as the default, it might feel like too large of a number, when really it's fine.
 */
export interface JpegXlViewSettings {
    cacheSizeMb: string
}

/**
 * Parse user input and return the number of bytes
 */
export function getCurrentCacheSizeMb(settings: JpegXlViewSettings) {
    const defaultV = 100 * 1024 * 1024 // 100mb
    const cacheSizeMb = parseFloat(settings?.cacheSizeMb)
    const cacheSizeBytes = Number.isFinite(cacheSizeMb) && cacheSizeMb >= 0 ? Math.round(cacheSizeMb * 1024 * 1024) : defaultV
    return cacheSizeBytes
}

/**
 * Allow main.ts to refer to this file without causing a reference cycle
 */
interface PluginWithSettings extends Plugin {
    settings: JpegXlViewSettings
    saveSettings(): Promise<void>
}

/**
 * Manage the settings tab
 */
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
            .setDesc('How many Mb of memory to cache, large values are recommended so that images load faster. Reload Obsidian for changes to take effect.')
            .addText(text => text
                .setPlaceholder('')
                .setValue(this.plugin.settings.cacheSizeMb)
                .onChange(async (value) => {
                    this.plugin.settings.cacheSizeMb = value;
                    await this.plugin.saveSettings();
                }));
    }
}
