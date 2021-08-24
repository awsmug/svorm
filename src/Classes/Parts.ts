import Part from "./Part";

export default class Parts {
    public items: Part[] = [];

    /**
     * Initializing help.
     * 
     * @param help  Help data.
     * 
     * @since 1.0.0
     */
     public constructor( parts: Part[] = [] ){
        if( parts.length === 0 ) {
            this.new();
        } else {
            this.items = parts;
        }
    }

    /**
     * Add new clean item
     * 
     * @since 1.0.0
     */
    public new() {
        let part = new Part(
            10.0,
            10.0,
            2.5,
            0,
            0
        );

        this.add( part );
    };

    /**
     * Add part
     * 
     * @param Part part
     */
    public add( part: Part )
    {
        this.items.push( part );
    }

    /**
     * Delete part
     * 
     * @param Part part
     */
    public delete( key: number )
    {
        let parts: Part[] = [];

        for ( let currentKey in this.items ) 
        {         
            if( parseInt( currentKey ) != key )
            {
                parts.push( this.items[ key ] );
            }
        }

        this.items = parts;
    }

    /**
     * Update part
     * 
     * @param number Key of item for updating 
     * @param Part Part data
     * 
     * @since 1.0.0
     */
    public update( key: number, part: Part )
    {
        this.items.splice( key, 1, part );
    }
}