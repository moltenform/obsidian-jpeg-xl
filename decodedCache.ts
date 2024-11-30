

import { LRUCache } from 'lru-cache'
import {  TFile } from "obsidian";
import { getCurrentCacheSizeMb, JpegXlViewSettings } from './persistedSettings';

const gDefaultOptions: LRUCache.Options<string, string, any> = {
    max: undefined, // use maxSize instead
  
    // for use with tracking overall storage size
    maxSize: 50 * 1024 * 1024, // 50mb
    sizeCalculation: (value: string, key: string): number => {
      return value.length
    },
  
    // for use when you need to clean up something when objects
    // are evicted from the cache
    dispose: (value, key) => {
        console.log('Disposing', key)
        URL.revokeObjectURL(value)
    },
  
    // return stale items before removing from cache?
    allowStale: false,
    updateAgeOnGet: false,
    updateAgeOnHas: false,
  }

let gCache: LRUCache<string, string>

export async function getDecodedDataByTFile(tFile: TFile, settings: JpegXlViewSettings) {
    if (!gCache) {
        const options = {...gDefaultOptions, maxSize: getCurrentCacheSizeMb(settings)} as LRUCache.Options<string, string, any>
        gCache = new LRUCache(options)
    }

    const cached = gCache.get(getUniqueKey(tFile))
    if (cached) {
        return cached
    }

    const newVal = await getF
    gCache.set(getUniqueKey(tFile), newVal)
    return newVal
}

function getUniqueKey(tFile: TFile) {
    // this is better than tFile.path which is relative and not a full path.
    return tFile.vault.getResourcePath(tFile)
}

