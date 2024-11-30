

import { LRUCache } from 'lru-cache'
import { TFile } from "obsidian";
import { decodeFromArrayBuffer } from './decoder';
import { getCurrentCacheSizeMb, JpegXlViewSettings } from './persistedSettings';

interface CachedVal {
    dataUrl: string,
    size: number
}

// send options to lru-cache
const gDefaultOptions: LRUCache.Options<string, CachedVal, any> = {
    // we use maxSize instead
    max: undefined, 
  
    // track overall storage size
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

/**
 * Retrieve dataUrl for a given image. Uses a cache if possible.
 * Can throw.
 * If getDecodedPngUrl throws, the result is usually not cached.
 */
export async function getDecodedDataByTFile(tFile: TFile, settings: JpegXlViewSettings): Promise<string> {
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

/**
 * Create a dataUrl for a given image.
 * The cache is used to revokeObjectURL when needed.
 */
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

/**
 * Use something unique - similar filenames must not be confused.
 * getResourcePath is better than tFile.path which is relative and not a full path.
 */
function getUniqueKey(tFile: TFile) {
    return tFile.vault.getResourcePath(tFile)
}

