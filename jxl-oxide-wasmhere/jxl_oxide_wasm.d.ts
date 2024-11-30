/* tslint:disable */
/* eslint-disable */
/**
 * Return the version of jxl-oxide-wasm.
 * @returns {string}
 */
export function version(): string;
export class JxlImage {
  free(): void;
  constructor();
  /**
   * @param {Uint8Array} bytes
   * @returns {number}
   */
  feedBytes(bytes: Uint8Array): number;
  /**
   * @returns {boolean}
   */
  tryInit(): boolean;
  /**
   * @param {number | undefined} [keyframe_idx]
   * @returns {RenderResult}
   */
  render(keyframe_idx?: number): RenderResult;
  readonly animated: boolean | undefined;
  forceSrgb: boolean;
  readonly loaded: boolean;
  readonly numLoadedKeyframes: number;
  readonly numLoops: number | undefined;
}
export class RenderResult {
  free(): void;
  /**
   * @returns {Uint8Array}
   */
  encodeToPng(): Uint8Array;
  readonly duration: number;
  readonly durationDenominator: number;
  readonly durationNumerator: number;
  readonly iccProfile: Uint8Array;
}

export type InitInput = RequestInfo | URL | Response | BufferSource | WebAssembly.Module;

export interface InitOutput {
  readonly memory: WebAssembly.Memory;
  readonly __wbg_jxlimage_free: (a: number, b: number) => void;
  readonly version: () => Array;
  readonly jxlimage_new: () => number;
  readonly jxlimage_force_srgb: (a: number) => number;
  readonly jxlimage_set_force_srgb: (a: number, b: number) => void;
  readonly jxlimage_feedBytes: (a: number, b: number, c: number) => Array;
  readonly jxlimage_tryInit: (a: number) => Array;
  readonly jxlimage_is_loading_done: (a: number) => number;
  readonly jxlimage_num_loaded_keyframes: (a: number) => number;
  readonly jxlimage_is_animation: (a: number) => number;
  readonly jxlimage_num_loops: (a: number) => Array;
  readonly jxlimage_render: (a: number, b: number, c: number) => Array;
  readonly __wbg_renderresult_free: (a: number, b: number) => void;
  readonly renderresult_frame_duration_numer: (a: number) => number;
  readonly renderresult_frame_duration_denom: (a: number) => number;
  readonly renderresult_frame_duration: (a: number) => number;
  readonly renderresult_icc_profile: (a: number) => Array;
  readonly renderresult_encodeToPng: (a: number) => Array;
  readonly __wbindgen_export_0: WebAssembly.Table;
  readonly __wbindgen_free: (a: number, b: number, c: number) => void;
  readonly __wbindgen_malloc: (a: number, b: number) => number;
  readonly __externref_table_dealloc: (a: number) => void;
  readonly __wbindgen_realloc: (a: number, b: number, c: number, d: number) => number;
  readonly __wbindgen_exn_store: (a: number) => void;
  readonly __externref_table_alloc: () => number;
  readonly __wbindgen_start: () => void;
}

export type SyncInitInput = BufferSource | WebAssembly.Module;
/**
* Instantiates the given `module`, which can either be bytes or
* a precompiled `WebAssembly.Module`.
*
* @param {{ module: SyncInitInput }} module - Passing `SyncInitInput` directly is deprecated.
*
* @returns {InitOutput}
*/
export function initSync(module: { module: SyncInitInput } | SyncInitInput): InitOutput;

/**
* If `module_or_path` is {RequestInfo} or {URL}, makes a request and
* for everything else, calls `WebAssembly.instantiate` directly.
*
* @param {{ module_or_path: InitInput | Promise<InitInput> }} module_or_path - Passing `InitInput` directly is deprecated.
*
* @returns {Promise<InitOutput>}
*/
export default function __wbg_init (module_or_path?: { module_or_path: InitInput | Promise<InitInput> } | InitInput | Promise<InitInput>): Promise<InitOutput>;
