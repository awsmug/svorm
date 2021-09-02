import type HasCanvasItemData from "./HasCanvasItemData";

/**
 * Parts data interface.
 * 
 * @since 1.0.0
 */
 export default interface HasPresetData {
    readonly name:  number,
    readonly image: number,
    readonly data:  HasCanvasItemData[]
}