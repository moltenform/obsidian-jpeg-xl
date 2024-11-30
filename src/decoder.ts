
// @ts-ignore
import module from 'jxl-oxide-wasm/module.wasm';
import init, { JxlImage } from 'jxl-oxide-wasm';

export type DecodedImage = {
    png?: Uint8Array;
    error?: string;
};

/**
 * Wrapper on decode that takes an ArrayBuffer
 */
export async function decodeFromArrayBuffer(data: ArrayBuffer) {
    return decode(new Uint8Array(data));
}

/**
 * Use jxl-oxide-wasm to go from JXL to PNG
 */
export async function decode(data: Uint8Array): Promise<DecodedImage> {
    if (!data.length) {
        return {
            error: 'File is empty',
        };
    }

    await init(module);
    const image = new JxlImage();
    image.feedBytes(data);
    if (!image.tryInit()) {
        return {
            error: 'Malformed data',
        };
    }

    const renderResult = image.render();
    const png = renderResult.encodeToPng();
    return { png };
}
