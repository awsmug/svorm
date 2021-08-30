import type HasCanvasItemData from "../Interfaces/HasCanvasItemData";

export default class CanvasItem implements HasCanvasItemData {
    readonly width:  number;
    readonly height: number;
    readonly x:      number;
    readonly y:      number;

    /**
     * Initializing help.
     * 
     * @param help  Help data.
     * 
     * @since 1.0.0
     */
    public constructor( 
        width:  number, 
        height: number, 
        x:      number,
        y:      number,
        )
    {
        this.width            = width;
        this.height           = height;
        this.x = x;
        this.y = y;
    }
}