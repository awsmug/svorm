import type HasCanvasItemData from '../Interfaces/HasCanvasItemData';

export default class Canvas {
    public  items: HasCanvasItemData[] = [];
    public  renderItems: HasCanvasItemData[] = [];

    public wrapperWidth: number;
    public wrapperHeight: number;

    private fullSizeContent: boolean = false;

    /**
     * Initializing help.
     * 
     * @param help  Help data.
     * 
     * @since 1.0.0
     */
    public constructor( fullSizeContent: boolean = false ){
        this.fullSizeContent = fullSizeContent;
    }

    /**
     * Get size factor for autosizing canvas.
     * 
     * @returns Factor for multiplicati
     */
    public getSizeFactor() 
    {
        if(  this.fullSizeContent == false || this.wrapperWidth === undefined || this.wrapperHeight === undefined )
        {
            return 1;
        }

        let widthFactor  = this.wrapperWidth / this.getItemsWidth();
        let heightFactor = this.wrapperHeight / this.getItemsHeight();
        
        if( widthFactor > heightFactor )
        {
            return heightFactor
        }
        
        return widthFactor;
    }

    /**
     * Translate size 
     * 
     * @param size Size to translate for canvas
     * 
     * @since 1.0.0
     */
    public translateSize( size: number )
    {
        return size * this.getSizeFactor();
    }

    /**
     * Add canvasItem
     * 
     * @param CanvasItem canvasItem
     * 
     * @since 1.0.0
     */
    public addItem( canvasItem: HasCanvasItemData )
    {
        this.items.push( canvasItem );
    }

    /**
     * Delete canvasItem
     * 
     * @param CanvasItem canvasItem
     */
    public deleteItem( key: number )
    {
        let canvasItems: HasCanvasItemData[] = [];

        for ( let currentKey in this.items ) 
        {         
            if( parseInt( currentKey ) != key )
            {
                canvasItems.push( this.items[ currentKey ] );
            }
        }

        this.items = canvasItems;
        this.render();
    }

    /**
     * Update canvasItem
     * 
     * @param number Key of item for updating 
     * @param CanvasItem CanvasItem data
     * 
     * @since 1.0.0
     */
    public update( key: number, canvasItem: HasCanvasItemData )
    {
        this.items.splice( key, 1, canvasItem );
    }

    /**
     * Get canvas width
     * 
     * @returns Canvas width in px
     * 
     * @since 1.0.0
     */
    public getWidth() : number
    {
        return this.translateSize( this.getItemsWidth() );
    }

    /**
     * Get canvas height
     * 
     * @returns Canvas height in px
     * 
     * @since 1.0.0
     */
    public getHeight() : number
    {
        return this.translateSize( this.getItemsHeight() );
    }

    /**
     * Get items width
     * 
     * @returns Relative items width
     * 
     * @since 1.0.0
     */
    public getItemsWidth() : number
    {
        if( this.items.length == 0 )
        {
            return 0;
        }

        let right: number[] = [];
        this.items.forEach( ( item ) => {
            right.push( item.x + item.width );
        });

        return Math.max( ...right );
    }

     /**
     * Get items height
     * 
     * @returns Relative items height
     * 
     * @since 1.0.0
     */
    public getItemsHeight() : number
    {
        if( this.items.length == 0 )
        {
            return 0;
        }
        
        let bottom: number[] = [];
        this.items.forEach( ( item ) => {
            bottom.push( item.y + item.height );
        });

        return Math.max( ...bottom );
    }

    /**
     * Set wrapper size
     * 
     * @param width Width in px
     * @param height Width in px
     * 
     * @since 1.0.0
     */
    public setWrapperSize( width: number, height: number )
    {
        this.wrapperWidth  = width;
        this.wrapperHeight = height;
        this.render();
    }

    /**
     * Render items
     * 
     * @since 1.0.0
     */
    public render()
    {
        this.renderItems = [];

        this.items.forEach( (item) => {
            this.renderItems.push({
                'width' : this.translateSize( item.width ),
                'height': this.translateSize( item.height ),
                'x'     : this.translateSize( item.x ),
                'y'     : this.translateSize( item.y )
            });
        });
    }
}