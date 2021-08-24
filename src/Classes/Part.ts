import type HasPartData from "../Interfaces/HasPartData";

export default class Part implements HasPartData {
    readonly width:            number;
    readonly length:           number;
    readonly height:           number;
    readonly horizontalOffset: number;
    readonly verticalOffset:   number;

    /**
     * Initializing help.
     * 
     * @param help  Help data.
     * 
     * @since 1.0.0
     */
    public constructor( 
        width:            number, 
        length:           number, 
        height:           number, 
        horizontalOffset: number,
        verticalOffset:   number
        )
    {
        this.width            = width;
        this.length           = length;
        this.height           = height;
        this.horizontalOffset = horizontalOffset;
        this.verticalOffset   = verticalOffset;
    }

    /**
     * Get width for screen in px
     * 
     * @returns int 
     */
    public getSreenWidth() : number
    {
        return Math.round( this.width * 20 );
    }

    /**
     * Get length for screen in px
     * 
     * @returns int 
     */
    public getSreenLength() : number
    {
        return Math.round( this.length * 20 );
    }

    /**
     * Get horizontal offset for screen in px
     * 
     * @returns int 
     */
    public getSreenHorizontalOffset() : number
    {
        return Math.round( this.horizontalOffset * 20 );
    }

    /**
    * Get vertical offset for screen in px
    * 
    * @returns int 
    */
    public getSreenVerticalOffset() : number
    {
        return Math.round( this.verticalOffset * 20 );
    }
}