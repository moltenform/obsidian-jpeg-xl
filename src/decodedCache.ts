

import { LRUCache } from 'lru-cache'
import {  TFile } from "obsidian";
import { decodeFromArrayBuffer } from './decoder';
import { getCurrentCacheSizeMb, JpegXlViewSettings } from './persistedSettings';

interface CachedVal {
    dataUrl: string,
    size: number
}

const gDefaultOptions: LRUCache.Options<string, CachedVal, any> = {
    // we use maxSize instead
    max: undefined, 
  
    // for use with tracking overall storage size
    maxSize: 100 * 1024 * 1024, // 100mb
    sizeCalculation: (value: CachedVal, key: string): number => {
        // compensate for overhead
        return value.size * 2
    },
  
    dispose: (value: CachedVal, key: string) => {
        URL.revokeObjectURL(value.dataUrl)
    },
  
    allowStale: false,
    updateAgeOnGet: false,
    updateAgeOnHas: false,
  }

let gCache: LRUCache<string, CachedVal>

export async function getDecodedDataByTFile(tFile: TFile, settings: JpegXlViewSettings) {
    if (!gCache) {
        const options = {...gDefaultOptions, maxSize: getCurrentCacheSizeMb(settings)} as LRUCache.Options<string, CachedVal, any>
        gCache = new LRUCache(options)
    }

    const cached = gCache.get(getUniqueKey(tFile))
    if (cached) {
        return cached.dataUrl
    }

    const newVal = await getDecodedPngUrl(tFile)
    gCache.set(getUniqueKey(tFile), newVal)
    return newVal.dataUrl
}

async function getDecodedPngUrl(tFile: TFile): Promise<CachedVal> {
    // can also use this.app.vault if needed 
    let fileData = await tFile.vault.readBinary(tFile);
    let results = await decodeFromArrayBuffer(fileData)
    if (results.error || !results.png) {
        throw new Error(results.error);
    }

    var blob = new Blob([results.png], {'type': 'image/png'});
    var url = URL.createObjectURL(blob);
    return {
        dataUrl: url,
        size: results.png.length
    }
}

function getUniqueKey(tFile: TFile) {
    // this is better than tFile.path which is relative and not a full path.
    return tFile.vault.getResourcePath(tFile)
}

